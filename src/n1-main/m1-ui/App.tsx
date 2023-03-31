import React, { useEffect } from 'react'

import 'n1-main/s3-UIin/s3-UI/App.module.scss'

import { useAppDispatch, useAppSelector } from 'n1-main/m3-dal/store'
import { getAuthUserData } from 'n1-main/m2-bll/authSlice'
import { LinearProgress } from 'n1-main/m1-ui/s4-common'

import { ErrorSnackbar } from 'n1-main/m1-ui/s4-common/app/ErrorSnackBar/ErrorSnackBar'
import { Layout } from 'n1-main/m1-ui/s4-common/app/Header/Layout'
import AppRoutes from 'n1-main/m1-ui/s4-common/app/Routes/AppRoutes'

const App = () => {
  const isLoading = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAuthUserData())
  }, [])

  return (
    <div className="App">
      <ErrorSnackbar />
      <Layout>
        {isLoading === 'loading' ? <LinearProgress /> : null}
        <AppRoutes />
      </Layout>
    </div>
  )
}

export default App
