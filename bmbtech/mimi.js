const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const speed = require("performance-now");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Channel JID (newsletter)
const channelJid = "120363382023564830@newsletter";

// Command: ping
zokou({
  nomCom: "pongo",
  desc: "Check bot response speed",
  categorie: "General",
  reaction: "⚡",
  fromMe: true
}, async (dest, zk, { repondre, ms }) => {
    try {
        let loadingMsg = await zk.sendMessage(channelJid, { 
            text: "𝙱.𝙼.𝙱-𝚇𝙼𝙳 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧..."
        }, { quoted: ms });

        await sleep(500);

        const timestamp = speed();
        await sleep(200);
        const pingResult = (speed() - timestamp).toFixed(2);

        let quality = "";
        if (pingResult < 100) quality = "𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭";
        else if (pingResult < 300) quality = "𝐆𝐨𝐨𝐝";
        else if (pingResult < 600) quality = "𝐅𝐚𝐢𝐫";
        else quality = "𝐒𝐥𝐨𝐰";

        const resultMessage = `𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐓𝐢𝐦𝐞⚡: ${pingResult} 𝐦𝐬\n\n𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧 𝐐𝐮𝐚𝐥𝐢𝐭𝐲🖥️: ${quality}\n`;

        await zk.sendMessage(channelJid, {
            text: resultMessage,
            edit: loadingMsg.key
        });

    } catch (error) {
        console.error("Ping error:", error);
        await repondre("𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐭𝐞𝐬𝐭 𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧.");
    }
});


// Command: ss
zokou({
  nomCom: "sss",
  desc: "Take website screenshot",
  categorie: "General",
  reaction: "📸",
  fromMe: true
}, async (dest, zk, { ms, arg, repondre }) => {
    if (!arg || arg.length === 0) {
        return repondre("𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐰𝐞𝐛𝐬𝐢𝐭𝐞 𝐔𝐑𝐋.");
    }

    try {
        const loadingMsg = await repondre("𝐂𝐚𝐩𝐭𝐮𝐫𝐢𝐧𝐠 𝐬𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭...");

        const url = arg.join(" ");
        const apiUrl = `https://api.maher-zubair.tech/misc/sstab?url=${encodeURIComponent(url)}&dimension=720x720`;

        await sleep(1500);

        const screenshot = await getBuffer(apiUrl);

        await zk.sendMessage(channelJid, {
            image: screenshot,
            caption: `𝐒𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭 𝐨𝐟 ${url}`
        }, { quoted: ms });

        await zk.sendMessage(dest, {
            delete: loadingMsg.key
        });

    } catch (error) {
        console.error("Screenshot error:", error);
        repondre("𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐜𝐚𝐩𝐭𝐮𝐫𝐞 𝐬𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭.");
    }
});
