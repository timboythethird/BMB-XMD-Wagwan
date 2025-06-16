const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const path = require("path");
const fs = require("fs");

// Function to send audio
async function sendAliveMusic(zk, dest, ms, repondre) {
    const audioPath = path.join(__dirname, "../bmb/alive.mp3");
    if (!fs.existsSync(audioPath)) return repondre(`📁 File not found: ${audioPath}`);
    await zk.sendMessage(dest, {
        audio: { url: audioPath },
        mimetype: "audio/mpeg",
        ptt: true,
        fileName: "🎵 BMB Alive",
    }, { quoted: ms });
}

// Function to send image
async function sendAliveImage(zk, dest, ms, caption, repondre) {
    const imagePath = path.join(__dirname, "../bot/alive.jpg");
    if (!fs.existsSync(imagePath)) return repondre(`📁 Image not found: ${imagePath}`);
    await zk.sendMessage(dest, {
        image: { url: imagePath },
        caption: caption
    }, { quoted: ms });
}

zokou(
    {
        nomCom: 'alive11',
        categorie: 'General',
        reaction: "⚡"
    },
    async (dest, zk, { ms, arg, repondre, superUser, sender }) => {
        const data = await getDataFromAlive();
        const time = moment().tz('Etc/GMT').format('HH:mm:ss');
        const date = moment().format('DD/MM/YYYY');
        const mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

        if (!arg || !arg[0]) {
            let aliveMsg;

            if (data) {
                const { message, lien } = data;
                aliveMsg = `B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 bmb tech is ALIVE!* 🔥\n│❒ *👑 Owner*: ${s.OWNER_NAME}\n│❒ *🌐 Mode*: ${mode}\n│❒ *📅 Date*: ${date}\n│❒ *⏰ Time (GMT)*: ${time}\n│❒ *💬 Message*: ${message}\n│❒ *🤖 Powered by B.M.B-XMD*\n│❒ *📡 Channel*: 120363382023564830@newsletter\n◈━━━━━━━━━━━━━━━━◈`;

                try {
                    if (lien) {
                        if (lien.match(/\.(mp4|gif)$/i)) {
                            await zk.sendMessage(dest, {
                                video: { url: lien },
                                caption: aliveMsg
                            }, { quoted: ms });
                        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
                            await zk.sendMessage(dest, {
                                image: { url: lien },
                                caption: aliveMsg
                            }, { quoted: ms });
                        } else {
                            await sendAliveImage(zk, dest, ms, aliveMsg, repondre);
                        }
                    } else {
                        await sendAliveImage(zk, dest, ms, aliveMsg, repondre);
                    }
                } catch (e) {
                    console.error("Error:", e);
                    repondre(`❌ Failed to show Alive Message: ${e.message}`);
                }

                await sendAliveMusic(zk, dest, ms, repondre);
            } else {
                aliveMsg = `B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 bmb tech is ALIVE!* 🔥\n│❒ *👑 Owner*: ${s.OWNER_NAME}\n│❒ *🌐 Mode*: ${mode}\n│❒ *📅 Date*: ${date}\n│❒ *⏰ Time (GMT)*: ${time}\n│❒ *💬 Message*: Yo, I'm bmb tech, ready to rock! Set a custom vibe with *alive [message];[link]*! 😎\n│❒ *🤖 Powered by B.M.B-XMD*\n│❒ *📡 Channel*: 120363382023564830@newsletter\n◈━━━━━━━━━━━━━━━━◈`;
                await sendAliveImage(zk, dest, ms, aliveMsg, repondre);
                await sendAliveMusic(zk, dest, ms, repondre);
            }
        } else {
            if (!superUser) {
                repondre("❌ Only the owner can update Alive message.");
                return;
            }

            const [texte, tlien] = arg.join(' ').split(';');
            await addOrUpdateDataInAlive(texte, tlien);
            repondre(`✅ Alive message updated successfully!`);
        }
    }
);
