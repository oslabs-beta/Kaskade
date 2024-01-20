import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const SessionItem = (props) => {
    const navigate = useNavigate();

    // Decide what is the currently "selected" session.
    const params = useParams();
    const selectedSessionId = params.id;

    const SelectedDiv = styled.div`
    background-color: red;
`;
    console.log("selectedSessionId is: ", selectedSessionId, ", my session Id is: ", props.session.sessionId);

    if (selectedSessionId == props.session.sessionId) {
        const requests = [];
        for (let i = 0; i < props.session.requests.length; ++i) {
            requests.push(<div>{props.session.requests[i].requestName}</div>)
        }
        return (
            <SelectedDiv onClick={() => { navigate("/sessions/" + props.session.sessionId); }}>
                {props.session.sessionName}
                {requests}
            </SelectedDiv>
        );
    } else {
        return (
            <div onClick={() => { navigate("/sessions/" + props.session.sessionId); }}> {props.session.sessionName} </div>
        );
    }
};


export default SessionItem;