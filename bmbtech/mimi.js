const { zokou } = require("../framework/zokou");
const os = require("os");
const path = require("path");
const fs = require("fs");

const config = {
  DESCRIPTION: "🤖 Powered by B.M.B-XMD"
};

async function sendUptimeAudio(zk, dest, ms, repondre) {
    const audioPath = path.join(__dirname, "../bmb/menu1.mp3");
    if (!fs.existsSync(audioPath)) return repondre("❌ Sauti haijapatikana: menu1.mp3");
    await zk.sendMessage(dest, {
        audio: { url: audioPath },
        mimetype: "audio/mpeg",
        ptt: true,
        fileName: "🎵 Uptime Sound",
    }, { quoted: ms });
}

zokou({
    nomCom: "uptime",
    categorie: "General",
    reaction: "⏱️"
}, async (dest, zk, { ms, repondre }) => {
    const uptimeSec = os.uptime();
    const uptimeHours = Math.floor(uptimeSec / 3600);
    const uptimeMinutes = Math.floor((uptimeSec % 3600) / 60);
    const uptimeSeconds = Math.floor(uptimeSec % 60);

    const uptime = `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`;
    const startTime = new Date(Date.now() - uptimeSec * 1000);

    const message = `
╭───『 UPTIME 』───⳹
│
│ ⏱️ ${uptime}
│
│ 🚀 Started: ${startTime.toLocaleString()}
│
╰────────────────⳹
${config.DESCRIPTION}
`;

    await zk.sendMessage(dest, { text: message }, { quoted: ms });
    await sendUptimeAudio(zk, dest, ms, repondre);
});
