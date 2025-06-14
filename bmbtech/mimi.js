const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "mimi",
  categorie: "General",
  reaction: "📤",
}, async (dest, zk, { repondre, msgRepondu }) => {
  if (!msgRepondu) {
    return repondre("Tafadhali jibu ujumbe unayotaka kuweka kwenye Status.");
  }

  try {
    let msgToPost;

    if (msgRepondu.imageMessage) {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
      msgToPost = { image: { url: media }, caption: msgRepondu.imageMessage.caption || "" };
    } else if (msgRepondu.videoMessage) {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      msgToPost = { video: { url: media }, caption: msgRepondu.videoMessage.caption || "" };
    } else if (msgRepondu.audioMessage) {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
      msgToPost = { audio: { url: media }, mimetype: 'audio/mp4' };
    } else if (msgRepondu.conversation) {
      msgToPost = { text: msgRepondu.conversation };
    } else {
      return repondre("Aina ya ujumbe haijatambuliwa. Tafadhali tumia picha, video, audio au maandishi.");
    }

    await zk.sendMessage("status@broadcast", msgToPost);

    repondre("✅ Ujumbe umechapishwa kwenye Status yako!");

  } catch (error) {
    console.error("Tatizo wakati wa kutuma Status:", error);
    repondre(`❌ Imeshindikana kuweka kwenye Status. Hitilafu: ${error.message}`);
  }
});
