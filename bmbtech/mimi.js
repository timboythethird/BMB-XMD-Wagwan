const { zokou } = require("../framework/zokou");
const conf = require(__dirname + "/../set");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter",
      newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
      serverMessageId: 1
    }
  }
};

// PROFILE COMMAND
zokou({
  nomCom: "profile4",
  aliases: ["pp", "whois"],
  desc: "to generate profile picture",
  categorie: "Fun"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;
  let jid = msgRepondu ? auteurMsgRepondu : auteurMessage;
  let nom = msgRepondu ? "@" + auteurMsgRepondu.split("@")[0] : nomAuteurMessage;

  try {
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image');
    } catch (error) {
      ppUrl = conf.URL;
    }

    let status;
    try {
      status = await zk.fetchStatus(jid);
    } catch {
      status = { status: "About not accessible due to user privacy" };
    }

    await zk.sendMessage(dest, {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}`,
      mentions: msgRepondu ? [auteurMsgRepondu] : [],
      ...newsletterContext
    }, { quoted: ms });

  } catch (error) {
    console.error('Unexpected error in profile command:', error);
  }
});

// PROFILE2 COMMAND
zokou({
  nomCom: "profile5",
  aliases: ["pp2", "whois2"],
  desc: "to generate business profile picture",
  categorie: "Fun"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;
  let jid = msgRepondu ? auteurMsgRepondu : auteurMessage;
  let nom = msgRepondu ? "@" + auteurMsgRepondu.split("@")[0] : nomAuteurMessage;

  try {
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image');
    } catch {
      ppUrl = conf.URL;
    }

    let status;
    try {
      status = await zk.fetchStatus(jid);
    } catch {
      status = { status: "About not accessible due to user privacy" };
    }

    let businessProfile;
    try {
      businessProfile = await zk.getBusinessProfile(jid);
    } catch {
      businessProfile = { description: "No business profile available", category: "Unknown" };
    }

    await zk.sendMessage(dest, {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}\nBusiness Description: ${businessProfile.description}\nBusiness Category: ${businessProfile.category}`,
      mentions: msgRepondu ? [auteurMsgRepondu] : [],
      ...newsletterContext
    }, { quoted: ms });

  } catch (error) {
    console.error('Unexpected error in profile2 command:', error);
  }
});
