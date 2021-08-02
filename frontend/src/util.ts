import { genSaltSync, hashSync } from 'bcryptjs'

export const cryptPassword = (password: string) => {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}

export const isCurrentUser = (id: number) => {
  return parseInt(localStorage.getItem('id') || '-1') === id
}
