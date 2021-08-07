import { ChangeEvent, Component, createRef } from 'react'
import styles from './HeaderSearch.scss'
import classNames from 'classnames/bind'
import { InputGroup } from 'react-bootstrap'
import SearchInput from './SearchInput/SearchInput'
import SearchBtn from './SearchBtn/SearchBtn'
import SearchDropdown, { DropdownData } from './SearchDropdown/SearchDropdown'
import DropdownBackground from './SearchDropdown/DropdownBackground/DropdownBackground'
import { filterCategory } from './SearchFilter'
import history from '../../../history'

const cx = classNames.bind(styles)

interface Props {}

interface State {
  value: string
  items: [DropdownData?]
}

class HeaderSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      value: '',
      items: [],
    }
  }

  render() {
    const dropdown = createRef<HTMLDivElement>()
    const background = createRef<HTMLDivElement>()

    const getItems = (str: string) => {
      if (!str.trim()) return []
      const search = filterCategory(str.trim())

      const si: any[] = []

      search.forEach((s: any) => {
        si.push({
          to: s,
          value: s,
        })
      })

      return si
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({
        value: e.target.value,
        items: getItems(e.target.value) as [DropdownData?],
      })
    }

    const setValue = (s: string) => {
      this.setState({
        value: s,
        items: getItems(s) as [DropdownData?],
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

    const handleClick = (text: string) => {
      handleHide()
      if (text.trim()) history.push(`/search/${text.trim()}`)
    }

    return (
      <>
        <InputGroup className={cx('mb-3', 'search')}>
          <SearchInput
            text={this.state.value}
            handleChange={handleChange}
            handleShow={handleShow}
            handleClick={handleClick}
          />
          <SearchDropdown
            dropdownRef={dropdown}
            items={this.state.items}
            setValue={setValue}
            handleHide={handleHide}
          />
          <SearchBtn text={this.state.value} handleHide={handleHide} />
          <DropdownBackground
            backRef={background}
            onHide={handleHide}
            forSearch
          />
        </InputGroup>
      </>
    )
  }
}

export default HeaderSearch
