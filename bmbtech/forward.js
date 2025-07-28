
const util = require("util");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

// Contact message for verified context
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "B.M.B VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=254 769 529791 :+254 769 529791\nEND:VCARD"
    }
  }
};

const topDivider = "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓";
const categoryDivider = "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓";

function getBotInfo(mode, totalCommands) {
  moment.tz.setDefault("EAT");
  const currentTime = moment().format("HH:mm:ss");
  const currentDate = moment().format("DD/MM/YYYY");
  const usedRAM = format(os.totalmem() - os.freemem());
  const totalRAM = format(os.totalmem());

  return `
╭───「 *𝐁.𝐌.𝐁-𝐓𝐄𝐂𝐇* 」─────⊛
┃⊛╭───────────────⊛
┃⊛│☢️ *Mode*: ${mode.toUpperCase()}
┃⊛│📅 *Date*: ${currentDate}
┃⊛│⌚ *Time*: ${currentTime} (EAT)
┃⊛│🖥️ *RAM*: ${usedRAM} / ${totalRAM}
┃⊛│📦 *Commands*: ${totalCommands}
┃⊛│✅ *Status*: ONLINE
┃⊛│🌐 *Creator* : 𝙱.𝙼.𝙱-𝚇𝙼𝙳
┃⊛╰━━━━━━━━━━━━━━⊛
╰━━━━━━━━━━━━━━━━━━━━⊛
`;
}

function buildMenu(coms, prefixe) {
  let menu = `\n🧾 *COMMAND INDEX*\n\n`;

  const categoryStyles = {
    General: { icon: "🌐" },
    Group: { icon: "👥" },
    Mods: { icon: "🛡️" },
    Fun: { icon: "🎉" },
    Search: { icon: "🔎" },
    Logo: { icon: "🎨" },
    Utilities: { icon: "🧰" },
    Adult: { icon: "🔞" },
    Download: { icon: "📥" },
  };

  for (const cat in coms) {
    const icon = categoryStyles[cat]?.icon || "✨";
    menu += `\n╭───⟪ ${icon} *${cat.toUpperCase()}* ⟫───╮\n`;

    coms[cat]
      .sort((a, b) => a.localeCompare(b)) // Optional: Sort commands
      .forEach((cmd) => {
        menu += `┃◈┃✪ ${cmd}\n`;
      });

    menu += `╰────────────────────╯\n`;
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

// Send random voice note
async function sendRandomVoiceNote(zk, dest, ms, repondre) {
  const folder = path.join(__dirname, "../bmbtech/");
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
      fileName: `B.M.B VOICE ✧`,
    },
    { quoted: ms }
  );
}

zokou(
  {
    nomCom: "novabmb",
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

      // Random image from /scs folder
      const scsFolder = path.join(__dirname, "../scs");
      const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.jpg$/i.test(f));

      if (images.length === 0) {
        return repondre("❌ No menu images found in /scs folder.");
      }

      const randomImage = images[Math.floor(Math.random() * images.length)];
      const mediaUrl = path.join(scsFolder, randomImage);

      await sendMenuMedia(zk, dest, ms, mediaUrl, finalText, [sender]);
      await sendVoiceNote(zk, dest, ms, repondre);
    } catch (err) {
      console.error(`[DEBUG menu error]: ${err}`);
      repondre(`❌ Failed to load menu:\n${err.message}`);
    }
  }
);
                         
