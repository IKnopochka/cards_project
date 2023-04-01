import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 'n1-main/m3-dal/store'
import {getAuthUserData} from 'n1-main/m2-bll/authSlice'

import {ErrorSnackbar} from 'n1-main/m1-ui/common/ErrorSnackBar'
import {Layout} from 'n1-main/m1-ui/header/Layout'
import AppRoutes from 'n1-main/m1-ui/routes/AppRoutes'
import {LinearProgress} from "n1-main/m1-ui/common";
import {appIsInitializedSelector, appLoadingStatusSelector} from "n1-main/m1-ui/common/selectors/selectors";

const App = () => {
    const loadingStatus = useAppSelector(appLoadingStatusSelector)
    const appIsInitialized = useAppSelector(appIsInitializedSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [dispatch])

    return (
        <div>
            <ErrorSnackbar/>
            <Layout>
                {loadingStatus === 'loading' && <LinearProgress/>}
                {appIsInitialized && <AppRoutes/>}
            </Layout>
        </div>
    )
}

export default App
