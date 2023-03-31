import React from 'react'

import style from 'n1-main/m1-ui/s4-common/commonComponents/LinearProgress/LinearProgress.module.scss'

export const LinearProgress = () => {
  return (
    <div>
      <progress className={style.progress} />
    </div>
  )
}
