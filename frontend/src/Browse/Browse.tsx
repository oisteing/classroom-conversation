import * as React from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Pagination, Paper as MUIPaper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useFetch } from '../hooks'
import { Conversation } from '../types'

import Loading from '../Loading/Loading'
import Notfound from '../Notfound/Notfound'
import { Paper } from '../Design/Paper'


const Item = styled(MUIPaper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '30vh'
}));

const spliceIntoChunks = (arr: Conversation[], chunkSize: number): Conversation[][] => {
  const res: any[] = [];
  while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
  }
  return res;
}

const Browse = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const [pages, setPages] = useState<Conversation[][]>([])
  const [page, setPage] = useState<number>(1)
  const chunkSize: number = 5

  const [data, loading] = useFetch<Conversation[]>('/api/document')

  useEffect(() => {
    if (!data) return
    setPages(spliceIntoChunks(data, chunkSize))
  }, [data])
  
  if (loading) {
    return <Loading />
  }

  if (!data) {
    return <Notfound />
  }

  return (
    <Paper>
      <Box sx={{ width: '100%', marginTop: '2vh' }}>
        <Typography variant='h2'>{t('all_conversations')}</Typography>
        {pages.length > 0 ?
          <Stack spacing={2}>
            {(pages[page - 1]).map((conversation: Conversation, index: number) => (
              <Item
                key={index}
                elevation={6}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%', marginBottom: '5px' }}
                  onClick={() => history.push(`/conversation/${conversation.uuid}/start`)}
                >
                  {conversation.name}
                </Button>
                <Typography variant='caption'>{conversation.description}</Typography>
              </Item>
            ))}
            <Pagination
              count={pages.length}
              color='primary'
              onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
            />
          </Stack>
          : (<Typography variant='body1'>{t('conversations.notfound')}</Typography>)
        }
      </Box>
    </Paper>
  )
}

export default Browse
