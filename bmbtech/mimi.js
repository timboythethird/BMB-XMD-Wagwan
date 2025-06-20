const { zokou, commandes } = require('../framework/zokou');
const fs = require('fs');
const path = require('path');

zokou({
  nomCom: "get",
  alias: ["source", "js"],
  categorie: "owner",
  reaction: "🤖"
}, async (jid, sock, { arg, ms, repondre, isCreator }) => {
  try {
    if (!isCreator) return repondre("❌ You don't have permission to use this command!");
    if (!arg[0]) return repondre("❌ Please provide a command name.\nExample: `.get alive`");

    const commandName = arg[0].toLowerCase();
    const commandData = commandes.find(cmd =>
      cmd.nomCom === commandName || (cmd.aliases && cmd.aliases.includes(commandName))
    );

    if (!commandData) return repondre("❌ Command not found!");

    const commandPath = commandData.filename;

    const fullCode = fs.readFileSync(commandPath, 'utf-8');

    let truncatedCode = fullCode;
    if (truncatedCode.length > 4000) {
      truncatedCode = fullCode.substring(0, 4000) + "\n\n// Code too long, sending full file 📂";
    }

    const captionText = `⬤───〔 *📜 Command Source* 〕───⬤
\`\`\`js
${truncatedCode}
\`\`\`
╰──────────⊷  
⚡ Full file sent below 📂  
Powered By *𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷*😎`;

    await sock.sendMessage(jid, {
      image: { url: `https://files.catbox.moe/hflcbc.jpg` },
      caption: captionText,
      contextInfo: {
        mentionedJid: [ms.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363382023564830@newsletter',
          newsletterName: 'B.M.B-XMD CHANNEL',
          serverMessageId: 143
        }
      }
    }, { quoted: ms });

    const fileName = `${commandName}.js`;
    const tempPath = path.join(__dirname, fileName);
    fs.writeFileSync(tempPath, fullCode);

    await sock.sendMessage(jid, {
      document: fs.readFileSync(tempPath),
      mimetype: 'text/javascript',
      fileName: fileName
    }, { quoted: ms });

    fs.unlinkSync(tempPath);

  } catch (e) {
    console.error("Error in .get command:", e);
    repondre(`❌ Error: ${e.message}`);
  }
});
