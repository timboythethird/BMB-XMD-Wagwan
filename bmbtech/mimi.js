const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
const os = require("os");

zokou({
  nomCom: "imgscan",
  aliases: ["scanimg", "imagescan"],
  categorie: "utility",
  reaction: "🔍"
}, async (jid, sock, { ms, repondre }) => {
  try {
    const quoted = ms.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || (!quoted.imageMessage && !quoted?.message?.imageMessage)) {
      return repondre("❌ Please reply to an image (JPEG/PNG).");
    }

    // Download the image buffer
    const buffer = await sock.downloadMediaMessage({
      key: ms.message.extendedTextMessage.contextInfo.stanzaId,
      message: quoted
    });

    const tempPath = path.join(os.tmpdir(), `img_${Date.now()}.jpg`);
    fs.writeFileSync(tempPath, buffer);

    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempPath));
    form.append("reqtype", "fileupload");

    const catbox = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    fs.unlinkSync(tempPath); // Delete temp file

    const imageUrl = catbox.data;

    const res = await axios.get(`https://apis.davidcyriltech.my.id/imgscan?url=${encodeURIComponent(imageUrl)}`);
    if (!res.data.success) throw res.data.message || "Failed to scan image.";

    await repondre(`🔍 *Image Analysis*\n\n${res.data.result}`);

  } catch (error) {
    console.error("Image Scan Error:", error);
    await repondre(`❌ Error: ${error.message || error}`);
  }
});
