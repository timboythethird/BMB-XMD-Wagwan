const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "apk",
  aliases: ["app", "playstore"],
  reaction: "📱",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const searchTerm = arg.join(" ");
    if (!searchTerm) {
      return repondre("❗ Please provide an app name.");
    }

    const searchRes = await axios.get(`https://bk9.fun/search/apk?q=${encodeURIComponent(searchTerm)}`);
    const searchData = searchRes.data;

    if (!searchData.BK9 || searchData.BK9.length === 0) {
      return repondre("❌ No app found with that name, please try again.");
    }

    const appId = searchData.BK9[0].id;
    const downloadRes = await axios.get(`https://bk9.fun/download/apk?id=${appId}`);
    const downloadData = downloadRes.data;

    if (!downloadData.BK9 || !downloadData.BK9.dllink) {
      return repondre("⚠️ Unable to find the download link for this app.");
    }

    await zk.sendMessage(dest, {
      document: {
        url: downloadData.BK9.dllink
      },
      fileName: `${downloadData.BK9.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: "*B.M.B-TECH* Downloading Your App...",
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

  } catch (error) {
    console.error("Error during APK download process:", error);
    repondre("🚫 APK download failed. Please try again later.");
  }
});
