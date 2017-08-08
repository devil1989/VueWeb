//默认打webpack命令，执行的是该文件里面的内容
//如果想要执行其他配置，需要命令 webpack --config webpack.pro.js（其他配置文件）
var path = require('path');//webpack中自带的require，模块加载器
var webpack = require('webpack');
var process = require("process");//环境管理

var entrys = require('webpack-glob-entry');//把entry数组化，把所有的里面的文件都展开
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css提取到单个文件
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); // 提取公共模块
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动写入将引用写入html
var isDev = (process.env.NODE_ENV === 'production')?false:true;
var filePath = isDev?"/build":'/dest';//编译打包路径
var copyPath=__dirname + '/src/assets/images';//需要拷贝的文件路径
var copyTargetPath=__dirname+filePath+'/assets/images';//目标文件生成路径
// var stylePath=filePath+"/assets/css";//css生成路径
var config;
var commonConfig = {
    entry:entrys(__dirname+"/src/pages/*.js"),//源文件,具体的entry设置https://www.npmjs.com/package/webpack-glob-entry
    output: {//输出文件
        path: __dirname+filePath+"/pages",//,//path指定了本地构建地址(打包后的输出路径)
        // publicPath:__dirname+filePath+"/pages",//publicPath指定的是构建后在html里src和href的路径的基础地址（HtmlWebpackPlugin这个插件就是用这个publicPath来生成对应的html）
        chunkFilename: "[name].js",//没有在entry中列出来，确需要打包的文件的文件名，例如文件中的js的文件中require的js文件
        filename: '[name].js'////文件打包后的名字
    },
    module: {//资源加载器，什么样的资源对应什么样的加载器，加载器后面支持？加参数，多个加载器之间用！来连接 （用于处理文件的转义）
        loaders: [
            {//支持es6
                 test: /\.js$/,//一个必须满足的条件 
                 exclude: /node_modules/,//不处理的文件
                 loader: 'babel-loader',//用哪个加载器处理
                 options: {
                  presets: ['es2015']
                }
            },
            {
                test: /\.(scss|sass|css)$/,  //.scss|sass|css文件使用 style-loader css-loader 和 sass-loader 来编译处理
                loader: ExtractTextPlugin.extract({//如果js中require了多个css文件，nameExtractTextPlugin会把多个css文件合并成一个，这个css是否压缩，主要看use里面的第一个匹配项的设置是否压缩
                    fallback: "style-loader",
                    use: [{
                        loader:"css-loader",//"css-loader!sass-loader?sourceMap"
                        options:{
                            minimize: true //.css文件的css压缩
                        }
                    },{
                        loader:"sass-loader?sourceMap",//"css-loader!sass-loader?sourceMap"
                        options:{
                            minimize: true //sass文件转css后的css压缩
                        }
                    }]
                })//css-loader!postcss-loader!sass-loader (支持postcss)
            },
            // { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        ]
    }
};



if(isDev){
    config = Object.assign(commonConfig,{
        plugins:[
            new HtmlWebpackPlugin({//生成html （热插拔：配置1（没有这个动态生成html文件，热插拔无法正常监控））
            }),
            // new CopyWebpackPlugin([{//文件拷贝，如果拷贝了webpack其他插件（例如HtmlWebpackPlugin生成的html），它就会影响HtmlWebpackPlugin的执行，导致热替换失败
            //     from: copyPath,
            //     to:copyTargetPath
            // }]),
            new webpack.optimize.UglifyJsPlugin({//会对js包括js中require进去的css进行压缩（注意：不包括单独.css文件的压缩）
              compress: {warnings: false }
            }),
            new ExtractTextPlugin("[name].css"),//把js中引用require('./css/plan.css')的所有css都单独抽离出来成为一个css文件（存放地址和html同一级），插件还会再html文件中插入对应的css链接，css链接是 stylePath+"[name].css"（name指的是html的名称，stylePath是自定义的路径）
            new webpack.HotModuleReplacementPlugin()//热插拔：配置2（注意：热插拔不支持html内容改变的监控）
        ],
        devServer:{//热插拔：配置3(最後需要在package.json的scripts中添加"start": "webpack-dev-server --progress --colors --hot --inline")
            contentBase:"./build/pages"//localhost：8080对应的地址
        },
        devtool: 'eval-source-map'//启用source-map方便调试
    })
}else{
    config = Object.assign(commonConfig,{
        plugins:[
            new HtmlWebpackPlugin({//生成html （热插拔：配置1（没有这个动态生成html文件，热插拔无法正常监控））
                hash:true,
                minify:{
                    "html-minifier":true
                }
            })
            // new CopyWebpackPlugin([{//文件拷贝，如果拷贝了webpack其他插件（例如HtmlWebpackPlugin生成的html），它就会影响HtmlWebpackPlugin的执行，导致热替换失败
            //     from: copyPath,
            //     to:copyTargetPath
            // }])
        ]
    });
}
module.exports = config;





// // 生产环境，运行npm run build则执行这里
// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map'
//     // http://vue-loader.vuejs.org/en/workflow/production.html
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         // 环境变量
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         // 压缩代码
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         })
//     ]);

