import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Requests = (props) => {
    const [currentTab, setCurrentTab] = useState("overview");

    const RequestDiv = styled.div`
        padding: 50px;
    `;

    return (
        <RequestDiv>
            <p>Request</p>
        </RequestDiv>
    )
}

export default Requests;