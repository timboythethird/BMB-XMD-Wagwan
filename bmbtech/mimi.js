const { zokou } = require("../framework/zokou");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Format bytes helper
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

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

    const mime = Object.keys(ms.quoted.message)[0];
    if (!["imageMessage"].includes(mime)) {
      return repondre("❌ Please reply to an image (JPEG/PNG).");
    }

    // Download image
    const mediaBuffer = await sock.downloadMediaMessage(ms.quoted);
    const fileSize = formatBytes(mediaBuffer.length);

    const extension = mime === "imageMessage" ? ".jpg" : "";
    const tempFilePath = path.join(os.tmpdir(), `rmbg_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempFilePath));
    form.append("reqtype", "fileupload");

    const catboxRes = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    fs.unlinkSync(tempFilePath); // delete file

    const imageUrl = catboxRes.data;
    if (!imageUrl || !imageUrl.includes("https")) {
      return repondre("❌ Failed to upload image to server.");
    }

    // Call removebg API
    const apiRes = await axios.get(`https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(imageUrl)}`, {
      responseType: "arraybuffer"
    });

    const imageBuffer = Buffer.from(apiRes.data, "binary");

    // Send back image
    await sock.sendMessage(jid, {
      image: imageBuffer,
      caption: `✅ *Background removed!*\n\n_Powered by NEXUS-XMD 🎭_`
    }, { quoted: ms });

  } catch (error) {
    console.error("rmbg error:", error);
    repondre("❌ Error occurred: " + (error.message || "Unknown error"));
  }
});
