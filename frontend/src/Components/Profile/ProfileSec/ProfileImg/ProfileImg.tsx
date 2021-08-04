import { ChangeEvent, createRef, FC, memo, useEffect, useState } from 'react'
import styles from './ProfileImg.scss'
import classNames from 'classnames/bind'
import profileIcon from '../../../Header/ProfileDropdown/ProfileIcon/profile.png'
import axios from 'axios'
import { fileServer } from '../../../../config'
import { getProfilePicture } from '../../../../util'

const cx = classNames.bind(styles)

interface Props {
  id: number
}

interface UploadPictureResult {
  success: boolean
  err?: any
  filename?: string
  image?: string
}

const ProfileImg: FC<Props> = () => {
  const inputFile = createRef<HTMLInputElement>()
  const [image, setImage] = useState(profileIcon)
  const [error, setError] = useState(false)

  const handleChnage = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event

    if (!files || !files[0]) {
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

    const result = await axios.post<UploadPictureResult>(
      `http://${fileServer}/profile/image`,
      // { formData, id: localStorage.getItem('id') },
      formData,
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    )

    const {
      data: { success },
    } = result
    if (success) {
      window.location.reload()
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    getProfilePicture(localStorage.getItem('id'))
      .then(url => {
        setImage(url)
      })
      .catch(err => {
        setImage(profileIcon)
      })
  }, [])

  return (
    <div>
      <input
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept="image/png"
        onChange={handleChnage}
      />
      <img
        className={cx('profile-img', { error: error })}
        src={image}
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
