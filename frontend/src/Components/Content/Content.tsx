import { FC } from 'react'
import styles from './Content.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Content: FC<{}> = ({ children }) => (
  <div className={cx('content')}>{children}</div>
)

export default Content
