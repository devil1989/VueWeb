//默认打webpack命令，执行的是该文件里面的内容
//如果想要执行其他配置，需要命令 webpack --config webpack.pro.js（其他配置文件）
var path = require('path');//webpack中自带的require，模块加载器
var webpack = require('webpack');
var entrys = require('webpack-glob-entry');//把entry数组化，把所有的里面的文件都展开
var filePath = '/build';

module.exports = {
    entry:entrys(__dirname+"/src/**/*.js"),//源文件,具体的entry设置https://www.npmjs.com/package/webpack-glob-entry
    output: {//输出文件
        path: "./",//__dirname+filePath,//path指定了本地构建地址(打包后的输出路径)
        // publicPath:__dirname+filePath,//publicPath指定的是构建后在html里的路径
        chunkFilename: "[name].js",//没有在entry中列出来，确需要打包的文件的文件名，例如文件中的js的文件中require的js文件
        filename: "[name].js"//'[name].js'//文件打包后的名字
    },
    module: {//资源加载器，什么样的资源对应什么样的加载器，加载器后面支持？加参数，多个加载器之间用！来连接 （用于处理文件的转义）
        loaders: [
            {
                 test: /\.js$/,//一个必须满足的条件 
                 exclude: /node_modules/,//不处理的文件
                 loader: 'babel-loader',//用哪个加载器处理
            }
        ]
    }
};
/*
module.exports.devServer = {
    contentBase: '../../',
    host: 'localhost', // 此处换成本机ip或localhost，但是换成localhost的话，无法用ip访问
    port: 8066,
    inline: true,
    proxy: {
        '*': 'http://localhost:5389' // 项目实际访问地址
    }
};

*/
