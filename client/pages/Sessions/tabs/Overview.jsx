import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadState from "../../../store/LoadState"

const Overview = (props) => {
    console.log("Overview page.");

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
        display: flex;
        flex-direction: row;
    `;

    return (
        <OverviewDiv>
            <div>
                <div>
                    <label>{overviewState.name}</label>
                </div>
                <div>
                    <input type="text" value={overviewState.overview} readonly />
                </div>
                <div>
                    <button>Run</button>
                </div>
            </div>
            <div>
                <div>
                    <label>Created By: </label>
                    <label>{overviewState.createdBy}</label>
                </div>
                <div>
                    <label>Created On: </label>
                    <label>{overviewState.createdOn}</label>
                </div>
                <div>
                    <label>Last Modified:</label>
                    <label>{overviewState.lastModified}</label>
                </div>
            </div>
        </OverviewDiv>
    )
}

export default Overview;