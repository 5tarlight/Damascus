import { FC, memo } from 'react'
import styles from './AuthInput.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

type inputType = 'password' | 'email' | 'text'

interface Props {
  placeholder?: string
  password?: inputType
  value: string
  handleChnage(str: string): any
  handleSubmit(): any
}

const AuthInput: FC<Props> = ({
  placeholder,
  value,
  handleChnage,
  password,
  handleSubmit,
}) => (
  <input
    className={cx('auth-input')}
    placeholder={placeholder}
    value={value}
    type={password}
    onChange={e => {
      const {
        target: { value },
      } = e
      handleChnage(value)
    }}
    onKeyDown={e => {
      if (e.key === 'Enter') handleSubmit()
    }}
  />
)

export default memo(AuthInput)
