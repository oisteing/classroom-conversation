import studentGirl1 from './static/student_1.png'
import studentGirl2 from './static/student_girl_2.png'
import studentGirl3 from './static/student_girl_3.png'
import studentGirl4 from './static/student_girl_4.png'
import studentBoy1 from './static/student_boy_1.png'
import studentBoy2 from './static/student_boy_2.png'
import studentBoy3 from './static/student_boy_3.png'
import student1 from './static/student_1.png'
import teacherMan from './static/teacher_man.png'
import teacherWoman from './static/teacher_woman.png'

export const API_BASE_PATH: string = '/api'
export const SUBMIT_CONVERSATION_PATH: string = `${API_BASE_PATH}/submit`
export const GET_AVATAR_NAMES_BY_KIND_PATH: string = '/avatars'

export const NODE_SHAPE: { [key: string]: string } = {
  START: 'star',
  END: 'octagon',
  CHOICE: 'roundrectangle',
  RESPONSE: 'diamond',
  ILLUSTRATION_DEFAULT: 'hexagon',
  ILLUSTRATION_CHOICE: 'ellipse',
}

export const DEFAULT_AVATARS: { [key: string]: string[] } = {
  teacher: [
    teacherMan,
    teacherWoman,
  ],
  student: [
    student1,
    studentBoy1,
    studentBoy2,
    studentBoy3,
    studentGirl1,
    studentGirl2,
    studentGirl3,
    studentGirl4
  ]
}
