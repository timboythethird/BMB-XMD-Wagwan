const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const path = require("path");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu11", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    let mode = (s.MODE.toLowerCase() !== "yes") ? "private" : "public";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Africa/Dar_es_Salaam');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('YYYY-MM-DD');

    let infoMsg = `
╭━═「 *${s.BOT}* 」═━❂
┃⊛╭────••••────➻
┃⊛│◆ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃⊛│◆ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
┃⊛│◆ 𝙼𝚘𝚍𝚎 : *${mode}*
┃⊛│◆ 𝚁𝚊𝚖  : 𝟴/𝟭𝟯𝟮 𝗚𝗕
┃⊛│◆ 𝙳𝚊𝚝𝚎  : *${date}*
┃⊛│◆ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃⊛│◆ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃⊛│◆ 𝚃𝚑𝚎𝚖𝚎 : BMB
┃⊛└────••••────➻
╰─━━━━══──══━━━❂\n${readmore}
`;

    let menuMsg = `𝙱.𝙼.𝙱-𝚇𝙼𝙳 𝙲𝚖𝚍`;
    for (const cat in coms) {
        menuMsg += `\n❁━━〔 *${cat}* 〕━━❁\n╭━━══••══━━••⊷\n║◆┊ `;
        for (const cmd of coms[cat]) {
            menuMsg += `\n║◆┊ ${s.PREFIXE}  *${cmd}*`;
        }
        menuMsg += `\n║◆┊\n╰─━━═••═━━••⊷`;
    }

    menuMsg += `\n> Made By 𝙱.𝙼.𝙱-𝚇𝙼𝙳\n`;

    try {
        const imagePath = path.join(__dirname, "../bot/alive.jpg");
        const imageBuffer = fs.readFileSync(imagePath);

        await zk.sendMessage(dest, {
            image: imageBuffer,
            caption: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: ["120363382023564830@newsletter"]
            }
        }, { quoted: ms });

    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
