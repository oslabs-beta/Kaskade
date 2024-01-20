import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LoadState from "../store/LoadState.js";
import SessionItem from "./SessionItem.jsx";

const SessionsSide = () => {
    const datafile = useSelector((state) => state.data.datafile);
    console.log("Current datafile from datafile:", datafile);

    const sessionState = useSelector((state) => state.session);
    if (sessionState.isLoaded === false) {
        LoadState();
        return;
    }

    const SessionsSideDiv = styled.div`
        display:flex;
        flex-direction: column;
    `;

    const sessions = [];
    for (let i = 0; i < sessionState.sessions.length; i++) {
        sessions.push(<SessionItem session={sessionState.sessions[i]} />)
    }
    return (
        <SessionsSideDiv>
            {sessions}
        </SessionsSideDiv>
    )
}

export default SessionsSide;