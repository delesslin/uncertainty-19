import React, {useEffect, useState} from 'react';
import rssURLs from './rssURLs.json'
import getAllFeeds from './getAllFeeds'
import Titles from './Titles'
import styled from '@emotion/styled'
import soonMP3 from './soon.mp3'
import infectionsJSON from './infections.json'
import Sound from 'react-sound'
import Dots from './Dots'
import {useWindowSize} from '@react-hook/window-size'
// based on the 2:55 song
const totalTime = 175000
const days = 67

const App = () => {
  const [titles, setTitles] = useState(null)
  const [width, height] = useWindowSize()
  const [isFinished, setIsFinished] = useState(false)
  const infections = Object.entries(infectionsJSON).map(arr => arr[1])
  console.log(infections)
  useEffect(() => {
    getAllFeeds(rssURLs)
      .then(feeds => {
        return feeds.map(feed => {
          return feed.title
        })
      })
      .then(titles => {
        return titles.sort(() => Math.random() - 0.5)
      })
      .then(results => setTitles(results))
      .catch(console.error)

  }, [])

  const handleFinish = () => {
    setIsFinished(true)
  }
  const StyledHeader = styled.header`
    font-family: 'Titan One', cursive;
    color: white;
    position: fixed;
    display: span;
    font-size: 2em;
    padding: 10px 20px 10px 5px;
    margin-top: 10px;
    z-index:99;
  `
  const StyledApp = styled.div`
    background-color: black;
  `
  if(titles == null){
    return(
      <StyledApp className="app">
        <StyledHeader>UNCERTAINTY-19</StyledHeader>
      </StyledApp>
    )
  }else{
    if(!isFinished){
      return(
        <StyledApp className="app">
          <Sound
            url={soonMP3}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0}
            onFinishedPlaying={handleFinish}
            />
          <StyledHeader>UNCERTAINTY-19</StyledHeader>
          <Titles width={width} height={height} titles={titles} totalTime={totalTime}/>
          <Dots width={width} height={height} totalTime={totalTime} infections={infections} />
        </StyledApp>
      )
    }else{
      const FadingHeader = styled(StyledHeader)`
      opacity: 1;
      animation-name: fadeOut;
      animation-duration: 1000ms;
      @keyframes fadeOut {
        0%{
          opacity: 1;
        }
        100%{
          opacity: 0;
        }
      }
      `
      return(
      <StyledApp className="app">
        <FadingHeader>UNCERTAINTY-19</FadingHeader>
      </StyledApp>
      )
    }
  }
}

export default App;
