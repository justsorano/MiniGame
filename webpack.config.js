const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
   entry: './src/assets/js/app.js',
   output:{
      filename:'bundle.[chunkhash].js',
      path: path.resolve(__dirname,'public')
   },
      devServer:{
      port:3002
   },
   plugins:[
      new HTMLPlugin({
         template:'index.html'
      }),
      new CleanWebpackPlugin()
   ],
   module:{
      rules:[
         {
            test: /\.s[ac]ss$/i,
            use:[
            'style-loader',
            'css-loader',
            'sass-loader'
         ]
         }
      ]
   }
}