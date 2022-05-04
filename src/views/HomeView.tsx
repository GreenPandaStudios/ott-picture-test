import React from 'react';
import {Button, Col, Row, Container} from 'react-bootstrap'
import { useAppDispatch } from '../store';
import {setPage} from "../reducers/redirectorReducer";
import Pages from "../Pages"
export const HomeView = () => {

    const dispatch = useAppDispatch();  
    return <>
        <Button onClick = {()=>dispatch(setPage(Pages.Results))}>
            To Test
        </Button>
    
    </>;

};