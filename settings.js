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
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lwbTR0NENraTNmUEJxTzVHM3B1dzFpam1ubzF3dVNGZzFzOXRPaTZrbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkFiTThpQjk4RXVXb050dkQ3NkpDdUkvL2hJUlBIRStRZU1TT1NKeitRWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRGI0VTVxOUJndW9aWjE4dGUzNlpoSFMvNm9EZDZuTWV0Q3ZoNDQ4TEU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyV2Y3TmNFdGFQREVTK0dmSmpaYlFRN0hKN2FqSTlZVEdxM3dkQUY5VkJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9CTXQ4aDVwWkliYXFOdmhuVlpsZjJ5Mi9vWGJPREFXZzhEaitOUGxwbXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc5Njl1di95TFROMUdUWXpjRVRITkpsSXhTN293MEdLYVlBQ2FON3FudzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUQybzYvVVR5SEo3Q3J3WjJETm1xOTlNRDNUVzhIclNNeUpJZE1ERk1scz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiODUyNjZkU3YxY3hYLytPbmR0SnFuNEN3SXlja1VGUU5TNUdBNjlYZ1BFQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBXQlJwdy82alRYbHRIWHVwb0M3dU1ENUI4Q3BLaDQ4cnU0YW8wNk10aUx2UmZ3c0FvN3FlQ25pT1dwZ0huQXV5OFlGUWVIYUljQU1QbEZlWEQxb0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcxLCJhZHZTZWNyZXRLZXkiOiJ6VXlWZHg2eWYxMnY5cEdYcnB3cWQ5cWt5SXE4OUd6YzB2Y3VGRnZqZHVVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc2OTUyOTc5MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCODU0NTkwNzZCRjYzNDI5NjdEM0ExRTEwNjVEODBCQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0Mjg1Njg5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3Njk1Mjk3OTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREFGMzdCODE1RUJDQ0IwMTM0MDM5QjNGREVBNkVEQTAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDI4NTY5Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzY5NTI5NzkxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVCMEYyRURBNkRBRjEzMERDMDhGNjJBQTMzNzk5NUUxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQyODU3MDh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjcyRTVYQ0NSIiwibWUiOnsiaWQiOiIyNTQ3Njk1Mjk3OTE6MjJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyOTkzMjIzMTA4MjE0MjoyMkBsaWQiLCJuYW1lIjoiYm1iIHRlY2gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xyRjdSWVE2SXpCeEFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlVzZVhqRXQzdmJRazBwKytSWk1NcndYN1htcTZjM2VmQ2xmc1lJMXRYZ3M9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImRBeHpET3M3eURKeUk1SUJVdjJyek8rMWdTeWhCck91VS9EZDZZY2tYajlnVVhCbkRiNWtFVldmL0N6dTRJNy9CTytkRTRkY0ZJMWtuM0RCYTNyRENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiaGQrQ1BNSlI5VWlwbXlNbTZHVzBZWitRekRwZDBsOG9ncjhrbk0xTmNRZG1ZTHUxeW1EMlBnVWNyWVlzNHJrd3FGKzkwYlBWTjZ0M1JNZVVPYjNEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc2OTUyOTc5MToyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWTEhsNHhMZDcyMEpOS2Z2a1dUREs4RisxNXF1bk4zbndwWDdHQ05iVjRMIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVRQXhBQSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQyODU2ODQsImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRTV4In0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254 769 529791",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, // ✅
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes', // ✅
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
