const { zokou } = require(__dirname + '/../framework/zokou');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');

moment.tz.setDefault(set.TZ);

zokou({
  nomCom: "ping11",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  let { ms, sender } = commandeOptions;

  const time = moment().format("HH:mm:ss");
  const date = moment().format("DD/MM/YYYY");
  const latency = Math.floor(Math.random() * 100) + 1;
  const jid = sender;

  try {
    await zk.sendMessage(dest, {
      text: `*✅ 𝙿𝙸𝙽𝙶 𝚁𝙴𝚂𝚄𝙻𝚃*\n\n` +
            `👤 *Sender:* @${jid.split("@")[0]} ✅\n` +
            `📅 *Date:* ${date}\n` +
            `⏰ *Time:* ${time}\n` +
            `⚪ *Ping:* ${latency} ms\n` +
            `👨‍💻 *Creator:* 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷`,
      mentions: [jid],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
          serverMessageId: 1
        },
        externalAdReply: {
          title: "𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷 Verified ✅",
          body: `Latency: ${latency}ms | ${time}`,
          thumbnailUrl: "https://files.catbox.moe/hflcbc.jpg",
          mediaType: 1,
          renderSmallThumbnail: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error("Ping error:", error);
    await repondre("❌ Ping failed.");
  }
});
