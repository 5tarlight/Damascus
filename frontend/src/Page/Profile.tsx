import { FC, memo, useState } from 'react'
import { useParams } from 'react-router'
import ProfileTable from '../Components/Profile/ProfileTable/ProfileTable'

interface ProfileParam {
  id: string
}

export type ProfileMenuType = 'profile' | 'manage-post' | 'setting'

export interface ProfileMenuProps {
  id: ProfileMenuType
  value: string
}

const Profile: FC<{}> = () => {
  const id = parseInt(useParams<ProfileParam>().id)
  const [curMenu, setCurMenu] = useState<ProfileMenuType>('profile')

  const items: ProfileMenuProps[] = [
    {
      id: 'profile',
      value: '프로필',
    },
    {
      id: 'manage-post',
      value: '게시글 관리',
    },
    {
      id: 'setting',
      value: '설정',
    },
  ]

  return (
    <ProfileTable
      items={items}
      curMenu={curMenu}
      setCurMenu={setCurMenu}
      userId={id}
    ></ProfileTable>
  )
}

export default memo(Profile)
