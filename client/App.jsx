import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import HeadBar from "./common/HeadBar.jsx"
import NavBar from "./common/NavBar.jsx"
import SideBar from "./sidebars/SideBar.jsx"
import History from "./pages/History/History.jsx";
import Sessions from "./pages/Sessions/Sessions.jsx"
import Requests from "./pages/Requests/Requests.jsx"
import Result from "./pages/Result/Result.jsx"
import { useSelector } from 'react-redux';

const PageContainer = styled.div`
    background-color: #000000;
    color: #FFFFFF;
    width: 100%;
    height: 100vh;
`;

const MainContainer = styled.div`
    display:flex;
    flex-direction: row;
    height: calc(100vh - 50px);
`;

const OutletContainer = styled.div`
    background-color: #1E1E1E;
    width: 100%;
`

const App = (props) => {
    // Find the first session in data file, so we can redirect the initial page to the first session.
    const firstSessionId = useSelector((state) => {
        if (state.data.datafile.length > 0) {
            return state.data.datafile[0].sessionId;
        }
        return null;
    });

    // The overall page layout.
    const Layout = (props) => {
        return (
            <PageContainer>
                <HeadBar />
                <MainContainer>
                    <NavBar page={props.page}/>
                    <SideBar page={props.page} />
                    <OutletContainer>
                        <Outlet />
                    </OutletContainer>
                </MainContainer>
            </PageContainer>
        );
    };


    // Define react router rules.
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate replace to={'/sessions/' + firstSessionId} />} />

                    <Route path="/sessions" element={<Layout page="sessions" />}>
                    <Route path="" element={<Sessions />} />
                        <Route path=':id' element={<Sessions />} />
                        <Route path=':id/:requestId' element={<Requests />} />
                    </Route>

                    <Route path="/history" element={<Layout page="history" />}>
                        <Route path='' element={<History /> } />
                        <Route path=":id" element={<History />} />
                    </Route>

                    <Route path="/result" element={<Layout page="sessions" />}>
                        <Route path=':id/:runId' element={<Result />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );

}




export default App;
