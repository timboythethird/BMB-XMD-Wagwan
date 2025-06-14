const { zokou } = require("../framework/zokou");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

zokou(
  { nomCom: "mimi", aliases: ["send", "keep"], categorie: "General" },
  async (dest, zk, commandeOptions) => {
    const { repondre, msgRepondu, superUser } = commandeOptions;

    if (msgRepondu) {
      console.log(msgRepondu);
      let msg;
      try {
        // JID ya channel yako ya view-only
        const CHANNEL_JID = "120363382023564830@newsletter";

        if (msgRepondu.imageMessage) {
          const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
          msg = {
            image: { url: media },
            caption: msgRepondu.imageMessage.caption || ""
          };
        } else if (msgRepondu.videoMessage) {
          const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
          msg = {
            video: { url: media },
            caption: msgRepondu.videoMessage.caption || ""
          };
        } else if (msgRepondu.audioMessage) {
          const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
          msg = {
            audio: { url: media },
            mimetype: "audio/mp4"
          };
        } else if (msgRepondu.stickerMessage) {
          const media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
          const stickerMess = new Sticker(media, {
            pack: "B.M.B-TECH",
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent"
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          msg = { sticker: stickerBuffer2 };
        } else {
          msg = { text: msgRepondu.conversation || "Hakuna content ya kutuma." };
        }

        // Tuma kwenye channel (View-Only Newsletter)
        await zk.sendMessage(CHANNEL_JID, msg);

        // Optional: wajulishe kuwa imehifadhiwa
        repondre("✅ Ujumbe umehifadhiwa kwenye channel.");
      } catch (error) {
        console.error("Error processing the message:", error);
        repondre("⚠️ Tatizo limetokea wakati wa kutuma kwenye channel.");
      }
    } else {
      repondre("🔖 Tafadhali jibu (reply) ujumbe unaotaka kuhifadhi.");
    }
  }
);
            
