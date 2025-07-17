const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

zokou({ nomCom: "about", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    var coms = {};
    var mode = (s.MODE || "").toLowerCase() === "yes" ? "public" : "private";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const infoMsg = `┏━━━━━━━━━━━━━━━━━━
┃ 👋 Hello: *${ms.pushName}*
┃ 🤖 Bot: *${s.BOT}*
┃ 🧩 Version: 3.5
┃ 📍 Prefix: ${s.PREFIXE}
┃ 🔓 Mode: ${mode}
┃ 👑 Owner: ${s.OWNER_NAME}
┃ 💾 Ram: 8/132 GB
┃ 🖥️ Platform: chrome(lunix)
┃ 🟢 Status: ${s.BOT} is alive
┃ 🧩 Plugins: ${cm.length}
┃ ⏰ Time: ${temps}
┃ 📅 Date: ${date}
┃ 🎨 Theme: *${s.BOT}*
┃ 🧠 Library: Linux
┃ 📡 Pong: 320ms
┗━━━━━━━━━━━━━━━━━

Thanks for choosing *${s.BOT}*
I'm here to make your work easier.

> *𝗠𝗮𝗱𝗲 𝗯𝘆 𝗕.𝗠.𝗕-𝗫𝗠𝗗*
`;

    const lien = mybotpic();

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg,
                gifPlayback: true,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    mentionedJid: [ms.sender],
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363382023564830@newsletter",
                        newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
                        serverMessageId: 1
                    }
                }
            }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    mentionedJid: [ms.sender],
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363382023564830@newsletter",
                        newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
                        serverMessageId: 1
                    }
                }
            }, { quoted: ms });
        } else {
            await repondre(infoMsg);
        }
    } catch (e) {
        console.error("🥵 Menu error:", e);
        await repondre("🥵 Menu error: " + e.message);
    }
});
