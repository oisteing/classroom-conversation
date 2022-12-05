import React from 'react'
import { useTranslation } from 'react-i18next'

import { StyledCreditPage, StyledCredits, StyledCredit } from './Credits.styled'

import studentGirl1 from './../static/student_girl_1.png'
import studentGirl2 from './../static/student_girl_2.png'
import studentGirl3 from './../static/student_girl_3.png'
import studentGirl4 from './../static/student_girl_4.png'
import studentBoy1 from './../static/student_boy_1.png'
import studentBoy2 from './../static/student_boy_2.png'
import studentBoy3 from './../static/student_boy_3.png'
import student1 from './../static/student_1.png'
import teacherMan from './../static/teacher_man.png'
import teacherWoman from './../static/teacher_woman.png'
import clock from './../static/clock.png'

const Credits = () => {
  const { t } = useTranslation()

  return (
    <StyledCreditPage>
      <h1>{t('credits')}</h1>
      <StyledCredits>
        <StyledCredit>
          <h3>{t('avatar.pupil.girl')} 1</h3>
          <img src={studentGirl1} alt={`${t('avatar.pupil.girl')} 1 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/student_2784410" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.pupil.girl')} 2</h3>
          <img src={studentGirl2} alt={`${t('avatar.pupil.girl')} 2 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/student_257651" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.pupil.girl')} 3</h3>
          <img src={studentGirl3} alt={`${t('avatar.pupil.girl')} 3 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/student_4297861" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.pupil.girl')} 4</h3>
          <img src={studentGirl4} alt={`${t('avatar.pupil.girl')} 4 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/student_7658160" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.pupil.boy')} 1</h3>
          <img src={studentBoy1} alt={`${t('avatar.pupil.boy')} 1 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/student_2784403" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.pupil.boy')} 2</h3>
          <img src={studentBoy2} alt={`${t('avatar.pupil.boy')} 2 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/student_257634" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.pupil.boy')} 3</h3>
          <img src={studentBoy3} alt={`${t('avatar.pupil.boy')} 3 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/premium-icon/student_2436683" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.pupil.pupil')} 1</h3>
          <img src={student1} alt={`${t('avatar.pupil.pupil')} 1 ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/premium-icon/student_2995657" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.teacher.male')}</h3>
          <img src={teacherMan} alt={`${t('avatar.teacher.male')} ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/teacher_2784445" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.teacher.female')}</h3>
          <img src={teacherWoman} alt={`${t('avatar.teacher.female')} ${t('avatar')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/monkik" title="monkik">
              monkik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/free-icon/teacher_1995574" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
        <StyledCredit>
          <h3>{t('avatar.clock')}</h3>
          <img src={clock} alt={`${t('avatar.clock')}`} />
          <p>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' fra '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              Flaticon
            </a>
          </p>
        </StyledCredit>
      </StyledCredits>
    </StyledCreditPage>
  )
}

export default Credits
