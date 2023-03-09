import React, {useEffect} from 'react';
import './App.css';
import Pages from "../../s2-features/f1-header/routes/Pages";
import {Layout} from "../../s2-features/f1-header/Layout";

import {useAppDispatch, useAppSelector} from "../m2-bll/store";
import {StatusType} from "../m2-bll/app-reducer";
import {getIsAuthUser} from "../m2-bll/auth-reducer";
import {CircularProgress} from "@material-ui/core";

function App() {
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const status = useAppSelector<StatusType>((state) => state.app.status)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getIsAuthUser())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
            <div className="App">
                <Layout>
                    <Pages/>
                </Layout>
            </div>
    );
}

export default App;
