import React from "react";
import styled from "styled-components";

const TabBarContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  background-color: #3498db;
  color: #fff;
  border-radius: 4px;

  &:hover {
    background-color: #2980b9;
  }
`;

const RequestsTabBar = ({ setCurrentTab }) => {
  return (
    <TabBarContainer>
      <TabButton onClick={() => setCurrentTab("overview")}>Overview</TabButton>
      <TabButton onClick={() => setCurrentTab("params")}>Params</TabButton>
      <TabButton onClick={() => setCurrentTab("headers")}>Headers</TabButton>
      <TabButton onClick={() => setCurrentTab("body")}>Body</TabButton>
      <TabButton onClick={() => setCurrentTab("parseResponse")}>Parse Response</TabButton>
      <TabButton onClick={() => setCurrentTab("errorHandling")}>Error Handling</TabButton>
    </TabBarContainer>
  );
};

export default RequestsTabBar;
