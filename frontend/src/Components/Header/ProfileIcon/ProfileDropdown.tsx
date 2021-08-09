import { FC, RefObject } from 'react'
import styles from './ProfileDropdown.scss'
import classNames from 'classnames/bind'
import { useHistory } from 'react-router'

const cx = classNames.bind(styles)

interface Props {
  refer: RefObject<HTMLDivElement>
  login: boolean
  onHide(): void
}

const ProfileDropdown: FC<Props> = ({ refer, login, onHide }) => {
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
            {localStorage.getItem('username')}으로 로그인됨
          </div>
          <div onClick={click(`/profile/${localStorage.getItem('id')}`)}>
            내 프로필
          </div>
          <div onClick={click('/')}>내 글</div>
          <div onClick={click('/')}>구독함</div>
          <div onClick={click('/')}>좋아요 표시한 글</div>
          <div className={cx('sep')} onClick={click('/')}>
            저장한 글
          </div>
          <div onClick={click('/auth/logout')}>로그아웃</div>
        </>
      ) : (
        <>
          <div className={cx('sep', 'head')}>로그인되지 않음</div>
          <div onClick={click('/auth/signin')}>로그인</div>
          <div onClick={click('/auth/signup')}>회원가입</div>
        </>
      )}
    </div>
  )
}

export default ProfileDropdown
