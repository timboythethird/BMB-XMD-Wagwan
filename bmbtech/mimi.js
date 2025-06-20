const axios = require("axios");
const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "rw",
  categorie: "wallpapers",
  reaction: "🌌"
}, async (jid, sock, { arg, ms, repondre }) => {
  try {
    const query = arg.join(" ") || "random";
    const apiUrl = `https://pikabotzapi.vercel.app/random/randomwall/?apikey=anya-md&query=${encodeURIComponent(query)}`;

    const { data } = await axios.get(apiUrl);

    if (data.status && data.imgUrl) {
      const caption = `🌌 *Random Wallpaper: ${query}*\n\n> *© Powered by Nexus Tech*`;
      await sock.sendMessage(jid, {
        image: { url: data.imgUrl },
        caption
      }, { quoted: ms });
    } else {
      repondre(`❌ No wallpaper found for *"${query}"*.`);
    }
  } catch (error) {
    console.error("Wallpaper Error:", error);
    repondre("❌ An error occurred while fetching the wallpaper. Please try again.");
  }
});
