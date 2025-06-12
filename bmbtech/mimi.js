const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const speed = require("performance-now");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

zokou({
  nomCom: "mimi",
  desc: "Check bot response speed",
  categorie: "General",
  reaction: "⚡",
  fromMe: true
}, async (dest, zk, { repondre, ms }) => {
  try {
    let loadingMsg = await zk.sendMessage(dest, { 
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

    // Tuma ujumbe wa matokeo na view channel chini yake
    await zk.sendMessage(dest, {
      text: resultMessage,
      edit: loadingMsg.key,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
          serverMessageId: 143
        }
      }
    });

  } catch (error) {
    console.error("Ping error:", error);
    await repondre("𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐭𝐞𝐬𝐭 𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧.");
  }
});
