const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { bmbtz } = require("../devbmb/bmbtz");
const traduire = require("../devbmb/fanction/traduction"); 
const { downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const FormData = require('form-data');
const { exec } = require("child_process");

// Function to upload media to Telegraph
async function uploadToTelegraph(Path) {
    if (!fs.existsSync(Path)) {
        throw new Error("File does not exist");
    }

    try {
        const form = new FormData();
        form.append("file", fs.createReadStream(Path));

        const { data } = await axios.post("https://telegra.ph/upload", form, {
            headers: { ...form.getHeaders() },
        });

        if (data && data[0] && data[0].src) {
            return "https://telegra.ph" + data[0].src;
        } else {
            throw new Error("Error retrieving media link");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

// Sticker command
bmbtz({ nomCom: "sticker", categorie: "Conversion", reaction: "🤠" }, async (origineMessage, zk, commandeOptions) => {
    let { ms, mtype, arg, repondre, nomAuteurMessage } = commandeOptions;
    let txt = JSON.stringify(ms.message);
    let tagImage = mtype === "extendedTextMessage" && txt.includes("imageMessage");
    let tagVideo = mtype === "extendedTextMessage" && txt.includes("videoMessage");

    const alea = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;
    const stickerFileName = alea(".webp");

    let sticker;

    if (mtype === "imageMessage" || tagImage) {
        let downloadFilePath = ms.message.imageMessage || ms.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
        const media = await downloadContentFromMessage(downloadFilePath, "image");
        let buffer = Buffer.from([]);
        for await (const elm of media) buffer = Buffer.concat([buffer, elm]);

        sticker = new Sticker(buffer, {
            pack: "Bmb-Tech",
            author: nomAuteurMessage,
            type: arg.includes("crop") || arg.includes("c") ? StickerTypes.CROPPED : StickerTypes.FULL,
            quality: 100,
        });
    } else if (mtype === "videoMessage" || tagVideo) {
        let downloadFilePath = ms.message.videoMessage || ms.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
        const stream = await downloadContentFromMessage(downloadFilePath, "video");
        let buffer = Buffer.from([]);
        for await (const elm of stream) buffer = Buffer.concat([buffer, elm]);

        sticker = new Sticker(buffer, {
            pack: "Beltah-Md",
            author: nomAuteurMessage,
            type: arg.includes("-r") || arg.includes("-c") ? StickerTypes.CROPPED : StickerTypes.FULL,
            quality: 40,
        });
    } else {
        repondre("Please mention an image or video!");
        return;
    }

    await sticker.toFile(stickerFileName);
    await zk.sendMessage(origineMessage, { sticker: fs.readFileSync(stickerFileName) }, { quoted: ms });

    try { fs.unlinkSync(stickerFileName); } catch (e) { console.log(e); }
});

// write command
bmbtz({ nomCom: "write", categorie: "Conversion", reaction: "🪀" }, async (origineMessage, zk, commandeOptions) => {
    const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;
    if (!msgRepondu) { repondre('Please mention an image'); return; }
    if (!msgRepondu.imageMessage) { repondre('The command only works with images'); return; }

    const text = arg.join(' ');
    if (!text) { repondre('Make sure to insert text'); return; }

    const mediamsg = msgRepondu.imageMessage;
    const image = await zk.downloadAndSaveMediaMessage(mediamsg);

    const data = new FormData();
    data.append('image', fs.createReadStream(image));

    const clientId = 'b40a1820d63cd4e';
    const headers = { 'Authorization': `Client-ID ${clientId}`, ...data.getHeaders() };

    const config = { method: 'post', maxBodyLength: Infinity, url: 'https://api.imgur.com/3/image', headers, data };

    try {
        const response = await axios(config);
        const imageUrl = response.data.data.link;

        const meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${imageUrl}`;
        const stickerMess = new Sticker(meme, {
            pack: nomAuteurMessage,
            author: 'bmb-tech',
            type: StickerTypes.FULL,
            categories: ["🔥", "🌚"],
            id: "12345",
            quality: 70,
            background: "transparent",
        });

        const stickerBuffer2 = await stickerMess.toBuffer();
        zk.sendMessage(origineMessage, { sticker: stickerBuffer2 }, { quoted: ms });

    } catch (error) {
        console.error('Error uploading to Imgur :', error);
        repondre('An error occurred while creating the meme.');
    }
});

// photo command
bmbtz({ nomCom: "photo", categorie: "Conversion", reaction: "📸" }, async (dest, zk, commandeOptions) => {
    const { ms, msgRepondu, repondre } = commandeOptions;
    if (!msgRepondu) { repondre('Make sure to mention the media'); return; }
    if (!msgRepondu.stickerMessage) { repondre('Um mention a non-animated sticker'); return; }

    const mediaMess = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
    const ran = `${Math.floor(Math.random() * 10000)}.png`;

    exec(`ffmpeg -i ${mediaMess} ${ran}`, (err) => {
        fs.unlinkSync(mediaMess);
        if (err) {
            zk.sendMessage(dest, { text: 'A non-animated sticker please' }, { quoted: ms });
            return;
        }
        const buffer = fs.readFileSync(ran);
        zk.sendMessage(dest, { image: buffer }, { quoted: ms });
        fs.unlinkSync(ran);
    });
});

// trt command (translation)
bmbtz({ nomCom: "trt", categorie: "Conversion", reaction: "💗" }, async (dest, zk, commandeOptions) => {
    const { msgRepondu, repondre, arg } = commandeOptions;
    if (!msgRepondu) { repondre('Mention a texte Message'); return; }

    try {
        if (!arg || !arg[0]) { repondre('(eg : trt en)'); return; }
        const texttraduit = await traduire(msgRepondu.conversation, { to: arg[0] });
        repondre(texttraduit);
    } catch (error) {
        repondre('Mention a texte Message');
    }
});
