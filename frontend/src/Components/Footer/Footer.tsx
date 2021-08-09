import { FC } from 'react'
import styles from './Footer.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Footer: FC<{}> = () => (
  <footer className={cx('footer')}>
    <div className={cx('copy')}>&copy; 2021 5tarlight.</div>
    <div>이용약관</div>
    <div>개인정보 이용약관</div>
  </footer>
)

export default Footer
