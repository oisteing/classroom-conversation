import React from 'react'
import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

import { NODE_SHAPE } from '../const'
import { getSelectedAvatar } from '../helpers'
import {
  Choice,
  Illustration,
} from '../types'

import teacherWoman from './../static/teacher_woman.png'
import teacherMan from './../static/teacher_man.png'
import blackboard from '../static/background-small.png'

type ConversationProps = {
  choice: Choice | Illustration
  response: any
  illustration?: Illustration
  students: string[]
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const Dialogue = styled(Item)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
  minHeight: '5vh',
}))

const BlackBoard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#fff',
  height: '20vh',
  backgroundImage: `url(${blackboard})`,
}))

const Avatar = styled(Item)(({ theme }) => ({}))
const AvatarStyle = {
  maxWidth: '50vh',
  maxHeight: '100px',
}

export const DialogueComponent = ({ choice, response, illustration, students }: ConversationProps) => {
  const { t } = useTranslation()
  const avatar = getSelectedAvatar() === 1 ? teacherWoman : teacherMan

  return (
    <ErrorBoundary>
      <Grid container spacing={6} columns={12} justifyContent="space-evenly" alignItems="flex-end" sx={{ height: '55vh' }}>
        <Grid item xs={5}>
          <Dialogue elevation={12}>{choice.shape === NODE_SHAPE.ILLUSTRATION_CHOICE ? t('conversation.illustration_on_blackboard') : choice.label}</Dialogue>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <Dialogue elevation={12}>{response?.label}</Dialogue>
        </Grid>
        <Grid item xs={3}>
          <Avatar>
            <img style={AvatarStyle} src={avatar} alt="Teacher avatar" key={`avatar_teacher`} />
          </Avatar>
        </Grid>
        <Grid item xs={5}>
          <BlackBoard elevation={16}>
            {illustration && (
              <img
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                src={illustration.label}
                alt={illustration.label || `${t('conversation.illustration')}`}
              />
            )}
          </BlackBoard>
        </Grid>
        <Grid item xs={4}>
          <Avatar>
            {students.map((student) =>
              <img style={AvatarStyle} src={student} alt="Student avatar" key={`avatar_student_${student}`} />
            )}
          </Avatar>
        </Grid>
      </Grid>
    </ErrorBoundary>
  )
}
