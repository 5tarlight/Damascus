import { ChangeEvent, Component, createRef } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'
import { InputGroup } from 'react-bootstrap'
import SearchInput from './SearchInput/SearchInput'
import SearchBtn from './SearchBtn/SearchBtn'
import SearchDropdown, { DropdownData } from './SearchDropdown/SearchDropdown'
import DropdownBackground from './SearchDropdown/DropdownBackground/DropdownBackground'

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
    const background = createRef<HTMLDivElement>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({
        value: e.target.value
      })
    }

    const setValue = (s: string) => {
      console.log(s)
      this.setState({
        value: s
      })
    }

    const handleShow = () => {
      dropdown.current?.classList.add('show')
      background.current?.classList.add('show')
    }

    const handleHide = () => {
      dropdown.current?.classList.remove('show')
      background.current?.classList.remove('show')
    }

    const items: [DropdownData] | [] = [
      {
        to: 'test',
        value: 'zz'
      }
    ]

    return (
      <>
        <InputGroup className={cx('mb-3', 'search')}>
          <SearchInput
            text={this.state.value}
            handleChange={handleChange}
            handleShow={handleShow}
          />
          <SearchDropdown
            dropdownRef={dropdown}
            items={items}
            setValue={setValue}
            handleHide={handleHide}
          />
          <SearchBtn text={this.state.value} handleHide={handleHide} />
          <DropdownBackground backRef={background} onHide={handleHide} />
        </InputGroup>
      </>
    )
  }
}

export default HeaderSearch
