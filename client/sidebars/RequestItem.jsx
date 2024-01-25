import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const RequestItem = (props) => {
    const navigate = useNavigate();

    // The basic styling of request div.
    const requestDivStyle = {
        display: "flex",
        flexDirection: "row",
        marginLeft: "20px",
        paddingLeft: "5px",
        paddingTop: "2px",
        paddingBottom: "2px"
    };

    // console.log(props.request)

    // Find what is the currently "selected" request.
    const params = useParams();
    const selectedRequestId = params.requestId;

    // Highlight the request div if this request is selected.
    if (selectedRequestId == props.requestId) {
        requestDivStyle.backgroundColor = "rgba(255, 255, 255, 0.2)";
    }

    // The basic styling of the HTTP method div.
    let requestMethodStyle = {
        fontWeight: "bold",
        width: "50px"
    };

    // Set the HTTP method text color.
    const httpMethodToColor = {
        "GET" : "rgb(108, 221, 153)",
        "POST" : "rgb(255, 228, 126)",
        "PUT" : "rgb(116, 174, 246)",
        "PATCH" : "rgb(192, 168, 225)",
        "DELETE" : "rgb(247, 154, 143)",
    };
    let method = props.request.method;
    if (method in httpMethodToColor) {
        requestMethodStyle.color = httpMethodToColor[method];
    }

    return (
        <div style={requestDivStyle} onClick={() => { navigate(`/sessions/${props.sessionId}/${props.requestId}`, { state: { request: props.request } }) }}>
            <div style={requestMethodStyle}><label>{props.request.method}</label></div>
            <label>{props.request.requestName}</label>
        </div>
    );
};


export default RequestItem;