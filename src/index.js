/**
 * Created by Andrea on 11/3/2017.
 */

import {DragSource, DropTarget} from 'react-dnd';

const dragSource = type => DragSource(
    type,
    {
        beginDrag: (props, monitor, component) => ({id: props.id}),
        endDrag: (props, monitor) => {
            const result = monitor.getDropResult();
            if(result) {
                props.onMove(result);
            }
        }
    },
    (connect, monitor) => ({
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
);

const hierarchicalDropTarget = (type, action, name) => DropTarget(
    type,
    {
        drop: (props, monitor) => ({
            dropEffect: action,
            sourceId: monitor.getItem().id,
            targetId: props.id
        }),
        canDrop: (props, monitor) => {
            const sourceId = monitor.getItem().id;
            const restrictedNodes = (props.parents || []).concat(props.id);
            const canDrop = !restrictedNodes.includes(sourceId);
            return canDrop;
        }
    },
    (connect, monitor) => ({
        [name + 'DropTarget']: connect.dropTarget(),
        [name + 'CanDrop']: monitor.canDrop(),
        [name + 'IsOver']: monitor.isOver(),
    })
);

export {dragSource, hierarchicalDropTarget};
