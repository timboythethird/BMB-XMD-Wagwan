const { zokou } = require('../framework/zokou');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

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

// IG DOWNLOAD
zokou({ nomCom: "igdl", categorie: "Download" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  let link = arg.join(' ');

  if (!arg[0]) return repondre('Veillez insérer un lien video instagramme');

  try {
    let igvid = await axios('https://api.vihangayt.com/downloader/ig?url=' + link);
    let media = igvid.data.data.data[0];
    
    if (media.type === 'video') {
      zk.sendMessage(dest, {
        video: { url: media.url },
        caption: "ig video downloader powered by *B.M.B-TECH*",
        gifPlayback: false,
        ...newsletterContext
      }, { quoted: ms });
    } else {
      zk.sendMessage(dest, {
        image: { url: media.url },
        caption: "ig image downloader powered by *B.M.B-TECH*",
        ...newsletterContext
      });
    }

  } catch (e) {
    repondre("erreur survenue lors du téléchargement \n " + e);
  }
});

// FACEBOOK DOWNLOAD
zokou({ nomCom: "fb11", categorie: "Download", reaction: "📽️" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  if (!arg[0]) return repondre('Insert a public facebook video link!');

  try {
    getFBInfo(arg.join(" ")).then(result => {
      let caption = `titre: ${result.title}\nLien: ${result.url}`;
      zk.sendMessage(dest, {
        image: { url: result.thumbnail },
        caption: caption,
        ...newsletterContext
      }, { quoted: ms });

      zk.sendMessage(dest, {
        video: { url: result.hd },
        caption: 'facebook video downloader powered by bmb tech',
        ...newsletterContext
      }, { quoted: ms });

    }).catch(error => {
      console.log("Error:", error);
      repondre('try fb2 on this link');
    });

  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.');
  }
});

// TIKTOK DOWNLOAD
zokou({ nomCom: "tiktok", categorie: "Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe, repondre } = commandeOptions;
  if (!arg[0]) return repondre(`how to use this command:\n ${prefixe}tiktok tiktok_video_link`);

  try {
    let data = await axios.get('https://api.onesytex.my.id/api/tiktok-dl=' + arg.join(" "));
    let tik = data.data.data;
    let caption = `Author: ${tik.author}\nDescription: ${tik.desc}`;

    zk.sendMessage(dest, {
      video: { url: tik.links[0].a },
      caption: caption,
      ...newsletterContext
    }, { quoted: ms });

  } catch (error) {
    repondre("TikTok download error:\n" + error);
  }
});

// FACEBOOK DOWNLOAD SD (FB2)
zokou({ nomCom: "fb21", categorie: "Download", reaction: "📽️" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  if (!arg[0]) return repondre('Insert a public facebook video link!');

  try {
    getFBInfo(arg.join(" ")).then(result => {
      let caption = `titre: ${result.title}\nLien: ${result.url}`;
      zk.sendMessage(dest, {
        image: { url: result.thumbnail },
        caption: caption,
        ...newsletterContext
      }, { quoted: ms });

      zk.sendMessage(dest, {
        video: { url: result.sd },
        caption: 'facebook video downloader powered by bmb tech',
        ...newsletterContext
      }, { quoted: ms });

    }).catch(error => {
      console.log("Error:", error);
      repondre(error);
    });

  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.');
  }
});
