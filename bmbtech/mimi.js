const {
  zokou
} = require(__dirname + "/../framework/zokou");
const {
  format,
  styletext
} = require(__dirname + "/../framework/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + '/../set');
zokou({
  'nomCom': "menu7",
  'categorie': "General"
}, async (_0x37f915, _0x3cbee8, _0x32e2b0) => {
  let {
    ms: _0x47ca75,
    repondre: _0x3ebe83
  } = _0x32e2b0;
  let {
    cm: _0x198829
  } = require(__dirname + "/../framework//zokou");
  var _0x5a4d67 = {};
  var _0x4b070e = "public";
  if (s.MODE.toLocaleLowerCase() != 'oui') {
    _0x4b070e = 'privé';
  }
  var _0x22cf3a = {
    'General': '🌐',
    'Logo': '🎨',
    'Hentai': '🔥',
    'Weeb': '🌸',
    'Recherche': '🔍',
    'Conversion': '🌟',
    'Groupe': '♻️',
    'Autre': '🪖'
  };
  _0x198829.map(async (_0x36dc5a, _0x5c2a43) => {
    if (!_0x5a4d67[_0x36dc5a.categorie]) {
      _0x5a4d67[_0x36dc5a.categorie] = [];
    }
    _0x5a4d67[_0x36dc5a.categorie].push(_0x36dc5a.nomCom);
  });
  const _0x1f93ac = moment(moment()).format("HH:MM:SS");
  moment.tz.setDefault("asia/karachi ").locale('id');
  const _0x33c592 = moment.tz('asia/karachi').format("DD/MM/YYYY");
  console.log("date" + _0x33c592);
  console.log("temps " + _0x1f93ac);
  let _0x6acea8 = "  ╩═══ * Ƶ𝓞ｋØ𝓊 * ╩═══\n\n";
  _0x6acea8 += "\n\n╔════---------\n\n║    Préfixe : " + s.PREFIXE + "\n\n║    Owner : " + s.OWNER_NAME + "    \n\n║    Mode : " + _0x4b070e + "\n\n║    Commandes:" + _0x198829.length + "\n\n║    Date : " + _0x33c592 + "\n\n║    Heure : " + _0x1f93ac + "\n\n║    Mémoire : " + format(os.totalmem() - os.freemem()) + '/' + format(os.totalmem()) + "\n\n║    Plateforme : " + os.platform() + "\n\n║    Développeurs : Djalega++||Luffy\n\n╚════--------------- \n\n";
  for (const _0x12d9c4 in _0x5a4d67) {
    if (!_0x22cf3a[_0x12d9c4]) {
      _0x22cf3a[_0x12d9c4] = '💞';
    }
    _0x6acea8 += _0x22cf3a[_0x12d9c4] + " ══ *" + _0x12d9c4 + " * ══ " + _0x22cf3a[_0x12d9c4] + "\n";
    for (const _0x19eae6 of _0x5a4d67[_0x12d9c4]) {
      _0x6acea8 += "\t  ║ " + _0x19eae6 + '' + " \n";
    }
  }
  var _0x2f54f3 = s.IMAGE_MENU;
  try {
    _0x3cbee8.sendMessage(_0x37f915, {
      'image': {
        'url': _0x2f54f3
      },
      'caption': _0x6acea8,
      'footer': "by Djalega++"
    }, {
      'quoted': _0x47ca75
    });
  } catch (_0x129ae9) {
    console.log("🥵🥵 Menu erreur " + _0x129ae9);
    _0x3ebe83("🥵🥵 Menu erreur " + _0x129ae9);
  }
});
