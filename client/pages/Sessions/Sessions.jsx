import React from "react";
import { render } from "react-dom";
import { useState } from "react";
import styled from "styled-components";
import TabBar from "./TabBar.jsx";
import OverviewTab from "./tabs/OverviewTab.jsx";
import RunTab from "./tabs/RunTab.jsx";
import AuthorizationTab from "./tabs/AuthorizationTab.jsx";
import PreviousResultsTab from "./tabs/PreviousResultsTab.jsx";

const Sessions = () => {
    const [currentTab, setCurrentTab] = useState("overview");

    const SessionsDiv = styled.div`
        padding: 50px;
    `;

    // Render the tab based on which tab is currently selected.
    let content;
    if (currentTab === "overview") {
        content = (<OverviewTab />);
    } 
    else if (currentTab === "run") {
        content = (<RunTab />);
    } 
    else if (currentTab === "authorization") {
        content = (<AuthorizationTab />);
    } 
    else if (currentTab === "results") {
        content = (<PreviousResultsTab />);
    } 
    else {
        content = (<p>Unknown tab</p>);
    }

    return (
        <SessionsDiv>
            <TabBar setCurrentTab={setCurrentTab} />
            {content}
        </SessionsDiv>
    )
}

export default Sessions;