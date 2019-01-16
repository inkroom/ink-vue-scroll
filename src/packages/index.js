import scroll from './scroll';

const temp = {
    install (Vue, options) {
        // Vue.extend({
        //     mixins: [scroll]
        //   })

        Vue.component(scroll.name, scroll)  // vuePayKeyboard.name 组件的name属性
       // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
       // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
       // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(temp);
}
// 作者：Y2sh
// 链接：http://www.imooc.com/article/19691
// 来源：慕课网
// 本文原创发布于慕课网 ，转载请注明出处，谢谢合作

// 第二种方法
// scroll.install = Vue => Vue.component(scroll.name, scroll);


export default temp;