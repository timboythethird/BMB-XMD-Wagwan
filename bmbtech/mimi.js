const { zokou } = require("../framework/zokou");
const { getContentType, downloadMediaMessage } = require("@whiskeysockets/baileys");

const jid = "120363382023564830@newsletter"; // Jid ya channel

zokou(
  { nomCom: "mimi", aliases: ["send", "keep"], categorie: "General" },
  async (dest, zk, commandeOptions) => {
    const { repondre, msgRepondu, ms } = commandeOptions;

    if (!msgRepondu) return repondre("❗Reply a view once image or video to use this command.");

    try {
      const viewOnceMsg = msgRepondu.message?.viewOnceMessageV2 || msgRepondu.message?.viewOnceMessage;
      if (!viewOnceMsg) return repondre("❌That is not a view once message.");

      const realMsg = viewOnceMsg.message;
      const type = getContentType(realMsg);

      const mediaBuffer = await zk.downloadMediaMessage(
        { message: msgRepondu.message },
        "buffer"
      );

      const caption = `𝗩𝗜𝗘𝗪 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 🔥\nhttps://whatsapp.com/channel/0029VaoadqE84OmC8xlVsQ1M`;

      if (type === "imageMessage") {
        await zk.sendMessage(jid, {
          image: mediaBuffer,
          caption
        }, { quoted: ms });
      } else if (type === "videoMessage") {
        await zk.sendMessage(jid, {
          video: mediaBuffer,
          caption
        }, { quoted: ms });
      } else {
        return repondre("❌Unsupported view once type.");
      }

      return repondre("✅ View once media sent to channel with caption.");

    } catch (e) {
      console.error("VV ERROR:", e);
      return repondre("❌ Error while processing the view once message.");
    }
  }
);
