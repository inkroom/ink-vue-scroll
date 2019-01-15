# scroll

> vue滚动条组件

## dev

``` bash
# install dependencies
npm install

npm run dev

```

## build

- 修改webpack.config.js，把entry改成./src/pakcages/index.js
- npm run build
- 查看dist/ink-scroll.js 



**目前只支持纵向滚动条**


## 使用方法

- 下载dist/build.js文件
- 引入，在vue之后
    > <script type="text/javascript" src="build.js"></script>
- 使用标签
``` html
    <div>
        <ink-scroll bar_width="10" bar_color="" bar_top_color="" >
            <slot>你自己的需要滚动的内容</slot>
        </ink-scroll>
    </div>
```

### 可以使用的属性


| key | 类型 | 说明 | 
| ---- | ---- | 
| bar_widht | Number |  滚动条的宽度，不用加单位 |  
| bar_color | String | 滚动条底部颜色，按照css属性background-color那样些 | 
| bar_color | String | 滚动条高亮颜色 | 

## LICENSE

**MIT**
