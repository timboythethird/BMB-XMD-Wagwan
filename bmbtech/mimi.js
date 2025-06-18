const { zokou } = require("../framework/zokou");
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require("node-fetch");

//======================[ VIDEO COMMAND - .mp4 ]======================//
zokou({
  nomCom: "video1",
  aliases: ["video"],
  reaction: "🎥",
  categorie: "main",
  description: "Download YouTube video",
  usage: ".mp4 <Yt url or name>"
}, async (dest, zk, { repondre, arg, ms }) => {
  try {
    const q = arg.join(" ");
    if (!q) return repondre("Please provide a YouTube URL or video name.");

    const result = await ytsearch(q);
    if (!result.results.length) return repondre("No results found!");

    const video = result.results[0];
    const api = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(video.url)}`;
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200 || !json.success || !json.result.download_url) {
      return repondre("Failed to fetch the video. Please try again later.");
    }

    const caption = `📹 *Video Details*\n🎬 *Title:* ${video.title}\n⏳ *Duration:* ${video.timestamp}\n👀 *Views:* ${video.views}\n👤 *Author:* ${video.author.name}\n🔗 *Link:* ${video.url}\n\n*Choose format:*\n1. 📄 Document\n2. ▶️ Normal Video\n\n_Reply 1 or 2_`;

    const contextInfo = {
      mentionedJid: [ms.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363382023564830@newsletter",
        newsletterName: "B.M.B TECH",
        serverMessageId: 0x8f
      }
    };

    // Tuma picha na caption
    const sentMsg = await zk.sendMessage(dest, {
      image: { url: video.thumbnail },
      caption,
      contextInfo
    }, { quoted: ms });

    // Event listener moja kwa reply kwa hii message tu
    const handler = async (update) => {
      const userMsg = update.messages[0];
      if (!userMsg.message?.extendedTextMessage) return;
      const replyText = userMsg.message.extendedTextMessage.text.trim();
      const isReplyToBot = userMsg.message.extendedTextMessage.contextInfo?.stanzaId === sentMsg.key.id;
      if (!isReplyToBot) return;

      // Ongeza reaction
      await zk.sendMessage(dest, {
        react: { text: '⬇️', key: userMsg.key }
      });

      switch (replyText) {
        case "1":
          await zk.sendMessage(dest, {
            document: { url: json.result.download_url },
            mimetype: 'video/mp4',
            fileName: `${video.title}.mp4`,
            contextInfo
          }, { quoted: userMsg });
          break;
        case "2":
          await zk.sendMessage(dest, {
            video: { url: json.result.download_url },
            mimetype: "video/mp4",
            contextInfo
          }, { quoted: userMsg });
          break;
        default:
          await zk.sendMessage(dest, {
            text: "*Please Reply with 1 or 2 only.*"
          }, { quoted: userMsg });
      }

      // Ondoa event listener baada ya reply hii
      zk.ev.off("messages.upsert", handler);
    };

    zk.ev.on("messages.upsert", handler);

  } catch (e) {
    console.error(e);
    repondre("An error occurred. Please try again.");
  }
});

//======================[ AUDIO COMMAND - .song ]======================//
zokou({
  nomCom: "song1",
  aliases: ["ytdl3", "play1"],
  reaction: "🎶",
  categorie: "main",
  description: "Download YouTube song",
  usage: ".song <Yt url or name>"
}, async (dest, zk, { repondre, arg, ms }) => {
  try {
    const q = arg.join(" ");
    if (!q) return repondre("Please provide a YouTube URL or song name.");

    const result = await ytsearch(q);
    if (!result.results.length) return repondre("No results found!");

    const song = result.results[0];
    const api = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(song.url)}`;
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200 || !json.success || !json.result.downloadUrl) {
      return repondre("Failed to fetch the song. Try again later.");
    }

    const caption = `🎵 *Song Details*\n🎶 *Title:* ${song.title}\n⏳ *Duration:* ${song.timestamp}\n👀 *Views:* ${song.views}\n👤 *Author:* ${song.author.name}\n🔗 *Link:* ${song.url}\n\n*Choose format:*\n1. 📄 MP3 Document\n2. 🎧 Audio\n3. 🎙️ Voice Note\n\n_Reply 1, 2 or 3_`;

    const contextInfo = {
      mentionedJid: [ms.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363382023564830@newsletter",
        newsletterName: "B.M.B XMD",
        serverMessageId: 0x8f
      }
    };

    // Tuma picha na caption
    const sentMsg = await zk.sendMessage(dest, {
      image: { url: song.thumbnail },
      caption,
      contextInfo
    }, { quoted: ms });

    // Event listener moja kwa reply hii message tu
    const handler = async (update) => {
      const userMsg = update.messages[0];
      if (!userMsg.message?.extendedTextMessage) return;
      const replyText = userMsg.message.extendedTextMessage.text.trim();
      const isReplyToBot = userMsg.message.extendedTextMessage.contextInfo?.stanzaId === sentMsg.key.id;
      if (!isReplyToBot) return;

      await zk.sendMessage(dest, {
        react: { text: '⬇️', key: userMsg.key }
      });

      switch (replyText) {
        case "1":
          await zk.sendMessage(dest, {
            document: { url: json.result.downloadUrl },
            mimetype: "audio/mpeg",
            fileName: `${song.title}.mp3`,
            contextInfo
          }, { quoted: userMsg });
          break;
        case "2":
          await zk.sendMessage(dest, {
            audio: { url: json.result.downloadUrl },
            mimetype: "audio/mpeg",
            contextInfo
          }, { quoted: userMsg });
          break;
        case "3":
          await zk.sendMessage(dest, {
            audio: { url: json.result.downloadUrl },
            mimetype: "audio/mpeg",
            ptt: true,
            contextInfo
          }, { quoted: userMsg });
          break;
        default:
          await zk.sendMessage(dest, {
            text: "*Invalid reply. Choose 1, 2 or 3 only.*"
          }, { quoted: userMsg });
      }

      // Ondoa event listener baada ya reply hii
      zk.ev.off("messages.upsert", handler);
    };

    zk.ev.on("messages.upsert", handler);

  } catch (e) {
    console.error(e);
    repondre("An error occurred. Please try again.");
  }
});
