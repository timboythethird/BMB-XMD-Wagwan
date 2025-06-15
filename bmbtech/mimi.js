const fs = require('fs-extra');
const path = require('path');
const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter",
      newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
      serverMessageId: 1
    }
  }
};

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

zokou({ nomCom: "menu9", categorie: "General" }, async (dest, zk, commandOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let commandsByCategory = {};
    let mode = (s.MODE.toLowerCase() === "yes") ? "PUBLIC" : "PRIVATE";

    cm.map((com) => {
        if (!commandsByCategory[com.categorie]) commandsByCategory[com.categorie] = [];
        commandsByCategory[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const currentTime = moment().format('HH:mm:ss');
    const currentDate = moment().format('DD/MM/YYYY');

    let infoMessage = `┏━━━⚡ *B.M.B-TECH-V1* ⚡━━━┓
┃ 🔥  Hello, *${nomAuteurMessage}*! 🔥
┣━━━━━━━━━━━━━━━━━━━━━
┃ 📌 *System Info:*
┃ 💻 Platform: *${os.platform()}*
┣━━━━━━━━━━━━━━━━━━━━━
┃ ⚙️ *Bot Status:*
┃ 🔘 Mode: *${mode}*
┃ 🚀 Prefix: *[ ${prefixe} ]*
┃ ⏳ Time: *${currentTime}*
┃ 📆 Date: *${currentDate}*
┣━━━━━━━━━━━━━━━━━━━━━
┃ ${readMore}
┃ 🎩 *Command Menu* 🎩
┣━━━━━━━━━━━━━━━━━━━━━\n`;

    let menuMessage = "";

    for (const category in commandsByCategory) {
        menuMessage += `┣ 🔹 *${category.toUpperCase()}* 🔹\n`;
        for (const cmd of commandsByCategory[category]) {
            menuMessage += `┃   🔸 ${cmd}\n`;
        }
        menuMessage += `┣━━━━━━━━━━━━━━━━━━━━━\n`;
    }

    // Music files from bmb/music folder
    const musicFolder = path.join(__dirname, "music");
    let musicFiles = [];
    try {
        musicFiles = await fs.readdir(musicFolder);
    } catch (err) {
        musicFiles = [];
    }

    if (musicFiles.length > 0) {
        menuMessage += `┣ 🎵 *Music* 🎵\n`;
        for (const file of musicFiles) {
            menuMessage += `┃   🔸 ${file}\n`;
        }
        menuMessage += `┣━━━━━━━━━━━━━━━━━━━━━\n`;
    } else {
        menuMessage += `┣ 🎵 *Music* 🎵\n┃   No music files found\n┣━━━━━━━━━━━━━━━━━━━━━\n`;
    }

    menuMessage += `┗🌟 *𝙱.𝙼.𝙱-𝚇𝙼𝙳 - Developed by the Best!* 🌟`;

    let imageUrl = "https://files.catbox.moe/7wbud7.jpg";

    try {
        await zk.sendMessage(dest, { 
            image: { url: imageUrl }, 
            caption: infoMessage + menuMessage, 
            footer: "© 𝙱.𝙼.𝙱-𝚇𝙼𝙳",
            ...newsletterContext
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e);
    }
});
