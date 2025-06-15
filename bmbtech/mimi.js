const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const s = require("../set");

zokou({ 
  nomCom: "deployer2", 
  categorie: "General",
  reaction: "💙",
  desc: "Show bot deployer information"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, nomAuteurMessage, mybotpic } = commandeOptions;

  // Set timezone and format
  moment.tz.setDefault('Etc/GMT');
  const temps = moment().format('HH:mm:ss');
  const date = moment().format('DD/MM/YYYY');

  // Create information message
  const infoMsg = `*Hello ${nomAuteurMessage || "User"}!*\n\n` +
                 `*Deployer Information:*\n` +
                 `• *Name:* ${s.OWNER_NAME}\n` +
                 `• *Date:* ${date}\n` +
                 `• *Time:* ${temps}\n\n` +
                 `> *Powered by bmb tech*`;

  try {
    const mediaUrl = await mybotpic();

    const contextJid = {
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

    if (mediaUrl) {
      if (mediaUrl.match(/\.(mp4|gif)$/i)) {
        await zk.sendMessage(dest, {
          video: { url: mediaUrl },
          caption: infoMsg,
          gifPlayback: true,
          ...contextJid
        }, { quoted: ms });
      } else if (mediaUrl.match(/\.(jpeg|png|jpg)$/i)) {
        await zk.sendMessage(dest, {
          image: { url: mediaUrl },
          caption: infoMsg,
          ...contextJid
        }, { quoted: ms });
      } else {
        await repondre(infoMsg);
      }
    } else {
      await repondre(infoMsg);
    }
  } catch (e) {
    console.error("Deployer Command Error:", e);
    await repondre("❌ An error occurred while processing the command");
  }
});
