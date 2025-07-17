const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

zokou({ nomCom: "payment", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, mybotpic } = commandeOptions;

    let infoMsg = `
┏━━━━━━━━━━━━━━━━━━
┃ 💳 *PAYMENT DETAILS*
┃ 
┃ 👤 Name: *SAILAS ANTIM MAMSERI*
┃ 📱 Number: *0767862457* (Vodacom)
┃ 🌍 Country: *Tanzania 🇹🇿*
┃ 💼 Method: *Online Payment*
┗━━━━━━━━━━━━━━━━━`;

    let menuMsg = "";
    var lien = mybotpic();

    const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [ms.sender],
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗",
            serverMessageId: 1
        }
    };

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                gifPlayback: true,
                contextInfo
            }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                contextInfo
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                text: infoMsg + menuMsg,
                contextInfo
            }, { quoted: ms });
        }
    } catch (e) {
        console.log("🥵 Menu error:", e);
        repondre("🥵 Menu error: " + e.message);
    }
});
