import { Lang } from '../Components/Header/LangSwitch/LangSwitch'
import en from './en'
import ko from './ko'

export interface HeaderLang {
  search: string
  notLoggedin: string
  signin: string
  signup: string
  loggedinAs: string
  myProfile: string
  myPosts: string
  subscribes: string
  likedPosts: string
  storagedPosts: string
  logout: string
}

export interface FooterLang {
  privacy: string
  terms: string
}

export interface AuthLang {
  signin: string
  signup: string
  email: string
  password: string
  confirmPassword: string
  searchEmail: string
  searchPassword: string
  username: string
}

export interface Language {
  header: HeaderLang
  footer: FooterLang
  auth: AuthLang
}

export const getLang = (lang: Lang) => {
  switch (lang) {
    case 'en':
      return en
    case 'ko':
      return ko
  }
}
