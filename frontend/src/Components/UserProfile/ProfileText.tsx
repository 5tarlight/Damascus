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

interface TextProps {
  edit: boolean
  type: TxtType
}

const Text = styled.div<TextProps>`
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
  const origin = value
  const [editted, setEditted] = useState(origin)

  if (!editable) {
    return (
      <Text edit={editable} type={type}>
        {value}
      </Text>
    )
  } else {
    return !edit ? (
      <Text
        edit={editable}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setEdit(true)
        }}
        type={type}
      >
        {value}
      </Text>
    ) : (
      <>
        <EditInput
          placeholder={placeholder}
          value={editted}
          onChange={({ target: { value } }) => {
            setEditted(value)
          }}
        />
        <CancelBtn
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            setEdit(false)
            setEditted(origin)
          }}
        >
          {cancel}
        </CancelBtn>
        <SubmitBtn>{submit}</SubmitBtn>
      </>
    )
  }
}

export default ProfileText
