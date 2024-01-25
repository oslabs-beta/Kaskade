import React, { useState } from "react";
import styled from "styled-components";

const DropdownMenu = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Select Method</button>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </div>
  );
};

const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #1E1E1E;
  border-radius: 4px;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
`;

const getBackgroundColor = (method) => {
    const methodColors = {
      GET: "rgb(108, 221, 153)",
      POST: "yellow",
      PUT: "blue",
      PATCH: "purple",
      DELETE: "red",
    };
  
    return methodColors[method] || "";
  };
  
export default DropdownMenu;
