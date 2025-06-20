const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
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
  nomCom: "imgscan",
  aliases: ["scanimg", "imagescan", "analyzeimg"],
  categorie: "utility",
  reaction: '🔍'
}, async (jid, sock, { ms, repondre }) => {
  try {
    const quotedMsg = ms.quoted || ms;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';

    if (!mimeType || !mimeType.startsWith('image/')) {
      return repondre("❌ Please reply to an image file (JPEG/PNG)");
    }

    const mediaBuffer = await quotedMsg.download();
    const fileSize = formatBytes(mediaBuffer.length);

    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else return repondre("❌ Unsupported image format. Please use JPEG or PNG");

    const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath); // Delete temp file

    if (!imageUrl) throw "❌ Failed to upload image to Catbox";

    const scanUrl = `https://apis.davidcyriltech.my.id/imgscan?url=${encodeURIComponent(imageUrl)}`;
    const scanResponse = await axios.get(scanUrl);

    if (!scanResponse.data.success) {
      throw scanResponse.data.message || "❌ Failed to analyze image";
    }

    await repondre(
      `🔍 *Image Analysis Results*\n\n` +
      `${scanResponse.data.result}\n\n` +
      `> © Powered by 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷 ✅`
    );

  } catch (error) {
    console.error('Image Scan Error:', error);
    await repondre(`❌ Error: ${error.message || error}`);
  }
});
