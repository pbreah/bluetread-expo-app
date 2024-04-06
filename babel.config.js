module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Compile Exported Namespaces
      '@babel/plugin-proposal-export-namespace-from',
      // React Native Reanimated
      'react-native-reanimated/plugin',
      // dotenv
      'module:react-native-dotenv',
      // Use Absolute Imports
      ['module-resolver', { alias: { src: './src' } }]
    ]
  }
}
