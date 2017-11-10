/**
 * Created by Andrea on 11/3/2017.
 */

import React from 'react';
import {DropTarget as DropTargetBase} from 'react-dnd';
import {notEmpty} from 'atp-pointfree';
import {o} from 'atp-sugar';
import Draggable from "./containers/drag-source";
import DropTarget from "./containers/drop-target";

const hierarchicalDropTarget = ({type, action, name, accepts}) => DropTargetBase(
    props => o(accepts(props)).keys().concat(typeof type === 'function' ? type(props) : type),
    {
        drop: (props, monitor) => {
            const item = monitor.getItem();
            const result = {
                action: typeof action === 'function' ? action(item) : action,
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
            const thisType = typeof type === 'function' ? type(props) : type;
            const options = o(accepts(props)).merge({
                [thisType]: item => {
                    const sourceId = item.id;
                    const restrictedNodes = (props.parents || []).concat(props.id);
                    const canDrop = !restrictedNodes.includes(sourceId);
                    return canDrop;
                }
            }).raw;
            const item = monitor.getItem();
            if(typeof options[item.type] !== 'undefined') {
                return options[item.type](item);
            } else {
                console.log("Unsupported drop type: " + item.type);
                return false;
            };
        }
    },
    (connect, monitor) => ({
        [name + 'DropTarget']: connect.dropTarget(),
        [name + 'CanDrop']: monitor.canDrop(),
        [name + 'IsOver']: monitor.isOver(),
    })
);

class Active extends React.Component {
    render() {
        return this.props.children;
    }
}

class Inactive extends React.Component {
    render() {
        return this.props.children;
    }
}

export {hierarchicalDropTarget, Draggable, DropTarget, Active, Inactive};
