/**
 * Created by Andrea on 11/9/2017.
 */

import React from 'react';
import {DropTarget as DropTargetBase} from "react-dnd";
import {o} from 'atp-sugar';
import typeOf from 'typeof';
import {Active, Inactive} from "../index";
import {notEmpty} from 'atp-pointfree';
import {provideContext} from 'atp-react-context';
import PropTypes from "prop-types";
import {compose} from 'atp-pointfree';

export const dropTargetContext = {
    dropTargetIsOver: PropTypes.bool,
    dropTargetCanDrop: PropTypes.bool
};

//TODO:  Make this into a class so the recurse function works
const dropTarget = DropTargetBase(
    props => typeOf(props.accepts) === 'object' ? o(props.accepts).keys() : props.accepts,
    {
        drop: (props, monitor) => {
            const item = monitor.getItem();
            const type = item.type;
            const result = {
                action: o(typeOf(props.action)).switch({
                    function: () => props.action(item),
                    object: () => o(typeOf(props.action[type])).switch({
                        function: () => props.action[type](item),
                        string: () => props.action[type],
                        default: () => {throw "Invalid action type";}
                    }),
                    string: () => props.action,
                    default: () => {throw "Invalid action type"}
                }),
                sourceType: item.type,
                sourceId: item.id,
                targetId: props.id
            };

            if(props.onReceiveDrop) {
                notEmpty(result).then(props.onReceiveDrop);
            }

            return result;
        },
        canDrop: (props, monitor) => {
            const item = monitor.getItem();
            const type = item.type;
            return o(typeOf(props.accepts)).switch({
                array: () => props.accepts.includes(type),
                object: () => o(typeof(props.accepts[type])).switch({
                    boolean: () => props.accepts[type],
                    function: () => props.accepts[type](item),
                    undefined: () => false,
                })
            });
        }
    },
    (connect, monitor) => ({
        dropTarget: connect.dropTarget(),
        dropTargetCanDrop: monitor.canDrop(),
        dropTargetIsOver: monitor.isOver(),
    })
);

export default compose(
    dropTarget,
    provideContext(dropTargetContext),
)(props => props.dropTarget(
    <div style={props.style || {}}>
        {props.children}
    </div>
));
