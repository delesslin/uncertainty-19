import React, {useState} from 'react';
import useSetInterval from 'use-set-interval'
import styled from '@emotion/styled'
import shortid from 'shortid'
import randomInt from 'random-int'
import randomColor from 'random-color'

const Dot = ({x, y, duration}) => {
  const Blob = styled.div`
    position: fixed;
    top: ${y}px;
    left: ${x}px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: white;
    opacity: 0;
    animation-name: fadeOut;
    animation-duration: ${duration}ms;
    @keyframes fadeOut {
      0%, 100% {
        opacity: 0;
      }
      5%, 50% {
        opacity: .9;
      }
    }
  `
  return(
    <Blob>
    </Blob>
  )

}


const Dots = ({totalTime, infections, width, height}) => {
  const [count, setCount] = useState(0)
  const [dots, setDots] = useState([])
  const interval = totalTime/infections.length
  useSetInterval(() => {
    setCount(count + 1)
    const arr = []
    for(let i = 0; i < infections[count]; i++){
      arr.push({
        key: shortid(),
        x: randomInt(0, width),
        y: randomInt(0, height)
      })
    }
    setDots(arr)
  }, interval)

  console.log(dots)
  const DotField = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
  `
  return (
    <div className="dots">
      {dots.map(dot => <Dot
          x={dot.x}
          y={dot.y}
          key={dot.key}
          duration={interval}
          />
      )}

    </div>
   );
}

export default Dots;
