import axios from 'axios'
import { ChangeEvent, createRef, FC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { fileServer } from '../../config'
import { getProfilePicture } from '../../util'
import profileIcon from '../Header/ProfileIcon/profile.png'

interface Props {
  id: string
  isOwner: boolean
}

interface UploadPictureResult {
  success: boolean
  err?: any
  filename?: string
  image?: string
}

const Image = styled.img``

const UserProfileImg: FC<Props> = ({ id, isOwner }) => {
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
    getProfilePicture(id)
      .then(url => {
        setImage(url)
      })
      .catch(err => {
        setImage(profileIcon)
      })
  }, [id])

  return (
    <>
      <input
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept="image/png"
        onChange={handleChnage}
      />
      <Image
        src={image}
        alt="profile img"
        onClick={e => {
          if (!isOwner) return
          e.preventDefault()
          e.stopPropagation()
          inputFile.current?.click()
        }}
      />
    </>
  )
}

export default memo(UserProfileImg)
