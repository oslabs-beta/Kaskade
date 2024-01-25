import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import MethodDropdown from "./MethodDropdown"; 
 

const Requests = (props) => {
    
    const location = useLocation();
    const { state } = location;
    const request = state && state.request;
    const { requestName, url, method, headers, body } = request || {};
    
    const [currentTab, setCurrentTab] = useState("overview");
    
    const RequestDiv = styled.div`
      padding: 50px;
    `;
  
  
    const availableMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  
    const handleMethodSelect = (selectedMethod) => {
      // Update the method in your state or perform any action based on the selected method
      console.log("Selected Method:", selectedMethod);
    };
  
    const [modifiedUrl, setModifiedUrl] = useState(url || '');
  
    useEffect(() => {
      setModifiedUrl(url || '');
    }, [url]);
  
    return (
      <RequestDiv>
        <p>Request</p>
        {request && (
          <div>
            <p>Request Name: {requestName}</p>
            <label>Modified URL: </label>
            <input
              type="text"
              value={modifiedUrl}
              onChange={(e) => setModifiedUrl(e.target.value)}
            />
            <p>Method: {method}</p>
            <MethodDropdown options={availableMethods} onSelect={handleMethodSelect} />
            <p>Headers: {JSON.stringify(headers)}</p>
            <p>Body: {JSON.stringify(body)}</p>
          </div>
        )}
      </RequestDiv>
    );
  };
  
  export default Requests;
