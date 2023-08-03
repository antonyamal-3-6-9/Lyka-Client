module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
        if (oneOfRule) {
          oneOfRule.oneOf.unshift({
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('ts-loader'),
              },
            ],
          });
        }
  
        return webpackConfig;
      },
    },
  };
  