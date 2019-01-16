import scroll from './scroll';

const temp = {
    install (Vue, options) {
        // Vue.extend({
        //     mixins: [scroll]
        //   })


        Vue.mixin({
            created:function(){
                // console.log(this.$el)
                // console.log('vue实例被加载')
                // console.log(this.components);
                // console.log(this.component);
                // console.log(this.$component);
            },
            mounted:function(){
                // console.log(this.$el)
                // console.log('vue实例被加载')
                // console.log(this.components);
                // console.log(this.component);
                // console.log(this.$component);
            }
        })

        // console.log(Vue.$el);

        Vue.component(scroll.name, scroll)  // vuePayKeyboard.name 组件的name属性
       // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
       // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
       // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定

       // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const ToastConstructor = Vue.extend(scroll)
    // console.log(new ToastConstructor());
    // // 生成一个该子类的实例
    // const instance = new ToastConstructor();

    // // 将这个实例挂载在我创建的div上
    // // 并将此div加入全局挂载点内部
    // instance.$mount(document.createElement('div'))
    // document.body.appendChild(instance.$el)
    


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