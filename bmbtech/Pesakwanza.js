const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "payment", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, mybotpic } = commandeOptions;

    // Message ya malipo
    let infoMsg = `┏━━━━━━━━━━━━━━━━━━\n` +
                  `┃ 💳 *Payment Details*\n` +
                  `┃ \n` +
                  `┃ 👤 *Name:* SAILAS ANTIM MAMSERI\n` +
                  `┃ 📞 *Number:* 0767862457 (Vodacom)\n` +
                  `┃ 🌐 *Method:* Online Payment\n` +
                  `┃ 🌍 *Country:* Tanzania 🇹🇿\n` +
                  `┗━━━━━━━━━━━━━━━━━`;

    // Picha ya kutumia
    let lien = mybotpic() || "https://files.catbox.moe/0pfgz3.jpg";

    // Tuma ujumbe na picha
    try {
        const imageType = lien.match(/\.(jpeg|jpg|png|gif|mp4)$/i)?.[0];

        if (imageType?.includes('mp4') || imageType?.includes('gif')) {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg,
                gifPlayback: true,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363382023564830@newsletter",
                        newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
                        serverMessageId: 1
                    }
                }
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363382023564830@newsletter",
                        newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
                        serverMessageId: 1
                    }
                }
            }, { quoted: ms });
        }

    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e.message);
    }
});
