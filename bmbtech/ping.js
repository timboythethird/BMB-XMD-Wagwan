const { zokou } = require("../framework/zokou");
const s = require("../set");

zokou({
  nomCom: "ping11",
  categorie: "General",
  reaction: "🏓",
}, async (dest, zk, commandeOptions) => {
  const { ms, sender } = commandeOptions;
  const start = Date.now();

  const profilePic = await zk.profilePictureUrl(sender, "image").catch(() =>
    "https://i.ibb.co/0jfxPFB/default.jpg"
  );

  const pingTime = Date.now() - start;
  const senderNum = sender.split("@")[0];

  await zk.sendMessage(dest, {
    image: { url: profilePic },
    caption: `🎯 *Pong:* ${pingTime}ms\n👑 *Creator:* ${s.OWNER_NAME}\n📱 *JID:* ${sender}`,
    contextInfo: {
      mentionedJid: [sender],
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: `✅ VERIFIED USER`,
        body: `Command by @${senderNum}`,
        thumbnailUrl: profilePic,
        showAdAttribution: true,
        sourceUrl: "https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z"
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363382023564830@newsletter",
        newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
        serverMessageId: 1
      }
    }
  }, { quoted: ms });
});
