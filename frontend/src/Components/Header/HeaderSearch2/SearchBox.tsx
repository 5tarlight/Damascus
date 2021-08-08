import { FC } from 'react'
import styles from './SearchBox.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {}

const SearchBox: FC<Props> = () => {
  return <div className={cx('search-box')}></div>
}

export default SearchBox
