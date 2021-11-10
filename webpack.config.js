const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
   entry: './src/assets/js/index.js',
   output:{
      filename:'bundle.[chunkhash].js',
      path: path.resolve(__dirname,'public')
   },
      devServer:{
      port:3002
   },
   plugins:[
      new HTMLPlugin({
         template:'./src/index.html'
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
         },
         {
            test: /\.(png|jpg|gif)$/i,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     mimetype: false,
                  },
               },
            ],
         },
      ]
   }
}