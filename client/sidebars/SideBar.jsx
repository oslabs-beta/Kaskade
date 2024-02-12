import React from "react";
import styled from "styled-components";
import SessionsSide from "./SessionsSide.jsx"
import HistorySide from "./HistorySide.jsx"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const SideBarDiv = styled.div`
background-color: #2A2828;
width: 300px;
border-right-style: solid;
border-right-color: #535353;
border-right-with: 2px;
`;

const SideBar = (props) => {
    let sideBarContent;
    if (props.page === "sessions") {
        sideBarContent = (<SessionsSide />);
    } else if (props.page === "history") {
        sideBarContent = (<HistorySide />);
    } else {
        sideBarContent = (<p>Unknown page</p>);
    }

    return (
        <SideBarDiv>
            {sideBarContent}
        </SideBarDiv>
    )
}

export default SideBar;