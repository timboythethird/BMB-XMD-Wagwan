const { zokou } = require("../framework/zokou");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");

zokou({
  nomCom: "rmbg",
  aliases: ["removebg"],
  categorie: "img_edit",
  reaction: "📸"
}, async (jid, sock, { ms, repondre }) => {
  try {
    if (!ms.quoted || !ms.quoted.message) {
      return repondre("❌ Please reply to an image.");
    }

    const msg = ms.quoted.message;
    const type = Object.keys(msg)[0];

    if (type !== "imageMessage") {
      return repondre("❌ Please reply to a valid image (JPG/PNG).");
    }

    const stream = await sock.downloadContentFromMessage(msg.imageMessage, "image");
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    // Hifadhi image kwa muda
    const tmpPath = path.join(os.tmpdir(), `nexus_rmbg_${Date.now()}.jpg`);
    fs.writeFileSync(tmpPath, buffer);

    // Upload to catbox
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tmpPath));
    form.append("reqtype", "fileupload");

    const catbox = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    fs.unlinkSync(tmpPath); // Futa file

    const imageUrl = catbox.data;
    if (!imageUrl.includes("http")) return repondre("❌ Failed to upload image.");

    // Request API ya kuondoa background
    const remove = await axios.get(`https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(imageUrl)}`, {
      responseType: "arraybuffer"
    });

    await sock.sendMessage(jid, {
      image: Buffer.from(remove.data, "binary"),
      caption: `✅ *Background removed successfully!*\n_Powered by B.M.B-XMD_`
    }, { quoted: ms });

  } catch (err) {
    console.error(err);
    repondre("❌ Error: " + (err.message || "Something went wrong"));
  }
});
