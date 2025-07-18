const { zokou } = require("../framework/zokou");

let categoryMap = {}; // Global map ya categories

// STEP 1: Tuma menu ya categories pekee
zokou({
  nomCom: "menu55",
  categorie: "General",
  reaction: "📋"
}, async (dest, zk, { ms, repondre }) => {
  const { cm } = require("../framework/zokou");
  categoryMap = {}; // clear previous

  // Andaa category map
  for (let cmd of cm) {
    const cat = cmd.categorie?.toUpperCase() || "UNCATEGORIZED";
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(cmd.nomCom);
  }

  const categories = Object.keys(categoryMap);
  let listText = `📋 *B.M.B MENU CATEGORIES:*\n\n`;

  categories.forEach((cat, index) => {
    listText += `${index + 1}. ${cat}\n`;
  });

  listText += `\n🧾 _Reply this message with number (e.g. 3) to see its commands_`;

  // Tuma menu
  await zk.sendMessage(dest, {
    text: listText,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
    }
  }, { quoted: ms });
});

// STEP 2: Response ya reply ya namba
zokou({
  nomCom: "text", // generic handler
  categorie: "General"
}, async (dest, zk, { ms, repondre }) => {
  const body = ms.message?.conversation || ms.message?.extendedTextMessage?.text || "";
  const quoted = ms.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;

  if (!quoted) return;

  // Kama message iliyoreplyiwa ni ile ya menu kuu
  if (quoted.startsWith("📋 B.M.B MENU CATEGORIES:")) {
    const selected = parseInt(body.trim());
    const categories = Object.keys(categoryMap);
    if (!selected || selected < 1 || selected > categories.length) {
      return repondre("❌ Invalid category number.");
    }

    const cat = categories[selected - 1];
    const cmds = categoryMap[cat];

    let out = `╔═══════ ${cat} ═══════╗\n`;
    cmds.forEach(cmd => {
      out += `║ ⚙️ +${cmd}\n`;
    });
    out += `╚════════════════════════╝`;

    return repondre(out);
  }
});
