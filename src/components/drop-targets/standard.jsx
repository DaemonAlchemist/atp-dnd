
import React from 'react';
import DropTarget from "../../containers/drop-target";
import {Active, Inactive} from "../../containers/context";

export default ({id, accepts, action, onMove}) =>
    <DropTarget
        action={action}
        style={{position: "relative", width: "100%"}}
        accepts={accepts}
        id={id}
        onReceiveDrop={onMove}
    >
        <Active>
            <div style={{border: "dashed 1px"}}>&nbsp;</div>
        </Active>
        <Inactive>
            <div style={{
                height: "7px",
                position: "absolute",
                width: "100%",
                zIndex: 999,
                background: "transparent"
            }}/>
        </Inactive>
    </DropTarget>;
