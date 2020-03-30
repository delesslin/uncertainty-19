import Parser from 'rss-parser'
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

// takes an RSS URL and returns an array of news items
const getRSS = async (rssURL) => {
  const parser = new Parser()
  const rssObj = await parser.parseURL(CORS_PROXY + rssURL)
  return rssObj.items
}

const getAllFeeds = async (feedsArray) => {
  let allFeeds = []
  for(const feed of feedsArray){
    try{
      let contents = await getRSS(feed)
      allFeeds = [...allFeeds, ...contents]
    }catch(err){
      console.error(`whoops looks like ${feed} didn't work`)
    }
  }
  return allFeeds
}

export default getAllFeeds
