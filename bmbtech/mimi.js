const { zokou } = require("../framework/zokou");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");

// Helper: Format bytes to readable units
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

zokou({
  nomCom: "imgscan",
  aliases: ["scanimg", "imagescan"],
  categorie: "utility",
  reaction: "🖼️"
}, async (jid, sock, { ms, repondre }) => {
  try {
    const quotedMsg = ms.quoted;
    const mimeType = quotedMsg?.mimetype || "";

    if (!quotedMsg || !mimeType.startsWith("image/")) {
      return repondre("❌ Please reply to an image (JPEG/PNG).");
    }

    // Download the image
    const mediaBuffer = await quotedMsg.download();
    const extension = mimeType.includes("png") ? ".png" : ".jpg";
    const tempFile = path.join(os.tmpdir(), `imgscan_${Date.now()}${extension}`);
    fs.writeFileSync(tempFile, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", fs.createReadStream(tempFile));

    const uploadRes = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadRes.data;
    fs.unlinkSync(tempFile);

    if (!imageUrl || !imageUrl.startsWith("http")) {
      return repondre("⚠️ Failed to upload image. Try again.");
    }

    // Scan image using external API
    const scanUrl = `https://apis.davidcyriltech.my.id/imgscan?url=${encodeURIComponent(imageUrl)}`;
    const { data } = await axios.get(scanUrl);

    if (!data || !data.success) {
      return repondre("❌ Failed to analyze image.");
    }

    // Send analysis results
    await repondre(
      `🔍 *Image Analysis Results*\n\n${data.result}\n\n📤 File size: ${formatBytes(mediaBuffer.length)}`
    );

  } catch (err) {
    console.error("IMGSCAN Error:", err);
    repondre(`❌ Error: ${err.message || "Something went wrong!"}`);
  }
});
