import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import StyledLandingpage from './Landingpage.styled'

const Landingpage = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <StyledLandingpage>
      <div>
        <h1>{t('landingpage.title')}</h1>
        <p>{t('landingpage.intro.part1')}</p>

        <p>{t('landingpage.intro.part2')}</p>
        <br></br>
        <br></br>
        <button className='btn-dark' onClick={() => history.push('/browse')}>{t('see_all_conversations')}</button>
      </div>
      <p className="credits" onClick={() => history.push('/credits')}>
        ({t('credits')})
      </p>
    </StyledLandingpage>
  )
}

export default Landingpage
