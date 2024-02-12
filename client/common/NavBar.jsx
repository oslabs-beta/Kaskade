import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';
import RestoreIcon from '@mui/icons-material/Restore';

const NavDiv = styled.div`
    background-color: #2A2828;
    width: 100px;
    border-right-style: solid;
    border-right-color: #535353;
    border-right-with: 1px;
    display:flex;
    flex-direction: column;
`;

const NavBarDiv = (props) => {
    const navigate = useNavigate();

    // Configure button styles.
    const sessionButtonStyle = { display: "flex", flexDirection: "column", width: "90px", height: "90px", flexShrink: 0, color: "#FFF", padding: "10px" };
    const historyButtonStyle = { display: "flex", flexDirection: "column", width: "90px", height: "90px", flexShrink: 0, color: "#FFF", padding: "5px" };
    // Highlight selected button.
    if (props.page === "sessions") {
        sessionButtonStyle.backgroundColor = "rgba(255, 255, 255, 0.20)";
    } else if (props.page === "history") {
        historyButtonStyle.backgroundColor = "rgba(255, 255, 255, 0.20)";
    }

    return (
        <NavDiv>
            <Button variant="text" onClick={() => { navigate('/sessions'); }} sx={sessionButtonStyle}>
                <ListIcon fontSize="large" />
                <label>Sessions</label>
            </Button>
            <Button variant="text" onClick={() => { navigate('/history'); }} sx={historyButtonStyle}>
                <RestoreIcon fontSize="large" />
                <label>History</label>
            </Button>
        </NavDiv>
    )
}

export default NavBarDiv;