//     // module.exports.loaders =( module.exports.loaders ||[]).concat([
//     //     {
//     //         test: /\.scss$/,
//     //         use: ExtractTextPlugin.extract({
//     //             fallback: 'style-loader',
//     //             use: ['css-loader', 'sass-loader']
//     //         })
//     //     },
//     //     {
//     //         test: /\.scss$/,
//     //         use: ExtractTextPlugin.extract({
//     //             fallback: 'style-loader',
//     //             use: ['css-loader', 'sass-loader']
//     //         })
//     //     }
//     // ]);
        
// }



// ExtractTextPlugin.extract({
//     fallback: "style-loader",
//     use: [{
//         loader: 'css-loader',
//         options: {
//             minimize: true //css压缩
//         }
//     }]
// })
// }, ）


//常用插件：
// "autoprefixer": "^7.1.2",//css前缀自动补充
// "babel": "^6.23.0",//babel基础
// "copy-webpack-plugin": "^4.0.1",//文件拷贝
// "css-loader": "^0.28.4",//处理css中的url（）等
// "html-webpack-plugin": "^2.30.1",//生产html的插件，每次生成的html，里面的script、link后面会动态添加hash，防止html中的文件缓存
// "sass-loader": "^6.0.6",//处理css预处理器sass的转化
// node-sass : sass转化需要用到
// "style-loader": "^0.18.2",//把css插入style标签
// "url-loader": "^0.5.9",//处理图片，支持图片条件限制
// file-loader:url-loader以来file-loader
// "vue": "^2.4.2",//vue基础
// "webpack": "^2.2.0",//webpack基础
// "webpack-dev-server": "^2.6.1",//webpack通过这个来实现服务器配置
// "webpack-glob-entry": "^2.1.1",//通用入口，能把模糊路径转成所有的路径的数组
// "webpack-merge": "^4.1.0"//文件合并
// "extract-text-webpack-plugin": "^3.0.0",//希望项目的样式能不要被打包到脚本中，而是独立出来作为.css
// process,环境设置时候需要
// webpack 需要全局安装（-g），再局部安装




//待做功能 webpack：（）
//     webpack如何调试 ok  //http://blog.csdn.net/neoveee/article/details/73321392?utm_source=itdadao&utm_medium=referral
//     打包环境划分：webpack -d；webpack -p；webpack --watch（通过process区分） ok
//     文件拷贝 ok
//     es6，ok
//     热插拔+sourcemap方便开发调试 ok
//     extract-text-webpack-plugin：希望项目的样式能不要被打包到脚本中，而是独立出来作为.css 
//     
//     html-webapck-plugin：生产html的插件：每次生成的html，里面的script、link后面会动态添加hash，防止html中的文件缓存 ok
//     sass支持 ok
//     js，css压缩 ok 
//     
//     一个页面分多个css和多个js（模块分块打包）
//     支持异步加载（以免一个页面太大）
//     CommonsChunkPlugin：把所有公共页面的模块抽离出来放到common这个文件中去
//     
//     
//     postcss和autoprefixer使用


//注意事项：
// npm start没有启动浏览器是无法访问localhost地址的
// 配置变动了，webpack-dev-server也没用，得重新webpack打包，再npm start
// 插件或者webpack的很多问题，都是因为插件和webpack的版本不匹配


//webpack --watch  --dev : 
//      这种模式使用webpack自己的watch方法来完成，监听package.json中entry配置的文件的变化。你需要添加–watch –dev
//      该模式除了会监听entry文件的变化。当我们自定义的webpack.config.js(通过–config传入)文件内容变化的时候会自动退出编译，要求用户重启!