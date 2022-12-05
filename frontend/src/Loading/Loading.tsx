import React from 'react'
import { useTranslation } from 'react-i18next'

import StyledLoading from './Loading.styled'

const Loading = () => {
  const { t } = useTranslation()

  return (
    <StyledLoading>
      <h1>{t('loading')}...</h1>
    </StyledLoading>
  )
}

export default Loading
