const axios = require("axios");
const { zokou } = require("../framework/zokou");

// Convert alpha2 country code to emoji flag
function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(letter => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

zokou({
  nomCom: "check",
  categorie: "tools",
  reaction: "🌍"
}, async (dest, zk, { arg, ms, repondre }) => {
  try {
    let code = arg[0];
    if (!code) return repondre("❌ Please provide a country code. Example: `.check 255`");
    code = code.replace(/\+/g, '');

    const url = "https://country-code-1-hmla.onrender.com/countries";
    const { data } = await axios.get(url);

    const matches = data.filter(c => c.calling_code === code);

    if (matches.length > 0) {
      const list = matches
        .map(c => `${getFlagEmoji(c.code)} ${c.name}`)
        .join("\n");

      const response = `✅ *Country Code:* +${code}\n🌍 *Countries:*\n${list}`;
      await zk.sendMessage(dest, {
        text: response,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
            serverMessageId: 1
          }
        }
      }, { quoted: ms });
    } else {
      repondre(`❌ No country found for the code ${code}.`);
    }
  } catch (error) {
    console.error(error);
    repondre("❌ An error occurred while checking the country code.");
  }
});
