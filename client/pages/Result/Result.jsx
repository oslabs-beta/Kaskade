import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Result = (props) => {

    // Get the session Id from URL parameters.
    const params = useParams();
    const sessionId = params.id;
    const runId = params.runId;

    // Get the state of this session.
    const resultState = useSelector((state) => {
        for (let i = 0; i < state.data.datafile.length; i++) {
            if (state.data.datafile[i].sessionId == sessionId) {
                for (let j = 0; j < state.data.datafile[i].history.length; j++) {
                    if (state.data.datafile[i].history[j].timestamp == runId) {
                        return state.data.datafile[i].history[j]
                    }
                }
            }
        }
        return null;
    });
    console.log("result State: ", resultState)

    if (!resultState) {
        return (
            <div><p>Unknown result Id: {runId}</p></div>
        )
    }

    // Render the page.
    const ResultDiv = styled.div`
        padding: 50px;
    `;

    return (
        <ResultDiv>
                <div>
                    <h2>{resultState.timestamp}</h2>
                </div>
                <div>
                    <label>Test Duration</label>
                    <h2>{resultState.testDuration}</h2>
                </div>
        </ResultDiv>
    )
}

export default Result;