import { FC, memo } from 'react'
import styles from './HomeTitle.scss'
import classNames from 'classnames/bind'
import { Properties } from 'csstype'
import img1 from '../img/home_back1.png'
import img2 from '../img/home_back2.png'
import img3 from '../img/home_back3.png'
import img4 from '../img/home_back4.png'
import img5 from '../img/home_back5.png'

const cx = classNames.bind(styles)

const HomeTitle: FC<{}> = () => {
  const imgs = [img1, img2, img3, img4, img5]
  const img = Math.floor(Math.random() * 5)

  const imgBackStyle: Properties = {
    background: `rgba(0, 0, 0, .65) url(${imgs[img]})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundBlendMode: 'darken',
  }

  console.dir(imgBackStyle)

  return (
    <div className={cx('title-back')} style={imgBackStyle}>
      <h1 className={cx('title')}>We Show Artists</h1>
    </div>
  )
}

export default memo(HomeTitle)
