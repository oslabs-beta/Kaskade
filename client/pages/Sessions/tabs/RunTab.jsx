import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRunTabData } from "../../../redux/dataSlice";

const RunTab = () => {
  const dispatch = useDispatch();
  const datafile = useSelector((state) => state.data.datafile);

  const {
    servers = [],
    testDuration = 0,
    concurrentUsers = 0,
    numOfWorkers = 0,
  } = datafile && datafile.length > 0 ? datafile[0] : {};

  // State to manage input values
  const [serverInput, setServerInput] = useState(servers.join(', '));
  const [testDurationInput, setTestDurationInput] = useState(testDuration);
  const [concurrentUsersInput, setConcurrentUsersInput] = useState(concurrentUsers);
  const [numOfWorkersInput, setNumOfWorkersInput] = useState(numOfWorkers);

  // Function to handle input changes and update Redux store
  const handleInputChange = (inputName, inputValue) => {
    dispatch(
      setRunTabData({
        servers: inputName === "servers" ? inputValue.split(',').map(item => item.trim()) : servers,
        testDuration: inputName === "testDuration" ? parseInt(inputValue) : testDuration,
        concurrentUsers: inputName === "concurrentUsers" ? parseInt(inputValue) : concurrentUsers,
        numOfWorkers: inputName === "numOfWorkers" ? parseInt(inputValue) : numOfWorkers,
      })
    );
  };

  console.log("Current datafile from datafile:", datafile);

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
        <button type="button">Run</button>
    </div>
  );
};

export default RunTab;