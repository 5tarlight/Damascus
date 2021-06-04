import { ChangeEvent, Component } from 'react'
import styles from './SearchInput.scss'
import classNames from 'classnames/bind'
import { FormControl } from 'react-bootstrap'

const cx = classNames.bind(styles)

interface Props {
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  handleShow(): void
  text: string
}

class SearchInput extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props, nextState: {}): boolean {
    return this.props.text !== nextProps.text
  }

  render() {
    const { handleChange, text, handleShow } = this.props

    return (
      <FormControl
        className={cx('search-input')}
        placeholder="카테고리"
        aria-label="Category"
        aria-describedby="basic-addon2"
        onChange={handleChange}
        value={text}
        onFocus={handleShow}
      />
    )
  }
}

export default SearchInput
