import React from "react";
import styled from "styled-components";

const HeadBar = () => {
    const HeadBarContainer = styled.div`
        background-color: #1E1E1E;
        color: #FFFFFF;
        height: 50px;
        border-bottom-style: solid;
        border-bottom-color: #535353;
        border-bottom-with: 2px;
    `;

    return (
        <HeadBarContainer>
            <p>KASKADE</p>
        </HeadBarContainer>
    )
}

export default HeadBar;