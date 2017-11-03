/**
 * Created by Andrea on 11/3/2017.
 */

import {DragSource, DropTarget} from 'react-dnd';

export const dragSource = type => DragSource(
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
