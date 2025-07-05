const { zokou } = require(__dirname + '/../framework/zokou');
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');
const { downloadMediaMessage } = require("@whiskeysockets/baileys"); // Hakikisha hii iko kwenye project yako

moment.tz.setDefault(set.TZ || "Africa/Nairobi");

zokou({
  nomCom: "ping2",
  categorie: "General",
  reaction: "🟢"
}, async (dest, zk, commandeOptions) => {
  const { ms, sender } = commandeOptions;

  const time = moment().format("HH:mm:ss");
  const date = moment().format("DD/MM/YYYY");
  const jid = sender;

  const response = `
╭───[ 𝗣𝗜𝗡𝗚 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘 ]───⬣
│ 📅 Date: ${date}
│ 🕒 Time: ${time}
│ 👤 Creator: 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙃
│ 📍 JID: ${jid}
╰───⬣`;

  try {
    // Jaribu kupata profile pic ya mtumiaji
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(sender, "image");
    } catch {
      ppUrl = "https://telegra.ph/file/0c225f7da5616cdcbec80.jpg"; // fallback ikiwa hapatikani
    }

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "✅ Verified User",
          body: "Ping by verified account",
          thumbnailUrl: ppUrl,
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
    console.log("Ping error:", err);
    await zk.sendMessage(dest, {
      text: "❌ Ping failed. Check logs."
    }, { quoted: ms });
  }
});
