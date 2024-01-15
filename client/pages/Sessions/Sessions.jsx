import React from "react";
import { render } from "react-dom";
import { useState } from "react";
import styled from "styled-components";
import TabBar from "./TabBar.jsx";
import OverviewTab from "./tabs/OverviewTab.jsx";

const Sessions = (props) => {
    const [currentTab, setCurrentTab] = useState("overview");

    const SessionsDiv = styled.div`
        padding: 50px;
    `;

    // Render the tab based on which tab is currently selected.
    let content;
    if (currentTab === "overview") {
        content = (<OverviewTab />);
    } else {
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