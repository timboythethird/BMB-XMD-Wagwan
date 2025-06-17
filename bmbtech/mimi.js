const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const path = require("path");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou(
  { nomCom: "menu11", categorie: "Menu" },
  async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    let coms = {};
    let mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    cm.map((com) => {
      if (!coms[com.categorie]) coms[com.categorie] = [];
      coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Africa/Dar_es_Salaam');
    const time = moment().format('HH:mm:ss');
    const date = moment().format('YYYY-MM-DD');

    let infoMsg = `
╭━═「 *${s.BOT}* 」═━❂
┃◆ Owner   : ${s.OWNER_NAME}
┃◆ Prefix  : [ ${s.PREFIXE} ]
┃◆ Mode    : *${mode}*
┃◆ RAM     : 8/132 GB
┃◆ Date    : *${date}*
┃◆ Platform: ${os.platform()}
┃◆ Commands: ${cm.length}
┃◆ Theme   : BMB
╰─━━━━══──══━━━❂${readmore}
`;

    let menuMsg = `🛠️ B.M.B-XMD Commands Menu:\n`;
    for (const cat in coms) {
      menuMsg += `\n📁 *${cat}*\n────────────────\n`;
      for (const cmd of coms[cat]) {
        menuMsg += `🔹 ${prefixe}${cmd}\n`;
      }
    }

    menuMsg += `\n👑 Developed by B.M.B-XMD`;

    try {
      const imagePath = path.join(__dirname, "../bot/alive.jpg");
      const imageBuffer = fs.readFileSync(imagePath);

      await zk.sendMessage(
        dest,
        {
          image: imageBuffer,
          caption: infoMsg + menuMsg,
          contextInfo: {
            mentionedJid: ["120363382023564830@newsletter"]
          }
        },
        { quoted: ms }
      );
    } catch (error) {
      console.error("Menu error: ", error);
      repondre("❌ Failed to load menu: " + error.message);
    }
  }
);
