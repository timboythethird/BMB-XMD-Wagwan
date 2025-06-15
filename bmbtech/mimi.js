const { zokou } = require('../framework/zokou');
//const { zokou } = require("../framework/zokou");
const axios = require('axios');

// Lyrics Command
zokou({
  'nomCom': "lyrics4",
  'reaction': '🗞',
  'categorie': "Search"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const { repondre, arg, ms } = _0x5047e1;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide the song name.");
    }
    
    const songName = arg.join(" ");
    
    // Lyrics API (adjust to your desired service)
    const lyricsUrl = `https://api.giftedtech.web.id/api/search/lyrics?apikey=gifted&query=${encodeURIComponent(songName)}`;
    const response = await axios.get(lyricsUrl);
    
    // Log the response for debugging
    console.log("Lyrics API Response:", response.data);

    if (response.data && response.data.lyrics) {
      repondre(`Lyrics for "${songName}":\n\n${response.data.lyrics}`);
    } else {
      repondre(`I did not find any lyrics for "${songName}". Try searching a different song.`);
    }
  } catch (err) {
    repondre("An error occurred while fetching lyrics. Please try again.");
    console.log(err);
  }
});

// Short URL Command (for link shortening)
zokou({
  'nomCom': "shorturl",
  'reaction': '🔗',
  'categorie': "Tools"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const { repondre, arg, ms } = _0x5047e1;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide a URL to shorten.");
    }
    
    const urlToShorten = arg.join(" ");
    const shortUrlApiUrl = `https://api.giftedtech.web.id/api/tools/shorturl?apikey=gifted&url=${encodeURIComponent(urlToShorten)}`;
    const response = await axios.get(shortUrlApiUrl);
    
    // Log the short URL API response for debugging
    console.log("Short URL API Response:", response.data);

    if (response.data && response.data.result) {
      repondre(`Shortened URL: ${response.data.result}`);
    } else {
      repondre("Could not shorten the URL. Please try again.");
    }
  } catch (err) {
    repondre("An error occurred while shortening the URL. Please try again.");
    console.log(err);
  }
});

// XNXX Video Command (search by name, not URL)
zokou({
  'nomCom': "xnxx1",
  'reaction': '🎬',
  'categorie': "Download"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const { repondre, arg, ms } = _0x5047e1;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide a video name to search.");
    }
    
    const videoName = arg.join(" ");
    
    // XNXX API to search video by name
    const xnxxSearchUrl = `https://api.giftedtech.web.id/api/download/xnxxdl?apikey=gifted&url=https://www.xnxx.health/search/${encodeURIComponent(videoName)}`;
    const response = await axios.get(xnxxSearchUrl);

    // Log the video download API response for debugging
    console.log("XNXX Video API Response:", response.data);

    if (response.data && response.data.result) {
      repondre(`Video Download Link for "${videoName}": ${response.data.result}`);
    } else {
      repondre("Could not find a video for the given name. Please try a different one.");
    }
  } catch (err) {
    repondre("An error occurred while fetching the video. Please try again.");
    console.log(err);
  }
});
          
