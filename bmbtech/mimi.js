const { zokou } = require("../framework/zokou");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

const jid = "120363382023564830@newsletter"; // Channel JID

zokou(
  { nomCom: "mimi", aliases: ["send", "keep"], categorie: "General" },
  async (dest, zk, commandeOptions) => {
    const { repondre, msgRepondu } = commandeOptions;

    if (!msgRepondu) return repondre("❗ Reply to a message to forward it to the channel.");

    try {
      let msg;
      const contentType = getContentType(msgRepondu.message);

      // Media caption helper
      const captionText = `𝗩𝗜𝗘𝗪 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 🔥\nhttps://whatsapp.com/channel/0029VaoadqE84OmC8xlVsQ1M`;

      if (contentType === "imageMessage") {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu, "image");
        msg = {
          image: { url: media },
          caption: captionText
        };
      } else if (contentType === "videoMessage") {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu, "video");
        msg = {
          video: { url: media },
          caption: captionText
        };
      } else if (contentType === "audioMessage") {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu, "audio");
        msg = {
          audio: { url: media },
          mimetype: "audio/mp4"
        };
      } else if (contentType === "stickerMessage") {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu, "sticker");
        const stickerMess = new Sticker(media, {
          pack: 'B.M.B-TECH',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent"
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2 };
      } else if (msgRepondu.message?.conversation) {
        msg = { text: msgRepondu.message.conversation + `\n\n${captionText}` };
      } else {
        return repondre("❌ Unsupported message type.");
      }

      await zk.sendMessage(jid, msg);
      repondre("✅ Message sent to channel successfully!");

    } catch (error) {
      console.error("VV command error:", error);
      repondre("❌ Failed to forward message to channel.");
    }
  }
);
