# 91lng-tms-vue

Vue.js ＋ vue-router ＋ vuex ＋ element ＋ axios ＋ es6 + less + webpack project

* * *

## 开发前准备

1.请设置你的编辑器的tab缩进为4。

2.插件准备，这里以sublime为例

vue文件高亮插件：Vue Syntax Highlight

vue文件格式化插件：HTML/CSS/JS prettify (commond + shift + H);

sublime支持less：Less

less格式化插件：css order

js文件格式化插件：EsFormatter

检查全部打开文件，相似自动补全插件：All Autocomplete

3.google浏览器安装vue调试工具：vue-devtools

4.请学习vue编码风格，严格按照vue官方出的[风格指南](https://cn.vuejs.org/v2/style-guide/)执行

* * *


## 如何启动开发环境

``` bash
# install dependencies
npm install

# 启动本地服务后，打开，localhost:8080
npm run dev

# 为线上代码打包压缩，
npm run build

# 打包，生成分析报告
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

* * *

## 如何发布代码

测试发布

`./deploy_test.sh`

正式发布

`./deploy_pro.sh`


* * *

## git工作流

fork + pull request（pr)

### 开发前准备

1.请先fork项目

2.clone代码到本地

`git clone xxx(项目文件名) 本地仓库地址`

3.添加romote

添加项目仓库地址为upstream

`git remote add upstream 项目地址（ssh://git@git.pinbot.me:10022/hhtd/91lng-tms-vue.git）`

添加自己私有仓库地址为origin

`git remote add origin  xxx(你的仓库地址)`


### 开发流程

1 开发前本地master请更新仓库master分支最新代码，再从本地master切分支。

如果你不在master分支

`git checkout master`

如果你在master分支

`git pull --rebase upstream master`

新建分支

`git checkout -b feature-xxx-0407｀ 或者  git checkout -b bugfix-xxx-0407`

注意：是新功能以feature-功能描述－日期，方式命名。如果是修改bug，以bugfix-功能描述－日期，功能描述尽量一到两个单词。


2.coding.....


3.保存commit

`git status`

`git add .`

`git commit -m "所做事情的描述"`

注意：每个commit尽量描述清楚你在干什么，避免无意义的描述。


4.重复2、3。


5.提pull request（pr）

先更新主仓库最新代码

`git pull --rebase upstream master`

push代码到本地仓库

`git push origin 分支名：分支名`

查看更改，没有问题就提pr。


6.项目成员互相review 代码，没有问题就合并代码。


对git不熟悉的同学请学习一下[git简明教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000).
* * *

## 91lng-tms-vue文件目录

```
91lng-tms-vue
└───build
        build.js               #生产环境构建代码
        check-versions.js      #node,npm版本检查
        utils.js               #配置文件共用方法
        vue-loader.conf.js     #css加载器配置
        webpack.base.conf.js   #webpack基本配置（出入口和loader）
        webpack.dev.conf.js    #webpack开发环境配置
        webpack.prod.conf.js   #webpack生产环境配置

└───config                     #配置文件夹
        dev.env.js             #开发环境变量
        index.js               #项目主要配置（包括监听端口，打包路径等）
        prod.env.js            #生产环境配置

└───src                        #项目核心文件
    └───api                    #项目api文件，ajax方法，

    └───assets                 #公共资源文件夹
        └───css                #公用css文件
            └───fonts          #字体文件夹
            common.less        #公用css样式
            reset.less         #取消浏览器差异性文件
            themeStyle.less    #网站主题颜色变量
            icon.less          #字体文件

        └───img                #图片文件
        └───js                 #公用js方法文件夹

    └───components             #组件文件夹

    └───page                   #页面文件夹

    └───router                 #路由配置文件夹
        index.js               #公共基础路由配置文件
        fullRouter.js          #带有权限的路由配置

    └───store                  #存放数据仓库，主要是存放组件状态，解决组件间通讯问题


        main.js                #入口文件，引入vue框架、根组件、路由配置，并定义vue实例
        App.vue                #根组件

└───static                     #第三方插件文件

    deploy_pro.sh              #项目正式发布文件脚本
    deploy_test.sh             #项目测试发布文件
    index.html                 #主页，在main.js定义的实例挂载在根节点下
    package.json               #npm包管理文件
```

## 文件管理，分类，命名规范

文件分类基本原则：
文件分类以模块化为原则，把各类文件划分为各种小模块文件，再import进项目。
**注意**：文件不能过大，起不到模块化的作用，但又不能过细，增加查找及管理负担。保持适中。

### api文件命名及分类

这里还没想好。。。。。

### assets文件命名及分类

#### css文件夹管理

1.fonts文件夹字体图标文件，网站所有svg图标利用[icomoon](https://icomoon.io/app/#/select)全部转成字体图标，放入icon.less。

2.reset.less取消浏览器差异性css文件，不变动。

3.common.less为公用css样式，由专人维护，如果其他人需要添加公共样式，需向维护人申请。

4.themeStyle.less为网站主题颜色变量，所有颜色值，定义变量放入此文件，方便网站换肤。

#### img文件夹管理

存放公用图片

#### js文件夹管理

存放公用js方法，由专人维护，如果其他人需要添加公共方法，需向维护人申请。

### components文件命名及分类

1.components子文件夹分类及命名：

以项目模块分类。一个模块一个文件夹。文件夹名称和**路由名称**保持一致。再加一个公用components文件夹。

2.组件命名

组件以驼峰方式命名，文件名称，以**u**+**组件名称**命名。

3.组件是一个具有独立功能的小模块，如果组件中包含独立的无复用的图片，将**图片**与**.vue**文件放入一个文件夹

### page文件命名及分类

存放页面根组件

1.page子文件夹分类及命名：

以项目模块分类。一个模块一个文件夹。文件夹名称和**路由模块名称**保持一致。

2.组件命名

以驼峰方式命名，文件名称，以**pb**+**路由名称**命名。

## css规范

### －、命名规范（除了基本事项，尽量给大家足够的空间命名）

1.规则命名中，一律采用小写加中划线（－）的方式（重要）

2.使用有意义的或通用的ID和class命名,避免使用中文拼音,应该采用更简明有语义的英文单词进行组合 ，不知道英文单词的可以多google翻译。

常用命名：page、wrap、layout、header、footer、content、menu、nav、main、submain、sidebar、logo、banner、title、popo、icon、note、btn、txt、iblock、window、tips等

3.使用类选择器，避免ID选择器用于css样式，因为ID在一个页面中的唯一性导致了如果以ID为选择器来写CSS，就无法重用。

4.尽量避免1、2、3等序号进行命名

5.避免class与id重名


### 二、属性编写顺序（可通过编辑器格式化插件解决）

1.显示属性：display/list-style/position/float/clear …

2.自身属性（盒模型）：width/height/margin/padding/border

3.背景：background

4.行高：line-height

5.文本属性：color/font/text-decoration/text-align/text-indent/vertical-align/white-space/content…

6.其他：cursor/z-index/zoom/overflow

7.CSS3属性：transform/transition/animation/box-shadow/border-radius

### 三.书写规范

1.使用单引号，不允许使用双引号;

2.每个声明结束都应该带一个分号，不管是不是最后一个声明;

3.CSS文件中的所有的代码都应该小写;

4.禁止直接为html tag添加css样式设置;

5.除非你需要透明度而使用rgba，否则都使用16进制（#f0f0f0）的表示方法，并尽量缩写。

6.注释格式：/＊ 注释文字 ＊/

7.尽量少使用Hack，尽量通过合理的结构和合理的样式来解决。

### 四、代码性能优化

合并margin、padding、border的-left/-top/-right/-bottom的设置，尽量使用短名称。

选择器应该在满足功能的基础上尽量简短，减少选择器嵌套层数，查询消耗。

0后面不需要单位，比如0px可以省略成0，0.8px可以省略成.8px。

如果没有边框时，不要写成border:0，应该写成border:none 。

在保持代码解耦的前提下，尽量合并重复的样式。

background、font等可以缩写的属性，尽量使用缩写形式 。

### 五、其他

1.层级z-index规范（重要）

层级(z-index)必须清晰明确，页面弹窗、气泡为最高级（最高级为999），不同弹窗气泡之间可在三位数之间调整；普通区块为10-90内10的倍数；区块展开、弹出为当前父层级上个位增加，禁止层级间盲目乱加index。

2.类型选择器避免同时使用标签。
``` bash
# 不推荐
ul#example {}  div.error {}

# 推荐
#example {}   .error {}
```


* * *

## html规范

### 一、结构顺序和视觉顺序基本保持一致

1.按照从上至下、从左到右的视觉顺序书写HTML结构。

2.table不建议用于布局，用div代替table布局，可以使HTML更具灵活性，也方便利用CSS控制。但表现具有明显表格形式的数据，table还是首选。

### 二、保持良好的简洁的树形结构

1.每一个块级元素都另起一行，每一行都使用Tab或4个空格缩进对齐（head和body的子元素不需要缩进）。删除冗余的行尾的空格。

2.可以在大的模块之间用空行隔开，使模块更清晰。添加适当的注释，便于维护
```
<body>
<!-- 侧栏内容区 -->
<div class="m-side">
    <div class="side">
        <div class="sidein">
            <!-- 热门标签 -->
            <div class="sideblk">
                <div class="m-hd3"><h3 class="tit">热门标签</h3> </div>
                ...
            </div>
            <!-- 最热TOP5 -->
            <div class="sideblk">
                <div class="m-hd3"><h3 class="tit">最热TOP5</h3> <a href="#" class="s-fc02 f-fr">更多»</a></div>
                ...
            </div>
        </div>
    </div>
</div>
<!-- /侧栏内容区 -->
</body>
```

3.结构上如果可以并列书写，就不要嵌套。
如果可以写成`<div></div><div></div>`那么就不要写成`<div><div></div></div>`

4.如果结构已经可以满足视觉和语义的要求，那么就不要有额外的冗余的结构。
比如`<div><h2></h2></div>`已经能满足要求，那么就不要再写成`<div><div><h2></h2></div></div>`

5.一个标签上引用的className不要过多，越少越好。
比如不要出现这种情况：`<div class="class1 class2 class3 class4"></div>`


* * *

## js规范

1.所有变量、函数采用首字母小写的驼峰命名方式。

2.变量、函数函数命名尽量语意化，通过名称就能知道你想要干什么，便于他人维护。

3.对于逻辑复杂处，请添加注释，你不是一个人在战斗，请为队友减少维护成本。

4.// 这是单行注释，/＊ 注释说明 ＊/用于多行注释。

（待续。。。）
#菜单多级模拟数据
var a=[{sms:[{name:"二级菜单1",sms:[{name:"三级菜单1"},{name:"三级菜单2",sms:[{name:"四级菜单1"}]}]}],fm:{name:"一级菜单1"}}]


## 前端交互规范

以一次请求为例（必须有的交互）：


```
点击按钮 ==> 验证 ==> 验证不通过 ==> 提示(1)
            |
          验证通过 ==> 发送请求 ==> 请求过程反馈 ==> 按钮loading、页面loading(2)
                                      |
                                     请求结束   ==> 请求失败 ==> 请求失败时反馈、超时反馈(3)
                                      |
                                    请求成功   ==> 请求成功后反馈（4）



```
提示1:
如果是表单验证，使用表单验证插件统一报错。



必要交互优化：








