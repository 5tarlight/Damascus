import { FC, useEffect, useState, MouseEvent as ME } from 'react'
import styles from './EditableTxt.scss'
import classNames from 'classnames/bind'
import { emailRegexp, usernameExp } from '../../../util'
import VerifyEmail from './VerifyEmail/VerifyEmail'

const cx = classNames.bind(styles)

type TxtType = 'normal' | 'email' | 'username' | 'id' | 'bio' | 'profile'
type SubimtHandler = (value: string) => void

interface Props {
  value: string
  // handleChange(e: ChangeEvent<HTMLInputElement>): any
  placeholder?: string
  isOwner?: boolean
  type?: TxtType
  handleSubmit: SubimtHandler
  email_verify?: boolean
}

const EditableTxt: FC<Props> = ({
  value,
  // handleChange,
  placeholder,
  isOwner = false,
  type = 'normal',
  handleSubmit,
  email_verify,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [changedValue, setChangedValue] = useState('')
  const [hasError, setHasError] = useState(false)
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

  const handleVerifyEmail = async () => {}

  return (
    <>
      {isEdit ? (
        <div>
          <input
            className={cx('edit-input', type, { error: hasError })}
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
              let regexp
              switch (type) {
                case 'email':
                  regexp = emailRegexp
                  break
                case 'username':
                  regexp = usernameExp
                  break
                case 'bio':
                  if (changedValue.length > 50) {
                    setHasError(true)
                    return
                  }
                  break
                case 'profile':
                  if (changedValue.length > 200) {
                    setHasError(true)
                    return
                  }
                  break
              }

              if (!(regexp || usernameExp).test(changedValue)) {
                setHasError(true)
                return
              }

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
          {type === 'email' ? (
            email_verify ? (
              `${changedValue} (인증됨)`
            ) : (
              <>
                {changedValue}
                <VerifyEmail handleSuccess={handleVerifyEmail} />
              </>
            )
          ) : (
            changedValue
          )}
        </div>
      )}
    </>
  )
}

export default EditableTxt
