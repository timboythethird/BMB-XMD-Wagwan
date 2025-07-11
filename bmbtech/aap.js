const { zokou } = require("../framework/zokou");
const axios = require("axios");

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

zokou({
  nomCom: "apk11",
  aliases: ["app", "playstore"],
  reaction: "📱",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const searchTerm = arg.join(" ");
    if (!searchTerm) return repondre("❗ Please provide an app name.");

    const searchRes = await axios.get(`https://bk9.fun/search/apk?q=${encodeURIComponent(searchTerm)}`);
    const searchData = searchRes.data;

    if (!searchData.BK9 || searchData.BK9.length === 0)
      return repondre("❌ No app found with that name, please try again.");

    const app = searchData.BK9[0];
    const downloadRes = await axios.get(`https://bk9.fun/download/apk?id=${app.id}`);
    const downloadData = downloadRes.data;

    if (!downloadData.BK9 || !downloadData.BK9.dllink)
      return repondre("⚠️ Unable to find the download link for this app.");

    const apkInfo = `📱 *${downloadData.BK9.name}*
🧾 *Package:* ${downloadData.BK9.pkg}
🆚 *Version:* ${downloadData.BK9.version}
📦 *Size:* ${downloadData.BK9.size}
👤 *Developer:* ${downloadData.BK9.dev}

_By B.M.B-TECH_`;

    await zk.sendMessage(dest, {
      image: { url: downloadData.BK9.icon },
      caption: apkInfo,
      ...newsletterContext
    }, { quoted: ms });

    await zk.sendMessage(dest, {
      document: {
        url: downloadData.BK9.dllink
      },
      fileName: `${downloadData.BK9.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: "*✅ App Downloaded by B.M.B-TECH*",
      ...newsletterContext
    }, { quoted: ms });

  } catch (error) {
    console.error("Error during APK download process:", error);
    repondre("🚫 APK download failed. Please try again later.");
  }
});
