import { FC, memo, MouseEvent as ME } from 'react'
import styles from './AuthLink.scss'
import classNames from 'classnames/bind'
import { useHistory } from 'react-router'

const cx = classNames.bind(styles)

interface Props {
  value: string
  to: string
}

const AuthLink: FC<Props> = ({ to, value }) => {
  const history = useHistory()

  const handleClick = (e: ME<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    history.push(to)
  }

  return (
    <div className={cx('auth-link')} onClick={handleClick}>
      {value}
    </div>
  )
}

export default memo(AuthLink)
