const axios = require("axios"); const FormData = require('form-data'); const fs = require('fs'); const os = require('os'); const path = require("path"); const { zokou } = require("../framework/zokou");

// Helper function to format bytes function formatBytes(bytes) { if (bytes === 0) return '0 Bytes'; const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; }

zokou({ nomCom: "imgscan", aliases: ["scanimg", "imagescan", "analyzeimg"], categorie: "utility", reaction: "🔍" }, async (jid, sock, { ms, repondre }) => { try { const quotedMsg = ms.quoted; if (!quotedMsg || !quotedMsg.message || !quotedMsg.message.imageMessage) { return repondre("❌ Please reply to an image."); }

const mediaBuffer = await sock.downloadMediaMessage(quotedMsg);
const fileSize = formatBytes(mediaBuffer.length);

// Default to jpg extension
const extension = '.jpg';
const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}${extension}`);
fs.writeFileSync(tempFilePath, mediaBuffer);

const form = new FormData();
form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
form.append('reqtype', 'fileupload');

const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
  headers: form.getHeaders()
});

const imageUrl = uploadResponse.data;
fs.unlinkSync(tempFilePath);

if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith("http")) {
  return repondre("❌ Failed to upload image to Catbox.");
}

const scanUrl = `https://apis.davidcyriltech.my.id/imgscan?url=${encodeURIComponent(imageUrl)}`;
const scanResponse = await axios.get(scanUrl);

if (!scanResponse.data.success) {
  return repondre(`❌ Failed to analyze image: ${scanResponse.data.message || "Unknown error"}`);
}

await repondre(
  `🔍 *Image Analysis Results*

${scanResponse.data.result}

> © Powered by B.M.B-XMD ✅` );



} catch (error) { console.error('Image Scan Error:', error); repondre(❌ Error: ${error.message || error}); } });

