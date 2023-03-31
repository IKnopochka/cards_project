import React, { useEffect } from 'react'

import 's3-UI/app/App.module.scss'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { getAuthUserData } from 's2-BLL/authSlice'
import { LinearProgress } from 's4-common'

import { ErrorSnackbar } from 's3-UI/app/ErrorSnackBar/ErrorSnackBar'
import { Layout } from 's3-UI/app/Header/Layout'
import AppRoutes from 's3-UI/app/Routes/AppRoutes'

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
