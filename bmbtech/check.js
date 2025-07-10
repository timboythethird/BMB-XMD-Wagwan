const axios = require("axios");
const { zokou } = require("../framework/zokou");

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
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

    const code = arg[0].replace(/\D/g, ""); // hakikisha ni namba tu

    try {
      const res = await axios.get("https://country-code-1-hmla.onrender.com/countries");
      const countries = res.data;

      const found = countries.find(c =>
        c.callingCodes.includes("+" + code)
      );

      if (!found) {
        return repondre(`❌ No country found with code +${code}`);
      }

      const flag = getFlagEmoji(found.alpha2Code);
      const message = `🌍 *Country Found!*\n\n🏳️ Name: ${found.name}\n📞 Code: +${code}\n🚩 Flag: ${flag}`;
      repondre(message);
    } catch (err) {
      console.error(err);
      repondre("❌ Failed to fetch country data.");
    }
  }
);
