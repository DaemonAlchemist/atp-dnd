/**
 * Created by Andrea on 11/9/2017.
 */

import React from 'react';
import {DragSource} from "react-dnd";

export default DragSource(
    props => props.type,
    {
        beginDrag: (props, monitor, component) => ({
            id: props.id,
            type: props.type
        }),
        endDrag: (props, monitor) => {
            const result = monitor.getDropResult()
            if(props.onDropped) {
                notEmpty(result).then(props.onDropped);
            }
        }
    },
    (connect, monitor) => ({
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(props => props.dragSource(
    <div style={props.style || {}}>
        {props.children}
    </div>
));
