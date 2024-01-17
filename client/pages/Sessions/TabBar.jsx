import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

const TabBar = (props) => {
    const TabBarDiv = styled.div`
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;
    return (
        <TabBarDiv>
            <button onClick={() => { props.setCurrentTab("overview"); }}>Overview</button>
            <button onClick={() => { props.setCurrentTab("authentication"); }}>Authentication</button>
            <button onClick={() => { props.setCurrentTab("run"); }}>Run</button>
            <button onClick={() => { props.setCurrentTab("results"); }}>Previous Results</button>
        </TabBarDiv>
    )
}

export default TabBar;