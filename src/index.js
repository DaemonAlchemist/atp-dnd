/**
 * Created by Andrea on 11/3/2017.
 */

import {DragSource, DropTarget} from 'react-dnd';
import {notEmpty} from 'atp-pointfree';
import {o} from 'atp-sugar';

const dragSource = type => DragSource(
    type,
    {
        beginDrag: (props, monitor, component) => ({
            id: props.id,
            type: typeof type === 'function' ? type(props) : type
        }),
        endDrag: (props, monitor) => {
            notEmpty(monitor.getDropResult()).then(props.onDrop);
        }
    },
    (connect, monitor) => ({
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
);

const hierarchicalDropTarget = ({type, action, name, accepts}) => DropTarget(
    type,
    {
        drop: (props, monitor) => ({
            action,
            sourceType: monitor.getItem().type,
            sourceId: monitor.getItem().id,
            targetId: props.id
        }),
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
            return typeof options[item.type] !== 'undefined' ? options[item.type](item) : false;
        }
    },
    (connect, monitor) => ({
        [name + 'DropTarget']: connect.dropTarget(),
        [name + 'CanDrop']: monitor.canDrop(),
        [name + 'IsOver']: monitor.isOver(),
    })
);

export {dragSource, hierarchicalDropTarget};
