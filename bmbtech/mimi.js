const { zokou } = require("../framework/zokou");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

zokou({ nomCom: "vv4", aliases: ["send", "keep"], categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, superUser } = commandeOptions;

  if (msgRepondu) {
    console.log(msgRepondu);
    let msg;
    try {
      const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      };

      if (msgRepondu.imageMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        msg = {
          image: { url: media },
          caption: msgRepondu.imageMessage.caption || "",
          contextInfo
        };
      } else if (msgRepondu.videoMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        msg = {
          video: { url: media },
          caption: msgRepondu.videoMessage.caption || "",
          gifPlayback: true,
          contextInfo
        };
      } else if (msgRepondu.audioMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = {
          audio: { url: media },
          mimetype: 'audio/mp4',
          contextInfo
        };
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
        msg = {
          text: msgRepondu.conversation,
          contextInfo
        };
      }

      await zk.sendMessage(dest, msg);

    } catch (error) {
      console.error("Error processing the message:", error);
      repondre('An error occurred while processing your request.');
    }

  } else {
    repondre('Mention the message that you want to save');
  }
});
