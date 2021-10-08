import { FC } from 'react'
import { useParams } from 'react-router'
import { useTitle } from 'react-use'
import UserProfileContainer from '../../Components/UserProfile/UserProfileContainer'
import { UserLang } from '../../lang/lang'

interface Props {
  lang: UserLang
}

interface ProfileParam {
  id: string
}

const UserProfile: FC<Props> = ({ lang }) => {
  useTitle('Damascus - Profile')
  const { id } = useParams<ProfileParam>()

  return <UserProfileContainer lang={lang} id={id} />
}

export default UserProfile
