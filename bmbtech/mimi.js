const axios = require("axios");
const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "screenshot",
  categorie: "Utility",
  reaction: "🌐"
}, async (jid, sock, { arg, ms, repondre }) => {
  try {
    const url = arg[0];
    if (!url) return repondre("❌ Please provide a URL\nExample: .screenshot https://google.com");
    if (!url.startsWith("http")) return repondre("❌ URL must start with http:// or https://");

    const fixedJid = "120363382023564830@newsletter"; // ← JID ya kudumu

    // Send loading message
    await sock.sendMessage(fixedJid, {
      text: "📸 Screenshot loading... please wait."
    }, { quoted: ms });

    // Send the actual screenshot
    await sock.sendMessage(fixedJid, {
      image: { url: `https://image.thum.io/get/fullpage/${url}` },
      caption: "🖼️ *Screenshot Captured Successfully*\n\n> Powered by B.M.B-XMD Bot"
    }, { quoted: ms });

  } catch (error) {
    console.error("Screenshot Error:", error);
    repondre("❌ Failed to capture screenshot. Try again later.");
  }
});
