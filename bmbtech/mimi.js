const { zokou } = require(__dirname + "/../framework/zokou");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

zokou({ nomCom: "repo11", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;

    const repoUrl = "https://api.github.com/repos/bwbxmd/B.M.B-TECH";
    const imageUrl = "https://files.catbox.moe/o99tj7.jpg";
    const musicPath = path.join(__dirname, "../bmb/menu1.mp3");

    try {
        const response = await axios.get(repoUrl);
        const repo = response.data;

        let repoInfo = `
╭══════════════⊷❍
┃ 💙 *BMB TECH REPOSITORY* 💙
┃ ❏ Name: *${repo.name}*
┃ ❏ Owner: *${repo.owner.login}*
┃ ❏ Stars: ⭐ *${repo.stargazers_count}*
┃ ❏ Forks: 🍴 *${repo.forks_count}*
┃ ❏ Issues: 🛠️ *${repo.open_issues_count}*
┃ ❏ Watchers: 👀 *${repo.watchers_count}*
┃ ❏ Language: 🖥️ *${repo.language}*
┃ ❏ Branch: 🌿 *${repo.default_branch}*
┃ ❏ Last Updated: 📅 *${new Date(repo.updated_at).toLocaleString()}*
┃ ❏ Repo Link: 🔗 [Click Here](${repo.html_url})
╰══════════════⊷❍
        `;

        // Send repository info with image
        await zk.sendMessage(dest, {
            image: { url: imageUrl },
            caption: repoInfo,
            footer: "*BMB TECH GitHub Repository*",
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363382023564830@newsletter",
                    newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
                    serverMessageId: 1
                }
            },
        }, { quoted: ms });

        // Check if music file exists
        if (fs.existsSync(musicPath)) {
            await zk.sendMessage(dest, {
                audio: { url: musicPath },
                mimetype: "audio/mpeg",
                ptt: true,
                fileName: "BMB Music 🎵",
            }, { quoted: ms });
        } else {
            repondre("⚠️ Music file not found: bmb/menu1.mp3");
        }

    } catch (e) {
        console.log("❌ Error fetching repository data: " + e);
        repondre("❌ Error fetching repository data, please try again later.");
    }
});
