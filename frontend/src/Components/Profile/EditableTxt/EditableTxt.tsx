import { FC, useEffect, useState, MouseEvent as ME } from 'react'
import styles from './EditableTxt.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

type TxtType = 'normal' | 'email' | 'username' | 'id'
type SubimtHandler = (value: string) => void

interface Props {
  value: string
  // handleChange(e: ChangeEvent<HTMLInputElement>): any
  placeholder?: string
  isOwner?: boolean
  type?: TxtType
  handleSubmit: SubimtHandler
}

const EditableTxt: FC<Props> = ({
  value,
  // handleChange,
  placeholder,
  isOwner = false,
  type = 'normal',
  handleSubmit,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [changedValue, setChangedValue] = useState('')
  let origin = value

  useEffect(() => {
    setChangedValue(origin)
  }, [origin])

  const handleCancel = () => {
    setIsEdit(false)
    setChangedValue(origin)
  }

  const getHandler = (
    event: ME<HTMLButtonElement, MouseEvent>,
    handler: SubimtHandler,
    value: string
  ) => {
    event.preventDefault()
    event.stopPropagation()

    return () => {
      handler(value)
    }
  }

  return (
    <>
      {isEdit ? (
        <div>
          <input
            className={cx('edit-input', type)}
            value={changedValue}
            onChange={e => {
              setChangedValue(e.target.value)
            }}
            placeholder={placeholder}
            onKeyDown={e => {
              const { key } = e
              if (key === 'Escape') handleCancel()
            }}
          />
          <button
            className={cx('btn-cancel', `btn-${type}`)}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              handleCancel()
            }}
          >
            취소
          </button>
          <button
            className={cx('btn-submit', `btn-${type}`)}
            onClick={event => {
              origin = changedValue
              getHandler(event, handleSubmit, changedValue)()
              setIsEdit(false)
            }}
          >
            확인
          </button>
        </div>
      ) : (
        <div
          className={cx('edit-value', type, { owner: isOwner })}
          onClick={() => {
            if (isOwner) {
              setIsEdit(true)
            }
          }}
        >
          {changedValue}
        </div>
      )}
    </>
  )
}

export default EditableTxt
