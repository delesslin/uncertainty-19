// TODO: Timing
// TODO: color
// TODO: font-family style
// TODO: SWITCH FROM GRID TO POSITION

import React from 'react';
import shortid from 'shortid'
import styled from '@emotion/styled'
import TitleCard from './TitleCard.js'

import randomInt from 'random-int';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  background-color: black;
`



const Titles = ({titles, totalTime, width, height}) => {





  return (
    <Container className="titles">
      {titles.map(title => {
      return <TitleCard
              x={randomInt(0, width)}
              y={randomInt(0, height)}
              width={randomInt(20, width*.65)}
              totalTime={totalTime}
              key={shortid()}>{title}</TitleCard>
      })}
    </Container>
   );
}


export default Titles;
