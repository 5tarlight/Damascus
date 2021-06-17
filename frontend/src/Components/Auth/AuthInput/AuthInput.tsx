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
}

const AuthInput: FC<Props> = ({
  placeholder,
  value,
  handleChnage,
  password,
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
  />
)

export default memo(AuthInput)
