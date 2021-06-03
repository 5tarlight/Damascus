import { ChangeEvent, Component, createRef } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'
import { InputGroup } from 'react-bootstrap'
import SearchInput from './SearchInput/SearchInput'
import SearchBtn from './SearchBtn/SearchBtn'
import SearchDropdown from './SearchDropdown/SearchDropdown'

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
    const dropdown = createRef<HTMLDivElement>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({
        value: e.target.value
      })
    }

    const handleShow = () => {
      dropdown.current?.classList.toggle('show')
    }

    const handleHide = () => {
      dropdown.current?.classList.toggle('show')
    }

    return (
      <InputGroup className={cx('mb-3', 'search')}>
        <SearchInput
          text={this.state.value}
          handleChange={handleChange}
          handleShow={handleShow}
          handleHide={handleHide}
        />
        <SearchDropdown dropdownRef={dropdown} />
        <SearchBtn text={this.state.value} />
      </InputGroup>
    )
  }
}

export default HeaderSearch
