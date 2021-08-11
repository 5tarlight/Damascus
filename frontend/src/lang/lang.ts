import { Lang } from '../Components/Header/LangSwitch/LangSwitch'
import en from './en'
import ko from './ko'

export interface Language {
  header: {
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
}

export const getLang = (lang: Lang) => {
  switch (lang) {
    case 'en':
      return en
    case 'ko':
      return ko
  }
}
