const { zokou } = require(__dirname + "/../framework/zokou");
const yts = require("yt-search");
const ytdl = require("ytdl-core");

zokou(
  {
    nomCom: "play9",
    categorie: "Download",
    reaction: "🎵",
  },
  async (dest, zk, { ms, repondre, arg }) => {
    if (!arg) return repondre("Please provide a song name.");
    const search = await yts(arg);
    const video = search.videos[0];
    if (!video) return repondre("Song not found.");
    
    const audioStream = ytdl(video.url, { filter: "audioonly" });

    await zk.sendMessage(dest, {
      audio: { stream: audioStream },
      mimetype: "audio/mpeg",
      ptt: false,
      fileName: `${video.title}.mp3`,
      caption: `🎵 ${video.title}`,
    }, { quoted: ms });
  }
);

zokou(
  {
    nomCom: "video9",
    categorie: "Download",
    reaction: "🎬",
  },
  async (dest, zk, { ms, repondre, arg }) => {
    if (!arg) return repondre("Please provide a video name.");
    const search = await yts(arg);
    const video = search.videos[0];
    if (!video) return repondre("Video not found.");

    const videoStream = ytdl(video.url, { quality: "18" }); // mp4 medium quality

    await zk.sendMessage(dest, {
      video: { stream: videoStream },
      caption: `🎬 ${video.title}`,
    }, { quoted: ms });
  }
);
