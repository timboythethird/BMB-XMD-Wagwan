const { zokou } = require("../framework/zokou");
const { getContentType } = require("@whiskeysockets/baileys");

zokou({ nomCom: "mimi", aliases: ["send", "keep"], categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu } = commandeOptions;

  if (msgRepondu) {
    console.log(msgRepondu);
    let msg;
    try {
      const viewChannelLink = 'https://whatsapp.com/channel/120363382023564830@newsletter';

      if (msgRepondu.imageMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        const caption = `${msgRepondu.imageMessage.caption || ""}\n\n👁️ VIEW CHANNEL\n${viewChannelLink}`;
        msg = { image: { url: media }, caption };
      } else if (msgRepondu.videoMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        const caption = `${msgRepondu.videoMessage.caption || ""}\n\n👁️ VIEW CHANNEL\n${viewChannelLink}`;
        msg = { video: { url: media }, caption };
      } else if (msgRepondu.audioMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = { audio: { url: media }, mimetype: 'audio/mp4' };
      } else if (msgRepondu.stickerMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        const stickerMess = new Sticker(media, {
          pack: 'B.M.B-TECH',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2 };
      } else {
        msg = { text: msgRepondu.conversation };
      }

      await zk.sendMessage(dest, msg, { quoted: msgRepondu });

    } catch (error) {
      console.error("Error processing the message:", error);
      repondre('An error occurred while processing your request.');
    }

  } else {
    repondre('Mention the message that you want to save');
  }
});
