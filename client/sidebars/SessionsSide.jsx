import React from "react";
import styled from "styled-components";

const SessionsSide = () => {
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