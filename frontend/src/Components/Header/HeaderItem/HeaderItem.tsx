import { FC } from 'react'
import styles from './HeaderItem.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

interface Props {
  text: string
  to: string
}

const HeaderItem: FC<Props> = ({ text, to }) => {
  const style = {
    textDecoration: 'none',
    color: 'white'
  }

  return (
    <div className={cx('item')}>
      <Link style={style} to={to}>{text}</Link>
    </div>
  )
}

export default HeaderItem
