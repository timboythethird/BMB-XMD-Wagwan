const axios = require("axios"); const { ytsearch } = require("@dark-yasiya/yt-dl.js"); const { zokou } = require("../framework/zokou");

const newsletterContext = { contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363382023564830@newsletter", newsletterName: "𝜿.𝜬.𝜻-𝜯𝜪𝜽", serverMessageId: 1 } } };

// ================= PLAY ================= zokou({ nomCom: "play", categorie: "download", reaction: "🎵" }, async (dest, zk, { arg, ms, repondre }) => { try { if (!arg || !arg[0]) return repondre("❌ Please provide a YouTube title or URL."); const q = arg.join(" "); const yt = await ytsearch(q); if (yt.results.length < 1) return repondre("❌ No results found!");

const yts = yt.results[0];
const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
const response = await axios.get(apiUrl);
const data = response.data;

if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
  return repondre("❌ Failed to fetch the audio.");
}

const caption = `

🎶 MUSIC DETAILS

🎶 Title: ${yts.title} ⏳ Duration: ${yts.timestamp} 👀 Views: ${yts.views} 👤 Author: ${yts.author.name} 🔗 Link: ${yts.url}

🎵 Enjoy your music! By B.M.B-TECH `;

const thumbMsg = await zk.sendMessage(dest, {
  image: { url: yts.thumbnail },
  caption,
  ...newsletterContext
}, { quoted: ms });

zk.ev.on("messages.upsert", async (msgUpdate) => {
  const msg = msgUpdate.messages[0];
  if (!msg.message || !msg.message.extendedTextMessage) return;
  const selected = msg.message.extendedTextMessage.text.trim();
  if (msg.message.extendedTextMessage.contextInfo?.stanzaId === thumbMsg.key.id) {
    await zk.sendMessage(dest, { react: { text: "⬇️", key: msg.key } });
    if (selected === "1") {
      await zk.sendMessage(dest, {
        document: { url: data.result.downloadUrl },
        mimetype: "audio/mpeg",
        fileName: `${yts.title}.mp3`,
        ...newsletterContext
      }, { quoted: msg });
    } else if (selected === "2") {
      await zk.sendMessage(dest, {
        audio: { url: data.result.downloadUrl },
        mimetype: "audio/mpeg",
        ...newsletterContext
      }, { quoted: msg });
    } else if (selected === "3") {
      await zk.sendMessage(dest, {
        audio: { url: data.result.downloadUrl },
        mimetype: "audio/mpeg",
        ptt: true,
        ...newsletterContext
      }, { quoted: msg });
    } else {
      await zk.sendMessage(dest, {
        text: "*Invalid choice. Reply 1, 2, or 3.*",
      }, { quoted: msg });
    }
  }
});

} catch (e) { console.error(e); repondre("❌ Error occurred. Try again."); } });

// ================= DARMA/VIDEO ================= zokou({ nomCom: "video", alias: ["darama"], categorie: "download", reaction: "🎞️" }, async (dest, zk, { arg, ms, repondre }) => { try { if (!arg || !arg[0]) return repondre("❌ Please provide a YouTube title or URL."); const q = arg.join(" "); const yt = await ytsearch(q); if (yt.results.length < 1) return repondre("❌ No results found!");

const yts = yt.results[0];
const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
const response = await axios.get(apiUrl);
const data = response.data;

if (data.status !== 200 || !data.success || !data.result.download_url) {
  return repondre("❌ Failed to fetch the video.");
}

const caption = `

🎥 VIDEO DETAILS

🎥 Title: ${yts.title} ⏳ Duration: ${yts.timestamp} 👀 Views: ${yts.views} 👤 Author: ${yts.author.name} 🔗 Link: ${yts.url}

Reply 1 = File | 2 = Normal Video By B.M.B-TECH `;

const videoMsg = await zk.sendMessage(dest, {
  image: { url: yts.thumbnail },
  caption,
  ...newsletterContext
}, { quoted: ms });

zk.ev.on("messages.upsert", async (msgUpdate) => {
  const msg = msgUpdate.messages[0];
  if (!msg.message || !msg.message.extendedTextMessage) return;
  const selected = msg.message.extendedTextMessage.text.trim();
  if (msg.message.extendedTextMessage.contextInfo?.stanzaId === videoMsg.key.id) {
    await zk.sendMessage(dest, { react: { text: "⬇️", key: msg.key } });
    if (selected === "1") {
      await zk.sendMessage(dest, {
        document: { url: data.result.download_url },
        mimetype: "video/mp4",
        fileName: `${yts.title}.mp4`,
        ...newsletterContext
      }, { quoted: msg });
    } else if (selected === "2") {
      await zk.sendMessage(dest, {
        video: { url: data.result.download_url },
        mimetype: "video/mp4",
        ...newsletterContext
      }, { quoted: msg });
    } else {
      await zk.sendMessage(dest, {
        text: "*Invalid choice. Reply 1 or 2.*",
      }, { quoted: msg });
    }
  }
});

} catch (e) { console.error(e); repondre("❌ Error occurred. Try again."); } });

  
