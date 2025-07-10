const { zokou } = require('../framework/zokou');
const yts = require("yt-search");
const fs = require('fs');
const { getAudioFromUrl, getVideoFromUrl } = require("../framework/dl/bmb-core");

// SONG COMMAND
zokou({
  nomCom: "song",
  categorie: 'Search',
  reaction: '💿',
  desc: "Search and download YouTube songs"
}, async (dest, zk, { ms, repondre, arg }) => {
  if (!arg[0]) return repondre("Please enter a search term.");

  const searchQuery = arg.join(" ");
  try {
    const result = await yts(searchQuery);
    const videos = result.videos;

    if (videos && videos.length > 0) {
      const video = videos[0];
      const caption = `\n*🎵 Song Title:* ${video.title}\n*⏱ Duration:* ${video.timestamp}\n🔗 *Link:* ${video.url}\n\n_*Downloading...*_`;

      await zk.sendMessage(dest, {
        image: { url: video.thumbnail },
        caption
      }, { quoted: ms });

      const audioPath = await getAudioFromUrl(video.url);
      await zk.sendMessage(dest, {
        audio: { url: audioPath },
        mimetype: "audio/mpeg"
      }, { ptt: false, quoted: ms });

      if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
    } else {
      repondre("No audio found.");
    }
  } catch (error) {
    console.error("Error:", error);
    repondre("❌ An error occurred during the search or download.");
  }
});

// VIDEO COMMAND
zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: '🎥',
  desc: "Search and download YouTube videos"
}, async (dest, zk, { arg, ms, repondre }) => {
  if (!arg[0]) return repondre("Please enter a search term.");

  const searchQuery = arg.join(" ");
  try {
    const result = await yts(searchQuery);
    const videos = result.videos;

    if (videos && videos.length > 0) {
      const video = videos[0];
      const caption = `🎬 *Video Title:* ${video.title}\n⏱ *Duration:* ${video.timestamp}\n🔗 *Link:* ${video.url}\n\n_*Downloading...*_`;

      await zk.sendMessage(dest, {
        image: { url: video.thumbnail },
        caption
      }, { quoted: ms });

      const videoPath = await getVideoFromUrl(video.url);
      await zk.sendMessage(dest, {
        video: { url: videoPath },
        caption: "📽️ Powered by 𝗕.𝗠.𝗕-𝗧𝗘𝗖𝗛",
        gifPlayback: false
      }, { quoted: ms });

      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error:", error);
    repondre("❌ An error occurred during the search or download.");
  }
});
