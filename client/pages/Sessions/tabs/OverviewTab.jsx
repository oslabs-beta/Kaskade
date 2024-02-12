import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import { renameSession, updateSessionOverview } from "../../../redux/dataSlice";
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Typography from '@mui/material/Typography';


// Define styled elements outside the render function.
// Otherwise, each re-render will create a new styled element, causing lose of focus.
// (This page has TextField with onChange, so typing each character will cause a rerender).
// see https://www.reddit.com/r/reactjs/comments/85yxnu/text_input_unfocuses_after_adding_one_character/.

const OverviewDiv = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const TwoPannelDiv = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const LeftDiv = styled.div`
    width: 60%;
    display:flex;
    flex-direction: column;
`

const RightDiv = styled.div`
    width: 30%;
    display:flex;
    flex-direction: column;
`

const LabelAndText = ({label, text}) => {
    return (
        <Box sx = {{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginBottom: "10px"
        }}>
            <Typography variant="h6" component="h6">
                {label}
            </Typography>
            <Typography variant="body1" component="body1">
                {text}
            </Typography>
        </Box>
    )
}

const OverviewTab = (props) => {
    console.log("Overview page.");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get the session Id from URL parameters.
    const params = useParams();
    const sessionId = params.id;
    // console.log("Session Id is : ", sessionId);

    // Get the state of this session.
    const overviewState = useSelector((state) => {
        for (let i = 0; i < state.data.datafile.length; i++) {
            if (state.data.datafile[i].sessionId == sessionId) {
                return state.data.datafile[i];
            }
        }
        return null;
    });
    // console.log("Overview State: ", overviewState)

    if (!overviewState) {
        return (
            <div><p>Unknown session Id: {sessionId}</p></div>
        )
    }

    // Render the page.
    const handleRenameSession = (e) => {
        dispatch(renameSession({
            sessionId: sessionId,
            newName: e.target.value
        }));
    }

    const handleUpdateSessionOverview = (e) => {
        dispatch(updateSessionOverview({
            sessionId: sessionId,
            newOverview: e.target.value
        }));
    }

    return (
        <OverviewDiv>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    id="session-name"
                    variant="standard"
                    fullWidth
                    value={overviewState.sessionName}
                    onChange={handleRenameSession}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                            fontSize: "30px",
                            fontWeight: 700,
                        }
                    }}
                />
            </Box>
            <TwoPannelDiv>
                <LeftDiv>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            id="session-overview"
                            variant="filled"
                            multiline
                            fullWidth
                            value={overviewState.overview}
                            onChange={handleUpdateSessionOverview}
                            InputProps={{
                                disableUnderline: true,
                                style: {}
                            }}
                        />
                    </Box>
                </LeftDiv>
                <RightDiv>
                    <LabelAndText label = {"Created By"} text = {overviewState.createdBy} />
                    <LabelAndText label = {"Created On"} text = {new Date(overviewState.createdOn).toLocaleString()} />
                    <LabelAndText label = {"Last Modified"} text = {new Date(overviewState.lastModified).toLocaleString()} />
                </RightDiv>
            </TwoPannelDiv>
            <Button variant="contained" onClick={() => { props.setCurrentTab(2); }} sx={{ width: "150px", marginTop: "50px" }}>
                <PlayCircleIcon />
                Run
            </Button>
        </OverviewDiv>
    )
}

export default OverviewTab;