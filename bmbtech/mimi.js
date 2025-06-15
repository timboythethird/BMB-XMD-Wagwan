const { zokou } = require("../framework/zokou");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../luckydatabase/sudo");
const conf = require("../set");

zokou({ nomCom: "owner1", categorie: "Devs", reaction: "🚜" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const thsudo = await isSudoTableNotEmpty();

    if (thsudo) {
        let msg = `*My Super-User*\n*Owner Number:*\n\n😎 @${conf.NUMERO_OWNER}\n\n------ Other SUDOS -----\n`;
        let sudos = await getAllSudoNumbers();

        for (const sudo of sudos) {
            if (sudo) {
                const sudonumero = sudo.replace(/[^0-9]/g, '');
                msg += `- 💼 @${sudonumero}\n`;
            }
        }

        const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
        const mentionedJid = sudos.concat([ownerjid]);

        zk.sendMessage(dest, {
            image: { url: mybotpic() },
            caption: msg,
            mentions: mentionedJid,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363382023564830@newsletter",
                    newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
                    serverMessageId: 1
                }
            }
        }, { quoted: ms });
    } else {
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${conf.OWNER_NAME}\nORG:undefined;\nTEL;type=CELL;type=VOICE;waid=${conf.NUMERO_OWNER}:+${conf.NUMERO_OWNER}\nEND:VCARD`;
        zk.sendMessage(dest, {
            contacts: {
                displayName: conf.OWNER_NAME,
                contacts: [{ vcard }]
            }
        }, { quoted: ms });
    }
});

zokou({ nomCom: "dev1", categorie: "Devs", reaction: "🚜" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
        { nom: "bmbtech", numero: "255767862457" },
        { nom: "PkDriller", numero: "254785392165" },
    ];

    let message = "Uuhh Hellow These are the Dev's Contacts:\n\n";
    for (const dev of devs) {
        message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }

    const lien = mybotpic();
    const mediaOptions = {
        caption: message,
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

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, { video: { url: lien }, ...mediaOptions }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, { image: { url: lien }, ...mediaOptions }, { quoted: ms });
        } else {
            repondre("Invalid media link.");
        }
    } catch (e) {
        console.error("Menu error: ", e);
        repondre("🥵 Menu error " + e);
    }
});

zokou({ nomCom: "support1", categorie: "Devs" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage } = commandeOptions;

    await repondre("look on pm sir");
    await zk.sendMessage(auteurMessage, {
        text: "https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z",
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363382023564830@newsletter",
                newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
                serverMessageId: 1
            }
        }
    }, { quoted: ms });
});

zokou({ nomCom: "developer1", categorie: "General", reaction: "🚜" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
        { nom: "bmbtech", numero: "255767862457" },
        { nom: "PkDriller", numero: "254785392165" },
    ];

    let message = "*Holla Welcome to bmb tech here is the developer numbers:*\n\n";
    for (const dev of devs) {
        message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }

    const lien = mybotpic();
    const mediaOptions = {
        caption: message,
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

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, { video: { url: lien }, ...mediaOptions }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, { image: { url: lien }, ...mediaOptions }, { quoted: ms });
        } else {
            repondre("Invalid media link.");
        }
    } catch (e) {
        console.error("Menu error: ", e);
        repondre("🥵 Menu error " + e);
    }
});
