const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU05yZzFJQWFjSlFjU3dPOTJFRFZmZ2p2UEM3NEw3d2Yrc0JvNE9aOVVVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZnVDV1k0Ym9xVHpRRWxTSmpMQmJTZUFGR013OXFGTnFxKzRmOVg0NGRnMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQzFHNjREZHNNRlQrMzRxVGZmdHcxK1FHeW4xNDhNTUl3TGo1dm5WTGxjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRUU1TQ1J0U3pzaVcxZVNKbXI2b2dFcjVBZjlIWW92QXozMVpvQUdnbkFvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNQVDJpZUZLc2hFVHZaU0U4bVFka2xUeGh3eUtmUzhkVU9JZmQ2MitNRzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYRnhoaFVpYzlJai9GYVVpSCtUek9YcWdLSVVSV2lLYUhlWTB6VWhSWG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0RLb1lNMjNvdktrY0JnWjZuYTQ2a1YxTTJxT2VFVldRM1g1Nmp2Q2hFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzJzREJnVjB0aWJFcWdLcWZVV1RweFRuNWgrTGhNV0FiWWJqK3YyUmJGVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZqcGIxUzlYYVIyTGRpZnQvTTBjY0gyNE5FeU00LzJ2bGFuSU02WkRrUzkxWEZaVHlHWk5hVUF4MGFaRXdIbS9iTThDMTRXbmRQT0w5L0Y5MnhkbEF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY4LCJhZHZTZWNyZXRLZXkiOiJ6Q21ISlBwbGJDZ0ZDTmpaYlIvYkxTMDZQb1JLeUQxOGpQTmw3Ukp0ZUNnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcyNTcxMjI1MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzREYyOTNBRDM4OTU5NUM3RUE3RjE3ODdBM0JBODc3NyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU1NjU2MzA2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MjU3MTIyNTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzI4MTc4RkNGNEI5QTQzRTI0RkMxRkUwOTBENjFERjAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTY1NjMxOH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiM0IxUVNMUkQiLCJtZSI6eyJpZCI6IjI1NDcyNTcxMjI1MDoxNUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI1MjcyOTI5NzQ4NjAxODoxNUBsaWQiLCJuYW1lIjoiVGltIEJveSBUaGUgVGhpcmQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09DRTJEZ1EzT0NVeFFZWUJDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImlzRzR6UG4zUWkzSnduT1NoNE5TMDIrZ0hUMDRBTi9JZ0FnSm1VVy9Sa0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkZGVGRjQjlTcmhYRzQyK0dGQjhKMFZjWXB6VGJHYUU4OGhtenZDVzF3a1pTOWh5VTBDazlRUmNJL2lCZkNjS3hjS0RmS3FaY3J4RENhNVpJbDQrOENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhWjNaYThQNS95WkkrTHhjc2Fralk5bkFQWlFCMU1uR01qa1p3cGJ1aC9HTmZrT0FhMU5XZ0xGWVg1YWtsRUtrTDU1TUZ2Yjd5ajlSZzJnanpUVjNBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcyNTcxMjI1MDoxNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZckJ1TXo1OTBJdHljSnprb2VEVXROdm9CMDlPQURmeUlBSUNabEZ2MFpCIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTU2NTYyOTgsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT2JJIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254725712250",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
