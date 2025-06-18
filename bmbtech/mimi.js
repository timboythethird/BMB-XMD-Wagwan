const axios = require('axios');
const { zokou } = require(__dirname + "/../framework/zokou");

async function getCodeFromGitHub(fileName) {
  const username = 'bwbxmd'; // GitHub username
  const repo = 'B.M.B-TECH'; // GitHub repository
  const branch = 'main'; // Branch name
  const filePath = `commands/${fileName}.js`; // Adjust path if needed
  const url = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filePath}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

zokou(
  {
    nomCom: "get",
    categorie: "General",
    reaction: "📂",
    fromMe: true,
    desc: "Fetch the source code of a command from GitHub",
  },
  async (dest, zk, { ms, repondre, args }) => {
    if (!args || args.length === 0) {
      return repondre("❌ Usage: .get <command>");
    }

    const fileName = args[0];
    const code = await getCodeFromGitHub(fileName);

    if (!code) {
      return repondre(`❌ Could not retrieve code for: ${fileName}`);
    }

    if (code.length > 4000) {
      return repondre("❌ Code is too long to display.");
    }

    repondre(`📂 Source code for *${fileName}*:\n\n\`\`\`js\n${code}\n\`\`\``);
  }
);
