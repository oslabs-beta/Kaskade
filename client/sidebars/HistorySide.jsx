import React from "react";
import styled from "styled-components";

const HistorySide = () => {
    const HistorySide = styled.div`
        display:flex;
        flex-direction: column;
    `;

    return (
        <HistorySide>
            <p>History 1</p>
            <p>History 2</p>
        </HistorySide>
    )
}

export default HistorySide;