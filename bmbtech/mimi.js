const fs = require("fs");
const path = require("path");
const { zokou } = require(__dirname + "/../framework/zokou");

zokou(
  {
    nomCom: "get",
    categorie: "Mods",
    reaction: "📦",
  },
  async (dest, zk, options) => {
    const { ms, repondre, arg } = options;

    if (!arg || arg.length < 1) {
      return repondre("Please provide a filename to get. Example: .get menu");
    }

    const fileName = arg.trim();
    const filePath = path.join(__dirname, `../bmbtech/${fileName}.js`);

    if (!fs.existsSync(filePath)) {
      return repondre(`❌ File not found: ${fileName}.js`);
    }

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");

      if (fileContent.length > 4000) {
        return repondre("❌ File too large to display.");
      }

      await zk.sendMessage(
        dest,
        {
          text: `📁 *File:* ${fileName}.js\n\n` + fileContent,
        },
        { quoted: ms }
      );
    } catch (err) {
      console.error("[GET CMD ERROR]:", err);
      return repondre("❌ Failed to read file.");
    }
  }
);
