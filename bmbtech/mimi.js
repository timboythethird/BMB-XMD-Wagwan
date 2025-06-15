const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "payment1", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg =  `
1.\n> Recipient Name:** sailas antimi mamseri  
2.\n> Mobile Number:** 0711782669 (Safaricom) 
3.\n> Hello 👋\n${nomAuteurMessage}
5.\n> Payment Method:** Online Payment  
6.\n> Country:** Tanzania🇹🇿
`;
    
    let menuMsg = ``;

    var lien = mybotpic();

    const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
            serverMessageId: 1
        }
    };

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                gifPlayback: true,
                contextInfo
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                contextInfo
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
