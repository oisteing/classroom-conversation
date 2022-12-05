import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { useTranslation } from 'react-i18next'

import { availableLanguages } from '../i18n'

export const LanguagePickerDialog = (props: any) => {
  const { t, i18n } = useTranslation()
  const { onClose, selectedValue, open } = props
  const currentLanguage = i18n.language

  const handleClose = () => {
    onClose(selectedValue)
  }

  const setLanguage = (value: string) => {
    i18n.changeLanguage(value)
    onClose(value)
  }
  const humanLanguages: any = {
    'en_US': 'English (US)',
    'nb_NO': 'Norsk Bokmål',
    'nn_NO': 'Nynorsk',
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{t('nav.select_language')}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {availableLanguages.map((language) => (
          <ListItem button onClick={() => setLanguage(language)} key={language} selected={language === currentLanguage ? true : false}>
            <ListItemAvatar>
              <Avatar>
                <p>{language.split('_')[1] ?? language}</p>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={humanLanguages[language] ?? language} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
