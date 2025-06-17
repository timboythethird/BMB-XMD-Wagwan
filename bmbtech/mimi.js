const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

const topDivider = "❒❒❒❒❒❒❒❒❒❒❒";
const categoryDivider = "❒❒❒❒❒❒❒❒❒❒❒❒";

function getBotInfo(mode, commandCount) {
  moment.tz.setDefault("Africa/Dar_es_Salaam");
  const currentTime = moment().format("HH:mm:ss");
  const currentDate = moment().format("YYYY-MM-DD");
  const usedRAM = format(os.totalmem() - os.freemem());
  const totalRAM = format(os.totalmem());

  return `
╭━═「 *B.M.B-TECH* 」═━❂
┃📅 *Date*: ${currentDate}
┃⌚ *Time*: ${currentTime} (EAT)
┃📦 *Total Commands*: ${commandCount}
┃☢️ *Mode*: ${mode.toUpperCase()}
┃🖥️ *RAM Usage*: ${usedRAM} / ${totalRAM}
┃🌐 *Developer*: 𝙱.𝙼.𝙱-𝚇𝙼𝙳
╰─━━━━══──══━━━❂
`;
}

function buildMenu(coms, prefix) {
  let menu = `\n🧾 *COMMAND INDEX*\n\n`;

  const categoryIcons = {
    General: "🌐", Group: "👥", Mods: "🛡️", Fun: "🎉",
    Search: "🔎", Logo: "🎨", Utilities: "🧰",
    Adult: "🔞", Download: "📥",
  };

  for (const category in coms) {
    const icon = categoryIcons[category] || "🌐";
    menu += `\n${icon} *${category.toUpperCase()}*\n`;
    coms[category].forEach(cmd => {
      menu += `⚙️ *${prefix}${cmd}*\n`;
    });
    menu += categoryDivider + "\n";
  }

  menu += `\n *POWERED BY B.M.B-TECH*\n${topDivider}\n`;
  return menu;
}

async function sendMenuImage(zk, dest, ms, imagePath, caption, mentions) {
  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    mentionedJid: mentions,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter",
      newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
      serverMessageId: 143,
    },
  };

  if (!fs.existsSync(imagePath)) {
    return zk.sendMessage(dest, {
      text: "❌ Menu image not found.",
      mentions,
      contextInfo,
    }, { quoted: ms });
  }

  await zk.sendMessage(dest, {
    image: { url: imagePath },
    caption,
    footer: "⚡ BMB-XBOT ⚡",
    mentions,
    contextInfo,
  }, { quoted: ms });
}

async function sendFixedVoice(zk, dest, ms, reply) {
  const audioPath = path.join(__dirname, "../bmb/menu1.mp3");
  if (!fs.existsSync(audioPath)) {
    return reply("❌ Voice note not found at: bmb/menu1.mp3");
  }

  await zk.sendMessage(dest, {
    audio: { url: audioPath },
    mimetype: "audio/mpeg",
    ptt: true,
    fileName: "🗣 BMB VOICE",
  }, { quoted: ms });
}

zokou({
  nomCom: "menu7",
  categorie: "General",
  reaction: "⚡",
}, async (dest, zk, options) => {
  const { ms, repondre: reply, prefixe: prefix } = options;
  const { cm } = require(__dirname + "/../framework/zokou");

  let commands = {};
  const mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

  for (const command of cm) {
    if (!commands[command.categorie]) commands[command.categorie] = [];
    commands[command.categorie].push(command.nomCom);
  }

  try {
    const commandCount = cm.length;
    const infoText = getBotInfo(mode, commandCount);
    const menuText = buildMenu(commands, prefix);
    const finalText = infoText + menuText;
    const sender = ms.key.participant || ms.key.remoteJid;

    const imagePath = path.join(__dirname, "../bot/menu.jpg");

    await sendMenuImage(zk, dest, ms, imagePath, finalText, [sender]);
    await sendFixedVoice(zk, dest, ms, reply);
  } catch (err) {
    console.error(`[MENU ERROR]: ${err}`);
    reply(`❌ Error generating menu:\n${err.message}`);
  }
});
