//默认打webpack命令，执行的是该文件里面的内容
//如果想要执行其他配置，需要命令 webpack --config webpack.pro.js（其他配置文件）
var path = require('path');//webpack中自带的require，模块加载器
var webpack = require('webpack');
var process = require("process");
var entrys = require('webpack-glob-entry');//把entry数组化，把所有的里面的文件都展开
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css提取到单个文件
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); // 提取公共模块
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动写入将引用写入html
var WebpackDevServer = require("webpack-dev-server");//热插拔
var filePath = (process.env.NODE_ENV === 'production')?"/dest":'/build';//编译打包路径



module.exports = {
    entry:entrys(__dirname+"/src/pages/*.js"),//源文件,具体的entry设置https://www.npmjs.com/package/webpack-glob-entry
    output: {//输出文件
        path: __dirname+filePath,//,//path指定了本地构建地址(打包后的输出路径)
        publicPath:__dirname+filePath,//publicPath指定的是构建后在html里的路径（比如webpack-dev-server热插拔时的html访问地址）
        chunkFilename: "pages/[name].js",//没有在entry中列出来，确需要打包的文件的文件名，例如文件中的js的文件中require的js文件
        filename: 'pages/[name].js'////文件打包后的名字
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
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin(),//需要放到热插拔前面
        //文件拷贝
        new CopyWebpackPlugin([{
            from: __dirname + '/src/assets',
            to:__dirname+'/build/assets'
        },{
            from: __dirname + '/src/pages',
            to:__dirname+'/build/pages'
        }]),
        new webpack.HotModuleReplacementPlugin()//热插拔：配置1
        
        // //dev和product环境设置，process.env.NODE_ENV表示当前的环境
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')//默认是生产环境打包方式
        // })
    ],
    devServer:{//热插拔：配置2；热插拔还需要在package.json中的scripts属性中添加（"start": "webpack-dev-server --hot --inline --info --progress -d --config ./webpack.config.js"）
        contentBase:__dirname+"/build/pages",// 基础目录
        // historyApiFallback: true,//不跳转
        inline:true,
        hot:true,
        proxy: {
            '/api': {
                target: 'http://localhost:8066',
                changeOrigin: true
            }
        }
    },
    devtool: 'eval-source-map'//source-map
};



// new WebpackDevServer(webpack(module.exports),{
//     contentBase:__dirname+"/build/pages",// 基础目录
//     inline:true,
//     hot:true,
// }).listen(8080, "localhost", function() {});

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
// "style-loader": "^0.18.2",//把css插入style标签
// "url-loader": "^0.5.9",//处理图片，支持图片条件限制
// "vue": "^2.4.2",//vue基础
// "webpack": "^2.2.0",//webpack基础
// "webpack-dev-server": "^2.6.1",//热插拔
// webpack-dev-middleware  热插拔
// "webpack-glob-entry": "^2.1.1",//通用入口，能把模糊路径转成所有的路径的数组
// "webpack-merge": "^4.1.0"//文件合并
// "extract-text-webpack-plugin": "^3.0.0",//希望项目的样式能不要被打包到脚本中，而是独立出来作为.css
// process,环境设置时候需要
// webpack 和webpack-dev-server都需要全局安装，再局部安装
    // "webpack-dev-middleware": "^1.8.3",
    // "webpack-hot-middleware": "^2.12.2",

//待做功能 webpack：（）
//     webpack如何调试 ok  //http://blog.csdn.net/neoveee/article/details/73321392?utm_source=itdadao&utm_medium=referral
//     打包环境划分：webpack -d；webpack -p；webpack --watch（通过process区分） ok
//     文件拷贝 ok
//     es6，ok
//     热插拔+sourcemap方便开发调试 ok

//     js，css压缩
//     支持异步加载（以免一个页面太大），模块分块打包
//     sass支持
//     CommonsChunkPlugin：把所有公共页面的模块抽离出来放到common这个文件中去
//     extract-text-webpack-plugin：希望项目的样式能不要被打包到脚本中，而是独立出来作为.css
//     html-webapck-plugin：生产html的插件：每次生成的html，里面的script、link后面会动态添加hash，防止html中的文件缓存

//注意事项：
// npm start没有启动浏览器是无法访问localhost地址的
// 配置变动了，webpack-dev-server也没用，得重新webpack打包，再npm start


//webpack-dev-server --hot --inline --info --progress -d --config ./webpack.config.js