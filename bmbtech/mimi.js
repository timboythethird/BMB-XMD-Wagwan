const { zokou } = require("../framework/zokou");
const axios = require("axios");

// Function to calculate uptime in days, hours, minutes, and seconds
const runtime = (seconds) => { 
    seconds = Number(seconds); 
    const d = Math.floor(seconds / (3600 * 24)); 
    const h = Math.floor((seconds % (3600 * 24)) / 3600); 
    const m = Math.floor((seconds % 3600) / 60); 
    const s = Math.floor(seconds % 60); 
    return `${d > 0 ? d + "d, " : ""}${h > 0 ? h + "h, " : ""}${m > 0 ? m + "m, " : ""}${s > 0 ? s + "s" : ""}`;
}; 

zokou({
    nomCom: "uptime8",
    desc: "To check runtime",
    Categorie: "General",
    reaction: "⚙️", 
    fromMe: true, 
}, async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;
    const imageUrl = "https://files.catbox.moe/533oqh.jpg";
    const audioUrl = "https://files.catbox.moe/04vank.mp3";

    try {
        // Download image and audio simultaneously
        const [imageResponse, audioResponse] = await Promise.all([
            axios.get(imageUrl, { responseType: "arraybuffer" }),
            axios.get(audioUrl, { responseType: "arraybuffer" })
        ]);

        const imageBuffer = Buffer.from(imageResponse.data);
        const audioBuffer = Buffer.from(audioResponse.data);

        console.log("Audio buffer length:", audioBuffer.length); // Kucheki kama buffer inakuwa created

        // Send image with caption
        const message = await zk.sendMessage(dest, { 
            image: imageBuffer, 
            caption: `*_UPTIME OF DULLAH XMD 🤖 IS: ${runtime(process.uptime())}_*`
        });

        // Send audio as a reply to the image caption
        await zk.sendMessage(dest, { 
            audio: audioBuffer, 
            mimetype: "audio/mpeg" // Badala ya audio/mp3
        }, { quoted: message });

    } catch (error) {
        console.error("Error:", error.message);
        await repondre("❌ Failed to load the image or audio. Here is the uptime info:\n" + 
                       `*_UPTIME OF DULLAH XMD 🤖 IS: ${runtime(process.uptime())}_*`);
    }
});
