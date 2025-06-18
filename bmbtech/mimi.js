const util = require("util");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

const topDivider = "❒❒❒❒❒❒❒❒❒❒❒❒❒❒";
const categoryDivider = "❒❒❒❒❒❒❒❒❒❒❒❒";

function getBotInfo(mode, totalCommands) {
  moment.tz.setDefault("EAT");
  const currentTime = moment().format("HH:mm:ss");
  const currentDate = moment().format("DD/MM/YYYY");
  const usedRAM = format(os.totalmem() - os.freemem());
  const totalRAM = format(os.totalmem());

  return `
╭───「 *𝐁.𝐌.𝐁-𝐓𝐄𝐂𝐇* 」─────⊛
┃⊛╭───────────────⊛
┃⊛│☢️ *ᴍᴏᴅᴇ*: ${mode.toUpperCase()}
┃⊛│📅 *ᴅᴀᴛᴇ*: ${currentDate}
┃⊛│⌚ *ᴛɪᴍᴇ*: ${currentTime} (EAT)
┃⊛│🖥️ *ʀᴀᴍ*: ${usedRAM} / ${totalRAM}
┃⊛│📦 *ᴄᴏᴍᴍᴀɴᴅ*: ${totalCommands}
┃⊛│✅ *sᴛᴀᴛᴜs*: ᴏɴʟɪɴᴇ
┃⊛│🌐 *ᴄʀᴇᴀᴛᴏʀ* : 𝙱.𝙼.𝙱-𝚇𝙼𝙳
┃⊛╰━━━━━━━━━━━━━━⊛
╰━━━━━━━━━━━━━━━━━━━━⊛
`;
}

function buildMenu(coms, prefixe) {
  let menu = `\n🧾 *🄲🄾🄼🄼🄰🄽🄳 🄸🄽🄳🄴🅇*\n\n`;

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
    menu += `\n${icon} *${cat.toUpperCase()}*\n`;

    coms[cat].forEach((cmd) => {
      menu += `⚙️ *${prefixe}${cmd}*\n`;
    });

    menu += categoryDivider + "\n";
  }

  menu += `
👨‍💻 *DEVELOPERS*
 *𝐁.𝐌.𝐁-𝐓𝐄𝐂𝐇 BOT*
${topDivider}
`;

  return menu;
}

async function sendMenuMedia(zk, dest, ms, mediaUrl, caption, mentions) {
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

  if (mediaUrl.match(/\.(mp4|gif)$/i)) {
    await zk.sendMessage(
      dest,
      {
        video: { url: mediaUrl },
        caption,
        footer: "⚡ BMB-XBOT ⚡",
        mentions,
        gifPlayback: true,
        contextInfo,
      },
      { quoted: ms }
    );
  } else if (mediaUrl.match(/\.(jpeg|jpg|png)$/i)) {
    await zk.sendMessage(
      dest,
      {
        image: { url: mediaUrl },
        caption,
        footer: "⚡ BMB-XBOT ⚡",
        mentions,
        contextInfo,
      },
      { quoted: ms }
    );
  } else {
    await zk.sendMessage(
      dest,
      {
        text: caption,
        mentions,
        contextInfo,
      },
      { quoted: ms }
    );
  }
}

async function sendVoiceNote(zk, dest, ms, repondre) {
  const voiceURL = "https://files.catbox.moe/mfuyqk.mp3";

  await zk.sendMessage(
    dest,
    {
      audio: { url: voiceURL },
      mimetype: "audio/mpeg",
      ptt: true,
      fileName: `🗣 BMB MENU`,
    },
    { quoted: ms }
  );
}

zokou(
  {
    nomCom: "mimi",
    categorie: "General",
    reaction: "🌚",
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

    try {
      const totalCommands = cm.length;
      const infoText = getBotInfo(mode, totalCommands);
      const menuText = buildMenu(coms, prefixe);
      const finalText = infoText + menuText;
      const sender = ms.key.participant || ms.key.remoteJid;

      const mediaUrl = path.join(__dirname, "../bot/menu.jpg");

      await sendMenuMedia(zk, dest, ms, mediaUrl, finalText, [sender]);
      await sendVoiceNote(zk, dest, ms, repondre);
    } catch (err) {
      console.error(`[DEBUG menu error]: ${err}`);
      repondre(`❌ Failed to load menu:\n${err.message}`);
    }
  }
);
