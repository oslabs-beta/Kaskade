import { useDispatch } from 'react-redux';
import { loadOverview } from './OverviewSlice';
import { loadSession } from './SessionSlice';
// const fs = window.require('fs');

const LoadState = () => {
    // 1. Open and read the data file.
    // TODO
   const data = [{
    "sessionId": 1,
    "sessionName": "Kaskade TEST1",
    "servers": [
        "localhost:3000"
    ],
    "requests": [
        {
            "requestName": "Get all users",
            "url": "/api/getallusers",
            "method": "GET",
            "headers": {
                "Content-type": "application/json"
            }
        },
        {
            "requestName": "Login",
            "url": "/api/login",
            "method": "POST",
            "body":{"username":"testusername", "password":"testpassword"},
            "headers": {
                "Content-type": "application/json"
            }
        }
    ],
},
{
"sessionId": 2,
"sessionName": "Kaskade TEST2",
"servers": [
    "localhost:3000"
],
"requests": [
    {
        "requestName": "Get all users",
        "url": "/api/getallusers",
        "method": "GET",
        "headers": {
            "Content-type": "application/json"
        }
    },
],
}]

    console.log("data", data);
    // const data = fs.readFileSync("../../datafile.json");
    // console.log("data", JSON.parse(data));

    // 2. Set state.
    const dispatch = useDispatch();
    dispatch(loadSession(data));
}

export default LoadState;