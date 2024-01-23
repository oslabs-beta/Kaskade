import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import RequestItem from "./RequestItem.jsx";


const SessionItem = (props) => {
    const navigate = useNavigate();

    // The basic styling of the session div.
    const sessionDivStyle = {
        paddingLeft: "5px",
        paddingTop: "2px",
        paddingBottom: "2px"
    };

    // Decide what is the currently "selected" session.
    const params = useParams();
    const selectedSessionId = params.id;

    const requests = [];
    if (selectedSessionId == props.session.sessionId) {
        // Selected.
        // 1. Highlight the session div if we don't select any request in it.
        if (!params.requestId) {
            sessionDivStyle.backgroundColor = "rgba(255, 255, 255, 0.2)";
        }

        // 2. Show requests.
        for (let i = 0; i < props.session.requests.length; ++i) {
            requests.push(
                <RequestItem
                    request={props.session.requests[i]}
                    sessionId={props.session.sessionId}
                    requestId={i}
                />);
        }
    }

    return (
        <div>
            <div style={sessionDivStyle} onClick={() => { navigate("/sessions/" + props.session.sessionId); }}>
                <h4>{props.session.sessionName}</h4>
            </div>
            {requests}
        </div>
    );
};


export default SessionItem;