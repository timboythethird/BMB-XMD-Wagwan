const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "ping11",
  categorie: "General",
  reaction: "🏓",
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, sender } = commandeOptions;

  const start = Date.now();
  const profilePicUrl = await zk.profilePictureUrl(sender, "image").catch(() =>
    "https://i.ibb.co/0jfxPFB/default.jpg"
  );

  const pingTime = Date.now() - start;

  const message = {
    image: { url: profilePicUrl },
    caption: `✅ *Pong:* ${pingTime}ms\n👑 *Bot by:* 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷`,
    contextInfo: {
      mentionedJid: [sender],
      forwardingScore: 999,
      isForwarded: true,
      isFromMe: false,
      participant: sender,
      externalAdReply: {
        showAdAttribution: true,
        title: "𝙱.𝙼.𝙱-𝚇𝙼𝙳 VERIFIED ✅",
        body: `.ping by @${sender.split("@")[0]}`,
        thumbnailUrl: profilePicUrl,
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
  };

  await zk.sendMessage(dest, message, { quoted: ms });
});
