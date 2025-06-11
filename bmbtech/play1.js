const {
  zokou
} = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios");
zokou({
  'nomCom': "play1",
  'categorie': "Download",
  'reaction': '🎧'
}, async (_0x5c6564, _0xc84ada, _0x49e9c6) => {
  const {
    ms: _0x20c087,
    repondre: _0x384207,
    arg: _0x4576a0
  } = _0x49e9c6;
  if (!_0x4576a0[0x0]) {
    return _0x384207("𝗣𝗹𝗲𝗮𝘀𝗲 𝗶𝗻𝘀𝗲𝗿𝘁 𝗮 𝘀𝗼𝗻𝗴 𝗻𝗮𝗺𝗲.");
  }
  try {
    const _0x50ca5c = _0x4576a0.join(" ");
    _0x384207("𝙱.𝙼.𝙱-𝚇𝙼𝙳 𝘀𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗳𝗼𝗿 𝘁𝗵𝗲 𝘀𝗼𝗻𝗴 🎵");
    const _0x2c788b = await yts(_0x50ca5c);
    const _0x276b9b = _0x2c788b.videos;
    if (_0x276b9b.length === 0x0) {
      return _0x384207("𝗡𝗼 𝗮𝘂𝗱𝗶𝗼 𝗳𝗼𝘂𝗻𝗱. 𝗧𝗿𝘆 𝗮 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝘁 𝘀𝗼𝗻𝗴! 😕");
    }
    const _0x236112 = _0x276b9b[0x0];
    const _0x1d9d45 = _0x236112.url;
    const _0x36a2e9 = "https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=" + encodeURIComponent(_0x1d9d45);
    const _0x26e09e = await axios.get(_0x36a2e9);
    const _0x2821a3 = _0x26e09e.data;
    if (_0x2821a3.status === 0xc8 && _0x2821a3.success) {
      const _0x4acf10 = _0x2821a3.result.download_url;
      await _0xc84ada.sendMessage(_0x5c6564, {
        'audio': {
          'url': _0x4acf10
        },
        'mimetype': "audio/mp4"
      }, {
        'quoted': _0x20c087
      });
      await _0xc84ada.sendMessage(_0x5c6564, {
        'text': "𝗝𝗼𝗶𝗻 𝗳𝗼𝗿 𝘂𝗽𝗱𝗮𝘁𝗲𝘀 📢\nhttps://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z"
      }, {
        'quoted': _0x20c087
      });
    } else {
      _0x384207("𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗮𝘂𝗱𝗶𝗼. 𝗧𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿. 😓");
    }
  } catch (_0x1e2029) {
    console.error("Error:", _0x1e2029);
    _0x384207("𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗽𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝘆𝗼𝘂𝗿 𝗿𝗲𝗾𝘂𝗲𝘀𝘁. 😵");
  }
});
