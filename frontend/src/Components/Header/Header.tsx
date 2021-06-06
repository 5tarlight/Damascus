import { Component } from 'react'
import Logo from './Logo/Logo'
import styles from './Header.scss'
import classNames from 'classnames/bind'
// import HeaderItem from './HeaderItem/HeaderItem'
// import HeaderAuthItem from './HeaderAuthItem/HeaderAuthItem'
import HeaderSearch from './HeaderSearch/HeaderSearch'

const cx = classNames.bind(styles)

interface State {
  width: number
}

class Header extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      width: window.innerWidth,
    }
  }

  render() {
    // const menu = this.state.width >= 748 ?
    //   (
    //     <>
    //       <li><HeaderItem text='커미션' to='/commisions' /></li>
    //       <li><HeaderItem text='커미션' to='/commisions' /></li>
    //     </>
    //   ): (
    //     <div>

    //     </div>
    //   )

    return (
      <div className={cx('header')}>
        <Logo />
        <nav>
          <ul className={cx('item-list')}>
            <HeaderSearch />
          </ul>
        </nav>
        <nav>
          {/* <ul className={cx('item-list')}>
            <li><HeaderAuthItem text='로그인' to='/auth/login' /></li>
            <li><HeaderAuthItem text='회원가입' to='/auth/signup' /></li>
          </ul> */}
        </nav>
      </div>
    )
  }
}

export default Header
