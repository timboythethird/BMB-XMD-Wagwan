const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "payment", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = (s.MODE).toLowerCase() !== "yes" ? "private" : "public";
    const jid = ms.sender;

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Africa/Dar_es_Salaam');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
┏━━━━━━━━━━━━━━━━━━
┃ 💳 *PAYMENT DETAILS*
┃ 
┃ 👤 Name: *SAILAS ANTIM MAMSERI*
┃ 📱 Number: *0767862457* (Vodacom)
┃ 🌍 Country: *Tanzania 🇹🇿*
┃ 💼 Method: *Online Payment*
┃ 🧑 Requester: *${nomAuteurMessage}*
┃ 🆔 JID: *${jid}*
┃ 📅 Date: *${date}*
┃ 🕒 Time: *${temps}*
┗━━━━━━━━━━━━━━━━━`;

    let menuMsg = "";

    var lien = mybotpic();

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "© B.M.B XMD | Payment Info",
                gifPlayback: true,
                contextInfo: {
                    mentionedJid: [jid],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363382023564830@newsletter",
                        newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗",
                        serverMessageId: 1
                    }
                }
            }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "© B.M.B XMD | Payment Info",
                contextInfo: {
                    mentionedJid: [jid],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363382023564830@newsletter",
                        newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗",
                        serverMessageId: 1
                    }
                }
            }, { quoted: ms });
        } else {
            repondre(infoMsg + menuMsg);
        }
    } catch (e) {
        console.log("🥵🥵 Menu error " + e);
        repondre("🥵🥵 Menu error " + e);
    }
});
