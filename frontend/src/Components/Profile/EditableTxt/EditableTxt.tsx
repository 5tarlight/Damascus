import { FC, memo, useState } from 'react'
import styles from './EditableTxt.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

type TxtType = 'normal' | 'email' | 'username' | 'id'

interface Props {
  value: string
  // handleChange(e: ChangeEvent<HTMLInputElement>): any
  placeholder?: string
  isOwner?: boolean
  type?: TxtType
}

const EditableTxt: FC<Props> = ({
  value,
  // handleChange,
  placeholder,
  isOwner = false,
  type = 'normal',
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [changedValue, setChangedValue] = useState(value)

  const handleCancel = () => {
    setIsEdit(false)
    setChangedValue(value)
  }

  return (
    <>
      {isEdit ? (
        <div>
          <input
            className={cx('edit-input')}
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
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              handleCancel()
            }}
          >
            취소
          </button>
          <button>확인</button>
        </div>
      ) : (
        <div
          className={cx('edit-value', type)}
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

export default memo(EditableTxt)
