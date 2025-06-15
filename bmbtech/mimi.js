const { zokou } = require('../framework/zokou');
var gis = require('g-i-s');

zokou({
  nomCom: "img2",
  categorie: "Search",
  reaction: "📷"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('which image ? !');
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, envoiImage);

  function envoiImage(e, r) {
    if (e) {
      repondre("oups une error");
    } else {
      for (var a = 0; a < 5; a++) {
        zk.sendMessage(dest, {
          image: { url: r[a].url },
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedMessage: {
              key: { remoteJid: "120363382023564830@newsletter" },
              message: { conversation: "B.M.B-TECH" }
            }
          }
        }, { quoted: ms });
      }
    }
  }
});
