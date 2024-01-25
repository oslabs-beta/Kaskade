import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OverviewTab = (props) => {
    console.log("Overview page.");
    const navigate = useNavigate();

    // Get the session Id from URL parameters.
    const params = useParams();
    const sessionId = params.id;
    console.log("Session Id is : ", sessionId);

    // Get the state of this session.
    const overviewState = useSelector((state) => {
        for (let i = 0; i < state.data.datafile.length; i++) {
            if (state.data.datafile[i].sessionId == sessionId) {
                return state.data.datafile[i];
            }
        }
        return null;
    });
    console.log("Overview State: ", overviewState)

    if (!overviewState) {
        return (
            <div><p>Unknown session Id: {sessionId}</p></div>
        )
    }

    // Render the page.
    const OverviewDiv = styled.div`
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    const LeftDiv = styled.div`
        width: 50%
        display:flex;
        flex-direction: column;
    `

    const RightDiv = styled.div`
        width: 30%
        display:flex;
        flex-direction: column;
    `

    return (
        <OverviewDiv>
            <LeftDiv>
                <div>
                    <h2>{overviewState.sessionName}</h2>
                </div>
                <div style={{whiteSpace : "pre-wrap"}}>
                    {overviewState.overview}
                </div>
                <div>
                    <button onClick={() => { props.setCurrentTab("run"); }}>Run</button>
                    <button onClick={() => { navigate("/result/" + sessionId + "/" + 1660926192826 )}}>Result</button>
                </div>
            </LeftDiv>
            <RightDiv>
                <div>
                    <label>Created By: </label>
                    <label>{overviewState.createdBy}</label>
                </div>
                <div>
                    <label>Created On: </label>
                    <label>{new Date(overviewState.createdOn).toLocaleString()}</label>
                </div>
                <div>
                    <label>Last Modified:</label>
                    <label>{new Date(overviewState.lastModified).toLocaleString()}</label>
                </div>
            </RightDiv>
        </OverviewDiv>
    )
}

export default OverviewTab;