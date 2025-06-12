const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
  {
    nomCom: 'alive',
    categorie: 'General',
    reaction: "🌲"
  },
  async (dest, zk, { ms, arg, repondre, superUser }) => {
    const data = await getDataFromAlive();
    const time = moment().tz('Etc/GMT').format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363382023564830@newsletter",
        newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
        serverMessageId: 1
      }
    };

    if (!arg || !arg[0]) {
      let aliveMsg;

      if (data) {
        const { message, lien } = data;
        aliveMsg = `B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 bmb tech 𝐢𝐬 𝐀𝐋𝐈𝐕𝐄, Yo!* 🔥\n│❒ *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n│❒ *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n│❒ *📅 𝐃𝐚𝐭𝐞*: ${date}\n│❒ *⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n│❒ *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: ${message}\n│❒ *🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝙱.𝙼.𝙱-𝚇𝙼𝙳*\n◈━━━━━━━━━━━━━━━━◈`;
        try {
          if (lien) {
            if (lien.match(/\.(mp4|gif)$/i)) {
              await zk.sendMessage(dest, {
                video: { url: lien },
                caption: aliveMsg,
                contextInfo
              }, { quoted: ms });
            } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
              await zk.sendMessage(dest, {
                image: { url: lien },
                caption: aliveMsg,
                contextInfo
              }, { quoted: ms });
            } else {
              await zk.sendMessage(dest, {
                text: aliveMsg,
                contextInfo
              }, { quoted: ms });
            }
          } else {
            await zk.sendMessage(dest, {
              text: aliveMsg,
              contextInfo
            }, { quoted: ms });
          }
        } catch (e) {
          console.error("Error:", e);
          repondre(`B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ OOPS! 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 failed to show off: ${e.message} 😡 Try again! 😣\n◈━━━━━━━━━━━━━━━━◈`);
        }
      } else {
        aliveMsg = `B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 bmb tech 𝐢𝐬 𝐀𝐋𝐈𝐕𝐄, Yo!* 🔥\n│❒ *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n│❒ *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n│❒ *📅 𝐃𝐚𝐭𝐞*: ${date}\n│❒ *⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n│❒ *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: Yo, I'm bmb tech, ready to rock! Set a custom vibe with *alive [message];[link]*! 😎\n│❒ *🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝙱.𝙼.𝙱-𝚇𝙼𝙳*\n◈━━━━━━━━━━━━━━━━◈`;
        await zk.sendMessage(dest, {
          text: aliveMsg,
          contextInfo
        }, { quoted: ms });
      }
    } else {
      if (!superUser) {
        repondre(`𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ 🛑 Yo, only 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧 can mess with 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇’s vibe! 😡\n◈━━━━━━━━━━━━━━━━◈`);
        return;
      }

      const [texte, tlien] = arg.join(' ').split(';');
      await addOrUpdateDataInAlive(texte, tlien);
      repondre(`𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ ✅ 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇’s alive message updated! You’re killing it! 🔥\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);
