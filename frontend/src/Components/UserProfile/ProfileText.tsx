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
  handleChange(value: string): any
}

interface TextProps {
  edit: boolean
  type: TxtType
}

interface InputProps {
  type: TxtType
}

interface EditProps {
  kind: TxtType
  // children?: JSX.Element | JSX.Element[]
}

const getSize = (type: string) => {
  switch (type) {
    case 'username':
      return '48px'
    case 'email':
      return '20px'
    default:
      return 'inherit'
  }
}

const Text = styled.div<TextProps>`
  width: fit-content;
  font-size: ${({ type }) => getSize(type)};

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

const EditInput = styled.input<InputProps>`
  min-width: 300px;
  max-width: 400px;
  font-size: ${({ type }) => getSize(type)};
`

const SubmitBtn = styled.button<EditProps>`
  font-size: ${({ kind }) => getSize(kind)};
`

const CancelBtn = styled.button<EditProps>`
  font-size: ${({ kind }) => getSize(kind)};
`

const ProfileText: FC<Props> = ({
  editable,
  type,
  value,
  placeholder,
  handleChange,
  lang: { cancel, submit },
}) => {
  const [edit, setEdit] = useState(false)
  const origin = value
  const [edited, setEdited] = useState(origin)

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
      <div>
        <EditInput
          placeholder={placeholder}
          value={edited}
          onChange={({ target: { value } }) => {
            setEdited(value)
          }}
          type={type}
        />
        <CancelBtn
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            setEdit(false)
            setEdited(origin)
          }}
          children={cancel}
          kind={type}
        />
        <SubmitBtn kind={type} onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          
          handleChange(edited)
        }}>{submit}</SubmitBtn>
      </div>
    )
  }
}

export default ProfileText
