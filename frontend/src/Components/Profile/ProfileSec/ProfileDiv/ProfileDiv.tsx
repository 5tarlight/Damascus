import { FC } from 'react'
import styles from './ProfileDiv.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  failed: boolean
  loaded: boolean
}

const ProfileDiv: FC<Props> = ({ failed, loaded, children }) =>
  loaded ? (
    failed ? (
      <div className={cx('profile-loading')}>프로필을 불러오지 못했습니다.</div>
    ) : (
      <div className={cx('profile-div')}>{children}</div>
    )
  ) : (
    <div className={cx('profile-loading')}>Loading...</div>
  )

export default ProfileDiv
