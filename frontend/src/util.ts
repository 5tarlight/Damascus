import { genSaltSync, hashSync } from 'bcryptjs'

export const cryptPassword = (password: string) => {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}

export const isCurrentUser = (id: number) => {
  return parseInt(localStorage.getItem('id') || '-1') === id
}

export const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
export const pwRegexp = /^([a-zA-Z0-9!@#$%^&*\-_]{8,})$/
export const usernameExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/

export const parseBit = (bit?: Bit) => (bit?.data[0] === 1 ? 'true' : 'false')
