const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("decent-forum-api", resolve("../decent-forum-api/src"));
    config
      .plugin('fork-ts-checker')
      .tap(args => {
        return [{ memoryLimit: 600 }]
      });

    // Use vue-svg-loader
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
};
