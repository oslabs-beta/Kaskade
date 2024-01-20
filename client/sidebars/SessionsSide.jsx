import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import SessionItem from "./SessionItem.jsx";

const SessionsSide = () => {
    const sessionState = useSelector((state) => state.data.datafile);

    const SessionsSideDiv = styled.div`
        display:flex;
        flex-direction: column;
    `;

    const sessions = [];
    for (let i = 0; i < sessionState.length; i++) {
        sessions.push(<SessionItem session={sessionState[i]} />)
    }
    return (
        <SessionsSideDiv>
            {sessions}
        </SessionsSideDiv>
    )
}

export default SessionsSide;