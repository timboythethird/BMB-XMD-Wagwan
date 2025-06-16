"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

const newsletterContext = {
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

zokou(
  {
    nomCom: "repo11",
    catégorie: "Général",
    reaction: "💥",
    nomFichier: __filename
  },
  async (dest, zk, commandeOptions) => {
    const githubRepo = 'https://api.github.com/repos/Zedkazzozoranda091/LEONARD-MD';
    const gifUrl = 'https://files.catbox.moe/0qk98h.mp4'; // Hii ndio gif mpya (mp4)
    const audioUrl = 'https://files.catbox.moe/uhfull.mp3';

    try {
      const response = await fetch(githubRepo);
      const data = await response.json();

      if (data) {
        const repoInfo = {
          stars: data.stargazers_count,
          forks: data.forks_count,
          lastUpdate: data.updated_at,
          owner: data.owner.login,
        };

        const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
        const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

        const gitdata = `*hellow whatsaap user
this is* *leonard_md.*\n support our channel *by*,  https://whatsapp.com/channel/0029VakLfckBlHpYVxryFJ14

_________● *ʟᴇᴏɴᴀʀᴅ* ●____________
|💥 *ʀᴇᴘᴏsɪᴛᴏʀʏ:* ${data.html_url}
|🌟 *sᴛᴀʀs:* ${repoInfo.stars}
|🍽 *ғᴏʀᴋs:* ${repoInfo.forks}
|⌚️ *ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ:* ${releaseDate}
|🕐 *ᴜᴘᴅᴀᴛᴇ ᴏɴ:* ${repoInfo.lastUpdate}
|👨‍💻 *ᴏᴡɴᴇʀ:* *ʟᴇᴏɴᴀʀᴅ ᴛᴇᴄʜ*
|💞 *ᴛʜᴇᴍᴇ:* *ʟᴇᴏɴᴀʀᴅ*
|🥰*ᴏɴʟʏ ɢᴏᴅ ᴄᴀɴ ᴊᴜᴅɢᴇ ᴍᴇ!👑*
__________________________________
            *ᴍᴀᴅᴇ ᴡɪᴛʜ ʟᴇᴏɴᴀʀᴅ ᴛᴇᴄʜ*`;

        // Tuma GIF (mp4) na caption
        await zk.sendMessage(dest, {
          video: { url: gifUrl },
          caption: gitdata,
          gifPlayback: true,
          ...newsletterContext
        });

        // Tuma Audio
        await zk.sendMessage(dest, {
          audio: { url: audioUrl },
          mimetype: 'audio/mp4',
          ptt: false,
          ...newsletterContext
        });

      } else {
        console.log("Could not fetch data");
      }

    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
);
