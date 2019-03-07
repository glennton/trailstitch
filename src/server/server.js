import path from 'path'
import express from 'express'
import webpack from 'webpack'

// import clientBundleConfig from '../bundler/webpack.client.config.js'
// import serverBundleConfig from '../bundler/webpack.server.config.js'

// const clientCompiler = webpack(clientBundleConfig)
// const serverCompiler = webpack(serverBundleConfig)

// clientCompiler.watch({
//     // Watch Options
//     }, (err, stats) => {
//     // Print watch/build result here...
//     if (err) {
//         console.error(err)
//         return;
//     }
//     console.log(stats.toString({
//         chunks: false,  // Makes the build much quieter
//         colors: true    // Shows colors in the console
//     }));
//     })
// serverCompiler.watch({
//     // Watch Options
//     }, (err, stats) => {
//     // Print watch/build result here...
//     if (err) {
//         console.error(err)
//         return;
//     }
//     console.log(stats.toString({
//         chunks: false,  // Makes the build much quieter
//         colors: true    // Shows colors in the console
//     }));
//     })
const app = express()
// app.use(middleware(compiler, {
//     // webpack-dev-middleware options
// }));
console.log(path.join(__dirname, '../', '../', 'dist', 'client'))
app.use(express.static(path.join(__dirname, '../', '../', 'dist', 'client')))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
