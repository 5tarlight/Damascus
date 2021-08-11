import { FC } from 'react'
import styles from './LangSwitch.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export type Lang = 'ko' | 'en'

interface Props {
  lang: Lang
}

const LangSwitch: FC<Props> = ({ lang }) => {
  let icon: string
  switch (lang) {
    case 'en':
      icon = '🇺🇸'
      break
    case 'ko':
      icon = '🇰🇷'
      break
  }

  return <div className={cx('lang')}>{`${icon} ${lang}`}</div>
}

export default LangSwitch
