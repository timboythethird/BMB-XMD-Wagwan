const { zokou } = require("../framework/zokou");
const axios = require("axios");

// context ya channel yako
const contextInfo = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363382023564830@newsletter",
    newsletterName: "𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷",
    serverMessageId: 1
  }
};

// =============== FLUX AI ===============
zokou({
  nomCom: "fluxai",
  aliases: ["flux", "imagine"],
  categorie: "ai",
  reaction: "📸"
}, async (jid, sock, { ms, repondre, arg }) => {
  const q = arg.join(" ");
  if (!q) return repondre("❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.");
  await repondre("> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙿𝙷𝙾𝚃𝙾 📸*");

  try {
    const url = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    await sock.sendMessage(jid, {
      image: Buffer.from(data, "binary"),
      caption: `🌲 *𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳 𝙱𝚈 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷* 😎\n📸 𝚁𝙴𝙰𝙳𝚈 : *${q}*`,
      contextInfo
    }, { quoted: ms });

  } catch (error) {
    console.error("FluxAI Error:", error);
    repondre(`❌ Error: ${error.message || "Failed to generate image."}`);
  }
});

// =============== STABLE DIFFUSION ===============
zokou({
  nomCom: "stablediffusion",
  aliases: ["sdiffusion", "imagine2"],
  categorie: "ai",
  reaction: "📸"
}, async (jid, sock, { ms, repondre, arg }) => {
  const q = arg.join(" ");
  if (!q) return repondre("❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.");
  await repondre("> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙿𝙷𝙾𝚃𝙾 📸*");

  try {
    const url = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    await sock.sendMessage(jid, {
      image: Buffer.from(data, "binary"),
      caption: `🌲 *𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳 𝙱𝚈 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷 😎\n✨ 𝚁𝙴𝙰𝙳𝚈: *${q}*`,
      contextInfo
    }, { quoted: ms });

  } catch (error) {
    console.error("StableDiffusion Error:", error);
    repondre(`❌ Error: ${error.message || "Failed to generate image."}`);
  }
});

// =============== STABILITY AI ===============
zokou({
  nomCom: "stabilityai",
  aliases: ["stability", "imagine3"],
  categorie: "ai",
  reaction: "📸"
}, async (jid, sock, { ms, repondre, arg }) => {
  const q = arg.join(" ");
  if (!q) return repondre("❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.");
  await repondre("> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙿𝙷𝙾𝚃𝙾 📸*");

  try {
    const url = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    await sock.sendMessage(jid, {
      image: Buffer.from(data, "binary"),
      caption: `🌲 *𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳 𝙱𝚈 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷 😎\n📸 𝚁𝙴𝙰𝙳𝚈: *${q}*`,
      contextInfo
    }, { quoted: ms });

  } catch (error) {
    console.error("StabilityAI Error:", error);
    repondre(`❌ Error: ${error.message || "Failed to generate image."}`);
  }
});
