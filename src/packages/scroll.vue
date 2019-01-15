<template>
  <div class="ink-scroll-container"  :style="{ height:ink_height}">
    <div class="ink-scroll-content" ref="content">
      <!-- 父组件的内容 -->
      <slot>内容</slot>
    </div>
    <!-- 这里是滚动条 -->
    <div class="ink-scroll-bar-container" :style="{width:bar_width+'px',backgroundColor:bar_color}" ref="bar">
      <div
        class="ink-scroll-bar-top"
        @mousedown="startScroll"
        :style="{height: bar_height +'%',top:top+'%',backgroundColor:bar_top_color}"
      ></div>
    </div>
  </div>
</template>
<script>
function getScrollbarWidth(dom) {
  let scrollbarWidth = dom.offsetWidth - dom.clientWidth; //相减
  return scrollbarWidth; //返回滚动条宽度
}

function setNotSelect(dom) {
  if (dom.style["-webkit-user-select"] == "none") {
    dom.setAttribute("select-none", "true");
  }
  dom.style["-webkit-user-select"] = "none";
}
function setAllowSelect(dom) {
  if (dom.getAttribute("select-none")) {
    //原本就是禁止选中的
    dom.removeAttribute("select-none");
  } else {
    dom.style["-webkit-user-select"] = "";
  }
}

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
    }
  },
  data() {
    return {
      scrolling: false,
      top: 0,
      bar_height: 100 //高亮的长度比例，
    };
  },
  methods: {
    startScroll(event) {
      this.scrolling = true;
      this.sy = event.target.offsetTop;
      this.my = event.pageY;

      console.log(this.scrolling);
    }
  },
  created() {
    let _this = this;

    document.addEventListener("mousemove", function(event) {
      if (_this.scrolling) {
        console.log("12312");
        //正在滚动
        let bar_height = _this.$refs.bar.height;
        //判断是否到达底部和顶部

        console.log("top = " + _this.top);

        console.log(
          "_this.$refs.bar.children[0].offsetTop = " +
            _this.$refs.bar.children[0].offsetTop
        );
        console.log(
          "_this.$refs.bar.children[0].clientHeight = " +
            _this.$refs.bar.children[0].clientHeight
        );
        console.log(_this.$refs.bar.children[0]);
        console.log("bar_height = " + _this.$refs.bar.clientHeight);

        // 通过判断top所能达到的最大值来确定是否到底，使用高度判断因为精度问题会越界

        let max_top = parseFloat(
          (1 -
            _this.$refs.bar.children[0].clientHeight /
              _this.$refs.bar.clientHeight) *
            100
        );

        if (_this.top >= 0 && _this.top <= max_top) {
          //可以拖动
          console.log("拖动");
          _this.top =
            ((event.pageY - _this.my + _this.sy) /
              _this.$refs.bar.clientHeight) *
            100;
          let content = _this.$refs.content;
          //滚动
          //保证不会越界
          let top = _this.top;
          if (_this.top > max_top) {
            _this.top = max_top;
            top = max_top;
          }
          if (_this.top < 0) {
            _this.top = 0;
            top = 0;
          }

          setNotSelect(_this.$refs.content);

          console.log((top * content.scrollHeight) / 100);
          content.scrollTo(
            content.scrollLeft,
            (top * content.scrollHeight) / 100
          );
        } else {
          console.log("出了便捷");
          _this.scrolling = false;
        }
      }
    });
    document.addEventListener("mouseup", function(event) {
      if (_this.scrolling) {
        _this.scrolling = false;
        setAllowSelect(_this.$refs.content);
      }
    });
  },
  mounted() {
    let _this = this;
    //隐藏滚动条
    this.$refs.content.style.marginRight =
      "-" + getScrollbarWidth(this.$refs["content"]) + "px";

    //计算高亮的滚动条长度

    //dom可视区域高度占整个整个内容高度的比例应该和滚动条高亮一致
    let content = this.$refs.content;
    this.bar_height = (content.clientHeight / content.scrollHeight) * 100;

    console.log(this.bar_height);

    //监听尺寸改变事件
    this.$refs.content.addEventListener("resize", function() {
      let content = _this.$refs.content;
      _this.bar_height = (content.clientHeight / content.scrollHeight) * 100;
    });
    //监听滚动事件
    this.$refs.content.addEventListener("scroll", function(event) {
      console.log("滚动了");
      let content = _this.$refs.content;
      _this.top = (content.scrollTop / content.scrollHeight) * 100;
    });

    console.log("滚动条宽度=" + getScrollbarWidth(this.$refs["content"]));
  }
};
</script>

<style>
.ink-scroll-container {
  overflow: hidden;
  position: relative;
}
.ink-scroll-bar-container {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border-radius: 5px;
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
