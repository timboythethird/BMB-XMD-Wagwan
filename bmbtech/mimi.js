const { timoth } = require("../timnasa/timoth"); 
const axios = require('axios'); 
const ytSearch = require('yt-search'); 
const conf = require(__dirname + '/../set'); 
const { Catbox } = require("node-catbox"); 
const fs = require('fs-extra'); 
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys'); 

timoth({ 
  nomCom: "p", 
  aliases: ["song", "playdoc", "audio", "mp3"], 
  categorie: "download", 
  reaction: "🎧" 
}, async (dest, zk, commandOptions) => { 
  const { arg, ms, repondre } = commandOptions; 

  if (!arg[0]) { 
    return repondre("Please provide a song name."); 
  } 

  const query = arg.join(" "); 

  try { 
    const searchResults = await ytSearch(query); 

    if (!searchResults || !searchResults.videos.length) { 
      return repondre('No song found for the specified query.'); 
    } 

    const firstVideo = searchResults.videos[0]; 
    const videoUrl = firstVideo.url; 

    const getDownloadData = async (url) => { 
      try { 
        const response = await axios.get(url); 
        return response.data; 
      } catch (error) { 
        console.error('Error fetching data from API:', error); 
        return { success: false }; 
      } 
    }; 

    const apis = [ 
      `https:                                                                                  
      `//api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`, 
      `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`, 
      `https:                                                                                
      `//www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`, 
      `https://api.giftedtech.web.id/api/download/dlmp3?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`, 
      `https:                                                                       
    ]; 

    let downloadData; 
    for (const api of apis) { 
      downloadData = await getDownloadData(api); 
      if (downloadData && downloadData.success) break; 
    } 

    if (!downloadData || !downloadData.success) { 
      return repondre('Failed to retrieve download URL from all sources. Please try again later.'); 
    } 

    const downloadUrl = downloadData.result.download_url; 
    const videoDetails = downloadData.result; 

    const buttons = [
      { buttonId: 'audio', buttonText: { displayText: 'Audio' } },
      { buttonId: 'document', buttonText: { displayText: 'Document' } },
      { buttonId: 'video', buttonText: { displayText: 'Video' } },
      { buttonId: 'vidocument', buttonText: { displayText: 'Vidocument' } },
    ];

    const buttonMessage = {
      contentText: 'Select a format:',
      footerText: 'Powered by Makamesco',
      buttons,
      headerType: 1,
    };

    const response = await zk.sendMessage(dest, buttonMessage, { quoted: ms });

    zk.on('message', async (message) => {
      if (message.key.remoteJid === dest && message.message.buttonsResponseMessage) {
        const selectedButton = message.message.buttonsResponseMessage.selectedButtonId;

        switch (selectedButton) {
          case 'audio':
            await zk.sendMessage(dest, { 
              caption: `//api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(videoUrl)}` 
    ]; 

    let downloadData; 
    for (const api of apis) { 
      downloadData = await getDownloadData(api); 
      if (downloadData && downloadData.success) break; 
    } 

    if (!downloadData || !downloadData.success) { 
      return repondre('Failed to retrieve download URL from all sources. Please try again later.'); 
    } 

    const downloadUrl = downloadData.result.download_url; 
    const videoDetails = downloadData.result; 

    const buttons = [
      { buttonId: 'audio', buttonText: { displayText: 'Audio' } },
      { buttonId: 'document', buttonText: { displayText: 'Document' } },
      { buttonId: 'video', buttonText: { displayText: 'Video' } },
      { buttonId: 'vidocument', buttonText: { displayText: 'Vidocument' } },
    ];

    const buttonMessage = {
      contentText: 'Select a format:',
      footerText: 'Powered by Makamesco',
      buttons,
      headerType: 1,
    };

    const response = await zk.sendMessage(dest, buttonMessage, { quoted: ms });

    zk.on('message', async (message) => {
      if (message.key.remoteJid === dest && message.message.buttonsResponseMessage) {
        const selectedButton = message.message.buttonsResponseMessage.selectedButtonId;

        switch (selectedButton) {
          case 'audio':
            await zk.sendMessage(dest, { 
              caption: `\n*AUDIOS*\n audio `, 
              audio: { url: downloadUrl }, 
              mimetype: 'audio/mp4', 
              contextInfo: { 
                externalAdReply: { 
                  title: conf.BOT, 
                  body: videoDetails.title, 
                  mediaType: 1, 
                  sourceUrl: conf.GURL, 
                  thumbnailUrl: firstVideo.thumbnail, 
                  renderLargerThumbnail: false, 
                  showAdAttribution: true, 
                }, 
              }, 
            }, { quoted: ms });
            break;
          case 'document':
            await zk.sendMessage(dest, { 
              caption: `\n*AUDIOS*\n audio `, 
              document: { url: downloadUrl }, 
              mimetype: 'audio/mpeg', 
              contextInfo: { 
                externalAdReply: { 
                  title: conf.BOT, 
                  body: videoDetails.title, 
                  mediaType: 1,
           },
        },
      }
    ];

    // Send the download link to the user for each payload
    for (const messagePayload of messagePayloads) {
      await zk.sendMessage(dest, messagePayload, { quoted: ms });
    }

  } catch (error) {
    console.error('Error during download process:', error);
    return repondre(`Download failed due to an error: ${error.message || error}`);
  }
})
      
