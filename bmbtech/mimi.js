const { zokou } = require("../framework/zokou");
const axios = require("axios");

// ==================== GPT COMMAND ====================
zokou(
  {
    nomCom: "mimi",
    categorie: "bmb",
    reaction: "🤖",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg, prefixe } = commandeOptions;

    if (!arg || arg.length === 0) {
      return repondre(
        `❌ *Example:* ${prefixe}gpt Hello\n\nPlease provide a text or query for GPT!`
      );
    }

    const query = arg.join(" ");

    try {
      await repondre("⏳ Generating response from GPT...");
      const apiUrl = `https://api.giftedtech.web.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (!response.data?.result) {
        throw new Error("Invalid API response structure");
      }

      await repondre(
        `🤖 *GPT Response:*\n\n${response.data.result}\n\n` +
        `_Powered by_ *B.M.B-XMD_`
      );

    } catch (error) {
      console.error("GPT Error:", error);
      repondre(
        `🚫 *Failed to fetch response!*\nError: ${error.message}`
      );
    }
  }
);

// ==================== NEWSLETTER FORWARD FUNCTION ====================
async function sendForwardedText(zk, dest, ms, text, sender) {
  try {
    // Replace these with your actual newsletter details
    const newsletterDetails = {
      jid: "120363290715861418@newsletter", // Your newsletter JID
      name: "PopkidXtech Official", // Newsletter display name
      messageId: Math.floor(Math.random() * 10000) + 1 // Random message ID
    };

    await zk.sendMessage(
      dest,
      {
        text: text,
        contextInfo: {
          mentionedJid: [sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: newsletterDetails.jid,
            newsletterName: newsletterDetails.name,
            serverMessageId: newsletterDetails.messageId
          }
        }
      },
      { quoted: ms }
    );
    
    console.log("Newsletter-style message sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send newsletter message:", error);
    throw error;
  }
}

// ==================== EXPORT BOTH FUNCTIONS ====================
module.exports = { zokou, sendForwardedText };
