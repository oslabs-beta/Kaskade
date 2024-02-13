import React, { useState } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const Result = (props) => {

    // Get the session Id from URL parameters.
    const params = useParams();
    const sessionId = params.id;
    const runId = params.runId;

    // Get the state of this session.
    const resultState = useSelector((state) => {
        for (let i = 0; i < state.data.datafile.length; i++) {
            if (state.data.datafile[i].sessionId == sessionId) {
                for (let j = 0; j < state.data.datafile[i].history.length; j++) {
                    if (state.data.datafile[i].history[j].timestamp == runId) {
                        return state.data.datafile[i].history[j]
                    }
                }
            }
        }
        return null;
    });
    console.log("result State: ", resultState)
    const demoData = useSelector((state) => {return state.data.demo});
    console.log("demoData: ", demoData)

    if (!resultState) {
        return (
            <>
                <div><p>Unknown result Id: {runId}</p></div>
                <div>RESULT: {JSON.stringify(demoData)}</div>

            </>
        )
    }

    // Render the page.
    const ResultDiv = styled.div`
        padding: 50px;
    `;

    const DrawCDF = (data, label) => {
        const keys = Object.keys(data);
        const percentDataY = [];
        const metricsDataX = [];
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i][0] === "p") {
                const percentile = Number(keys[i].substring(1).replace("_", "."));
                percentDataY.push(percentile);
                metricsDataX.push(data[keys[i]]);
            }
        }
        console.log("PercentData: ", percentDataY);
        console.log("MetricsData: ", metricsDataX);
        return (
            <LineChart
                xAxis={[{ data: metricsDataX }]}
                yAxis={[
                    { id: 'Percentile', scaleType: 'log' },
                ]}
                series={[
                    { yAxisKey: 'Percentile', data: percentDataY, label: label },
                ]}
                leftAxis="Percentile"
                height={400}
            />
        )
    }
    
    let requests = Object.keys(resultState.result.latencyStats);
    const [latencyGraphId, setLatencyGraphId] = useState(requests[0]);

    let latencyGraphMenuItems = [];
    for (let i = 0; i < requests.length; ++i) {
        const requestName = requests[i];
        latencyGraphMenuItems.push(
            <MenuItem onClick={() => {
                setLatencyGraphId(requestName);
                setRequestThroughputGraphId(null);
                setByteThroughputGraphId(null);
                popupState.close();
            }}>
                {requestName}
            </MenuItem>
        );
    }


    const [requestThroughputGraphId, setRequestThroughputGraphId] = useState(null);

    let requestThroughputGraphMenuItems = [];
    for (let i = 0; i < requests.length; ++i) {
        const requestName = requests[i];
        requestThroughputGraphMenuItems.push(
            <MenuItem onClick={() => {
                setRequestThroughputGraphId(requestName);
                setLatencyGraphId(null);
                setByteThroughputGraphId(null);
                popupState.close();
            }}>
                {requestName}
            </MenuItem>
        );
    }

    const [byteThroughputGraphId, setByteThroughputGraphId] = useState(null);

    let byteThroughputGraphMenuItems = [];
    for (let i = 0; i < requests.length; ++i) {
        const requestName = requests[i];
        byteThroughputGraphMenuItems.push(
            <MenuItem onClick={() => {
                setByteThroughputGraphId(requestName);
                setLatencyGraphId(null);
                setRequestThroughputGraphId(null);
                popupState.close();
            }}>
                {requestName}
            </MenuItem>
        );
    }

    let graph;
    if (latencyGraphId !== null) {
        graph = DrawCDF(resultState.result.latencyStats[latencyGraphId], latencyGraphId + " Latency");
    } else if (requestThroughputGraphId !== null) {
        graph = DrawCDF(resultState.result.requestThroughputStats[requestThroughputGraphId], requestThroughputGraphId + " Request Throughput");
    } else {
        graph = DrawCDF(resultState.result.byteThroughputStats[byteThroughputGraphId], byteThroughputGraphId + " Byte Throughput");

    }

    return (
        <ResultDiv>
            <div>
                {/* <label>Test Timestamp</label> */}
                <h4>{new Date(resultState.timestamp).toLocaleString()}</h4>
            </div>
            <div>
                <label>Test Duration: </label>
                <label>{resultState.testDuration} seconds</label>
            </div>
            <div>
                <label>Concurrent Users: </label>
                <label>{resultState.concurrentUsers} users on {resultState.numOfWorkers} threads</label>
            </div>
            <div>
                <label>Metrics</label>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                               Latency Distribution
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                {latencyGraphMenuItems}
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                              Request Throughput
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                {requestThroughputGraphMenuItems}
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                               Byte Throughput
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                {byteThroughputGraphMenuItems}
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>
            <div>
                {graph}
            </div>
        </ResultDiv>
    )
}

export default Result;