<template>
  <div class="ink-scroll-container" :style="{ height:ink_height}">
    <div class="ink-scroll-content" ref="content">
      <!-- 父组件的内容 -->
      <slot>内容</slot>
    </div>
    <!-- 用于拉动滚动条时遮挡内容，防止出现一些莫名其妙的问题 -->
    <div class="ink-scroll-mask" :style="{display :'none'}" ref="mask"></div>
    <!-- 这里是滚动条 -->
    <div
      class="ink-scroll-bar-container"
      :style="{width:bar_width+'px',backgroundColor:bar_color}"
      ref="bar"
    >
      <div
        class="ink-scroll-bar-top"
        @mousedown="startScroll"
        :style="{height: bar_height +'%',top:top+'%',backgroundColor:bar_top_color}"
      ></div>
    </div>
  </div>
</template>
<script >

export default {
  name: "ink-scroll",
  props: {
    ink_height: {
      type: String,
      default: ""
    },
    bar_width: {
      type: Number,
      default: 10
    },
    bar_color: {
      type: String,
      default: "rgb(11, 11, 24)"
    },
    bar_top_color: {
      type: String,
      default: "#999999"
    },
    scroll: {
      type: Number,
      default: 1
    }
    // render: {
    //   type: Number,
    //   default: 0
    // }
  },
  watch: {
    scroll(nv, ov) {
      this.caculate();
    },
    mask(nv, ov) {
    },
    scrolling(nv, ov) {
    }
  },
  data() {
    return {
      mask: false,
      scrolling: false,
      top: 0,
      bar_height: 100 //高亮的长度比例，
    };
  },
  methods: {
    documentMousemove(event) {

      let _this = this;
      if (this.scrolling) {
        //正在滚动
        let bar_height = this.$refs.bar.height;
        //判断是否到达底部和顶部


        // 通过判断top所能达到的最大值来确定是否到底，使用高度判断因为精度问题会越界

        let max_top = parseFloat(
          (1 -
            this.$refs.bar.children[0].clientHeight /
              this.$refs.bar.clientHeight) *
            100
        );

        if (this.top >= 0 && this.top <= max_top) {
          //可以拖动
          // console.log("拖动");
          this.top =
            ((event.pageY - this.my + this.sy) /
              this.$refs.bar.clientHeight) *
            100;
          let content = this.$refs.content;
          //滚动
          //保证不会越界
          let top = this.top;
          if (_this.top > max_top) {
            _this.top = max_top;
            top = max_top;
          }
          if (_this.top < 0) {
            _this.top = 0;
            top = 0;
          }

          content.scrollTo(
            content.scrollLeft,
            (top * content.scrollHeight) / 100
          );
        } else {
          // console.log("出了便捷");
          let e = document.createEvent("MouseEvents");
          e.initEvent("mouseup", true, true);
          _this.documentMouseup(e);
          _this.scrolling = false;
        }
      }
    },
    documentMouseup(event) {
      if (this.scrolling) {
        this.scrolling = false;
        this.setAllowSelect(this.$refs.content);
      }
      document.removeEventListener("mousemove", this.documentMousemove);
      document.removeEventListener("mouseup", this.documentMouseup);
    },
    getScrollbarWidth(dom) {
      let scrollbarWidth = dom.offsetWidth - dom.clientWidth; //相减
      return scrollbarWidth; //返回滚动条宽度
    },
    setNotSelect(dom) {
      if (dom.style["-webkit-user-select"] == "none") {
        dom.setAttribute("select-none", "true");
      }
      dom.style["-webkit-user-select"] = "none";
    },
    setAllowSelect(dom) {
      if (dom.getAttribute("select-none")) {
        //原本就是禁止选中的
        dom.removeAttribute("select-none");
      } else {
        dom.style["-webkit-user-select"] = "";
      }
    },
    //计算滚动条数据
    caculate() {
      console.log("caculate=" + this.$parent.$el.id);
      // console.log("设置margin=" + getScrollbarWidth(vue.$refs.content));
      this.$refs.content.style.marginRight =
        "-" + this.getScrollbarWidth(this.$refs.content) + "px";
      // console.log(vue.$refs.content);
      //计算高亮的滚动条长度

      //dom可视区域高度占整个整个内容高度的比例应该和滚动条高亮一致
      let content = this.$refs.content;
      this.bar_height = (content.clientHeight / content.scrollHeight) * 100;

      // console.log(vue.bar_height);
    },
    startScroll(event) {
      this.scrolling = true;
      this.sy = event.target.offsetTop;
      this.my = event.pageY;

      document.addEventListener("mousemove", this.documentMousemove);
      document.addEventListener("mouseup", this.documentMouseup);

      this.setNotSelect(this.$refs.content);
      console.log("start=" + _this.$parent.$el.id);

      console.log(this.$refs.content.innerHTML.substring(0, 6));
      //开启遮罩
      this.mask = true;
      this.$refs.mask.style.width =
        this.$refs.mask.width - this.bar_width + "px";
    }
  },
  created() {
    console.log("create 之前");
    console.log(_this);

    _this = this;

    console.log("compose created");
    console.log(_this);
    // document.addEventListener("mousemove", function(event) {

    // });
    // document.addEventListener("mouseup",);
  },
  mounted() {
    let _this = this;

    console.log(this.$refs.content);
    this.caculate();

    //隐藏滚动条
    // this.$refs.content.style.marginRight =
    //   "-" + getScrollbarWidth(this.$refs["content"]) + "px";

    // //计算高亮的滚动条长度

    // //dom可视区域高度占整个整个内容高度的比例应该和滚动条高亮一致
    // let content = this.$refs.content;
    // this.bar_height = (content.clientHeight / content.scrollHeight) * 100;

    // console.log(this.bar_height);

    //监听尺寸改变事件
    this.$refs.content.addEventListener("DOMNodeInserted", function() {
      _this.caculate();
    });
    this.$refs.content.addEventListener("DOMNodeRemoved", function() {
      //TODO 删除之后计算的滚动条有一些小问题，没有到底
      _this.caculate();
    });

    this.$refs.content.addEventListener("resize", function() {
      _this.caculate();
    });
    //监听滚动事件
    this.$refs.content.addEventListener("scroll", function(event) {
      console.log("conetent scroll= " + _this.$parent.$el.id);
      let content = _this.$refs.content;
      _this.top = (content.scrollTop / content.scrollHeight) * 100;
    });

    this.caculate();
    console.log("滚动条宽度=" + this.getScrollbarWidth(this.$refs.content));
  }
};
</script>


<style>
.ink-scroll-container {
  overflow: hidden;
  position: relative;
}
.ink-scroll-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: red;
  z-index: 100;
}
.ink-scroll-bar-container {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border-radius: 5px;
  z-index: 101;
  background-color: rgb(11, 11, 24);
}
.ink-scroll-bar-top {
  background-color: #999999;
  max-height: 100%;
  width: inherit;
  position: absolute;
  border-radius: 15px;
}
.ink-scroll-content {
  height: 100%;
  overflow-y: scroll;
}
</style>
