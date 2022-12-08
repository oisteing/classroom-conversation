import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledLandingPage = styled(Paper)(({ theme }) => ({
  width: '-webkit-fill-available',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  margin: theme.spacing(1),
}))

const Landingpage = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <StyledLandingPage elevation={16}>
      <div>
        <Typography variant='h1'>{t('landingpage.title')}</Typography>
        <Typography variant='body1'>{t('landingpage.intro.part1')}</Typography>

        <Typography variant='body1'>{t('landingpage.intro.part2')}</Typography>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={() => history.push('/browse')}>{t('see_all_conversations')}</Button>
      </div>
      <Button
        variant="outlined"
        onClick={() => history.push('/credits')}
        sx={{
          position: 'fixed',
          bottom: '5%',
          display: 'flex',
          alignSelf: 'center',
          cursor: 'pointer'
        }}
      >
        ({t('credits')})
      </Button>
    </StyledLandingPage>
  )
}

export default Landingpage
