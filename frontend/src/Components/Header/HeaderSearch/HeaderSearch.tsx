import { ChangeEvent, Component } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'
import { InputGroup } from 'react-bootstrap'
import SearchInput from './SearchInput/SearchInput'
import SearchBtn from './SearchBtn/SearchBtn'

const cx = classNames.bind(styles)

interface State {
  value: string
}

class HeaderSearch extends Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      value: ''
    }
  }

  render() {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({
        value: e.target.value
      })
    }

    return (
      <InputGroup className={cx('mb-3', 'search')}>
        <SearchInput
          text={this.state.value}
          handleChange={handleChange}
        />
        <SearchBtn text={this.state.value} />
      </InputGroup>
    )
  }
}

export default HeaderSearch
