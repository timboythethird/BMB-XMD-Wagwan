const { bmbtz } = require("../devbmb/bmbtz");
const fancy = require("../devbmb/function/styles");

bmbtz({
  nomCom: "fancy",
  categorie: "Fun",
  reaction: "✍️",
  desc: "transform text into fancy style",
  alias: ['fc']
}, async (message, reply, options) => {
  const {
    arg,
    repondre,
    prefixe
  } = options;

  const styleIndex = arg[0]?.match(/\d+/)?.join('');
  const textToStyle = arg.slice(1).join(" ");

  try {
    if (!styleIndex || !textToStyle) {
      return await repondre(
        "\nExemple : " + prefixe + "fancy 10 Bmb-Tech\n" +
        String.fromCharCode(0x200e).repeat(4001) +
        fancy.list("bmb-tech", fancy)
      );
    }

    const styleFunc = fancy[parseInt(styleIndex) - 1];

    if (styleFunc) {
      const styledText = fancy.apply(styleFunc, textToStyle);
      return await repondre(styledText);
    } else {
      return await repondre("_Style not found :(_");
    }

  } catch (error) {
    console.error(error);
    return await repondre("_An error occurred :(_");
  }
});
