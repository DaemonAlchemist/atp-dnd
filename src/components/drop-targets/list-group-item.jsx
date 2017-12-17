
import React from 'react';
import DropTarget from "../../containers/drop-target";
import {Active, Inactive, CanDrop} from "../../containers/context";
import {ListGroupItem} from 'react-bootstrap';

export default ({id, accepts, action, onMove}) =>
    <DropTarget
        action={action}
        style={{position: "relative", width: "100%"}}
        accepts={accepts}
        id={id}
        onReceiveDrop={onMove}
    >
        <CanDrop>
            <Active>
                <ListGroupItem>
                    <div style={{border: "dashed 1px"}}>&nbsp;</div>
                </ListGroupItem>
            </Active>
            <Inactive>
                <div style={{
                    height: "3em",
                    position: "absolute",
                    width: "100%",
                    zIndex: 999,
                    background: "transparent"
                }}/>
            </Inactive>
        </CanDrop>
    </DropTarget>;
