import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useFetchAndStoreConversation, useLocalStorage } from '../hooks'
import {
  removeConversation,
  removeRecordedConversation,
  hasDialogRecorded,
  getLastQuestion,
  getSelectedAvatar,
} from './../helpers'
import { StartNode, UrlParams, Conversation } from './../types'

import Loading from './../Loading/Loading'
import Notfound from './../Notfound/Notfound'

import StyledStart from './Start.styled'

import teacherWoman from './../static/teacher_woman.png'
import teacherMan from './../static/teacher_man.png'
import { useTranslation } from 'react-i18next'

const selectAvatar = (id: number, setAvatar: Function) => {
  window.localStorage.setItem('avatar', '' + id)
  setAvatar(id)
}

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
    <StyledStart>
      <div>
        <h1>{data.name}</h1>
        <p>{startNode.label}</p>

        <div className="avatars">
          <img
            className={selectedAvatar === 1 ? 'selected' : ''}
            src={teacherWoman}
            onClick={() => selectAvatar(1, setAvatar)}
            alt="Female teacher avatar "
          />
          <img
            className={selectedAvatar === 2 ? 'selected' : ''}
            src={teacherMan}
            onClick={() => selectAvatar(2, setAvatar)}
            alt="Male teacher avatar "
          />
        </div>

        <div className="actions">
          <button
            className='btn-dark'
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
          </button>
          {hasDialog && (
            <button
              className='btn-dark'
              onClick={() =>
                history.push(
                  `/conversation/${uuid}/${getLastQuestion(uuid)}`
                )
              }
            >
              {t('conversation.continue_where_you_left_of')}
            </button>
          )}
        </div>
      </div>
    </StyledStart>
  )
}

export default Start
