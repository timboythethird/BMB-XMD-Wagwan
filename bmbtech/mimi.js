const util = require("util");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

const topDivider = "❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒";
const categoryDivider = "■■■■■■■■■■■■■■■";

function getBotInfo(mode) {
  moment.tz.setDefault("EAT");
  const currentTime = moment().format("HH:mm:ss");
  const usedRAM = format(os.totalmem() - os.freemem());
  const totalRAM = format(os.totalmem());

  return `
╭━═「 *B.M.B-TECH* 」═━❂
┃⊛╭────••••────➻
┃⊛│🧑‍💻 *developer*: @255767862457
┃⊛│☢️ *mode*: ${mode.toUpperCase()}
┃⊛│⌚ *time*: ${currentTime} (EAT)
┃⊛│🖥️ *ram*: ${usedRAM} / ${totalRAM}
┃⊛│ ⚙️ *Status:* ONLINE
┃⊛│🌐 *creator* : 𝙱.𝙼.𝙱-𝚇𝙼𝙳
┃⊛└────••••────➻
╰─━━━━══──══━━━❂
`;
}

function buildMenu(coms, prefixe) {
  let menu = `\n🧾 *COMMAND INDEX*\n\n`;

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
      menu += `┃◈┃✪ *${prefixe}${cmd}*\n`;
    });

    menu += categoryDivider + "\n";
  }

  menu += `
👨‍💻 *DEVELOPERS*
 ┗ @255767862457 (Main Dev)
 ┗ @255767862457 (bmb Team)

📡 Powered by *B.M.B-TECH SYSTEM*
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
      newsletterJid: "120363382023564830@newsletter", // ID ya channel
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

async function sendRandomVoiceNote(zk, dest, ms, repondre) {
  const folder = path.join(__dirname, "../bmb/");
  if (!fs.existsSync(folder)) {
    return repondre(`📁 Audio folder not found at:\n${folder}`);
  }

  const audioFiles = fs.readdirSync(folder).filter((f) => f.endsWith(".mp3"));
  if (!audioFiles.length) {
    return repondre(`⚠️ No audio files found in folder.`);
  }

  const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  const audioPath = path.join(folder, randomAudio);

  await zk.sendMessage(
    dest,
    {
      audio: { url: audioPath },
      mimetype: "audio/mpeg",
      ptt: true,
      fileName: `🗣 BMB VOICE`,
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

    try {
      const infoText = getBotInfo(mode);
      const menuText = buildMenu(coms, prefixe);
      const finalText = infoText + menuText;
      const sender = ms.key.participant || ms.key.remoteJid;
      const mediaUrl = "https://files.catbox.moe/hflcbc.jpg";

      // Tuma picha + menu + view channel
      await sendMenuMedia(zk, dest, ms, mediaUrl, finalText, [sender]);

      // Tuma voice ya random
      await sendRandomVoiceNote(zk, dest, ms, repondre);
    } catch (err) {
      console.error(`[DEBUG menu error]: ${err}`);
      repondre(`❌ Failed to load menu:\n${err.message}`);
    }
  }
);
