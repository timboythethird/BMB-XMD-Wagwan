const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { zokou } = require("../framework/zokou");

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

zokou({
  nomCom: "rmbg",
  categorie: "img_edit",
  reaction: "📸"
}, async (jid, sock, { ms, repondre }) => {
  try {
    const quotedMsg = ms.quoted ? ms.quoted : ms;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';

    if (!mimeType || !mimeType.startsWith("image/")) {
      return repondre("❌ Please reply to an image file (JPEG or PNG).");
    }

    const mediaBuffer = await quotedMsg.download();
    const fileSize = formatBytes(mediaBuffer.length);

    let extension = '';
    if (mimeType.includes("image/jpeg")) extension = ".jpg";
    else if (mimeType.includes("image/png")) extension = ".png";
    else return repondre("❌ Unsupported image format. Use JPEG or PNG.");

    const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempFilePath), `image${extension}`);
    form.append("reqtype", "fileupload");

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    fs.unlinkSync(tempFilePath); // Delete temp file

    const imageUrl = uploadResponse.data;
    if (!imageUrl) return repondre("❌ Failed to upload image to Catbox.");

    // Remove background
    const apiUrl = `https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return repondre("❌ API did not return a valid image.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await sock.sendMessage(jid, {
      image: imageBuffer,
      caption: `✅ *Background removed!*\n\n> _this is nexus-xmd say it beiby🎭_`
    }, { quoted: ms });

  } catch (error) {
    console.error("rmbg Error:", error);
    repondre(`❌ Error: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});
