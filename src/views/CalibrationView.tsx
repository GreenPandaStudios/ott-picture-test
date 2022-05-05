import React from 'react';
import {Button, Col, Row, Container} from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../store';
import {setPage} from "../reducers/redirectorReducer";
import { selectCurImage, selectDPM, setDPM} from '../reducers/calibrationReducer';
import Pages from "../Pages"
export const CalibrationView = () => {

    const dispatch = useAppDispatch();  
    const curimg = useAppSelector(selectCurImage);
    const DPM = useAppSelector(selectDPM)
    return <>
        <Button onClick = {()=>dispatch(setPage(Pages.Home))}>
            Back
        </Button>
         <Button onClick = {()=>dispatch(setDPM(DPM+5))}>
            Bigger
        </Button>
         <Button onClick = {()=>dispatch(setDPM(DPM-5))}>
            Smaller
        </Button>
        {DPM}
        <div>
            <img src = {curimg.imagePath} width = {curimg.meters_width * DPM} height = {curimg.meters_height * DPM}></img>
        </div>
    </>;

};