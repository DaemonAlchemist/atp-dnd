
import React from 'react';
import DropTarget from "../../containers/drop-target";
import {Active, Inactive, CanDrop} from "../../containers/context";

export default ({id, accepts, action, onMove}) =>
    <DropTarget
        component="tr"
        action={action}
        style={{position: "relative", width: "100%"}}
        accepts={accepts}
        id={id}
        onReceiveDrop={onMove}
    >
        <CanDrop>
            <Active>
                <td
                    style={{
                        padding: "8px"
                    }}
                    colspan={999}
                ><div style={{border: "dashed 1px"}}>&nbsp;</div></td>
            </Active>
            <Inactive>
                <td
                    style={{
                        position: "absolute",
                        height: "2.7em",
                        width: "100%",
                        zIndex: 999,
                        background: "transparent",
                        border: "none"
                    }}
                    colspan={999}
                />
            </Inactive>
        </CanDrop>
    </DropTarget>;
