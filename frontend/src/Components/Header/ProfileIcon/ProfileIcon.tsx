import { createRef, FC, useEffect, useState } from 'react'
import styles from './ProfileIcon.scss'
import classNames from 'classnames/bind'
import profileIcon from './profile.png'
// import SearchDropdown, {
//   DropdownData,
// } from '../../HeaderSearch/SearchDropdown/SearchDropdown'
// import { useHistory } from 'react-router'
// import DropdownBackground from '../../HeaderSearch/SearchDropdown/DropdownBackground/DropdownBackground'
import { getProfilePicture } from '../../../util'
import ProfileDropdown from './ProfileDropdown'
import ProfileDropdownBack from './ProfileDropdownBack'

const cx = classNames.bind(styles)

interface Props {
  login: boolean
}

const ProfileIcon: FC<Props> = ({ login }) => {
  // const history = useHistory()
  const dropdown = createRef<HTMLDivElement>()
  const background = createRef<HTMLDivElement>()
  const [image, setImage] = useState(profileIcon)

  useEffect(() => {
    getProfilePicture(localStorage.getItem('id'))
      .then(url => {
        setImage(url)
      })
      .catch(err => {
        setImage(profileIcon)
      })
  }, [login])

  const handleShow = () => {
    dropdown.current?.classList.add('show')
    background.current?.classList.add('back-show')
  }

  const handleHide = () => {
    dropdown.current?.classList.remove('show')
    background.current?.classList.add('hide')
    background.current?.classList.remove('back-show')
    setTimeout(() => {
      background.current?.classList.remove('hide')
    }, 200)
  }

  // const items: DropdownData[] = login
  //   ? [
  //       {
  //         to: `/profile/${localStorage.getItem('id')}`,
  //         value: '프로필',
  //       },
  //       {
  //         to: '/auth/logout',
  //         value: '로그아웃',
  //       },
  //     ]
  //   : [
  //       {
  //         to: '/auth/signin',
  //         value: '로그인',
  //       },
  //       {
  //         to: '/auth/signup',
  //         value: '회원가입',
  //       },
  //     ]

  // const redirect = (s: string) => {
  //   history.push(s)
  // }

  return (
    <>
      <div className={cx('profile-icon')} onClick={handleShow}>
        <img src={image} alt="profile" />
      </div>

      <ProfileDropdown refer={dropdown} login={login} onHide={handleHide} />
      <ProfileDropdownBack refer={background} handleHide={handleHide} />
      {/* <SearchDropdown
        dropdownRef={dropdown}
        items={items as [DropdownData?]}
        setValue={redirect}
        handleHide={handleHide}
        isProfile
      />
      <DropdownBackground
        backRef={background}
        onHide={handleHide}
        forSearch={false}
      /> */}
    </>
  )
}

export default ProfileIcon
