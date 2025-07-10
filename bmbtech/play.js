const axios = require("axios");
const yts = require("yt-search");
const { zokou } = require("../framework/zokou");

//================= AUDIO - .play =================

zokou({
  nomCom: "play",
  categorie: "download",
  reaction: "🎵"
}, async (dest, zk, { arg, ms, repondre }) => {
  try {
    if (!arg || !arg[0]) return repondre("❌ Please give me a title or URL.");
    const q = arg.join(" ");
    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;

    const desc = `
*⫷⦁B.M.B-XMD MUSⵊC DOWNLOADⵊNG⦁⫸*

🎵 *MUSIC FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *ENJOY THE MUSIC!*
_By 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷_
`;

    await zk.sendMessage(dest, { image: { url: data.thumbnail }, caption: desc }, { quoted: ms });

    const apiRes = await axios.get(`https://api.giftedtech.web.id/api/download/ytmp3?apikey=gifted&url=${encodeURIComponent(url)}`);
    const json = apiRes.data;

    if (!json.success) return repondre("❌ Failed to fetch audio from API.");

    const downloadUrl = json.result.download_url;

    await zk.sendMessage(dest, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: ms });
    await zk.sendMessage(dest, {
      document: { url: downloadUrl },
      mimetype: "audio/mpeg",
      fileName: json.result.title + ".mp3",
      caption: "*© B.M.B-XMD*"
    }, { quoted: ms });

  } catch (e) {
    console.error(e);
    repondre("❌ Error occurred, try again.");
  }
});

//================= VIDEO - .darama =================

zokou({
  nomCom: "darama",
  alias: ["video"],
  categorie: "download",
  reaction: "🎥"
}, async (dest, zk, { arg, ms, repondre }) => {
  try {
    if (!arg || !arg[0]) return repondre("❌ Please give me a title or URL.");
    const q = arg.join(" ");
    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;

    const desc = `
*⫷⦁B.M.B-XMD VⵊDEO DOWNLOADⵊNG⦁⫸*

🎥 *VIDEO FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *ENJOY THE VIDEO!*
_By 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷_
`;

    await zk.sendMessage(dest, { image: { url: data.thumbnail }, caption: desc }, { quoted: ms });

    const apiRes = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(url)}`);
    const json = apiRes.data;

    if (!json.success) return repondre("❌ Failed to fetch video from API.");

    const downloadUrl = json.result.download_url;

    await zk.sendMessage(dest, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: ms });
    await zk.sendMessage(dest, {
      document: { url: downloadUrl },
      mimetype: "video/mp4",
      fileName: json.result.title + ".mp4",
      caption: "*© B.M.B-XMD*"
    }, { quoted: ms });

  } catch (e) {
    console.error(e);
    repondre("❌ Error occurred, try again.");
  }
});
