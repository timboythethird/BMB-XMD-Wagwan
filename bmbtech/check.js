const axios = require("axios");
const { zokou } = require("../framework/zokou");

// Emoji ya bendera kwa country code (alpha-2)
function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(c => String.fromCodePoint(127397 + c.charCodeAt()))
    .join("");
}

zokou(
  {
    nomCom: "check",
    categorie: "tools",
    reaction: "🌍"
  },
  async (dest, zk, { arg, repondre }) => {
    if (!arg || !arg[0]) {
      return repondre("❌ Please provide a country code. Example: `.check 255`");
    }

    const inputCode = arg[0].replace(/\D/g, ""); // safisha isibaki herufi

    try {
      const res = await axios.get("https://country-code-1-hmla.onrender.com/countries");

      if (!Array.isArray(res.data)) {
        return repondre("❌ Unexpected response from the API.");
      }

      // Tafuta nchi yenye callingCode inayolingana
      const found = res.data.find(c => {
        if (!c.callingCodes) return false;
        return c.callingCodes.some(code => code.replace("+", "") === inputCode);
      });

      if (!found) {
        return repondre(`❌ No country found with code +${inputCode}`);
      }

      const flag = getFlagEmoji(found.alpha2Code || "");
      const msg = `🌍 *Country Found!*\n\n🏳️ Name: ${found.name}\n📞 Code: +${inputCode}\n🚩 Flag: ${flag}`;
      repondre(msg);

    } catch (err) {
      console.error("API ERROR:", err);
      repondre("❌ Failed to fetch country data.");
    }
  }
);
