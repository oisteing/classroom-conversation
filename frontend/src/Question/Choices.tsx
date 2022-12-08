import * as React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Paper, Popover, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import {
  Choice,
  Illustration,
} from '../types'
import { NODE_SHAPE } from '../const'

type ChoicesProps = {
  uuid: string
  choices: Array<Choice | Illustration>
}

type TextChoiceItemProps = {
  choice: Choice | Illustration
}

const ChoiceBar = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#262626" : "#323232",
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.primary,
  position: 'absolute',
  left: 0,
  bottom: 0,
  margin: theme.spacing(1),
  width: '-webkit-fill-available',
  maxHeight: '35vh',
}))

const ChoiceGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const TextChoiceItem = ({ choice }: TextChoiceItemProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
        onMouseLeave={handleClose}
      >
        {choice.label.length >= 50 ? `${choice.label.slice(0, 50)}...` : choice.label}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <Typography sx={{ p: 4 }} variant='h6'>{choice.label}</Typography>
      </Popover>
    </div>
  )
}

export const ChoicesComponent = ({ uuid, choices }: ChoicesProps) => {
  const history = useHistory()

  return (
    <ErrorBoundary>
      <ChoiceBar elevation={16}>
        <ChoiceGrid container spacing={2}>
          {choices?.length > 0 && (
            choices.map((choice: Choice | Illustration, key: number) => (
              <Grid item sm key={`choice_${key}`}>
                <Paper
                    elevation={16}
                    key={`choice_${key}`}
                    sx={{ padding: '5px 5px 5px 5px' }}
                    onClick={() => history.push(`/conversation/${uuid}/${choice.id}`)}
                  >
                    {
                      choice.shape === NODE_SHAPE.ILLUSTRATION_CHOICE
                        ? <img src={choice.label} alt={choice.label} style={{ maxHeight: '100px' }}/>
                        : <TextChoiceItem choice={choice} />
                    }
                  </Paper>
              </Grid>
            ))
          )}
        </ChoiceGrid>
      </ChoiceBar>
    </ErrorBoundary>
  )
}
