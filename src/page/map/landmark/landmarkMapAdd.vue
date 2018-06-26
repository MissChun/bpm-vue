<template>
  <div class="out-wraper">
    <div id="map-container" v-loading="pageLoading"></div>
    <div class='map-panel'>
      <el-input placeholder="请输入" v-model="keyword" @keyup.native.13="inputChangeFun" class="search-filters-screen" id="map-search-input">
        <el-button slot="append" icon="el-icon-search" @click="inputChangeFun"></el-button>
      </el-input>
      <div class="map-message">{{mapMessage}}</div>
    </div>
    <div class="landmark-dialog">
      <h4>新增地标</h4>
      <el-form class="addheaduserform detail-form" label-width="120px" ref="addLandmarkForm" :rules="rules" :model="formData" status-icon>
        <el-row>
          <el-col :span="20">
            <el-form-item label="地标类型:" prop="landmarkType">
              <el-select v-model="formData.landmarkType" @change="choseType" placeholder="请选择">
                <el-option v-for="(item,key) in landmarkTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="地标名称:" prop="landmarkName">
              <el-input placeholder="请输入" type="text" v-model="formData.landmarkName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.landmarkType === 'LNG_FACTORY'">
          <el-col :span="20">
            <el-form-item label="气种:" prop="gasType">
              <el-select v-model="formData.gasType" placeholder="请选择">
                <el-option v-for="(item,key) in gasTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="联系人:" prop="contactor">
              <el-input placeholder="请输入" type="text" v-model="formData.contactor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="联系电话:" prop="phone">
              <el-input placeholder="请输入" type="text" v-model="formData.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="地址:">
              <span>{{keyword}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="addLandmark" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'landmarkMapAdd',
  computed: {
    landmarkId: function() {
      return this.$route.query.id || '';
    }
  },
  data() {
    return {
      pageLoading: false,
      detailData: '',
      map: '',
      addMark: '',
      infoWindow: '',
      placeSearch: '',
      geocoder: '',
      keyword: '',
      zoomBoundary: 12,
      mapMessage: '',
      dialogVisible: false,
      formData: {
        landmarkType: '',
        landmarkName: '',
        gasType: '',
        contactor: '',
        phone: '',
      },
      submitBtn: {
        btnText: '保存并退出',
        isLoading: false,
        isDisabled: false
      },
      landmarkTypeSelect: [{
        "key": "DELIVER_POSITION",
        "verbose": "卸货站"
      }, {
        "key": "LNG_FACTORY",
        "verbose": "气源液厂"
      }],
      gasTypeSelect: [{
        "key": "海气",
        "verbose": "海气"
      }, {
        "key": "天然气",
        "verbose": "天然气"
      }],
      rules: {
        landmarkType: [
          { required: true, message: '请选择地标类型', trigger: 'change' },
        ],
        landmarkName: [
          { required: true, message: '请输入地标名称', trigger: 'blur' },
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,20})$/gi, message: '地标名称为1～20个字符', trigger: 'blur' },
        ],
        gasType: [
          { required: true, message: '请选择气种', trigger: 'change' },
        ],
        contactor: [
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,20})$/gi, message: '联系人为1～20个字符', trigger: 'blur' },
        ],
        phone: [
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '联系电话为11位手机号码/座机号码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {

    initMap: function() {
      let _this = this;

      _this.map = new AMap.Map('map-container', { //初始化地图
        zoom: 5
      });

      _this.addMark = new AMap.Marker({ //初始化新增或者编辑点标记
        map: _this.map,
        icon: require('../../../assets/img/location.png'),
        offset: new AMap.Pixel(-12, -24),
        visible: false,
      });


      let infoWindowContent = '<a class="el-button el-button--primary" id="set-landmark-btn">设为坐标点</a>'
      _this.infoWindow = new AMap.InfoWindow({ //初始化信息窗口
        map: _this.map,
        isCustom: true,
        offset: new AMap.Pixel(75, 10),
        content: infoWindowContent,
        visible: false,
      });

      let clickHandler = function() {
        _this.dialogVisible = true;
      }
      setTimeout(() => {
        let setLandmarkBtn = document.querySelector('#set-landmark-btn');
        setLandmarkBtn.addEventListener('click', clickHandler, false);
      }, 500)


      /*初始化类*/
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'], function() {

        let autoOptions = {
          city: "", //城市，默认全国
          input: "map-search-input" //使用联想输入的input的id
        };

        let autocomplete = new AMap.Autocomplete(autoOptions); //构造输入提示类

        _this.placeSearch = new AMap.PlaceSearch({ //构造地点查询类
          city: "", //城市
        });

        _this.geocoder = new AMap.Geocoder({ //构造逆地理编码类
          city: "" //城市，默认：“全国”
        });

        _this.map.on('click', _this.mapClickFun); //对地图绑定点击事件

        AMap.event.addListener(autocomplete, "select", function(e) { //选择提示

          _this.keyword = e.poi.name;
          _this.inputChangeFun();

        });

      });

    },
    inputChangeFun: function() { //输入搜索
      let _this = this;
      _this.placeSearch.search(_this.keyword, function(status, result) {

        if (status == 'complete' && result.poiList && result.poiList.pois && result.poiList.pois.length) {

          _this.setMapPosition(result.poiList.pois[0].location)

          _this.mapMessage = '';

          _this.setMapZoom();
        } else {
          _this.mapMessage = '无法获取位置'
        }

      });
    },
    setMapZoom: function() {
      let mapZoom = this.map.getZoom();

      if (mapZoom < this.zoomBoundary) {
        this.map.setZoom(this.zoomBoundary);
      }
    },
    setMapPosition: function(lnglat) {

      this.addMark.setPosition(lnglat);
      this.addMark.show();

      this.infoWindow.setPosition(lnglat);
      this.infoWindow.open();

      this.map.setCenter(lnglat);

    },
    mapClickFun: function(e) { //点击地图回调
      let _this = this;

      _this.setMapPosition(e.lnglat);
      _this.setMapZoom();

      _this.geocoder.getAddress(e.lnglat, function(status, result) { //逆地理查询地址
        if (status == 'complete') {

          _this.keyword = result.regeocode.formattedAddress;

          _this.mapMessage = '';

        } else {
          _this.mapMessage = '无法获取地址';
        }
      })

    },
    addLandmark: function() {
      this.$refs['addLandmarkForm'].validate((valid) => {
        if (valid) {
          this.submitBtn.btnText = '提交中';
          this.submitBtn.isLoading = true;

          let postData = {};
          this.$$http('register', postData).then((results) => {
            this.submitBtn.btnText = '下一步';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            if (results.data && results.data.code === 0) {
              this.$message({
                message: '新增成功,可返回列表页查看',
                type: 'success'
              });
            }

          }).catch((err) => {
            this.submitBtn.btnText = '下一步';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    choseType: function() {

    },
    getLandmarkDetail: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.id,
        };
        this.pageLoading = true;
        this.$$http('getLandMarkDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.detailData = results.data.data;

            console.log('this.detailData', this.detailData);
            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          this.pageLoading = false;
          reject(results);
        })
      })
    },

  },
  created: function() {

  },
  mounted: function() {
    this.initMap();
    if (this.id) {
      this.getLandmarkDetail();
    }
  }

}

</script>
<style scoped lang="less">
.out-wraper {
  position: relative;
}

#map-container {
  width: 100%;
  height: 700px;
}

.map-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  .search-filters-screen {}
}

.map-message {
  font-size: 14px;
  line-height: 24px;
}

.landmark-dialog {
  position: absolute;
  left: 0;
  top: 100px;
  width: 400px;
  height: 500px;
  background-color: #fff;
  h4 {
    text-align: center;
    line-height: 60px;
  }
}

</style>
