import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { styled } from '@mui/material'

import { DialogueComponent } from './Dialogue'
import { ChoicesComponent } from './Choices'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

import {
  Graph,
  Choice,
  Illustration,
} from '../types'
import { getAvailableAvatars, selectRandomAvatars } from '../helpers'
import { buildConversation, getAllChoices } from './utils'
import { NODE_SHAPE } from '../const'

type QuestionProps = {
  graph: Graph
  uuid: string
  id: string
}

const Background = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}))

const QuestionComponent = ({ graph, uuid, id }: QuestionProps) => {
  // Conversation
  const { choice, randomResponse, linkedResponses, illustrations } = buildConversation(id, graph)
  // Avatars
  const [students, setStudents] = useState<string[]>([])
  // Choices
  const [choices, setChoices] = useState<Choice[] | Illustration[]>([])
  const [illustration, setIllustration] = useState<Illustration>()

  useEffect(() => {
    // Get choices
    const allChoices = getAllChoices(choice, randomResponse, linkedResponses, graph)
    setChoices(allChoices)

    // Get student avatars
    getAvailableAvatars('student')
      .then((availableAvatars: string[]) => {
        let avatars = selectRandomAvatars(availableAvatars, linkedResponses.length + 1)
        setStudents(avatars)
      })
      .catch((err: any) => {
        console.warn(err)
      })

    // @ts-ignore
    if (choice.shape === NODE_SHAPE.ILLUSTRATION_CHOICE) setIllustration(choice)
    // Get default illustrations
    else if (illustrations?.length >= 1) setIllustration(illustrations[0])
    else setIllustration(undefined)

  }, [id])

  return (
    <ErrorBoundary>
      <Background elevation={16} sx={{ flexGrow: 1 }} >
        <DialogueComponent
          choice={choice}
          response={randomResponse}
          illustration={illustration}
          students={students}
        />
      </Background>
      <ChoicesComponent uuid={uuid} choices={choices} />
    </ErrorBoundary>
  )
}

export default QuestionComponent
