const { zokou } = require(__dirname + '/../framework/zokou');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');

moment.tz.setDefault(set.TZ || "Africa/Nairobi");

zokou({
  nomCom: "alive",
  categorie: "General",
  reaction: "🟢"
}, async (dest, zk, commandeOptions) => {
  const { ms, sender } = commandeOptions;

  const time = moment().format("HH:mm:ss");
  const date = moment().format("DD/MM/YYYY");

  let pfpUrl;
  try {
    pfpUrl = await zk.profilePictureUrl(sender, "image");
  } catch {
    pfpUrl = "https://telegra.ph/file/8b8c6d6d95b3f34e88db8.jpg";
  }

  const response = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃      𝗕.𝗠.𝗕-𝗧𝗘𝗖𝗛 𝗔𝗟𝗜𝗩𝗘     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 📅 Date    : ${date}      
┃ 🕒 Time    : ${time}      
┃ 👑 Owner   : ${set.OWNER_NAME}   
┃ 🤖 Bot Name: ${set.BOT_NAME || "B.M.B-XMD"}  
┃ 💻 Platform: ${set.PLATFORM || "Node.js"}  
┗━━━━━━━━━━━━━━━━━━━━━━━┛`;

  try {
    await zk.sendMessage(dest, {
      image: { url: pfpUrl },
      caption: response,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: set.BOT_NAME || "𝗕.𝗠.𝗕-𝗧𝗘𝗖𝗛 𝗕𝗢𝗧",
          body: "Alive response from the system",
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
    console.log("Alive error:", err);
    await zk.sendMessage(dest, { text: "❌ Alive command failed. Check logs." }, { quoted: ms });
  }
});
