import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

import { LanguagePickerDialog } from './LanguagePickerDialog'


export const Header = () => {
  const { t } = useTranslation()
  const [openLangPicker, setOpenLangPicker] = useState(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            onClick={() => document.location = '/'}
            sx={{
              flexGrow: 1
            }}>
              WeBabble
            </Typography>
          <Button color='inherit' onClick={() => setOpenLangPicker(true)}>{t('nav.language_picker')}</Button>
          <Button color='inherit' onClick={() => window.open('/conversations', '_blank')}>{t('nav.admin')}</Button>
        </Toolbar>
      </AppBar>
      <LanguagePickerDialog
        open={openLangPicker}
        onClose={() => setOpenLangPicker(false)}
      />
    </Box>
  )
}
