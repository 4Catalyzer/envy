module.exports = {
  presets: [
    [
      '@4c',
      {
        target: 'node',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'add-module-exports',
  ],
};
