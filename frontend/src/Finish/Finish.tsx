import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Box, Button, Stack, Typography } from '@mui/material'

import { PDFDocument } from './PDFDocument'

import {
  removeConversation,
  getRecordedConversation,
  getSelectedAvatar,
  prepareConversationForSubmission,
  submitConversation,
  getAvailableAvatars,
  selectRandomAvatars,
} from './../helpers'
import { UrlParams, Choices, Responses } from './../types'
import { useLocalStorage } from '../hooks'
import { useTranslation } from 'react-i18next'

import { Paper } from '../Design/Paper'

import clock from './../static/clock.png'

type FinishProps = {
  name: string
  intro: string
  choices: Choices
  responses: Responses
}

const Finish = ({ name, intro, choices, responses }: FinishProps) => {
  const history = useHistory()
  const { uuid } = useParams<UrlParams>()
  const { t } = useTranslation()
  const [hasSubmitted, setHasSubmitted] =
    useLocalStorage<boolean>('hasSubmitted')
  const [studentAvatar, setStudentAvatar] = useState<string>('')

  const teacherAvatar: string = getSelectedAvatar()
  const finishedAt = new Date().toISOString()
  const pdfFileName = `conversation-${finishedAt}.pdf`

  const dialogue = getRecordedConversation(uuid)
  const choiceHistory = prepareConversationForSubmission(dialogue, choices, responses)
  if (!hasSubmitted) {
    submitConversation(uuid, choiceHistory)
    setHasSubmitted(true)
  }

  useEffect(() => {
    getAvailableAvatars('student')
      .then((availableAvatars: string[]) => {
        let avatars = selectRandomAvatars(availableAvatars, 1)
        setStudentAvatar(avatars[0])
      })
      .catch((err: any) => {
        console.warn(err)
      })
  }, [uuid])

  return (
    <Paper>
      <Box sx={{ maxWidth: '50vh', marginTop: '50%' }}>
        <Typography variant='h3'>{t('conversation.conversation_is_now_over')}</Typography>
        <img src={clock} alt="Clock icon" style={{ maxWidth: '10vh', margin: '2vh 0 2vh 0' }}></img>
        <Stack spacing={2} direction='column'>
          <Button
            variant='contained'
            onClick={() => {
              removeConversation(uuid)
              history.push('/conversation/' + uuid + '/start')
            }}
          >
            {t('conversation.conversation_start_over')}
          </Button>

          <PDFDownloadLink
            className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-7w4s1o-MuiButtonBase-root-MuiButton-root'
            document={
              <PDFDocument
                name={name}
                intro={intro}
                choices={choices}
                dialog={dialogue}
                responses={responses}
                student={studentAvatar}
                teacher={teacherAvatar}
              />
            }
            fileName={pdfFileName}
          >
            {({ loading }: { loading: boolean }) =>
              loading ? t('conversation.loading_document') : t('conversation.download_conversation')
            }
          </PDFDownloadLink>

          <Button
            variant='contained'
            onClick={() => history.push('/browse/')}
          >
            {t('conversation.conversation_select_new')}
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}

export default Finish
