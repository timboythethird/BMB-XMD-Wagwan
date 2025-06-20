const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FormData = require("form-data");

zokou({
  nomCom: "imgscan",
  aliases: ["scanimg", "imagescan"],
  categorie: "utility",
  reaction: "🧠"
}, async (jid, sock, { ms, repondre }) => {
  try {
    const quoted = ms.quoted;

    if (!quoted || !quoted.message || !quoted.type || !quoted.type.includes('image')) {
      return repondre("❌ Please reply to an image (JPEG/PNG).");
    }

    // Download image using sock
    const stream = await sock.downloadContentFromMessage(quoted.message.imageMessage, "image");
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    // Save to temp file
    const ext = ".jpg";
    const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}${ext}`);
    fs.writeFileSync(tempFilePath, buffer);

    // Upload to catbox
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempFilePath));
    form.append("reqtype", "fileupload");

    const upload = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    fs.unlinkSync(tempFilePath); // cleanup

    const imageUrl = upload.data;

    // Call scan API
    const scan = await axios.get(`https://apis.davidcyriltech.my.id/imgscan?url=${encodeURIComponent(imageUrl)}`);

    if (!scan.data.success) {
      throw scan.data.message || "Failed to scan image";
    }

    await repondre(`🔍 *Image Analysis*\n\n${scan.data.result}`);

  } catch (err) {
    console.error("ImageScan Error:", err);
    await repondre(`❌ Error: ${err.message || err}`);
  }
});
