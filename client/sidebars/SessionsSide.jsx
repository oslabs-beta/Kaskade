import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import SessionItem from "./SessionItem.jsx";
import Button from '@mui/material/Button';
import { createSession } from '../redux/dataSlice';
import AddIcon from '@mui/icons-material/Add';

const SessionsSide = () => {
    const dispatch = useDispatch();
    const sessionState = useSelector((state) => state.data.datafile);

    console.log("SessionsSide sessionState: ", sessionState)
    const SessionsSideDiv = styled.div`
        display:flex;
        flex-direction: column;
    `;

    const sessions = [];
    for (let i = 0; i < sessionState.length; i++) {
        sessions.push(<SessionItem session={sessionState[i]} />)
    }

    function handleNewSession(){
        dispatch(createSession());
    }
    return (
        <SessionsSideDiv>
            <Button variant="contained" onClick = {handleNewSession}>
            <AddIcon />
                New Session
            </Button>
            {sessions}
        </SessionsSideDiv>
    )
}

export default SessionsSide;