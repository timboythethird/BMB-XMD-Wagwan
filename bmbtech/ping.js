const { zokou } = require("../framework/zokou");
const s = require("../set");

zokou({
  nomCom: "ping11",
  categorie: "General",
  reaction: "🏓",
}, async (dest, zk, commandeOptions) => {
  const { ms, sender } = commandeOptions;

  // Anza kupima speed
  const start = Date.now();

  // Jaribu kupata picha ya aliyeandika
  const profilePic = await zk.profilePictureUrl(sender, "image").catch(() =>
    "https://i.ibb.co/0jfxPFB/default.jpg"
  );

  const pingTime = Date.now() - start;
  const senderNum = sender.split("@")[0];

  // Tuma majibu ya ping
  await zk.sendMessage(dest, {
    image: { url: profilePic },
    caption: `🎯 *Pong:* ${pingTime}ms\n👑 *Creator:* ${s.OWNER_NAME}\n🆔 *JID:* ${sender}`,
    contextInfo: {
      mentionedJid: [sender],
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: `✅ VERIFIED USER`,
        body: `Command by @${senderNum}`,
        thumbnailUrl: profilePic,
        mediaType: 1,
        renderLargerThumbnail: true,
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
