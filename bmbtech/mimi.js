const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "mimi",
    categorie: "General",
    reaction: "📤",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, msgRepondu } = commandeOptions;

    if (!msgRepondu) {
      return repondre("Please reply to a message (text, image, video, audio) to post it on your Status.");
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
        return repondre("Unsupported message type. Please reply to text, image, video or audio.");
      }

      // Tuma message kwenye status ya WhatsApp
      await zk.sendMessage("status@broadcast", msgToPost);

      repondre("Message successfully posted to your Status ✅");

    } catch (error) {
      console.error("Error posting to status:", error);
      repondre(`Failed to post to Status. Error: ${error.message}`);
    }
  }
);
