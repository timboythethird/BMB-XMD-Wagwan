const { zokou } = require(__dirname + "/../framework/zokou");

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
}

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖',
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
}

zokou({
    nomCom: "help1",
    reaction: "🤦",
    aliases: ["panelist", "commandlist", "cmdlist", "list"],
    desc: "Get bot command list.",
    categorie: "universal"
}, async (dest, zk, context) => {
    const { respond, prefix, nomAuteurMessage } = context;
    const commands = require(__dirname + "/../framework/zokou").cm;

    let menu = '𝙱.𝙼.𝙱-𝚇𝙼𝙳 ʟɪsᴛ\n\n';
    let zokouList = [];

    commands.forEach((command) => {
        const { nomCom, desc = 'No description available', aliases = 'No aliases', categorie, reaction } = command;
        if (nomCom) {
            zokouList.push({ nomCom, desc, aliases, categorie, reaction });
        }
    });

    zokouList.sort((a, b) => a.nomCom.localeCompare(b.nomCom));

    zokouList.forEach(({ nomCom, desc, aliases, categorie, reaction }, index) => {
        menu += `${index + 1}. ${toFancyUppercaseFont(nomCom.trim())}\n`;
        menu += `Description: ${toFancyLowercaseFont(desc)}\n`;
        menu += `Aliases: ${toFancyLowercaseFont(aliases)}\n`;
        menu += `Category: ${toFancyLowercaseFont(categorie)}\n`;
        menu += `Reaction: ${toFancyLowercaseFont(reaction)}\n\n`;
    });

    // Tuma message yenye forwarded JID
    return await zk.sendMessage(dest, {
        text: menu,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedMessage: {
                key: {
                    remoteJid: "120363382023564830@newsletter", // JID ya chanzo
                    fromMe: false,
                    id: "BMB-HELP-MENU"
                },
                message: {
                    conversation: "𝗕𝗠𝗕 𝗕𝗢𝗧 𝗠𝗘𝗡𝗨"
                }
            },
            externalAdReply: {
                title: "B.M.B-TECH",
                body: "𝐫𝐞𝐠𝐚𝐫𝐝𝐬 bmb",
                thumbnailUrl: "https://files.catbox.moe/g2brwg.jpg",
                sourceUrl: "https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
});
