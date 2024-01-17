import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const NavBarDiv = () => {
    const navigate = useNavigate();
    const NavBarDiv = styled.div`
        background-color: #2A2828;
        width: 80px;
        border-right-style: solid;
        border-right-color: #535353;
        border-right-with: 1px;
        display:flex;
        flex-direction: column;
    `;

    return (
        <NavBarDiv>
            <button onClick={() => { navigate('/sessions'); }}>Sessions</button>
            <button onClick={() => { navigate('/history'); }}>History</button>
        </NavBarDiv >
    )
}

export default NavBarDiv;