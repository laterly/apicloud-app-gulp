## apicloud+framework 7+gulp构建app

* 基于APICloud提供的“云API”和“端API调用底层app
* 打包生成的app用于apicloud进行编译成app
* 基于framework 7构建h5的界面

##目录作用
1.开发主目录src
* src:开发目录
* src/html:html页面
* src/script:存放公共js
* src/script/page:存放页面对应的js
* src/script/untils:存放常用工具类js
* src/css:存放公共css
* src/script/page:存放页面对应的css
* index.html:主页
* config.xml:apicloud配置文件
* config.xml:apicloud配置文件
2.打包生成的目录(编译命令:npm run dev或者npm run prod,生成的目录跟src一致,用于apicloud的app预览)
* html:html页面
* script:存放公共js
* css:存放css
3.打包生成的编译目录(编译命令:npm run export生成app目录)
* app:存放css
## Build Setup

```bash
1.安装项目依赖:npm install
2.开发环境打包:npm run dev
3.开启一个服务器:npm run server
4.生产环境的打包:npm run prod
5.导出成一个app:npm run export
6.生成的目录app上传到apicloud进行编译打包成app
```

## 构建依赖

```bash

具体请看package.json

```



