const { zokou } = require(__dirname + "/../framework/zokou");    
const axios = require("axios");    

zokou({ nomCom: "mimi", categorie: "General" }, async (dest, zk, commandeOptions) => {    
    let { ms, repondre } = commandeOptions;    

    const repoUrl = "https://api.github.com/repos/bwbxmd/B.M.B-TECH";    
    const imageUrl = "https://files.catbox.moe/kuz5r2.jpg";    

    try {    
        const response = await axios.get(repoUrl);    
        const repo = response.data;    

        let repoInfo = `    
╭══════════════⊷❍    
┃ 💙 *BMB TECH REPOSITORY* 💙    
┃ ❏ 𝗡𝗮𝗺𝗲: *${repo.name}*    
┃ ❏ 𝗢𝘄𝗻𝗲𝗿: *${repo.owner.login}*    
┃ ❏ 𝗦𝘁𝗮𝗿𝘀: ⭐ *${repo.stargazers_count}*    
┃ ❏ 𝗙𝗼𝗿𝗸𝘀: 🍴 *${repo.forks_count}*    
┃ ❏ 𝗜𝘀𝘀𝘂𝗲𝘀: 🛠️ *${repo.open_issues_count}*    
┃ ❏ 𝗪𝗮𝘁𝗰𝗵𝗲𝗿𝘀: 👀 *${repo.watchers_count}*    
┃ ❏ 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲: 🖥️ *${repo.language}*    
┃ ❏ 𝗕𝗿𝗮𝗻𝗰𝗵𝗲𝘀: 🌿 *${repo.default_branch}*    
┃ ❏ 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗼𝗻: 📅 *${new Date(repo.updated_at).toLocaleString()}*    
┃ ❏ 𝗥𝗲𝗽𝗼 𝗟𝗶𝗻𝗸: 🔗 [Click Here](${repo.html_url})    
╰══════════════⊷❍    
        `;    

        await zk.sendMessage(dest, {    
            image: { url: imageUrl },    
            caption: repoInfo,    
            footer: "*BMB TECH GitHub Repository*",    
            contextInfo: {    
                forwardingScore: 999,    
                isForwarded: true,    
            },    
        }, { quoted: ms });    

    } catch (e) {    
        console.log("🥵 Error fetching repository data: " + e);    
        repondre("🥵 Error fetching repository data, please try again later.");    
    }    
    
async function sendMenuMedia(zk, dest, ms, mediaUrl, caption, mentions) {
  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    mentionedJid: mentions,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter", // ID ya channel
      newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
      serverMessageId: 143,
    },
  };

  if (mediaUrl.match(/\.(mp4|gif)$/i)) {
    await zk.sendMessage(
      dest,
      {
        video: { url: mediaUrl },
        caption,
        footer: "⚡ BMB-XBOT ⚡",
        mentions,
        gifPlayback: true,
        contextInfo,
      },
      { quoted: ms }
    );
  } else if (mediaUrl.match(/\.(jpeg|jpg|png)$/i)) {
    await zk.sendMessage(
      dest,
      {
        image: { url: mediaUrl },
        caption,
        footer: "⚡ BMB-XBOT ⚡",
        mentions,
        contextInfo,
      },
      { quoted: ms }
    );
  } else {
    await zk.sendMessage(
      dest,
      {
        text: caption,
        mentions,
        contextInfo,
      },
      { quoted: ms }
    );
  }
}

async function sendRandomVoiceNote(zk, dest, ms, repondre) {
  const folder = path.join(__dirname, "../bmb/");
  if (!fs.existsSync(folder)) {
    return repondre(`📁 Audio folder not found at:\n${folder}`);
  }

  const audioFiles = fs.readdirSync(folder).filter((f) => f.endsWith(".mp3"));
  if (!audioFiles.length) {
    return repondre(`⚠️ No audio files found in folder.`);
  }

  const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  const audioPath = path.join(folder, randomAudio);

  await zk.sendMessage(
    dest,
    {
      audio: { url: audioPath },
      mimetype: "audio/mpeg",
      ptt: true,
      fileName: `🗣 BMB VOICE`,
    },
    { quoted: ms }
  );
        }
        
