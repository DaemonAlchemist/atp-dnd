/**
 * Created by Andrea on 11/9/2017.
 */

import React from 'react';
import {DragSource} from "react-dnd";
import {findDOMNode} from 'react-dom';

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
)(({dragSource, children, component, ...rest}) => {
    const props = {
        ...rest,
        ref: instance => dragSource(findDOMNode(instance))
    };

    const Component = component || "div";

    return typeof Component === 'string'
        ? React.createElement(Component, {...props, children})
        : <Component {...props}>{children}</Component>;
});
