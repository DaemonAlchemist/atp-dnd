/**
 * Created by Andrea on 11/9/2017.
 */

import React from 'react';
import {DropTarget} from "react-dnd";
import {o} from 'atp-sugar';
import typeOf from 'typeof';
import {Active, Inactive} from "../index";
import {notEmpty} from 'atp-pointfree';

export default DropTarget(
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
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
    })
)(props => props.dropTarget(
    <div style={props.style || {}}>
        {React.Children.map(props.children, child =>
            (
                   child.type === Active && props.isOver
                || child.type === Inactive && !props.isOver
                || child.type !== Active && child.type !== Inactive
            ) && child
        )}
    </div>
));
