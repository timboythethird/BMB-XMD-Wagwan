const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "gep",
    categorie: "General",
    reaction: “🙄"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, auteurMsgRepondu, mybotpic, nomAuteurMessage } = commandeOptions;

    if (!msgRepondu) {
      return repondre(`Yo ${nomAuteurMessage}, reply to someone's message to get their profile picture.`);
    }

    try {
      await repondre(`Yo ${nomAuteurMessage}, getting @${auteurMsgRepondu.split("@")[0]}'s profile picture...`, {
        mentions: [auteurMsgRepondu]
      });

      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
      } catch {
        ppuser = mybotpic();
        await repondre(`@${auteurMsgRepondu.split("@")[0]}'s profile picture is private. Sending default picture.`, {
          mentions: [auteurMsgRepondu]
        });
      }

      await zk.sendMessage(
        dest,
        {
          image: { url: ppuser },
          caption: `Here is @${auteurMsgRepondu.split("@")[0]}'s profile picture.`,
          footer: `Requested by ${nomAuteurMessage}`,
          mentions: [auteurMsgRepondu]
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in .getpp command:", error);
      await repondre(`Error while getting profile picture: ${error.message}`);
    }
  }
);
