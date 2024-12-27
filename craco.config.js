const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 修改现有的 TypeScript 规则
      const tsRule = webpackConfig.module.rules.find(
        rule => rule.test && rule.test.toString().includes('tsx')
      );
      
      if (tsRule) {
        tsRule.include = [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@remix-run')
        ];
      }

      // 添加图片优化规则
      const imageRule = webpackConfig.module.rules.find(
        rule => rule.test && rule.test.test('.svg')
      );

      if (imageRule) {
        imageRule.use = [
          ...imageRule.use,
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ];
      }

      return webpackConfig;
    }
  }
}; 