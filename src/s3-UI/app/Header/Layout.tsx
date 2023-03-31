import React, { FC, ReactNode } from 'react'

import Header from 's3-UI/app/Header/Header'

export const Layout: FC<PropsType> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  )
}

type PropsType = {
  children: ReactNode
}
