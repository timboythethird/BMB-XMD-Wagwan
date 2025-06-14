const { zokou } = require("../framework/zokou");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

const jid = "120363382023564830@newsletter"; // CHANNEL ID

zokou(
  { nomCom: "vv", aliases: ["send", "keep"], categorie: "General" },
  async (dest, zk, commandeOptions) => {
    const { repondre, msgRepondu } = commandeOptions;

    if (!msgRepondu) return repondre("❗ Reply to a view once message (image/video).");

    try {
      const type = getContentType(msgRepondu.message);
      const caption = `𝗩𝗜𝗘𝗪 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 🔥\nhttps://whatsapp.com/channel/0029VaoadqE84OmC8xlVsQ1M`;

      let msg;

      if (type === "viewOnceMessageV2" || type === "viewOnceMessage") {
        const innerType = getContentType(msgRepondu.message[type].message);
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu);

        if (innerType === "imageMessage") {
          msg = {
            image: { url: media },
            caption
          };
        } else if (innerType === "videoMessage") {
          msg = {
            video: { url: media },
            caption
          };
        } else {
          return repondre("❌ Unsupported view once media type.");
        }
      } else {
        return repondre("❌ That’s not a view once message.");
      }

      await zk.sendMessage(jid, msg);
      repondre("✅ View once media forwarded with caption!");

    } catch (e) {
      console.error("VV command error:", e);
      repondre("❌ Failed to process view once media.");
    }
  }
);
