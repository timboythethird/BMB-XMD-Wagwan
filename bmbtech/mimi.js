const util = require("util");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

const topDivider = "❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒";
const categoryDivider = "❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒";

function getBotInfo(mode) {
  moment.tz.setDefault("EAT");
  const currentTime = moment().format("HH:mm:ss");
  const usedRAM = format(os.totalmem() - os.freemem());
  const totalRAM = format(os.totalmem());

  return `
╭━═「 *B.M.B-TECH* 」═━❂
┃⊛╭────••••────➻
┃⊛│🧑‍💻 *developer*: @255767862457
┃⊛│☢️ *mode*: ${mode.toUpperCase()}
┃⊛│⌚ *time*: ${currentTime} (EAT)
┃⊛│🖥️ *ram*: ${usedRAM} / ${totalRAM}
┃⊛│ ⚙️ *Status:* ONLINE
┃⊛│🌐 *creator* : 𝙱.𝙼.𝙱-𝚇𝙼𝙳
┃⊛└────••••────➻
╰─━━━━══──══━━━❂
`;
}

function buildCategoriesMenu(coms) {
  const categories = Object.keys(coms);
  let text = `👋 Hi! Choose a category by replying with the number:\n\n`;
  categories.forEach((cat, i) => {
    text += `*${i + 1}.* ${cat}\n`;
  });
  text += `\n*Reply with the number to see commands in that category.*`;
  return text;
}

function buildCommandsList(coms, category) {
  if (!coms[category]) return "⚠️ Category not found.";
  const cmds = coms[category];
  let text = `📂 Commands in *${category}* category:\n\n`;
  cmds.forEach((cmd) => {
    text += `⚙️ *${cmd}*\n`;
  });
  text += `\n_Reply *hi* to see categories again._`;
  return text;
}

// We keep a simple in-memory map to track which user is viewing which menu step
const userStates = {};

zokou(
  {
    nomCom: "hi",
    categorie: "General",
    reaction: "👋",
  },
  async (dest, zk, { ms, repondre }) => {
    // On "hi" command, reset user state and show categories
    const { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    for (const com of cm) {
      if (!coms[com.categorie]) coms[com.categorie] = [];
      coms[com.categorie].push(com.nomCom);
    }

    userStates[dest] = {
      step: "categories",
      coms,
    };

    const text = buildCategoriesMenu(coms);
    await repondre(text);
  }
);

zokou(
  {
    nomCom: "reply_number",
    categorie: "General",
  },
  async (dest, zk, { ms, repondre, body }) => {
    // This handler listens for replies that are numbers ONLY when user is at categories step
    if (!userStates[dest]) return; // no menu shown before
    const state = userStates[dest];

    if (state.step === "categories") {
      // Expecting a number reply
      const reply = (body || "").trim();
      if (!/^\d+$/.test(reply)) return; // ignore if not number

      const coms = state.coms;
      const categories = Object.keys(coms);
      const index = parseInt(reply, 10) - 1;

      if (index < 0 || index >= categories.length) {
        return repondre(`⚠️ Invalid choice. Reply a valid number from the list.`);
      }

      const category = categories[index];
      const commandsList = buildCommandsList(coms, category);

      // Update state to commands view
      userStates[dest].step = "commands";
      userStates[dest].selectedCategory = category;

      return repondre(commandsList);
    }

    if (state.step === "commands") {
      // If user is at commands step, you can decide what to do here
      // For now, ignore any input or tell them to reply "hi" to restart
      return repondre(`👉 Reply *hi* to return to categories menu.`);
    }
  }
);
