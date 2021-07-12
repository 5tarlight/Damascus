import { ChangeEvent, createRef, FC, memo, useState } from 'react'
import styles from './EditableTxt.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  value: string
  handleChange(e: ChangeEvent<HTMLInputElement>): any
  placeholder?: string
}

const EditableTxt: FC<Props> = ({ value, handleChange, placeholder }) => {
  const [isEdit, setIsEdit] = useState(false)
  const inputRef = createRef<HTMLInputElement>()

  return (
    <>
      {isEdit ? (
        <input
          className={cx('edit-input')}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onBlur={() => setIsEdit(false)}
          ref={inputRef}
        />
      ) : (
        <div
          className={cx('edit-value')}
          onClick={() => {
            setIsEdit(true)
            inputRef.current?.focus()
          }}
        >
          {value}
        </div>
      )}
    </>
  )
}

export default memo(EditableTxt)
