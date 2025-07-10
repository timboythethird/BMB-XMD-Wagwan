const { zokou } = require(__dirname + '/../framework/zokou');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');
const path = require("path");
const fs = require("fs");

moment.tz.setDefault(set.TZ || "Africa/Nairobi");

zokou({
  nomCom: "alive",
  categorie: "General",
  reaction: "🟢"
}, async (dest, zk, commandeOptions) => {
  const { ms, sender } = commandeOptions;

  const time = moment().format("HH:mm:ss");
  const date = moment().format("DD/MM/YYYY");

  // Chagua picha randomly kutoka folder ya scs/
  const randomNumber = Math.floor(Math.random() * 10) + 1; // 1 - 10
  const imagePath = path.join(__dirname, "..", "scs", `menu${randomNumber}.jpg`);

  if (!fs.existsSync(imagePath)) {
    return zk.sendMessage(dest, { text: "❌ Menu image not found." }, { quoted: ms });
  }

  const response = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃     𝗕.𝗠.𝗕-𝗧𝗘𝗖𝗛 𝗔𝗟𝗜𝗩𝗘      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 📅 Date    : ${date}      
┃ 🕒 Time    : ${time}      
┃ 👑 Owner   : ${set.OWNER_NAME}   
┃ 🤖 Bot Name: ${set.BOT_NAME}  
┗━━━━━━━━━━━━━━━━━━━━━━━┛`;

  try {
    await zk.sendMessage(dest, {
      image: { url: imagePath },
      caption: response,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: set.BOT_NAME || "𝗕.𝗠.𝗕-𝗧𝗘𝗖𝗛 BOT",
          body: "Alive menu status",
          thumbnailUrl: "https://github.com/bmbxmd1/BMB-DATA/raw/refs/heads/main/background.jpg",
          mediaType: 1,
          renderSmallThumbnail: true,
          showAdAttribution: true
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      }
    }, { quoted: ms });
  } catch (err) {
    console.log("Alive command error:", err);
    await zk.sendMessage(dest, { text: "❌ Alive failed. Check logs." }, { quoted: ms });
  }
});
