import { FC } from 'react'
import styles from './OAuthButton.scss'
import classNames from 'classnames/bind'
import googleLogo from './google_logo.svg'

type kinds = 'google'

const cx = classNames.bind(styles)
const logo = {
  google: googleLogo,
}

interface Props {
  type: kinds
}

const OAuthButton: FC<Props> = ({ type }) => {
  return <img alt={type} src={logo[type]} className={cx('o-auth-btn', type)} />
}

export const OAuthContainer: FC<{}> = () => {
  return (
    <div className={cx('o-auth')}>
      <OAuthButton type="google" />
    </div>
  )
}

export default OAuthButton
