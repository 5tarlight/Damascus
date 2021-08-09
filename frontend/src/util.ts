import { genSaltSync, hashSync } from 'bcryptjs'
import { fileServer } from './config'
import defaultImage from './Components/Header/ProfileIcon/profile.png'

interface ImageResult {
  url: string
  status: 'ok' | 'error'
}

export const cryptPassword = (password: string) => {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}

export const isCurrentUser = (id: string) => {
  return (localStorage.getItem('id') || '-1') === id
}

export const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
export const pwRegexp = /^([a-zA-Z0-9!@#$%^&*\-_]{8,})$/
export const usernameExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/

export const parseBit = (bit?: Bit) => (bit?.data[0] === 1 ? 'true' : 'false')

export const getProfilePicture = async (
  id?: string | null
): Promise<string> => {
  const checkImage = () => {
    const url = `http://${fileServer}/profile/${id}_profile.png`
    return new Promise<ImageResult>(resolve => {
      const img = new Image()
      img.onload = () => resolve({ url, status: 'ok' })
      img.onerror = () => resolve({ url, status: 'error' })

      img.src = url
    })
  }

  if (!id) return defaultImage

  const result = await checkImage()
  if (result.status === 'ok') {
    return result.url
  } else {
    return defaultImage
  }
}

export const applyLocalStorage = (user: User) => {
  const admin = parseBit(user.admin)

  localStorage.setItem('login', 'true')
  localStorage.setItem('id', user.id.toString())
  localStorage.setItem('email', user.email)
  localStorage.setItem('username', user.username)
  localStorage.setItem('admin', admin)
  localStorage.setItem('bio', user.bio)
  localStorage.setItem('profile', user.profile)
  localStorage.setItem('email_verify', parseBit(user.email_verify))
}
