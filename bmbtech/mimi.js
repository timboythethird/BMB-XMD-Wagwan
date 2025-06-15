const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "bmblist",
  aliases: ["listblock", "blacklist"],
  reaction: '☘️',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    // Fetch the blocklist of contacts
    let blocklist = await zk.fetchBlocklist();

    // If the blocklist has users, proceed
    if (blocklist.length > 0) {
      // Start the message for blocked contacts
      let jackhuh = `*Blocked Contacts*\n`;

      await repondre(`You have blocked ${blocklist.length} contact(s), fetching and sending their details!`);

      // Map through the blocklist to fetch each blocked user's details
      const promises = blocklist.map(async (blockedUser) => {
        // Extract the phone number from the JID (remove '@s.whatsapp.net')
        const phoneNumber = blockedUser.split('@')[0];
        jackhuh += `🥴+${phoneNumber}\n`;  // List the phone number
      });

      await Promise.all(promises);

      // Send the final formatted message with the blocked contacts and newsletterJid info
      await zk.sendMessage(dest, {
        text: jackhuh,
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
      await zk.sendMessage(dest, {
        text: "There are no blocked contacts.",
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
    }
  } catch (e) {
    await zk.sendMessage(dest, {
      text: "An error occurred while accessing blocked users.\n\n" + e,
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
  }
});
