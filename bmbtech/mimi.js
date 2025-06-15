const { zokou } = require("../framework/zokou");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

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

zokou({
  nomCom: "🤙",
  categorie: "General",
  reaction: "🤙"
}, async (_0x1b06c5, _0x54bb8b, _0x2358bf) => {
  const { ms: _0x2aecc0, mybotpic: _0x43a6e2, repondre } = _0x2358bf;

  const _0x21b56d = [
    { nom: "B.M.B-TECH OWNER", numero: "255767862457" },
    { nom: "DEPLOMENT SERVICES", numero: "254736761160" },
    { nom: "hacker", numero: "254799056874" },
    { nom: "codding teacher", numero: "254794146821" },
    { nom: "tech champ", numero: "254702221671" },
    { nom: "dev marisel", numero: "254740007567" },
    { nom: "pk", numero: "254785392165" },
    { nom: "", numero: "" },
    { nom: "", numero: "" },
    { nom: "", numero: "" },
    { nom: "", numero: "" },
    { nom: "🤕", numero: "Load...." },
    { nom: "", numero: "" },
    { nom: "🤕", numero: "load...." }
  ];

  let _0x2d5c7e = "Hello👋  *I'm B.M.B-TECH Wa Bot* \nThe Following Numbers Are For   *B.M.B-TECH* Agents, \nYou Can Ask Them Anything Regarding B.M.B-TECH\nFollow Our Channel For More Tech :https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z \n*KEEP USING B.M.B-TECH*:\n\n";

  for (const _0x14eeec of _0x21b56d) {
    _0x2d5c7e += "----------------\n(●) " + _0x14eeec.nom + " : https://wa.me/" + _0x14eeec.numero + "\n";
  }

  try {
    const _0x11d31d = await _0x43a6e2();

    if (_0x11d31d.match(/\.(mp4|gif)$/i)) {
      await _0x54bb8b.sendMessage(_0x1b06c5, {
        video: { url: _0x11d31d },
        caption: _0x2d5c7e,
        ...newsletterContext
      }, { quoted: _0x2aecc0 });

    } else if (_0x11d31d.match(/\.(jpeg|png|jpg)$/i)) {
      await _0x54bb8b.sendMessage(_0x1b06c5, {
        image: { url: _0x11d31d },
        caption: _0x2d5c7e,
        ...newsletterContext
      }, { quoted: _0x2aecc0 });

    } else {
      await repondre(_0x11d31d);
      await repondre("link error");
    }

  } catch (err) {
    console.log("🥵🥵 Menu erreur " + err);
    await repondre("🥵🥵 Menu erreur " + err);
  }
});
