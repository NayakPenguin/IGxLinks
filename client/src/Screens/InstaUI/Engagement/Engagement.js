import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlFooter from '../../../Components/ControlFooter'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

const Engagement = () => {
    return (
        <Container>
            <div className="page-name">Engagements</div>
            <ControlFooter />
        </Container>
    )
}

export default Engagement;

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #000;

    margin-bottom: 64px;

    /* padding: 30px 45px; */

    display: flex;  
    flex-direction: column;

    .page-name{
        padding: 20px;
        width: 100%;
        font-size: 1.25rem;
        font-weight: 500;
    }
`