import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useFetchAndStoreConversation, useLocalStorage } from '../hooks'
import {
  removeConversation,
  removeRecordedConversation,
  hasDialogRecorded,
  getLastQuestion,
  getSelectedAvatar,
} from './../helpers'
import { StartNode, UrlParams, Conversation } from './../types'

import { Paper } from '../Design/Paper'
import Loading from './../Loading/Loading'
import Notfound from './../Notfound/Notfound'

import teacherWoman from './../static/teacher_woman.png'
import teacherMan from './../static/teacher_man.png'
import { useTranslation } from 'react-i18next'

const selectAvatar = (id: number, setAvatar: Function) => {
  window.localStorage.setItem('avatar', '' + id)
  setAvatar(id)
}

const StyledAvatars = styled('div')(({ theme }) => ({
  marginTop: '2vh',
  '.avatar': {
    maxWidth: '20vh',
    ':hover': {
      borderStyle: 'solid none solid none'
    }
  },
  '.selected': {
    borderStyle: 'solid none solid none'
  }
}))

const Start = () => {
  const history = useHistory()
  const { uuid } = useParams<UrlParams>()
  const [selectedAvatar, setAvatar] = useState<number>(getSelectedAvatar())
  const [hasSubmitted, setHasSubmitted] =
    useLocalStorage<boolean>('hasSubmitted')
  const { t } = useTranslation()

  const [data, loading] = useFetchAndStoreConversation<Conversation>(
    `/api/document/${uuid}`,
    uuid
  )
  
  if (loading) {
    return <Loading />
  }

  if (!data) {
    return <Notfound />
  }

  const startNode: StartNode = data.json.start
  const hasDialog: boolean = hasDialogRecorded(uuid)

  return (
    <Paper>
      <Box sx={{ width: '100%', marginTop: '2vh' }}>
        <Box sx={{ maxWidth: '50vh' }}>
          <Typography variant='h2'>{data.name}</Typography>
          <Typography variant='h6'>{startNode.label}</Typography>
        </Box>
        <StyledAvatars>
          <img
            className={`avatar${selectedAvatar === 1 ? ' selected' : ''}`}
            src={teacherWoman}
            onClick={() => selectAvatar(1, setAvatar)}
            alt="Female teacher avatar"
          />
          <img
            className={`avatar${selectedAvatar === 2 ? ' selected' : ''}`}
            src={teacherMan}
            onClick={() => selectAvatar(2, setAvatar)}
            alt="Male teacher avatar"
          />
        </StyledAvatars>
        <Stack direction='column' spacing={2} sx={{ marginTop: '2vh'}}>
          <Button
            variant='contained'
            onClick={() => {
              removeConversation(uuid)
              removeRecordedConversation()
              setHasSubmitted(false)
              history.push(
                `/conversation/${uuid}/${startNode.firstQuestion}`
              )
            }}
          >
            {hasDialog ? t('conversation.conversation_start_over') : t('conversation.start_lecture')}
          </Button>
          {hasDialog && (
            <Button
              variant='contained'
              onClick={() =>
                history.push(`/conversation/${uuid}/${getLastQuestion(uuid)}`)
              }>
                {t('conversation.continue_where_you_left_of')}
            </Button>
          )}
        </Stack>
      </Box>
    </Paper>
  )
}

export default Start
