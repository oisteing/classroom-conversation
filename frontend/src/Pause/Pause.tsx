import React from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

import { PauseProps } from './../types'
import { getSelectedAvatar } from './../helpers'

import teacherWoman from './../static/teacher_woman.png'
import teacherMan from './../static/teacher_man.png'

import { StyledPause, StyledAlternatives } from './Pause.styled'
import { useTranslation } from 'react-i18next'

const Pause = ({ uuid, id, next, current }: PauseProps) => {
  const history = useHistory()
  const avatar = getSelectedAvatar()
  const { t } = useTranslation()

  return (
    <StyledPause>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={'student_' + id}
        className="student"
      >
        {current.label}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0 }}
        key="student"
        className="student"
      >
        {t('conversation.next_question')}
      </motion.h2>

      <StyledAlternatives>
        {avatar === 1 && <img src={teacherWoman} alt="Female avatar" />}
        {avatar === 2 && <img src={teacherMan} alt="Male avatar" />}

        <div className="alternatives">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0 }}
            key="alternatives"
            onClick={() =>
              history.push(`/conversation/${uuid}/${id}`)
            }
          >
            {next.label}
          </motion.button>
        </div>
      </StyledAlternatives>
    </StyledPause>
  )
}

export default Pause
