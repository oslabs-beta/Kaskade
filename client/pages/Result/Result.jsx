import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

    // Data is an object like following:
    // {
    //     "average": 11,
    //     "mean": 11,
    //     "stddev": 10.31,
    //     "min": 1,
    //     "max": 30,
    //     "total": 8,
    //     "p0_001": 1,
    //     "p0_01": 1,
    //     "p0_1": 1,
    //     "p1": 1,
    //     "p2_5": 1,
    //     "p10": 1,
    //     "p25": 2,
    //     "p50": 3,
    //     "p75": 20,
    //     "p90": 30,
    //     "p97_5": 30,
    //     "p99": 30,
    //     "p99_9": 30,
    //     "p99_99": 30,
    //     "p99_999": 30
    // },
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
                <label>Latency Distribution</label>
                {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        label="Age"
                        onChange={() => { }}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl> */}
                {DrawCDF(resultState.result.latencyStats["s0_r0"], "s0_r0 Latency")}
            </div>
        </ResultDiv>
    )
}

export default Result;