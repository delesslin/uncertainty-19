// TODO: Abstract hooks
// TODO: Fix layout
import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import randomInt from 'random-int'
import randomItem from 'random-item'
import fontNames from './fontNames'
import randomColor from 'random-color'

const createAnimation = async (total) => {
  const duration = await randomInt(0, total/6)
  const delay = await randomInt(0, total - duration)

  return `
  opacity: 0;
  animation-name: fadeInAndOut;
  animation-duration: ${duration}ms;
  animation-delay: ${delay}ms;
  @keyframes fadeInAndOut {
    0%, 100% {
      opacity: 0;
    }
    20%, 80% {
      opacity: .9;
    }
  }
  `

}


const TitleCard = ({children, x, y, width, totalTime}) => {
  const [font, setFont] = useState(null)
  const [animation, setAnimation] = useState(null)
  const color = randomColor()

  useEffect(() => {
    setFont(randomItem(fontNames))

    createAnimation(totalTime)
      .then(setAnimation)

  }, [])

  if(font !== null && animation !== null){
    const Card = styled.h3`
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${width}px;
      ${font}
      transition: opacity 2s ease-in-out;
      ${animation}
      color: ${color.hexString()}
    `
    return (
    <Card>{children}</Card>
     );
  }else{
    return null
  }
}

export default TitleCard;
