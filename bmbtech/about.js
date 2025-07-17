const fs = require('fs');
const path = require('path');
const moment = require("moment-timezone");
const { zokou } = require(__dirname + "/../framework/zokou");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const Taphere = more.repeat(4001);

zokou({ nomCom: "about", categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;

  moment.tz.setDefault("Africa/Nairobi");
  const temps = moment().format('HH:mm:ss');
  const date = moment().format('DD/MM/YYYY');

  const infoMsg = `┏━━━━━━━━━━━━━━━━━━
┃ 👋 Hello: *${ms.pushName}*
┃ 🤖 Bot: *${s.BOT}*
┃ 🧩 Version: 3.5
┃ 📍 Prefix: ${s.PREFIXE}
┃ 🔓 Mode: ${(s.MODE || "").toLowerCase() === "yes" ? "public" : "private"}
┃ 👑 Owner: ${s.OWNER_NAME}
┃ 💾 Ram: 8/132 GB
┃ 🖥️ Platform: chrome(lunix)
┃ 🟢 Status: *${s.BOT}* is alive
┃ ⏰ Time: ${temps}
┃ 📅 Date: ${date}
┃ 🎨 Theme: *${s.BOT}*
┃ 🧠 Library: Linux
┃ 📡 Pong: 320ms
┗━━━━━━━━━━━━━━━━━

Thanks for choosing *${s.BOT}*
I'm here to make your work easier.

> *𝗠𝗮𝗱𝗲 𝗯𝘆 𝗕.𝗠.𝗕-𝗫𝗠𝗗*
`;

  try {
    // Chagua picha random kutoka scs/
    const scsFolder = path.join(__dirname, "../scs");
    const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.jpg$/i.test(f));
    if (!images.length) return repondre("❌ Hakuna picha zilizopatikana kwenye folder la /scs");

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imagePath = path.join(scsFolder, randomImage);

    await zk.sendMessage(dest, {
      image: fs.readFileSync(imagePath),
      caption: infoMsg,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [ms.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      }
    }, { quoted: ms });

  } catch (e) {
    console.error("🥵 Menu error:", e);
    repondre("🥵 Menu error: " + e.message);
  }
});
