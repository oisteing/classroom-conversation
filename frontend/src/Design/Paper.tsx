import React from 'react'
import { Paper as MUIPaper } from '@mui/material'
import { styled } from '@mui/material/styles'

const PaperBackground = styled(MUIPaper)(({ theme }) => ({
  width: '-webkit-fill-available',
  minHeight: '100%',
  display: 'grid',
  justifyContent: 'center',
  textAlign: 'center',
  margin: theme.spacing(1),
}))

type PaperProps = {
  children: any
}

export class Paper extends React.Component {
  constructor(props: PaperProps) {
    super(props)
  }

  render () {
    return (
      <PaperBackground elevation={16}>
        {/* @ts-ignore */}
        {this.props.children}
      </PaperBackground>
    )
  }
}

