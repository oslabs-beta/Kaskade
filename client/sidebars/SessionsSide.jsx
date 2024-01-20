import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const SessionsSide = () => {

    const datafile = useSelector((state) => state.data.datafile);
    console.log("Current datafile from datafile:", datafile);


    const SessionsSideDiv = styled.div`
        display:flex;
        flex-direction: column;
    `;

    return (
        <SessionsSideDiv>
            <p>Session 1</p>
            <p>Session 2</p>
        </SessionsSideDiv>
    )
}

export default SessionsSide;