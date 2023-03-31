import React, { FC, ReactNode } from 'react'

import Header from 'n1-main/m1-ui/s4-common/app/Header/Header'

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
