<template>
  <div >
    <!-- <div v-for="item in li">{{item}}</div> -->
    <button @click="testAdd">{{test}}</button>
    <button @click="testDelete">删除</button>
    <button @click="scroll += 1">更新</button>
    <ink-scroll ink_height="300px" >
      <slot>
        <ul>
          <li v-for="item in li">{{item}}</li>
        </ul>
      </slot>
    </ink-scroll>

<div>
  <ink-scroll ink_height="200px" >
      <slot>
        <ul>
          <li>内容固定</li>
          <li>内容更新</li>
          <li>内容更新</li>
          <li>内容更新</li>
          <li>内容更新</li>
          <li>内容更新</li>
          <li>内容更新</li>
          <li>内容更新</li>
          <li>内容更新</li>
          <li>内容更新</li>
        </ul>
      </slot>
    </ink-scroll>
</div>
  </div>
</template>


<script >
export default {
  methods:{
    testAdd(){
      this.li = [
      "顶部",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "测试",
      "底部"
    ]
    },
testDelete(){
  this.li.splice(0, parseInt(this.li.length/2) );
}
  },
  data(){ return {
    test:'123',
    li: [],
    scroll:1
  }}
};
</script>
<!--

// <script >

//  const ink_scroll = require('./packages/index');
// // import ink-scroll from './packages/index.js';
//   Vue.use(ink_scroll);

// export default {
//   name: 'app',
//   data () {
//     return {
//       msg: 'Welcome to Your Vue.js App'
//     }
//   }
// }
// </script>
 -->


<style>
#app {
  height: 100%;
  padding-left: 40px;
  padding-right: 150px;
}
</style>
