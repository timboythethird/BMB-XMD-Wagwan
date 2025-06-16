// Menu mpya ya kipekee kabisa
const moment = require("moment-timezone");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { zokou } = require(__dirname + "/../framework/zokou");
const s = require(__dirname + "/../set");

function getNewBotInfo(mode) {
  moment.tz.setDefault("Africa/Dar_es_Salaam");
  const time = moment().format("dddd, HH:mm");
  const memory = `${(os.totalmem() - os.freemem()) / 1024 / 1024}MB / ${os.totalmem() / 1024 / 1024}MB`;
  
  return `
📘 *SYSTEM OVERVIEW*
┌─🔹 Mode: ${mode.toUpperCase()}
├─🕒 Time: ${time}
├─💾 Memory: ${memory}
└─⚙️ Powered by: BMB-XMD
`;
}

function buildNewMenu(coms, prefixe) {
  let output = "\n📂 *COMMAND HUB*\n";

  for (const cat in coms) {
    output += `\n🗂️ ${cat}\n`;
    coms[cat].forEach((cmd, i) => {
      output += `  ${i + 1}. ${prefixe}${cmd}\n`;
    });
  }

  output += `
📞 *Support Dev:* wa.me/255767862457
🔗 *System Link:* github.com/bmb200/B.M.B-XMD
`;

  return output;
}

zokou(
  {
    nomCom: "menu",
    categorie: "General",
    reaction: "🧭",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");

    const mode = s.MODE.toLowerCase() !== "yes" ? "Private" : "Public";
    let coms = {};

    for (const com of cm) {
      if (!coms[com.categorie]) coms[com.categorie] = [];
      coms[com.categorie].push(com.nomCom);
    }

    const info = getNewBotInfo(mode);
    const menu = buildNewMenu(coms, prefixe);
    const finalMsg = info + "\n" + menu;

    await zk.sendMessage(dest, { text: finalMsg }, { quoted: ms });
  }
);
