import React from 'react'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'
import { useTranslation } from 'react-i18next'

import { Choice, Choices, Response, Responses } from './../types'
import { NODE_SHAPE } from '../const'

Font.register({
  family: 'opensans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0ef8pkAg.ttf',
})

const styles = StyleSheet.create({
  page: {
    padding: 20,
    border: '2 dotted black',
    fontFamily: 'opensans',
  },
  section: {
    textAlign: 'left',
    margin: 15,
  },
  choice: { fontSize: 14, marginBottom: 3 },
  response: { fontSize: 12 },
  notes: {
    height: '91%',
    margin: '5%',
    border: '2 dotted black',
    fontFamily: 'opensans',
  },
  header: {
    margin: 20,
    fontFamily: 'opensans',
    fontSize: 20,
    textAlign: 'center',
  },
  introPage: {
    height: '100%',
  },
  conversatioName: {
    textAlign: 'center',
    fontSize: 35,
    margin: '5%',
    marginTop: '20%',
  },
  conversationDescription: {
    fontFamily: 'opensans',
    textAlign: 'center',
    fontSize: 17,
    margin: '10%',
  },
  conversationDate: {
    fontFamily: 'opensans',
    fontSize: 12,
    textAlign: 'center',
    bottom: 20,
    position: 'absolute',
    color: 'darkgrey',
  },
  teacher: {
    width: 200,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  student: {
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  illustration: {
    width: 300,
  }
})


const getDate = () => {
  const now = new Date()
  return now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear()
}

type PDFProps = {
  name: string
  intro: string
  choices: Choices
  dialog: string[]
  responses: Responses
  student: string
  teacher: string
}

export const PDFDocument = ({
  name,
  intro,
  choices,
  dialog,
  responses,
  student,
  teacher,
}: PDFProps) => {
  const { t } = useTranslation()

  return (
    <Document>
      <Page size="A4" style={styles.introPage}>
        <Text style={styles.conversatioName}>{name}</Text>
        <Text style={styles.conversationDescription}>{intro}</Text>

        <Image style={styles.teacher} src={teacher} />
        <Image style={styles.student} src={student} />
        <Text style={styles.conversationDate}>{t('date')}: {getDate()}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        {dialog.map((q, i) => {
          const choice: Choice = choices[q]
          const response: Response = responses[choices[q].selectedResponse]

          return (
            <View key={i} style={styles.section}>
              {choice.shape === NODE_SHAPE.ILLUSTRATION_CHOICE ? (
                <Image style={styles.illustration} src={choice.label} />
              ) : (
                <Text style={styles.choice}>
                  {i < dialog.length - 1 ? `${t('teacher')} ${i + 1}: ` : `${t('conversation.end')}: `}
                  {choice.label}
                </Text>
              )}
              {choice && response && i < dialog.length - 1 && (
                <Text style={styles.response}>
                  {t('pupil')}: {response ? response.label : ''}
                </Text>
              )}
            </View>
          )
        })}
      </Page>
      <Page size="A4">
        <View style={styles.notes}>
          <Text style={styles.header}>{t('notes')}:</Text>
        </View>
      </Page>
    </Document>
  )
}
