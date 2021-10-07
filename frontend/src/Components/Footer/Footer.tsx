import { FC } from 'react'
import styles from './Footer.scss'
import classNames from 'classnames/bind'
import { FooterLang } from '../../lang/lang'

const cx = classNames.bind(styles)

interface Props {
  footerLang: FooterLang
}

const Footer: FC<Props> = ({ footerLang: { privacy, terms } }) => (
  <footer className={cx('footer')}>
    <div className={cx('copy')}>
      &copy; 2021{' '}
      <a href="https://github.com/5tarlight" target="_blank" rel="noreferrer">
        5tarlight
      </a>
      .
    </div>
    <div>{terms}</div>
    <div>{privacy}</div>
  </footer>
)

export default Footer
