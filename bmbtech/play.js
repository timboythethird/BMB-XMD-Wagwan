const { zokou } = require("../framework/zokou"); const { ytsearch } = require("@dark-yasiya/yt-dl.js");

const newsletterContext = { contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363382023564830@newsletter", newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳", serverMessageId: 1 } } };

// PLAY - MP3 zokou({ nomCom: "play", categorie: "download", reaction: "🎵" }, async (dest, zk, { ms, arg, repondre }) => { try { if (!arg || !arg[0]) return repondre("Please provide a YouTube URL or song name.");

const yt = await ytsearch(arg.join(" "));
if (!yt.results.length) return repondre("No results found!");

const yts = yt.results[0];
const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
const response = await fetch(apiUrl);
const data = await response.json();

if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
  return repondre("Failed to fetch the audio. Please try again later.");
}

const msg = `🎵 *Song Details*\n🎶 *Title:* ${yts.title}\n⏳ *Duration:* ${yts.timestamp}\n👀 *Views:* ${yts.views}\n👤 *Author:* ${yts.author.name}\n🔗 *Link:* ${yts.url}\n\n*Choose download format:*\n1. 📄 MP3 as Document\n2. 🎧 MP3 as Audio (Play)\n3. 🎙️ MP3 as Voice Note (PTT)`;

const sent = await zk.sendMessage(dest, {
  image: { url: yts.thumbnail },
  caption: msg,
  ...newsletterContext
}, { quoted: ms });

zk.ev.on("messages.upsert", async (msgUpdate) => {
  const incoming = msgUpdate.messages[0];
  if (!incoming.message || !incoming.message.extendedTextMessage) return;

  const choice = incoming.message.extendedTextMessage.text.trim();

  if (
    incoming.message.extendedTextMessage.contextInfo &&
    incoming.message.extendedTextMessage.contextInfo.stanzaId === sent.key.id
  ) {
    switch (choice) {
      case "1":
        await zk.sendMessage(dest, {
          document: { url: data.result.downloadUrl },
          mimetype: "audio/mpeg",
          fileName: `${yts.title}.mp3`,
          ...newsletterContext
        }, { quoted: incoming });
        break;
      case "2":
        await zk.sendMessage(dest, {
          audio: { url: data.result.downloadUrl },
          mimetype: "audio/mpeg"
        }, { quoted: incoming });
        break;
      case "3":
        await zk.sendMessage(dest, {
          audio: { url: data.result.downloadUrl },
          mimetype: "audio/mpeg",
          ptt: true
        }, { quoted: incoming });
        break;
      default:
        await zk.sendMessage(dest, {
          text: "❌ Invalid option. Reply with 1, 2 or 3."
        }, { quoted: incoming });
    }
  }
});

} catch (e) { console.error(e); repondre("An error occurred. Try again later."); } });

// DARAMA - MP4 zokou({ nomCom: "darama", categorie: "download", reaction: "🎥" }, async (dest, zk, { ms, arg, repondre }) => { try { if (!arg || !arg[0]) return repondre("Please provide a YouTube URL or video name.");

const yt = await ytsearch(arg.join(" "));
if (!yt.results.length) return repondre("No results found!");

const yts = yt.results[0];
const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
const response = await fetch(apiUrl);
const data = await response.json();

if (data.status !== 200 || !data.success || !data.result.download_url) {
  return repondre("Failed to fetch the video. Please try again later.");
}

const msg = `🎥 *Video Details*\n🎬 *Title:* ${yts.title}\n⏳ *Duration:* ${yts.timestamp}\n👀 *Views:* ${yts.views}\n👤 *Author:* ${yts.author.name}\n🔗 *Link:* ${yts.url}\n\n*Choose download format:*\n1. 📄 Document (no preview)\n2. ▶️ Normal Video (with preview)`;

const sent = await zk.sendMessage(dest, {
  image: { url: yts.thumbnail },
  caption: msg,
  ...newsletterContext
}, { quoted: ms });

zk.ev.on("messages.upsert", async (msgUpdate) => {
  const incoming = msgUpdate.messages[0];
  if (!incoming.message || !incoming.message.extendedTextMessage) return;

  const choice = incoming.message.extendedTextMessage.text.trim();

  if (
    incoming.message.extendedTextMessage.contextInfo &&
    incoming.message.extendedTextMessage.contextInfo.stanzaId === sent.key.id
  ) {
    switch (choice) {
      case "1":
        await zk.sendMessage(dest, {
          document: { url: data.result.download_url },
          mimetype: "video/mp4",
          fileName: `${yts.title}.mp4`,
          ...newsletterContext
        }, { quoted: incoming });
        break;
      case "2":
        await zk.sendMessage(dest, {
          video: { url: data.result.download_url },
          mimetype: "video/mp4"
        }, { quoted: incoming });
        break;
      default:
        await zk.sendMessage(dest, {
          text: "❌ Invalid option. Reply with 1 or 2."
        }, { quoted: incoming });
    }
  }
});

} catch (e) { console.error(e); repondre("An error occurred. Try again later."); } });

