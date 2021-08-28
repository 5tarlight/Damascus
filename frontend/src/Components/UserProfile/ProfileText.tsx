import { FC, useState } from 'react'
import styled from 'styled-components'
import { UserLang } from '../../lang/lang'

type TxtType = 'normal' | 'email' | 'username' | 'id' | 'bio' | 'profile'

interface Props {
  value: string
  editable: boolean
  type: TxtType
  placeholder?: string
  lang: UserLang
}

const Text = styled.div<{ edit: boolean }>`
  ${({ edit }) => {
    if (edit) {
      return `
        &:hover {
          cursor: pointer;
        }
      `
    } else return ''
  }}
`

const EditInput = styled.input``

const SubmitBtn = styled.button``

const CancelBtn = styled.button``

const ProfileText: FC<Props> = ({
  editable,
  type,
  value,
  placeholder,
  lang: { cancel, submit },
}) => {
  const [edit, setEdit] = useState(false)

  if (!editable) {
    return <Text edit={editable}>{value}</Text>
  } else {
    return !edit ? (
      <Text edit={editable}>{value}</Text>
    ) : (
      <>
        <EditInput />
        <CancelBtn>{cancel}</CancelBtn>
        <SubmitBtn>{submit}</SubmitBtn>
      </>
    )
  }
}

export default ProfileText
