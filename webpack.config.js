const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");



module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: 'bundle.js'

    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options:{     
                        cacheDirectory: true
                    }
                }        
            },

            {
                test: /\.css$/,
                use:{
                    loader: 'style-loader'
                }
            },
            {
                test: /\.css$/,
                use:{
                    loader: 'css-loader'
                }
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "public", "index.html")
        })
    ],
    devServer: {
        port: 4000,
        contentBase: './public',
        inline: true /* automatically updates live code */
    }
}