
import React from 'react';
import {dragSourceContext} from "./drag-source";
import {dropTargetContext} from "./drop-target";
import {addContext} from 'atp-react-context';

export const Active = addContext(dropTargetContext)(props =>
    props.dropTargetIsOver ? React.Children.map(props.children, child => child) : null
);

export const Inactive = addContext(dropTargetContext)(props =>
    !props.dropTargetIsOver ? React.Children.map(props.children, child => child) : null
);

export const IsDragging = addContext(dragSourceContext)(props =>
    props.isDragging ? React.Children.map(props.children, child => child) : null
);

export const NotDragging = addContext(dragSourceContext)(props =>
    !props.isDragging ? React.Children.map(props.children, child => child) : null
);

export const CanDrop = addContext(dropTargetContext)(props =>
    props.dropTargetCanDrop ? React.Children.map(props.children, child => child) : null
);

export const CannotDrop = addContext(dropTargetContext)(props =>
    !props.dropTargetCanDrop ? React.Children.map(props.children, child => child) : null
);
