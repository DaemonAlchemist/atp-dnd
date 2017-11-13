/**
 * Created by Andrea on 11/3/2017.
 */

import React from 'react';
import {DropTarget as DropTargetBase} from 'react-dnd';
import {notEmpty} from 'atp-pointfree';
import {o} from 'atp-sugar';
import Draggable from "./containers/drag-source";
import DropTarget, {dropTargetContext} from "./containers/drop-target";
import {addContext} from 'atp-react-context';

const Active = addContext(dropTargetContext)(props =>
    props.dropTargetIsOver ? React.Children.map(props.children, child => child) : null
);

const Inactive = addContext(dropTargetContext)(props =>
    !props.dropTargetIsOver ? React.Children.map(props.children, child => child) : null
);

const CanDrop = addContext(dropTargetContext)(props =>
    props.dropTargetCanDrop ? React.Children.map(props.children, child => child) : null
);

const CannotDrop = addContext(dropTargetContext)(props =>
    !props.dropTargetCanDrop ? React.Children.map(props.children, child => child) : null
);

export {Draggable, DropTarget, Active, Inactive, CanDrop, CannotDrop};
