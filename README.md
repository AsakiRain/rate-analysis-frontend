# 评论数据分析-前端

## 技术栈
Vite + Vue3 + TypeScript + Element Plus + ECharts, ECharts-wordcloud

## 使用
```
yarn            //安装依赖
yarn dev        //启动开发服务器
yarn build      //打包项目
yarn preview    //查看打包网站
```

## 项目结构
```
/
│  .eslintrc.js
│  .gitignore
│  .prettierrc.js
│  index.html
│  package.json
│  README.md
│  tsconfig.json
│  tsconfig.node.json
│  vite.config.ts
│  yarn.lock
├─dist              //打包后输出目录
├─public            //资源文件夹
│  │  favicon.ico
│  └─images
│      └─mask       //示范用词云图形状图片
│              70fbde217e894a2c8d2e421e4f34b5f8.png
│              america.jpg
│              c7799383fa1c43f98c2efda87eaebf0a.png
└─src               //源代码
    │  App.vue
    │  main.ts
    │  utils.ts     //封装html转义字符编解码函数
    │  vite-env.d.ts
    ├─api
    │      index.ts //封装get、post请求函数
    ├─components    //全局通用组件
    │      Board.vue    //商品列表
    │      Header.vue   //网页标题
    │      Menu.vue     //侧边栏导航目录
    │      pageHeader.vue   //页面标题
    │      State.vue    //任务状态面板
    │      Summary.vue  //商品概览面板
    ├─router
    │      index.ts     //路由配置
    └─views             //各个路由的视图文件夹
        │  layout.vue   //整个站点的布局
        ├─about         //关于
        │      index.vue
        ├─error         //错误页面
        │      index.vue
        ├─goods         //商品列表
        │      index.vue//商品概览和任务状态查看
        ├─home          //首页
        │      index.vue//商品链接解析，弹窗提示
        ├─rateslist     //评论浏览
        │  │  index.vue
        │  └─components
        │          List.vue //评论列表
        │          Rate.vue //评论详情
        └─statistic     //统计数据
            │  index.vue    //数据获取和发放
            └─components
                    Bar.vue     //封装条形图
                    Cloud.vue   //封装词云图
                    Line.vue    //封装折线图
                    Pie.vue     //封装饼图
                    Wave.vue    //封装波浪条形图
```