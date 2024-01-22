import React from "react";
import styled from "styled-components";

const HeadBar = () => {
    const HeadBarContainer = styled.div`
        background-color: #1E1E1E;
        color: #FFFFFF;
        height: 60px;
        border-bottom-style: solid;
        border-bottom-color: #535353;
        border-bottom-with: 2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `;

    const LogoDiv = styled.div`
    display: flex;
    width: 231px;
    height: 49px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #71AAFF;
    text-align: center;
    font-family: 'Fredoka', sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    `

    return (
        <HeadBarContainer>
            <LogoDiv>KASKADE</LogoDiv>
        </HeadBarContainer>
    )
}

export default HeadBar;