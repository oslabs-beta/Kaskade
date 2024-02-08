import React from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';

const HeadBar = () => {
    const HeadBarContainer = styled.div`
        background-color: #1E1E1E;
        color: #FFFFFF;
        height: 60px;
        border-bottom-style: solid;
        border-bottom-color: #535353;
        border-bottom-with: 2px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
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

    const SearchDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height:40px;
    `

    const handleSearch = (e) => {
        console.log(e.target.value);
    }
    

    return (
        <HeadBarContainer>
            <LogoDiv>KASKADE</LogoDiv>
            <SearchDiv>
                <div><TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearch}/></div>
            </SearchDiv>
        </HeadBarContainer>
    )
}

export default HeadBar;