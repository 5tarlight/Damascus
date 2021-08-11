import { FC, memo } from 'react'
import Logo from './Logo/Logo'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import SearchBox from './HeaderSearch2/SearchBox'
// import HeaderSearch from './HeaderSearch/HeaderSearch'
import ProfileIcon from './ProfileIcon/ProfileIcon'
import LangSwitch, { Lang } from './LangSwitch/LangSwitch'
import { HeaderLang } from '../../lang/lang'

const cx = classNames.bind(styles)

interface Props {
  login: boolean
  lang: Lang
  switchLang: (lang: Lang) => void
  headerLang: HeaderLang
}

const Header: FC<Props> = ({ login, lang, switchLang, headerLang }) => (
  <div className={cx('header')}>
    <Logo />
    <SearchBox text={headerLang.search} />
    <ProfileIcon login={login} headerLang={headerLang} />
    <LangSwitch lang={lang} switchLang={switchLang} />
    {/* <nav>
      <ul className={cx('item-list')}>
        <HeaderSearch />
      </ul>
    </nav>
    <nav>
      <ul className={cx('item-list')}>
        <ProfileIcon login={login} />
      </ul>
    </nav> */}
  </div>
)

export default memo(Header)
