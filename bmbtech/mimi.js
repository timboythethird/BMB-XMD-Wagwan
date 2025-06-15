const googleTTS = require('google-tts-api');
const { zokou } = require("../framework/zokou");

const makeVoiceCommand = (nomCom, lang, emoji) => {
  zokou({
    nomCom,
    categorie: "User",
    reaction: emoji
  }, async (dest, zk, commandeOptions) => {

    const { ms, arg, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre("Insert a word");
      return;
    }

    const mots = arg.join(" ");
    const url = googleTTS.getAudioUrl(mots, {
      lang,
      slow: false,
      host: 'https://translate.google.com',
    });

    try {
      await zk.sendMessage(dest, {
        audio: { url },
        mimetype: 'audio/mp4',
        ptt: true,
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
    } catch (e) {
      console.error(e);
      repondre("Failed to send audio");
    }
  });
};

// TTS commands with JID channel context
makeVoiceCommand("dit1", "fr", "👄");     // French
makeVoiceCommand("itta1", "ja", "👄");    // Japanese
makeVoiceCommand("say1", "en", "👄");     // English
