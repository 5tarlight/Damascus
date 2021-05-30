import { FC } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const HeaderSearch: FC<{}> = () => {
  return (
    <form>
      <input className={cx('search-input')} />
    </form>
  )
}

export default HeaderSearch
