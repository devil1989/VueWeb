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
			images:图片
			styles：样式
		components:项目内的组件（零碎的vue组件，多个零碎的vue组件合成一个网页的vue组件）
		model:数据请求+数据结构转化 (Model层，改层得做一个基础的js文件，用于对后端数据的统一管理，因为涉及到和后端交互，得灵活可控，比如说请求url统一变更之类的，请求失败还是成功的监控等)
		pages：.vue文件 (对应各个网页的js，vue，html文件；每个页面都包含三个文件)
		store：(只为了生成一个新vuex的store，里面包含了actions和mutations)
			store文件（例如index.store.js）中包括了index页面对应的action，mutations，然后用vuex把store封装成一个支持vuex去管理状态的新store
		