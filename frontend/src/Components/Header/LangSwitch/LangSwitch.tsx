import { FC } from 'react'
import styles from './LangSwitch.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export type Lang = 'ko' | 'en'

interface Props {
  lang: Lang
  switchLang: (lang: Lang) => void
}

const LangSwitch: FC<Props> = ({ lang, switchLang }) => {
  let icon: string
  switch (lang) {
    case 'en':
      icon = '🇺🇸'
      break
    case 'ko':
      icon = '🇰🇷'
      break
  }

  return (
    <div
      className={cx('lang')}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()

        if (lang == 'en') switchLang('ko')
        else switchLang('en')
      }}
    >{`${icon} ${lang}`}</div>
  )
}

export default LangSwitch
