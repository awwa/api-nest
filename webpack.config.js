// const { NODE_ENV = 'production' } = process.env;
// module.exports = {
//   target: 'node',
//   mode: NODE_ENV,
//   externals: [
//     {
//       '@nestjs/websockets/socket-module':
//         'commonjs2 @nestjs/websockets/socket-module',
//       '@nestjs/microservices/microservices-module':
//         'commonjs2 @nestjs/microservices/microservices-module',
//       '@nestjs/mapped-types': 'commonjs2 @nestjs/mapped-types',
//     },
//   ],
//   optimization: {
//     minimize: false,
//   },
// };

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    // '@nestjs/mapped-types',
    'class-transformer/storage',
  ];

  return {
    ...options,
    externals: [],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
  };
};
