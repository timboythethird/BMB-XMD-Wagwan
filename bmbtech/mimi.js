const util = require("util");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

const topDivider = "❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒";

function getBotInfo(mode, totalCommands) {
  moment.tz.setDefault("Africa/Nairobi");
  const currentTime = moment().format("HH:mm:ss");
  const currentDate = moment().format("YYYY-MM-DD");
  const usedRAM = format(os.totalmem() - os.freemem());
  const totalRAM = format(os.totalmem());

  return `
╭━═「 *B.M.B-TECH* 」═━❂
┃⊛╭────••••────➻
┃⊛│🧑‍💻 *Developer*: @255767862457
┃⊛│☢️ *Mode*: ${mode.toUpperCase()}
┃⊛│📅 *Date*: ${currentDate}
┃⊛│⌚ *Time*: ${currentTime} (EAT)
┃⊛│🖥️ *RAM*: ${usedRAM} / ${totalRAM}
┃⊛│📌 *Commands*: ${totalCommands}
┃⊛│🌐 *Creator*: B.M.B-XMD
┃⊛└────••••────➻
╰─━━━━══──══━━━❂
`;
}

function buildMenu(coms, prefixe) {
  let menu = `\n📜 *COMMAND INDEX*\n`;

  const categoryStyles = {
    General: "🌐",
    Group: "👥",
    Mods: "🛡️",
    Fun: "🎉",
    Search: "🔎",
    Logo: "🎨",
    Utilities: "🧰",
    Adult: "🔞",
    Download: "📥",
  };

  for (const cat in coms) {
    const icon = categoryStyles[cat] || "🌐";
    menu += `\n╭─── ${icon} *${cat.toUpperCase()}* ───╮\n`;

    coms[cat].forEach((cmd) => {
      const line = `${prefixe}${cmd}`;
      const centered = line.padStart((30 + line.length) / 2).padEnd(30);
      menu += `│${centered}│\n`;
    });

    menu += "╰" + "─".repeat(30) + "╯\n";
  }

  menu += `
👨‍💻 *DEVELOPERS*
 ┗ @255767862457 (Main Dev)
 ┗ @255767862457 (BMB Team)

📡 Powered by *B.M.B-TECH SYSTEM*
${topDivider}
`;

  return menu;
}

async function sendMenuMedia(zk, dest, ms, caption, mentions) {
  const mediaPath = path.join(__dirname, "../bot/menu.jpg");

  if (!fs.existsSync(mediaPath)) {
    return zk.sendMessage(dest, { text: "❌ Menu image not found." }, { quoted: ms });
  }

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    mentionedJid: mentions,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter",
      newsletterName: "B.M.B-XMD",
      serverMessageId: 143,
    },
  };

  await zk.sendMessage(
    dest,
    {
      image: { url: mediaPath },
      caption,
      footer: "⚡ BMB-XBOT ⚡",
      mentions,
      contextInfo,
    },
    { quoted: ms }
  );
}

async function sendMenuAudio(zk, dest, ms, repondre) {
  const audioPath = path.join(__dirname, "../bmb/menu1.mp3");

  if (!fs.existsSync(audioPath)) {
    return repondre(`⚠️ Audio file not found: menu1.mp3`);
  }

  await zk.sendMessage(
    dest,
    {
      audio: { url: audioPath },
      mimetype: "audio/mpeg",
      ptt: true,
      fileName: `🎵 Menu Sound`,
    },
    { quoted: ms }
  );
}

zokou(
  {
    nomCom: "menu",
    categorie: "General",
    reaction: "⚡",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");

    let coms = {};
    let mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    for (const com of cm) {
      if (!coms[com.categorie]) coms[com.categorie] = [];
      coms[com.categorie].push(com.nomCom);
    }

    const totalCommands = cm.length;

    try {
      const infoText = getBotInfo(mode, totalCommands);
      const menuText = buildMenu(coms, prefixe);
      const finalText = infoText + menuText;
      const sender = ms.key.participant || ms.key.remoteJid;

      await sendMenuMedia(zk, dest, ms, finalText, [sender]);
      await sendMenuAudio(zk, dest, ms, repondre);
    } catch (err) {
      console.error(`[MENU ERROR]: ${err}`);
      repondre(`❌ Failed to load menu:\n${err.message}`);
    }
  }
);
