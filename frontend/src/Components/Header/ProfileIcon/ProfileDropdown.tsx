import { FC, RefObject } from 'react'
import styles from './ProfileDropdown.scss'
import classNames from 'classnames/bind'
import { useHistory } from 'react-router'
import { HeaderLang } from '../../../lang/lang'

const cx = classNames.bind(styles)

interface Props {
  refer: RefObject<HTMLDivElement>
  login: boolean
  onHide(): void
  headerLang: HeaderLang
}

const ProfileDropdown: FC<Props> = ({
  refer,
  login,
  onHide,
  headerLang: {
    loggedinAs,
    myProfile,
    myPosts,
    subscribes,
    likedPosts,
    storagedPosts,
    logout,
    notLoggedin,
    signin,
    signup,
  },
}) => {
  const history = useHistory()

  const click = (path: string) => () => {
    history.push(path)
    onHide()
  }

  return (
    <div className={cx('dropdown')} ref={refer}>
      {login ? (
        <>
          <div className={cx('sep', 'head')}>
            {loggedinAs.replace(
              '{name}',
              localStorage.getItem('username') || 'unknown'
            )}
          </div>
          <div onClick={click(`/user/${localStorage.getItem('id')}`)}>
            {myProfile}
          </div>
          <div onClick={click('/')}>{myPosts}</div>
          <div onClick={click('/')}>{subscribes}</div>
          <div onClick={click('/')}>{likedPosts}</div>
          <div className={cx('sep')} onClick={click('/')}>
            {storagedPosts}
          </div>
          <div onClick={click('/auth/logout')}>{logout}</div>
        </>
      ) : (
        <>
          <div className={cx('sep', 'head')}>{notLoggedin}</div>
          <div onClick={click('/auth/signin')}>{signin}</div>
          <div onClick={click('/auth/signup')}>{signup}</div>
        </>
      )}
    </div>
  )
}

export default ProfileDropdown
