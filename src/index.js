/**
 * Created by Andrea on 11/3/2017.
 */

import React from 'react';
import Draggable from "./containers/drag-source";
import DropTarget from "./containers/drop-target";
import {Active, Inactive, IsDragging, NotDragging, CanDrop, CannotDrop} from './containers/context';
import Standard from "./components/drop-targets/standard";
import TableRow from "./components/drop-targets/table-row";
import ListGroupItem from "./components/drop-targets/list-group-item";
const DropTargets = {
    Standard, TableRow, ListGroupItem
};

export {
    Draggable, DropTarget,
    DropTargets,
    Active, Inactive,
    IsDragging, NotDragging,
    CanDrop, CannotDrop
};
