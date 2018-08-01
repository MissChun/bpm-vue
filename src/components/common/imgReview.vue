<!-- 图片预览组件-->
<!--
  prop:
    imgObject:object,必需
    初始化：
    imgObject{
      imgList: [],//图片url列表,必需。
      showPreview: false,//是否展示预览，默认false,必需
      previewIndex: 0,//默认展示图片的index,可选
    }
  ex:
    <img-review :imgObject.sync='imgObject'></img-review>
-->
<template>
  <div class="review-background" v-if="imgObject.showPreview">
    <div class="img-review-out-box" v-on:click.self="imgObject.showPreview = false">
      <div class="clearfix img-review-box">
        <div class="img-review-in-box">
          <ul>
            <li v-for="(item , key) in imgList" :key="key">
              <div v-show="previewIndex == key"><img :src="item.src" :class="{'rotate-90':item.rotate ==1,'rotate-180':item.rotate ==2,'rotate-270':item.rotate ==3}" /></div>
            </li>
          </ul>
        </div>
        <div class="preview-operator-btn">
          <a href="javascript:void(0)" v-on:click="previousImg" v-show="imgList.length">上一张</a>
          <a href="javascript:void(0)" v-on:click="nextImg" v-show="imgList.length">下一张</a>
          <a href="javascript:void(0)" v-on:click="rotateImg()">旋转</a>
          <a href="javascript:void(0)" v-on:click="closePreview()">关闭</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'imgReview',
  computed: {

  },
  data() {
    return {
      previewIndex: 0,
      imgList: [],
    }
  },
  methods: {
    nextImg() {
      console.log('this', this);
      if (this.previewIndex < (this.imgList.length - 1)) {
        this.previewIndex++
      } else {
        this.previewIndex = 0;
      }
    },
    previousImg() {
      if (this.previewIndex === 0) {
        this.previewIndex = (this.imgList.length - 1);
      } else {
        this.previewIndex--;
      }
    },
    rotateImg() {
      if (this.imgList[this.previewIndex].rotate < 3) {
        this.imgList[this.previewIndex].rotate++
      } else {
        this.imgList[this.previewIndex].rotate = 0;
      }
    },
    closePreview() {
      this.imgObject.showPreview = false;
    },
    dealImg() {
      console.log('this.imgObject', this.imgObject);
      let imgListArray = []
      if (this.imgObject && this.imgObject.imgList && this.imgObject.imgList.length) {
        for (let i in this.imgObject.imgList) {
          imgListArray[i] = {};
          if (this.imgObject.imgList[i]) {
            imgListArray[i] = {};
            imgListArray[i].src = this.imgObject.imgList[i];
            imgListArray[i].rotate = 0;
          }
        }
      }
      console.log('imgListArray', imgListArray);
      return imgListArray;
    }
  },
  created() {
    this.imgList = this.dealImg();

  },
  props: {
    imgObject: Object,
  },
  watch: {
    'imgObject.imgList': function(val, oldVal) {
      let imgListArray = []
      if (val.length) {
        for (let i in val) {
          imgListArray[i] = {};
          if (val[i]) {
            imgListArray[i] = {};
            imgListArray[i].src = val[i];
            imgListArray[i].rotate = 0;
          }
        }
      }
      this.imgList = imgListArray;
    },
    'imgObject.previewIndex': function(val, oldVal) {
      this.previewIndex = val;
    }
  }
}

</script>
<style scoped lang="less">
.review-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, .6);
  color: #fff;
}

.img-review-out-box {
  width: 100%;
  height: 100%;
  display: table;
}

.img-review-box {
  display: table-cell;
  vertical-align: middle;
  min-height: 100px;
  max-height: 500px;
  min-width: 100px;
  max-width: 800px;
  .img-review-in-box {
    min-height: 100px;
    max-height: 500px;
    min-width: 100px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  ul {
    padding: 0;
    margin: 0;
    li {
      text-align: center;
      list-style: none;
      img {
        max-width: 500px;
        max-height: 500px;
      }
    }
  }
  .preview-operator-btn {
    position: fixed;
    bottom: 50px;
    left: 50%;
    margin-left: -105px;


    height: 24px;
    width: 210px;

    font-size: 16px;
    color: #fff;

    a {
      margin-left: 10px;
      line-height: 24px;
      color: #fff;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}

.rotate-90 {
  -webkit-transform: rotate(90deg);
  /* Safari and Chrome */
  -moz-transform: rotate(90deg);
  /* Firefox */
  -ms-transform: rotate(90deg);
  /* IE 9 */
  -o-transform: rotate(90deg);
  /* Opera */
  transform: rotate(90deg);
}

.rotate-180 {
  -webkit-transform: rotate(180deg);
  /* Safari and Chrome */
  -moz-transform: rotate(180deg);
  /* Firefox */
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -o-transform: rotate(180deg);
  /* Opera */
  transform: rotate(180deg);
}

.rotate-270 {
  -webkit-transform: rotate(270deg);
  /* Safari and Chrome */
  -moz-transform: rotate(270deg);
  /* Firefox */
  -ms-transform: rotate(270deg);
  /* IE 9 */
  -o-transform: rotate(270deg);
  /* Opera */
  transform: rotate(270deg);
}

</style>
