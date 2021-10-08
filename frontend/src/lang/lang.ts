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
  writePost: string
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
  notValidEmail: string
  notValidPassword: string
  loginFailed: string
  emailAlreadyTaken: string
  confirmPasswordFail: string
  notValidUsername: string
}

export interface UserLang {
  loading: string
  failedToLoad: string
  submit: string
  cancel: string
  usernamePlace: string
  emailPlace: string
  bioPlace: string
  profilePlace: string
}

export interface WriteLang {
  titlePlace: string
  tagPlace: string
  descriptionPlace: string
}

export interface Language {
  header: HeaderLang
  footer: FooterLang
  auth: AuthLang
  userProfile: UserLang
  write: WriteLang
}

export const getLang = (lang: Lang) => {
  switch (lang) {
    case 'en':
      return en
    case 'ko':
      return ko
  }
}
