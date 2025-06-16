const fs = require('fs-extra'); const path = require('path'); const { zokou } = require(__dirname + "/../framework/zokou"); const os = require("os"); const moment = require("moment-timezone"); const s = require(__dirname + "/../set");

zokou({ nomCom: "menu9", categorie: "General", reaction: "🌟", desc: "Display full command list." }, async (dest, zk, commandeOptions) => { const { ms, arg, repondre, verifCom, prefixe, nomAuteurMessage, depuis, nomBot, auteurMessage } = commandeOptions;

const imagePath = path.join(__dirname, '../bot/menu.jpg');
const audioPath = path.join(__dirname, '../bmb/menu1.mp3');

const totalCommands = s.commandes.length;

const caption = `🌤️ Good Afternoon ${nomAuteurMessage} 🌤️

╭─────B.M.B-XMD──────✯ │       🌤️ DEV B.M.B WHATSAPP BOT 🌤️ │────────────────| │✦│ OWNER: B.M.B XMD │✦│ MODE: 🔒 PRIVATE │✦│ DATE: ${moment().tz('Africa/Nairobi').format("DD/MM/YYYY")} │✦│ RAM USAGE: ${(os.totalmem() - os.freemem()) / 1000000000} GB/${os.totalmem() / 1000000000} GB │✦│ USER: ${nomAuteurMessage} │✦│ COMMANDS: ${totalCommands} Available ╰─────────────────✯

╭──────────────✯ │   🌟 B.M.B MAIN MENU 🌤️ │─────────────────────✯ │   Made by B.M.B XMD from Tanzania 🌤️ │───────────────✯ │✦│ OWNER │✦│ ALIVE │✦│ SUPPORT │✦│ HELP │✦│ GROUPMENU │✦│ OTHERMENU │✦│ FUNMENU │✦│ AIMENU │✦│ DOWNLOADER │✦│ CONVERTER │✦│ GAMES │✦│ SEARCH │✦│ TOOL ╰───────────────✯

✯────────────────✯ │🌤️ MADE BY B.M.B XMD 🌤️│ ✯────────────────✯`;

await zk.sendMessage(dest, {
    image: fs.readFileSync(imagePath),
    caption,
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: "🌤️ B.M.B WHATSAPP BOT MENU 🌤️",
            body: "All in One WhatsApp Bot",
            thumbnail: fs.readFileSync(imagePath),
            mediaType: 2,
            mediaUrl: "https://github.com/bmbxmd",
            sourceUrl: "https://github.com/bmbxmd"
        }
    }
}, { quoted: ms });

await zk.sendMessage(dest, {
    audio: fs.readFileSync(audioPath),
    mimetype: 'audio/mp4',
    ptt: true
}, { quoted: ms });

});

  
