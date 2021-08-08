import { FC, memo, MouseEvent as ME } from 'react'
// import logo from './logo.png'
import styles from './Logo.scss'
import classNames from 'classnames/bind'
import { useHistory } from 'react-router'

const cx = classNames.bind(styles)

const Logo: FC<{}> = () => {
  const history = useHistory()
  const handleClick = (e: ME<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    history.push('/')
  }

  return (
    <div className={cx('logo')} onClick={handleClick}>
      {/* <img src={logo} alt="DAMASCUS" className={cx('img-logo')} /> */}
      DAMASCUS
    </div>
  )
}

export default memo(Logo)
