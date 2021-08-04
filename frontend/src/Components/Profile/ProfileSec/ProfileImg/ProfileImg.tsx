import { ChangeEvent, createRef, FC, memo } from 'react'
import styles from './ProfileImg.scss'
import classNames from 'classnames/bind'
import ProfileIcon from '../../../Header/ProfileDropdown/ProfileIcon/profile.png'
import axios from 'axios'
import { fileServer } from '../../../../config'

const cx = classNames.bind(styles)

interface Props {
  id: number
}

const ProfileImg: FC<Props> = () => {
  const inputFile = createRef<HTMLInputElement>()

  const handleChnage = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event

    if (!files) {
      // remove? or make other way to remove profile picture
      return
    }

    const file = files[0]

    const formData = new FormData()
    console.log(files[0])
    formData.append(
      'profile_img',
      file,
      `${localStorage.getItem('id')}_profile.png`
    )

    const result = await axios.post(
      `http://${fileServer}/profile/image`,
      // { formData, id: localStorage.getItem('id') },
      formData,
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    )

    console.log(result)
  }

  return (
    <div>
      <input
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleChnage}
      />
      <img
        className={cx('profile-img')}
        src={ProfileIcon}
        alt="profile img"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          inputFile.current?.click()
        }}
      />
    </div>
  )
}

export default memo(ProfileImg)
