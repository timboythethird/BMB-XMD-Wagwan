const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "mimi", categorie: "General" }, async (dest, zk, commandeOptions) => {
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

    let infoMsg = `
 *Tap on the link to get session💙get connected by bmb tech*
  
 https://b-m-b-sessio-fix.onrender.com/

 *STEPS TO GET SESSION*
 
 1. Open link
 2. Enter your whatsapp number with your country code eg : 255,254. And tap submit
 3. bmb xmd will sent you a code. Copy that code. Then whatsapp will sent Notification
 4. Tap on that notification then enter in the code that bmb tech sent you.
 5. It will load for sometime then bmb tech will sent A long session to your inbox on whatsapp at your own number
 6. Copy that long session and sent it to your deployer.
 
 💻enjoy💻bmb🧸tech
 `;

    let menuMsg = `
> Made by : © B.M.B-TECH
`;

    const lien = mybotpic();

    const contextInfo = {
        externalAdReply: {
            title: "B.M.B-TECH CHANNEL",
            body: "Follow for updates",
            thumbnailUrl: lien,
            mediaUrl: lien,
            sourceUrl: "https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z", // JID ya channel yako
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: true
        }
    };

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                gifPlayback: true,
                contextInfo
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵 Video error: " + e);
            repondre("🥵 Video error: " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                contextInfo
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵 Image error: " + e);
            repondre("🥵 Image error: " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
