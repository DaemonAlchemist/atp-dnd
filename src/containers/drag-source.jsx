/**
 * Created by Andrea on 11/9/2017.
 */

import React from 'react';
import {DragSource} from "react-dnd";
import {findDOMNode} from 'react-dom';
import {provideContext} from 'atp-react-context';
import {compose} from 'atp-pointfree';
import PropTypes from "prop-types";

export const dragSourceContext = {
    isDragging: PropTypes.bool,
};

const dragSource = DragSource(
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
);

export default compose(
    dragSource,
    provideContext(dragSourceContext)
)(({
    dragSource, children, component,
    isDragging, //Don't pass these down to components
    ...rest
}) => {
    const props = {
        ...rest,
        ref: instance => dragSource(findDOMNode(instance))
    };

    const Component = component || "div";

    return typeof Component === 'string'
        ? React.createElement(Component, {...props, children})
        : <Component {...props}>{children}</Component>;
});
