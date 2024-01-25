import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRunTabData } from "../../../redux/dataSlice";
import { useParams, useNavigate } from 'react-router-dom';

const RunTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const sessionId = params.id;
  // const datafile = useSelector((state) => state.data.datafile);
  const configFile = useSelector((state) => state.data.configFile);

  // console.log("Current configFile on Runtab:", configFile);


  // State to manage input values
  const [serverInput, setServerInput] = useState([]);
  const [testDurationInput, setTestDurationInput] = useState(0);
  const [concurrentUsersInput, setConcurrentUsersInput] = useState(0);
  const [numOfWorkersInput, setNumOfWorkersInput] = useState(0);
  const [updatedConfig, setUpdatedConfig] = useState(configFile);


  const handleInputChange = (inputName, inputValue) => {
    const updatedConfigCopy = { ...updatedConfig };

    if (inputName === "servers") {
      updatedConfigCopy.servers = inputValue.split(',').map(item => item.trim());
    } else {
      updatedConfigCopy[inputName] = parseInt(inputValue);
    }

    setUpdatedConfig(updatedConfigCopy);
  };

  // console.log("updatedConfig: ", updatedConfig)

  const handleRunButton = () =>{
    //primative check to make sure the user filled out the config inputs. handler function will not execute 
    //if user doesn't fill out expected parameters
    if (
      updatedConfig.testDuration === 0 ||
      updatedConfig.concurrentUsers === 0 ||
      updatedConfig.numOfWorkers === 0
      ) {
        return;
      }
      
      
      //updatedConfig state is an object that should be able to be passed as our existing configFile format
    console.log("updatedConfig to pass to core logic: ", updatedConfig)
  }


  return (
    <div>
      <h2>Run Tab</h2>
      <form>
        <label>
          Servers:
          <input
            type="text"
            value={serverInput}
            onChange={(e) => {
              setServerInput(e.target.value);
              handleInputChange("servers", e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Test Duration:
          <input
            type="number"
            value={testDurationInput}
            onChange={(e) => {
              setTestDurationInput(e.target.value);
              handleInputChange("testDuration", e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Concurrent Users:
          <input
            type="number"
            value={concurrentUsersInput}
            onChange={(e) => {
              setConcurrentUsersInput(e.target.value);
              handleInputChange("concurrentUsers", e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Number of Workers:
          <input
            type="number"
            value={numOfWorkersInput}
            onChange={(e) => {
              setNumOfWorkersInput(e.target.value);
              handleInputChange("numOfWorkers", e.target.value);
            }}
          />
        </label>
        <br />
      </form>
        <button type="button" onClick={handleRunButton}>Run</button>
        <button onClick={() => { navigate("/result/" + sessionId + "/" + 1660926192826 )}}>Result</button>
    </div>
  );
};

export default RunTab;