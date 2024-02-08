import React from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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

    const navigate = useNavigate();

    // Get all sessions from data file.
    const allSessions = useSelector(state => state.data.datafile);

    // Prepare all search values for the autocomplete search bar.
    const allValues = [];
    // For each value in "allValues", generate its corresponding redirect URL.
    const allURLs = [];
    for (let i = 0; i < allSessions.length; i++) {
        // The session itself.
        allValues.push(allSessions[i].sessionName);
        allURLs.push("/sessions/" + allSessions[i].sessionId);

        // All requests in this session.
        for (let j = 0; j < allSessions[i].requests.length; j++) {
            allValues.push(allSessions[i].sessionName + "  >>  " + allSessions[i].requests[j].requestName);
            allURLs.push("/sessions/" + allSessions[i].sessionId + "/" + allSessions[i].requests[j].requestId);
        }
    }
    
    const handleSelect = (e, newValue) => {
        console.log("Selection is: ", newValue);
        for (let i = 0; i < allValues.length; ++i) {
            if (allValues[i] === newValue) {
                console.log("Selection's Id is: ", i);
                console.log("Selection's URL is: ", allURLs[i]);
                navigate(allURLs[i]);
            }
        }
    }

    return (
        <HeadBarContainer>
            <LogoDiv>KASKADE</LogoDiv>
            <SearchDiv>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={allValues}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                    onChange={handleSelect}
                />
                {/* <div><TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearch}/></div> */}
            </SearchDiv>
        </HeadBarContainer>
    )
}

export default HeadBar;