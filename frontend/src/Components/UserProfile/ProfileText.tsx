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
  email_verify?: boolean
}

interface TextProps {
  edit: boolean
  type: TxtType
}

const Text = styled.div<TextProps>`
  width: fit-content;

  font-size: ${({ type }) => {
    switch (type) {
      case 'username':
        return '48px'
      case 'email':
        return '20px'
      default:
        return 'inherit'
    }
  }};

  color: ${({ type }) => {
    switch (type) {
      case 'email':
        return '#646464'
      default:
        return 'default'
    }
  }};

  ${({ edit }) => {
    if (edit) {
      return `
        &:hover {
          cursor: pointer;
        }
      `
    } else return ''
  }};
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
