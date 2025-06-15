const { zokou } = require(__dirname + "/../framework/zokou");
const { styletext } = require(__dirname + "/../framework/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + '/../set');

function format(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

zokou({
  nomCom: "menu7",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;

  // Hakikisha cm ipo na ni array
  const { cm } = require(__dirname + "/../framework/zokou");
  if (!cm || !Array.isArray(cm)) {
    repondre("❌ Error: command list (cm) not found or invalid!");
    return;
  }

  let commandCategories = {};
  // Angalia s.MODE iwe string na ifanye lowercase kabla ya kulinganisha
  let mode = (typeof s.MODE === 'string' && s.MODE.toLowerCase() === 'oui') ? 'public' : 'privé';

  const emojis = {
    'General': '🌐',
    'Logo': '🎨',
    'Hentai': '🔥',
    'Weeb': '🌸',
    'Recherche': '🔍',
    'Conversion': '🌟',
    'Groupe': '♻️',
    'Autre': '🪖'
  };

  cm.forEach(cmd => {
    const cat = cmd.categorie || 'Autre';
    const nom = cmd.nomCom || 'unknown';
    if (!commandCategories[cat]) {
      commandCategories[cat] = [];
    }
    commandCategories[cat].push(nom);
  });

  // Set timezone na locale kwa moment
  moment.tz.setDefault("Asia/Karachi").locale('fr');
  const currentTime = moment().format("HH:mm:ss");
  const currentDate = moment().format("DD/MM/YYYY");

  let menuText = "╩═══ * Ƶ𝓞ｋØ𝓊 * ╩═══\n\n";
  menuText += `╔════---------\n
║    Préfixe : ${s.PREFIXE || 'N/A'}
║    Owner : ${s.OWNER_NAME || 'N/A'}
║    Mode : ${mode}
║    Commandes: ${cm.length}
║    Date : ${currentDate}
║    Heure : ${currentTime}
║    Mémoire : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║    Plateforme : ${os.platform()}
║    Développeurs : Djalega++ || Luffy
╚════---------------\n\n`;

  for (const categorie in commandCategories) {
    const icon = emojis[categorie] || '💞';
    menuText += `${icon} ══ *${categorie}* ══ ${icon}\n`;
    commandCategories[categorie].forEach(cmd => {
      menuText += `\t  ║ ${cmd}\n`;
    });
  }

  try {
    await zk.sendMessage(dest, {
      image: { url: s.IMAGE_MENU || '' },
      caption: menuText,
      footer: "by Djalega++"
    }, { quoted: ms });
  } catch (err) {
    console.error("🥵🥵 Menu erreur", err);
    repondre("🥵🥵 Menu erreur " + (err.message || err));
  }
});
