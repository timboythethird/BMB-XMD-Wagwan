const path = require("path");
const fs = require("fs");
const { zokou } = require("../framework/zokou");

let categoryMap = {};

// STEP 1: Amri ya kuonyesha list ya categories
zokou({
  nomCom: "menu55",
  categorie: "General",
  reaction: "📋"
}, async (dest, zk, { ms, repondre }) => {
  const { cm } = require("../framework/zokou");
  categoryMap = {};

  // Assemble categories map
  for (let cmd of cm) {
    const cat = (cmd.categorie || "UNCATEGORIZED").toUpperCase();
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(cmd.nomCom);
  }

  const categories = Object.keys(categoryMap);
  let listText = `📋 *B.M.B MENU CATEGORIES:*\n\n`;
  categories.forEach((cat, i) => {
    listText += `${i + 1}. ${cat}\n`;
  });
  listText += `\n🧾 _Reply this message with number (e.g. 3) to see its commands_`;

  await zk.sendMessage(dest, {
    text: listText,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true
    }
  }, { quoted: ms });
});

// STEP 2: Generic handler to catch replies
zokou({
  nomCom: "text",
  categorie: "General"
}, async (dest, zk, { ms, repondre }) => {
  const body = ms.message?.conversation
             || ms.message?.extendedTextMessage?.text
             || "";
  const quotedText = ms.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;

  if (!quotedText) return;

  // Only respond if replying to the menu
  if (!quotedText.startsWith("📋 B.M.B MENU CATEGORIES:")) return;

  const selected = parseInt(body.trim());
  const categories = Object.keys(categoryMap);

  if (!selected || selected < 1 || selected > categories.length) {
    return repondre("❌ Invalid category number. Reply a valid number from the menu.");
  }

  const cat = categories[selected - 1];
  const cmds = categoryMap[cat];

  let out = `╔═══════ ${cat} ═══════╗\n`;
  cmds.forEach(cmd => {
    out += `║ ⚙️ +${cmd}\n`;
  });
  out += `╚════════════════════════╝`;

  return repondre(out);
});
