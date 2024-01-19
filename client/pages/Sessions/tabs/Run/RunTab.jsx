// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// // import { updateData } from './path-to-dataSlice';

// const RunTab = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     servers: '',
//     testDuration: '',
//     concurrentUsers: '',
//     numOfWorkers: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleRunTest = () => {
//     // Dispatch an action to update the data in the Redux store
//     dispatch(updateData(formData));
//     // You can also handle the logic to update datafile.json here
//   };

//   return (
//     <div>
//       <label>Servers:</label>
//       <input type="text" name="servers" value={formData.servers} onChange={handleInputChange} />

//       <label>Test Duration:</label>
//       <input type="text" name="testDuration" value={formData.testDuration} onChange={handleInputChange} />

//       <label>Concurrent Users:</label>
//       <input type="text" name="concurrentUsers" value={formData.concurrentUsers} onChange={handleInputChange} />

//       <label>Number of Workers:</label>
//       <input type="text" name="numOfWorkers" value={formData.numOfWorkers} onChange={handleInputChange} />

//       <button onClick={handleRunTest}>Run Test</button>
//     </div>
//   );
// };

// export default RunTab;

import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

const RunTab = (props) => {
    return (
        <div><p>This is Run tab</p></div>
    )
}

export default RunTab;