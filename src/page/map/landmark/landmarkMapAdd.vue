<template>
  <div class="out-wraper">
    <el-header>
      <el-row>
        <el-col :span="3">
          <router-link :to="{path: returnRoute}">
            <div class="go-return icon-back"></div>
          </router-link>
        </el-col>
        <el-col :span="18">
          <p>{{pageTitle }}
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
        </el-col>
      </el-row>
    </el-header>
    <div id="map-container" v-loading="pageLoading"></div>
    <div class='map-panel'>
      <el-input placeholder="请输入地址" v-model="keyword" @keyup.native.13="inputChangeFun" class="search-filters-screen" id="map-search-input">
        <el-button slot="append" icon="el-icon-search" @click="inputChangeFun"></el-button>
      </el-input>
      <div class="map-message">{{mapMessage}}</div>
    </div>
    <transition name="fade">
      <div class="landmark-dialog" v-show="showLeftWindow">
        <h4>{{pageTitle}}</h4>
        <el-form class="addheaduserform detail-form" label-width="120px" ref="addLandmarkForm" :rules="rules" :model="formData" status-icon>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地标类型:" prop="position_type">
                <el-select v-model="formData.position_type" placeholder="请选择">
                  <el-option v-for="(item,key) in positionTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地标名称:" prop="position_name">
                <el-input placeholder="请输入" type="text" v-model="formData.position_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="formData.position_type === 'LNG_FACTORY'">
            <el-col :span="20">
              <el-form-item label="气种:" prop="gas_type">
                <el-select v-model="formData.gas_type" placeholder="请选择">
                  <el-option v-for="(item,key) in gasTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系人:" prop="contacts">
                <el-input placeholder="请输入" type="text" v-model="formData.contacts"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系电话:" prop="tel">
                <el-input placeholder="请输入" type="text" v-model="formData.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地址:" prop="address">
                <span>{{addressDetail.address}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer text-center">
          <el-button type="primary" @click="editLandmark" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="side-alert-traggle side-alert-traggle-right" v-show="showLeftWindow" @click="showLeftWindow = !showLeftWindow"><span>收起</span></div>
    </transition>
    <transition name="fade">
      <div class="side-alert-traggle side-alert-traggle-left" v-show="!showLeftWindow" @click="showLeftWindow = !showLeftWindow">
        <span>展开</span></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'landmarkMapAdd',
  computed: {
    id: function() {
      return this.$route.query.id || '';
    },
    pageTitle: function() {
      return this.$route.query.id ? '编辑地标' : '新增地标';
    },
    returnRoute: function() {
      return this.$route.query.id ? `/mapManage/landMark/landmarkDetail/${this.$route.query.id}` : '/mapManage/landmark/landmarkList';
    }
  },
  data() {
    return {
      pageLoading: false,
      showLeftWindow: false,
      addressDetail: {},
      detailData: '',
      map: '',
      addMark: '',

      placeSearch: '',
      geocoder: '',
      keyword: '',
      zoomBoundary: 16,
      mapMessage: '',
      dialogVisible: false,
      formData: {
        position_type: '',
        position_name: '',
        gas_type: '',
        contacts: '',
        tel: '',
        address: '',
      },
      submitBtn: {
        btnText: '保存并退出',
        isLoading: false,
        isDisabled: false
      },
      positionTypeSelect: [{
        "key": "DELIVER_POSITION",
        "verbose": "卸货站"
      }, {
        "key": "LNG_FACTORY",
        "verbose": "气源液厂"
      }],
      gasTypeSelect: [{
        "key": "SEA_GAS",
        "verbose": "海气"
      }, {
        "key": "NORTHWEST_GAS",
        "verbose": "西北气"
      }],
      rules: {
        position_type: [
          { required: true, message: '请选择地标类型', trigger: 'change' },
        ],
        position_name: [
          { required: true, message: '请输入地标名称', trigger: 'blur' },
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,20})$/gi, message: '地标名称为1～20个字符', trigger: 'blur' },
        ],
        gas_type: [
          { required: true, message: '请选择气种', trigger: 'change' },
        ],
        contacts: [
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,20})$/gi, message: '联系人为1～20个字符', trigger: 'blur' },
        ],
        tel: [
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '联系电话为11位手机号码/座机号码', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请在地图上打点', trigger: 'change' },
        ]
      },
    }
  },
  methods: {

    initMap: function() {

      this.map = new AMap.Map('map-container', { //初始化地图
        zoom: 5
      });

      AMapUI.loadUI(['overlay/SimpleInfoWindow', 'overlay/SimpleMarker'], (SimpleInfoWindow, SimpleMarker) => {
        //初始化起点icon
        this.addMark = new SimpleMarker({
          map: this.map,
          iconStyle: {
            src: require('../../../assets/img/l_3.png'),
            style: {
              width: '24px',
              height: '24px',
            },

          },
          offset: new AMap.Pixel(-12, -24),
          visible: false
        });

        this.addMark.on('click', () => {
          this.map.zoomIn();
        })

        if (this.id) {
          //初始化终点icon
          this.oldMarker = new SimpleMarker({
            map: this.map,
            iconStyle: {
              src: require('../../../assets/img/l_1.png'),
              style: {
                width: '24px',
                height: '24px',
              }
            },
            offset: new AMap.Pixel(-12, -24),
            visible: false
          });

          this.oldMarker.on('click', () => {
            this.map.zoomIn();
          })
        }

      });

      /*初始化类*/
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'], () => {

        let autoOptions = {
          city: "", //城市，默认全国
          input: "map-search-input" //使用联想输入的input的id
        };

        let autocomplete = new AMap.Autocomplete(autoOptions); //构造输入提示类

        this.placeSearch = new AMap.PlaceSearch({ //构造地点查询类
          city: "", //城市
        });

        this.geocoder = new AMap.Geocoder({ //构造逆地理编码类
          city: "" //城市，默认：“全国”
        });

        this.map.on('click', this.mapClickFun); //对地图绑定点击事件

        AMap.event.addListener(autocomplete, "select", (e) => { //选择提示
          this.keyword = e.poi.name;
          this.inputChangeFun();
        });

      });

    },
    inputChangeFun: function() { //输入搜索
      this.placeSearch.search(this.keyword, (status, result) => {

        if (status == 'complete' && result.poiList && result.poiList.pois && result.poiList.pois.length) {

          this.getAddress([result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat]);

        } else {
          this.mapMessage = '无法获取位置'
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
      this.showLeftWindow = true;
      this.addMark.show();

      this.map.setCenter(lnglat);

    },
    getAddress: function(lnglat, isMapClickCallback) {
      this.geocoder.getAddress(lnglat, (status, result) => { //逆地理查询地址
        if (status == 'complete' && result.regeocode && result.regeocode.addressComponent) {

          this.setMapPosition(lnglat);
          this.setMapZoom();

          if (isMapClickCallback) {
            this.keyword = result.regeocode.formattedAddress;
          }

          this.addressDetail = {
            address: result.regeocode.formattedAddress,
            longitude: lnglat[0],
            latitude: lnglat[1],
            province: result.regeocode.addressComponent.province,
            city: result.regeocode.addressComponent.city,
            county: result.regeocode.addressComponent.district,
          }

          this.formData.address = result.regeocode.formattedAddress;

          this.mapMessage = '';

        } else {
          this.mapMessage = '无法获取地址';
        }
      })
    },
    mapClickFun: function(e) { //点击地图回调
      this.getAddress([e.lnglat.lng, e.lnglat.lat], true);
    },

    editLandmark: function() {
      this.$refs['addLandmarkForm'].validate((valid) => {
        if (valid) {

          let apiName = this.id ? 'patchLandMarkDetail' : 'addLandmark';

          this.addEditLandmarkAjax(apiName);

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
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

            this.formData = {
              position_type: (this.detailData.position_type && this.detailData.position_type.key) ? this.detailData.position_type.key : '',
              position_name: this.detailData.position_name ? this.detailData.position_name : '',
              gas_type: (this.detailData.gas_type && this.detailData.gas_type.key) ? this.detailData.gas_type.key : '',
              contacts: this.detailData.contacts ? this.detailData.contacts : '',
              tel: this.detailData.tel ? this.detailData.tel : '',
              address: this.detailData.address ? this.detailData.address : '',
            }

            this.addressDetail = {
              address: this.detailData.address,
              longitude: this.detailData.location && this.detailData.location.longitude ? this.detailData.location.longitude : '',
              latitude: this.detailData.location && this.detailData.location.latitude ? this.detailData.location.latitude : '',
              province: this.detailData.province && this.detailData.province.area_name ? this.detailData.province.area_name : '',
              city: this.detailData.city && this.detailData.city.area_name ? this.detailData.city.area_name : '',
              county: this.detailData.county && this.detailData.county.area_name ? this.detailData.county.area_name : '',
            }




            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          this.pageLoading = false;
          reject(err);
        })
      })
    },
    addEditLandmarkAjax: function(apiName) {
      return new Promise((resolve, reject) => {
        let postData = {
          position_name: this.formData.position_name,
          position_type: this.formData.position_type,
          longitude: this.addressDetail.longitude,
          latitude: this.addressDetail.latitude,
          address: this.addressDetail.address,
          contacts: this.formData.contacts,
          tel: this.formData.tel,
          source_type: 'PLATFORM',
          province: this.addressDetail.province,
          city: this.addressDetail.city,
          county: this.addressDetail.county,
        };

        if (this.formData.position_type === 'LNG_FACTORY') {
          postData.gas_type = this.formData.gas_type;
        }

        if (apiName === 'patchLandMarkDetail') {
          postData.id = this.id;
          delete postData.source_type;
        }

        this.submitBtn.btnText = '提交中';
        this.submitBtn.isLoading = true;

        this.$$http(apiName, postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });

            if (apiName === 'addLandmark') {
              this.$router.push({ path: '/mapManage/landmark/landmarkList' });
            } else {
              this.$router.push({ path: `/mapManage/landMark/landmarkDetail/${this.id}` });
            }

            resolve(results);
          } else {
            reject(results);
          }
          this.submitBtn.btnText = '保存并退出';
          this.submitBtn.isLoading = false;
          this.submitBtn.isDisabled = false;
        }).catch((err) => {
          this.submitBtn.btnText = '保存并退出';
          this.submitBtn.isLoading = false;
          this.submitBtn.isDisabled = false;
          reject(results);
        })

      })
    },
    setCenter: function() {
      if (this.map && this.oldMarker) {
        this.setMapZoom();
        this.setMapPosition([this.addressDetail.longitude, this.addressDetail.latitude]);

        this.oldMarker.setPosition([this.addressDetail.longitude, this.addressDetail.latitude]);
        this.oldMarker.show();
      } else {
        setTimeout(() => {
          this.setCenter();
        }, 500)
      }
    },

  },

  created: function() {

  },
  mounted: function() {
    this.initMap();
    if (this.id) {
      this.getLandmarkDetail().then(() => {
        this.setCenter();
      });
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
  top: 110px;
  right: 10px;
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
  top: 200px;
  width: 400px;
  padding-bottom: 30px;
  background-color: #fff;
  h4 {
    text-align: center;
    line-height: 60px;
  }
  /deep/ .el-select {
    display: block;
  }
}

.side-alert-traggle {
  position: absolute;
  top: 280px;

  width: 26px;
  height: 50px;


  line-height: 24px;

  cursor: pointer;
  text-align: center;

  border: 1px solid #4a9bf8;
  border-left: 0 none;
  background-color: #fff;
  color: #4a9bf8;
  z-index: 999;
  span {
    font-size: 16px;
  }
}

.side-alert-traggle-right {
  left: 400px;
}

.side-alert-traggle-left {
  left: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
