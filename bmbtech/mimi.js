// this is my shit 💀 lemme not find it in your project 
// Thanks chatgpt 😍😍
// reach me before copy pasting it 255716945971

const { zokou } = require("../framework/zokou");
const axios = require("axios");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter",
      newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
      serverMessageId: 1
    }
  }
};

zokou({ nomCom: "videologo1", categorie: "modern-logo", reaction: "✋" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const text = arg.join(" ");

  if (!text) {
    repondre("Please provide a search query.");
    return;
  }

  try {
    // Message content
    const messageText = `Reply with below numbers to generate *${text}* logo

1 ➠ sweet love 💕😘
2 ➠ lightning pubg
3 ➠ intro video 📷
4 ➠ tiger 🐯 video logo

*Enjoy 😂*`;

    const contextInfo = {
      mentionedJid: [ms.sender],
      externalAdReply: {
        title: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
        body: "Regards, 𝙱.𝙼.𝙱-𝚇𝙼𝙳",
        thumbnailUrl: "https://files.catbox.moe/g2brwg.jpg",
        sourceUrl: "https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    };

    const messageToSend = {
      text: messageText,
      contextInfo
    };

    const sentMessage = await zk.sendMessage(dest, messageToSend, { quoted: ms });

    zk.ev.on('messages.upsert', async (update) => {
      const message = update.messages[0];
      if (!message.message || !message.message.extendedTextMessage) return;

      const responseText = message.message.extendedTextMessage.text.trim();
      if (
        message.message.extendedTextMessage.contextInfo &&
        message.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id
      ) {
        let logoUrl;
        switch (responseText) {
          case '1':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html", text);
            break;
          case '2':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html", text);
            break;
          case '3':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html", text);
            break;
          case '4':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html", text);
            break;
          default:
            return repondre("*_Invalid number. Please reply with a valid number._*");
        }

        if (logoUrl) {
          await zk.sendMessage(dest, {
            video: { url: logoUrl },
            mimetype: "video/mp4",
            caption: `*Downloaded by 𝙱.𝙼.𝙱-𝚇𝙼𝙳*`,
            ...newsletterContext
          }, { quoted: ms });
        }
      }
    });
  } catch (error) {
    console.log(error);
    repondre(`Error: ${error}`);
  }
});

const fetchLogoUrl = async (url, name) => {
  try {
    const response = await axios.get(`https://api-pink-venom.vercel.app/api/logo`, {
      params: { url, name }
    });
    return response.data.result.download_url;
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
};
