# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



.gitignor:git提交的时候需要忽略的文件
gruntfile.js:grunt打包配置文件
webpack.config.js:webpack配置文件(需要上传)
webpack.dev.js:webpack的本地配置文件（不需要上传）
package.json:node的所有插件的配置文件，到这个文件的目录下，直接npm install，就能把所有的需要的插件放到node_modules文件夹下
node_modules:node模块,包含了grunt，webpack，还有这两个打包工具用到的插件等
build:src经过转义后的文件夹
src:原始文件夹
		assets:图片+样式+icon font
			image:图片
			style：样式
		components:项目内的组件
		model:数据请求+数据结构转化 (Model)
		views：.vue文件 (View)
		store：操作store的各个js(ViewModel)
			actions:执行的操作（包含异步）
			mutations：action中包含执行对应的mutation
			modules:store的各个模块
			index.js:组装上面所有的文件，并export一个store
		