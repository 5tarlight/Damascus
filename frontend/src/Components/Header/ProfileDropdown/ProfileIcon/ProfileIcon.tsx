import { createRef, FC } from 'react'
import styles from './ProfileIcon.scss'
import classNames from 'classnames/bind'
import profileIcon from './profile.png'
import SearchDropdown, {
  DropdownData,
} from '../../HeaderSearch/SearchDropdown/SearchDropdown'
import { useHistory } from 'react-router'
import DropdownBackground from '../../HeaderSearch/SearchDropdown/DropdownBackground/DropdownBackground'

const cx = classNames.bind(styles)

const ProfileIcon: FC<{}> = () => {
  const history = useHistory()
  const dropdown = createRef<HTMLDivElement>()
  const background = createRef<HTMLDivElement>()

  const handleShow = () => {
    dropdown.current?.classList.add('show')
    background.current?.classList.add('show')
  }

  const handleHide = () => {
    dropdown.current?.classList.remove('show')
    background.current?.classList.remove('show')
  }

  const items: DropdownData[] = [
    {
      to: '/auth/login',
      value: '로그인',
    },
    {
      to: '/auth/signup',
      value: '회원가입',
    },
  ]

  const redirect = (s: string) => {
    history.push(s)
  }

  return (
    <>
      <div className={cx('profile-icon')} onClick={handleShow}>
        <img src={profileIcon} alt="profile" />
      </div>

      <SearchDropdown
        dropdownRef={dropdown}
        items={items as [DropdownData?]}
        setValue={redirect}
        handleHide={handleHide}
        isProfile
      />
      <DropdownBackground backRef={background} onHide={handleHide} />
    </>
  )
}

export default ProfileIcon
