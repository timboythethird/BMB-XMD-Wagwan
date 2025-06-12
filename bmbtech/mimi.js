const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const fs = require("fs");
const path = require("path");

async function sendForwardedText(zk, dest, ms, text, sender) {
    await zk.sendMessage(
        dest,
        {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363290715861418@newsletter",
                    newsletterName: "PopkidGlx",
                    serverMessageId: 143,
                },
            },
        },
        { quoted: ms }
    );
}

async function sendRandomVoiceNote(zk, dest, ms, repondre) {
    const folder = path.join(__dirname, "../bmb/");
    if (!fs.existsSync(folder)) {
        return repondre(`📁 Audio folder not found at:\n${folder}`);
    }

    const audioFiles = fs.readdirSync(folder).filter((f) => f.endsWith(".mp3"));
    if (!audioFiles.length) {
        return repondre("⚠️ No audio files found in folder.");
    }

    const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    const audioPath = path.join(folder, randomAudio);

    await zk.sendMessage(
        dest,
        {
            audio: { url: audioPath },
            mimetype: "audio/mpeg",
            ptt: true,
            fileName: "🗣 POPKID VOICE",
        },
        { quoted: ms }
    );
}

zokou(
    {
        nomCom: 'alive',
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
                aliveMsg = `B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 bmb tech 𝐢𝐬 𝐀𝐋𝐈𝐕𝐄, Yo!* 🔥\n│❒ *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n│❒ *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n│❒ *📅 𝐃𝐚𝐭𝐞*: ${date}\n│❒ *⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n│❒ *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: ${message}\n│❒ *🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝙱.𝙼.𝙱-𝚇𝙼𝙳*\n◈━━━━━━━━━━━━━━━━◈`;
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
                            repondre(aliveMsg);
                        }
                    } else {
                        repondre(aliveMsg);
                    }

                    // Send forwarded text
                    await sendForwardedText(zk, dest, ms, "*Yo! PopkidGlx is still rockin'* 🔥🔥", sender);

                    // Send random voice note
                    await sendRandomVoiceNote(zk, dest, ms, repondre);

                } catch (e) {
                    console.error("Error:", e);
                    repondre(`B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ OOPS! 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 failed to show off: ${e.message} 😡 Try again! 😣\n◈━━━━━━━━━━━━━━━━◈`);
                }
            } else {
                aliveMsg = `B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 bmb tech 𝐢𝐬 𝐀𝐋𝐈𝐕𝐄, Yo!* 🔥\n│❒ *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n│❒ *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n│❒ *📅 𝐃𝐚𝐭𝐞*: ${date}\n│❒ *⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n│❒ *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: Yo, I'm bmb tech, ready to rock! Set a custom vibe with *alive [message];[link]*! 😎\n│❒ *🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝙱.𝙼.𝙱-𝚇𝙼𝙳*\n◈━━━━━━━━━━━━━━━━◈`;
                repondre(aliveMsg);
            }
        } else {
            if (!superUser) {
                repondre(`𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ 🛑 Yo, only authorized user can mess with Toxic MD’s vibe! 😡\n◈━━━━━━━━━━━━━━━━◈`);
                return;
            }

            const [texte, tlien] = arg.join(' ').split(';');
            await addOrUpdateDataInAlive(texte, tlien);
            repondre(`𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ ✅ Alive message updated successfully! 🔥\n◈━━━━━━━━━━━━━━━━◈`);
        }
    }
);
