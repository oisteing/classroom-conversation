import React, { useEffect, useState } from 'react'
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
  getAvailableAvatars,
} from './../helpers'
import { StartNode, UrlParams, Conversation } from './../types'

import { Paper } from '../Design/Paper'
import Loading from './../Loading/Loading'
import Notfound from './../Notfound/Notfound'

import { useTranslation } from 'react-i18next'

const selectAvatar = (name: string, setAvatar: Function) => {
  window.localStorage.setItem('avatar', name)
  setAvatar(name)
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
  const [availableAvatars, setAvailableAvatars] = useState<string[]>()
  const [selectedAvatar, setAvatar] = useState<string>(getSelectedAvatar())
  const [hasSubmitted, setHasSubmitted] =
    useLocalStorage<boolean>('hasSubmitted')
  const { t } = useTranslation()

  const [data, loading] = useFetchAndStoreConversation<Conversation>(
    `/api/document/${uuid}`,
    uuid
  )

  useEffect(() => {
    getAvailableAvatars('teacher')
      .then((_availableAvatars: string[]) => {
        setAvailableAvatars(_availableAvatars)
      })
  }, [uuid])
  
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
          {availableAvatars && availableAvatars.map((avatar: string) => (
            <img
              className={`avatar${selectedAvatar === avatar ? ' selected' : ''}`}
              src={avatar}
              onClick={() => selectAvatar(avatar, setAvatar)}
              alt={`Avatar ${avatar}`}
            />
          ))}
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
