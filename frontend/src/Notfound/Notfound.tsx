import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { StyledNotfound } from './Notfound.styled'

const Notfound = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <StyledNotfound>
      <h1>{t('nav.page_not_found')}.</h1>
      <p>{t('nav.page_not_found.ensure_correct_link')}</p>

      <button onClick={() => history.push('/browse')}>{t('see_all_conversations')}</button>
    </StyledNotfound>
  )
}

export default Notfound
