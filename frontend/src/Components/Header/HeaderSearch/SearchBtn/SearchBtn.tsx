import { FC, MouseEvent as ME } from 'react'
import styles from './SearchBtn.scss'
import classNames from 'classnames/bind'
import { Button, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router'

const cx = classNames.bind(styles)

interface Props {
  text: string
}

const SearchBtn: FC<Props> = ({ text }) => {
  const history = useHistory()

  const handleClick = (e: ME<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (text.trim())
      history.push(`/search/${text.trim()}`)
  }

  return (
    <InputGroup.Append>
      <Button
        className={cx('search-btn')}
        variant="outline-secondary"
        onClick={handleClick}
      >검색</Button>
    </InputGroup.Append>
  )
}

export default SearchBtn
