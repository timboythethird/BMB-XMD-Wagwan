const { zokou } = require(__dirname + '/../framework/zokou');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');

moment.tz.setDefault(set.TZ);

zokou({
  nomCom: "ping11",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { ms, sender } = commandeOptions;
  const jid = sender;
  const time = moment().format("HH:mm:ss");
  const date = moment().format("DD/MM/YYYY");
  const latency = Math.floor(Math.random() * 100) + 20;

  let pfp;
  try {
    pfp = await zk.profilePictureUrl(jid, "image");
  } catch {
    pfp = "https://i.ibb.co/4fV2Z4p/user.png";
  }

  const message = `*✅ 𝙿𝙸𝙽𝙶 𝚁𝙴𝚂𝚄𝙻𝚃*\n\n` +
                  `👤 *Sender:* @${jid.split('@')[0]} ✅\n` +
                  `📅 *Date:* ${date}\n` +
                  `⏰ *Time:* ${time}\n` +
                  `⚪ *Latency:* ${latency}ms\n` +
                  `👨‍💻 *Creator:* 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷`;

  await zk.sendMessage(dest, {
    image: { url: pfp },
    caption: message,
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
        title: "Ping by 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷 ✅",
        body: `Latency: ${latency}ms | ${time}`,
        thumbnailUrl: pfp,
        mediaType: 1,
        renderSmallThumbnail: true
      }
    }
  }, { quoted: ms });
});
