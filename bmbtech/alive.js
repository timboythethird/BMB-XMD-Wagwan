const { zokou } = require(__dirname + '/../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
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

  // Random image from /scs/file folder
  const scsFolder = path.join(__dirname, "../scs/file");
  const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.jpg$/i.test(f));
  if (images.length === 0) {
    return zk.sendMessage(dest, { text: "❌ No menu images found in /scs/file." }, { quoted: ms });
  }

  const randomImage = images[Math.floor(Math.random() * images.length)];
  const imagePath = path.join(scsFolder, randomImage);

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
      image: fs.readFileSync(imagePath),
      caption: response,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: set.BOT_NAME || "𝗕.𝗠.𝗕-𝗧𝗘𝗖𝗛 BOT",
          body: "Alive status",
          thumbnail: fs.readFileSync(imagePath),
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
