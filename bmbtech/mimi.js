const { zokou } = require("../framework/zokou");
const { Catbox } = require("node-catbox");
const fs = require('fs-extra');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');

// Initialize Catbox
const catbox = new Catbox();

// Function to upload a file to Catbox and return the URL
async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  try {
    const uploadResult = await catbox.uploadFile({ path: filePath });
    if (uploadResult) {
      return uploadResult;
    } else {
      throw new Error("Error retrieving file link");
    }
  } catch (error) {
    throw new Error(String(error));
  }
}

// Command to upload image, video, or audio file
zokou({
  'nomCom': 'url4',
  'categorie': "General",
  'reaction': '👨🏿‍💻'
}, async (groupId, client, context) => {
  const { msgRepondu, repondre } = context;

  if (!msgRepondu) {
    return repondre("Please mention an image, video, or audio.");
  }

  let mediaPath;

  if (msgRepondu.videoMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
  } else if (msgRepondu.gifMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.gifMessage);
  } else if (msgRepondu.stickerMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
  } else if (msgRepondu.documentMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.documentMessage);
  } else if (msgRepondu.imageMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
  } else if (msgRepondu.audioMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
  } else {
    return repondre("Please mention an image, video, or audio.");
  }

  try {
    const fileUrl = await uploadToCatbox(mediaPath);
    fs.unlinkSync(mediaPath);

    // Tuma response ukiwa na forwardedMessage (jid)
    await client.sendMessage(groupId, {
      text: fileUrl,
      contextInfo: {
        forwardedMessage: {
          key: { remoteJid: "120363382023564830@newsletter" },
          message: { conversation: "B.M.B-TECH" }
        },
        forwardingScore: 999,
        isForwarded: true
      }
    });

  } catch (error) {
    console.error("Error while creating your URL:", error);
    repondre("Oops, there was an error.");
  }
});
