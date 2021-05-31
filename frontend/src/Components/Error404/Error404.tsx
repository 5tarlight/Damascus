import { Component } from 'react'
import styles from './Error404.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class Error404 extends Component<{}, {}> {
  beforeColor: string

  constructor(props: {}) {
    super(props)
    // this.beforeColor = document.body.style.backgroundColor
    this.beforeColor = 'white'
    document.body.style.backgroundColor = 'black'
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = this.beforeColor
  }

  render() {
    return (
      <div className={cx('not-found')}>
        <h1>Error 404</h1>
        <h2>Page Not Found</h2>
      </div>
    )
  }
}

export default Error404
