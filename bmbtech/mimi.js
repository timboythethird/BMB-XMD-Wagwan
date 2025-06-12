const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "getp",
    categorie: "General",
    reaction: "📷",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, auteurMsgRepondu, mybotpic, nomAuteurMessage } = commandeOptions;

    // Check if the message is a reply
    if (!msgRepondu) {
      return repondre(`BMB-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n🟪 Yo ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 Don’t make 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 do extra work! 🤔\n◈━━━━━━━━━━━━━━━━◈`);
    }

    try {
      // Notify the user that the profile picture is being fetched
      await repondre(`B.M.B-TECH\n\n◈━━━━━━━━━━━━━━━━◈\n🟦 Yo ${nomAuteurMessage}, 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇’s hunting for @${auteurMsgRepondu.split("@")[0]}’s profile pic! 📸 Hold tight! 🔍\n◈━━━━━━━━━━━━━━━━◈`, { mentions: [auteurMsgRepondu] });

      // Fetch the profile picture of the replied person
      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
      } catch {
        ppuser = mybotpic();
        await repondre(`B.M.B\n\n◈━━━━━━━━━━━━━━━━◈\n🟦 Yo ${nomAuteurMessage}, @${auteurMsgRepondu.split("@")[0]}’s profile pic is locked tight! 😣 bmb tech’s got you my pic instead! 😎\n◈━━━━━━━━━━━━━━━━◈`, { mentions: [auteurMsgRepondu] });
      }

      // Send the profile picture
      await zk.sendMessage(
        dest,
        {
          image: { url: ppuser },
          caption: `BMB\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BOOM, ${nomAuteurMessage}! Snagged @${auteurMsgRepondu.split("@")[0]}’s profile pic! 🔥\n🟦 Powered by 𝙱.𝙼.𝙱-𝚇𝙼𝙳\n◈━━━━━━━━━━━━━━━━◈`,
          footer: `Hey ${nomAuteurMessage}! I'm Bmb tech, created by 𝙱.𝙼.𝙱-𝚇𝙼𝙳`,
          mentions: [auteurMsgRepondu],
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in .getpp command:", error);
      await repondre(`BMB\n\n◈━━━━━━━━━━━━━━━━◈\n🟪 TOTAL BUST, ${nomAuteurMessage}! 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 crashed while grabbing the pic: ${error.message} 😡 Try again or flop! 😣\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);
