<template>
  <div class="out-contain">
    <el-header>
      <el-row>
        <el-col :span="3">
          <router-link :to="{path: '/basicDataManage/customerManage/stationManageAll/stationManageList'}">
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
    <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch">
            <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
              <el-option v-for="(item,key) in fieldSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地标区域:" class="map-choose-address">
            <choose-address :address.sync="address" :addressName.sync="addressName"></choose-address>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="startSearch" :loading="searchBtn.loading" :disabled="searchBtn.isDisabled">{{searchBtn.text}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="map-out-container mt-25">
      <div class="map-loading" v-loading="pageLoading"></div>
      <div id="map-container"></div>
    </div>
    <transition name="fade">
      <div class="landmark-dialog" v-show="showLeftWindow">
        <h4>{{pageTitle}}</h4>
        <el-form class="addheaduserform detail-form" label-width="120px" ref="stationForm" :rules="rules" :model="formData" status-icon>
          <el-row>
            <el-col :span="20">
              <el-form-item label="站点名称:" prop="position_name">
                <el-input placeholder="请输入" type="text" v-model="formData.position_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="实际站点:" prop="map_position">
                <span>{{formData.map_position}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="站点类型:" prop="station_type">
                <el-select v-model="formData.station_type" placeholder="请选择">
                  <el-option v-for="(item,key) in stationTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="站点类别:">
                <el-select v-model="formData.station_category" placeholder="请选择">
                  <el-option v-for="(item,key) in stationCategoryList" :key="key" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="客户简称:" prop="short_name">
                <el-select v-model="formData.short_name" filterable placeholder="请选择">
                  <el-option v-for="(item,key) in customerList" :key="key" :label="item.short_name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系人:" prop="consignee">
                <el-input placeholder="请输入" type="text" v-model="formData.consignee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系电话:" prop="consignee_phone">
                <el-input placeholder="请输入" type="text" v-model="formData.consignee_phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地址:">
                <span>{{formData.address}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="启用状态:">
                <el-switch v-model="formData.is_active"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer text-center">
          <el-button type="primary" @click="editStation" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
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
import chooseAddress from '@/components/chooseAddress';
export default {
  name: 'stationManageEditAdd',
  components: {
    chooseAddress: chooseAddress,
  },
  computed: {
    id: function() {
      return this.$route.query.id || '';
    },
    pageTitle: function() {
      return this.$route.query.id ? '编辑客户站点' : '新增客户站点';
    },
  },
  data() {
    return {
      map: '',
      markerList: '',
      allMakers: '',
      cluster: '',
      pageLoading: true,
      getCustomerLoading: true,
      searchFilters: {
        keyword: '',
        field: 'position_name',
      },
      landmarkDetail: {},
      customerList: [],
      siteList: [],
      searchBtn: {
        isDisabled: false,
        isLoading: false,
        text: '搜索'
      },
      fieldSelect: [{
        key: 'position_name',
        verbose: '实际站点',
      }],
      showLeftWindow: true,
      formData: {
        position_name: '',
        map_position: '',
        station_type: '',
        short_name: '',
        consignee: '',
        consignee_phone: '',
        is_active: true,
        address: '',
        station_category: 'empty'
      },
      addressDetail: {},
      submitBtn: {
        isLoading: false,
        isDisabled: false,
        btnText: '保存并退出',
      },
      choosedActualSite: {

      },
      stationTypeSelect: [{
          key: 'trade',
          verbose: '贸易',
        },
        {
          key: 'dealer',
          verbose: '终端',
        },
        {
          key: 'other',
          verbose: '其他',
        },
      ],
      stationCategoryList: [{
        label: '--空--',
        value: 'empty'
      }, {
        label: '加气站',
        value: 'gas_station'
      }, {
        label: '城市燃气',
        value: 'urban_gas'
      }, {
        label: '工业用气',
        value: 'industrial_gas'
      }, {
        label: '发电用气',
        value: 'generate_electricity'
      }, {
        label: '固定站点',
        value: 'fixation'
      }, {
        label: '贸易商',
        value: 'trafficker'
      }, {
        label: '大客户',
        value: 'big_customer'
      }, {
        label: '其他',
        value: 'other'
      }],
      rules: {
        position_name: [
          { required: true, message: '请输入地标名称', trigger: 'blur' },
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,10})$/gi, message: '地标名称为1～10个字符', trigger: 'blur' },
        ],
        map_position: [
          { required: true, message: '请选择实际液厂', trigger: 'blur' },
        ],
        short_name: [
          { required: true, message: '请选择客户', trigger: 'blur' },
        ],
        gas_type: [
          { required: true, message: '请选择气种', trigger: 'change' },
        ],
        consignee: [
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,20})$/gi, message: '联系人为1～20个字符', trigger: 'blur' },
        ],
        consignee_phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '联系电话为11位手机号码/座机号码', trigger: 'blur' },
        ],
      },
      address: {
        province: '',
        city: '',
        area: '',
      },
      addressName: {
        province: '',
        city: '',
        area: '',
      },
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: '/mapManage/landmark/landmarkList' });
      }
    },
    init: function() {
      /* 初始化地图 */
      this.map = new AMap.Map('map-container', {
        zoom: 5
      });

      this.initMarkList();

      this.getCustomerList();

      this.getActualSiteListAndRender();

    },
    /* 初始化标注列表 */
    initMarkList: function() {
      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        (MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) => {
          this.map.addControl(new BasicControl.Zoom({
            position: 'lt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));
          let $ = MarkerList.utils.$; //即jQuery/Zepto

          this.markerList = new MarkerList({
            map: this.map,
            //从数据中读取位置, 返回lngLat
            getPosition: function(item) {
              return [item.location.longitude, item.location.latitude];
            },
            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
              return item.id;
            },
            getInfoWindow: function(data, context, recycledInfoWindow) {
              let infoTitleStr = '<div class="marker-info-window"><span class="fs-13">' + data.position_name + '</span>';
              let infoBodyStr = '<br><div class="fs-13 text-center">数据加载中...</div><br>';
              if (recycledInfoWindow) {
                recycledInfoWindow.setInfoTitle(infoTitleStr);
                recycledInfoWindow.setInfoBody(infoBodyStr);
                return recycledInfoWindow;
              } else {
                return new SimpleInfoWindow({
                  infoTitle: infoTitleStr,
                  infoBody: infoBodyStr,
                  offset: new AMap.Pixel(0, -37)
                });
              }
            },
            //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function(dataItem, context, recycledMarker) {
              if (recycledMarker) {
                recycledMarker.setIconStyle({
                  src: require('@/assets/img/l_2.png'),
                  style: {
                    width: '20px',
                    height: '20px',
                  }
                });
                recycledMarker.setLabel({
                  content: dataItem.position_name,
                  offset: new AMap.Pixel(30, 0)
                })
                return recycledMarker
              } else {
                return new SimpleMarker({
                  containerClassNames: 'my-marker',
                  iconStyle: {
                    src: require('@/assets/img/l_2.png'),
                    style: {
                      width: '20px',
                      height: '20px',
                    }
                  },
                  label: {
                    content: dataItem.position_name,
                    offset: new AMap.Pixel(30, 0)
                  }
                });
              }
            },
            //marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],
            selectedClassNames: 'selected',
            autoSetFitView: false
          });

          this.markerList.on('selectedChanged', (event, info) => {
            if (info.selected) {
              let infoWindow = this.markerList.getInfoWindow();
              let id = info.selected.data.id;
              this.getLandmarkDetail(id).then((results) => {
                let infoBodyStr = this.getInfoWindowDom(this.landmarkDetail);
                infoWindow.setInfoBody(infoBodyStr);
                jQuery('#choose-Actual-fluid').on('click', () => {
                  this.choosedActualSite = results.data.data;
                  this.formData.map_position = this.choosedActualSite.position_name;

                  if (!this.id) {
                    this.formData.consignee = this.choosedActualSite.contacts;
                    this.formData.consignee_phone = this.choosedActualSite.tel;
                  }

                  this.formData.address = this.choosedActualSite.address;
                  this.showLeftWindow = true;

                })
              }).catch(() => {
                let infoBodyStr = '<br><div class="fs-13 text-center">数据加载失败</div><br>';
                infoWindow.setInfoBody(infoBodyStr);
              })
            }
          });

        });
    },
    /* 获取客户列表 */
    getCustomerList: function() {

      return new Promise((resolve, reject) => {
        let postData = {
          need_all: true,
        };

        this.$$http('searchPayCustomerList', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.customerList = results.data.data.data;
            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(results);
        })

      })
    },

    /* 获取实际站点列表 */
    getActualSiteList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          pagination: false,
          confirm_status: 'SUCCESS',
          position_type: 'DELIVER_POSITION',
          simplify: true,
        };

        if (this.searchFilters.keyword.length && this.searchFilters.field === 'position_name') {
          postData.position_name = this.searchFilters.keyword;
        }

        if (this.addressName.province) {
          postData.province = this.addressName.province;
        }
        if (this.addressName.city) {
          postData.city = this.addressName.city;
        }
        if (this.addressName.area) {
          postData.county = this.addressName.area;
        }

        this.pageLoading = true;

        this.$$http('getLandMarkList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.siteList = results.data.data.results;
            if (!this.siteList.length) {
              this.$message({
                message: '无数据',
                type: 'success'
              });
            }
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {

          this.pageLoading = false;
          reject(err);
        })

      })
    },
    /* 获取实际站点列表后逻辑 */
    getActualSiteListAndRender: function() {
      this.getActualSiteList().then(() => {
        this.renderMarker();
        if (this.id) {
          this.getSiteOfCustomerDetail().then(() => {
            if (this.siteOfCusmerDetail.map_position) {
              this.getLandmarkDetail(this.siteOfCusmerDetail.map_position).then(() => {

                this.choosedActualSite = this.landmarkDetail;

                this.map.setZoom(15);
                this.map.setCenter([this.landmarkDetail.location.longitude, this.landmarkDetail.location.latitude]);

                this.showLeftWindow = true;
              });

            } else {
              this.pageLoading = false;
            }
          })
        }
      })
    },
    /* 按钮点击搜索 */
    startSearch: function() {
      this.searchBtn.isDisabled = true;
      this.searchBtn.loading = true;
      this.searchBtn.text = '搜索中';
      this.getActualSiteList().then((data) => { //展示该数据
        this.renderMarker();
        this.searchBtn.isDisabled = false;
        this.searchBtn.loading = false;
        this.searchBtn.text = '搜索';
      })
    },
    /* 新增或编辑保存 */
    editStation: function() {
      this.$refs['stationForm'].validate((valid) => {
        if (valid) {

          let apiName = this.id ? 'fixStationOfCustomer' : 'addStationOfCustomer';

          this.addEditStationAjax(apiName);

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    addEditStationAjax: function(apiName) {
      return new Promise((resolve, reject) => {

        let area = this.choosedActualSite.county && this.choosedActualSite.county.area_name ? this.choosedActualSite.county.area_name : '';
        let city = this.choosedActualSite.city && this.choosedActualSite.city.area_name ? this.choosedActualSite.city.area_name : '';

        let province = this.choosedActualSite.province && this.choosedActualSite.province.area_name ? this.choosedActualSite.province.area_name : '';

        let postData = {

          address: this.choosedActualSite.address,
          area: area,
          city: city,
          consignee: this.formData.consignee,
          consignee_phone: String(this.formData.consignee_phone),
          map_position: this.choosedActualSite.id,
          province: province,
          consumer_id: this.formData.short_name,
          station_type: this.formData.station_type,
          station_name: this.formData.position_name,
          station_category: this.formData.station_category,

          longitude: this.choosedActualSite.location.longitude,
          latitude: this.choosedActualSite.location.latitude,
          map_station_name: this.choosedActualSite.position_name,
          is_active: this.formData.is_active,

        };

        if (apiName === 'fixStationOfCustomer') {
          postData.id = this.id;
        }

        this.submitBtn.btnText = '提交中';
        this.submitBtn.isLoading = true;

        this.$$http(apiName, postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });

            this.$router.push({ path: '/basicDataManage/customerManage/stationManageAll/stationManageList' });

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
    getInfoWindowDom: function(data) {
      let source_type = (data.source_type && data.source_type.verbose) ? data.source_type.verbose : '无';
      let infoBodyStr = '<div class="fs-13 md-5">地标位置：' + data.address +
        '</div><div class="fs-13">上传来源：' + source_type +
        '</div></div><br><div class="text-right "><a href="javascript:void(0)" class="el-button el-button--primary el-button--mini" id="choose-Actual-fluid">设为客户站点</a></div>';

      return infoBodyStr;
    },
    getLandmarkDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getLandMarkDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkDetail = results.data.data;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    renderMarker: function() {
      const renderAndCluster = () => {
        this.markerList.render(this.siteList);
        this.map.plugin(["AMap.MarkerClusterer"], () => {
          this.allMakers = this.markerList.getAllMarkers();
          if (this.cluster) {
            this.cluster.setMarkers(this.allMakers);
          } else {
            this.cluster = new AMap.MarkerClusterer(this.map, this.allMakers, {
              minClusterSize: 3,
              maxZoom: 17,
            });
          }
        });
        if (!this.id) {
          this.map.setFitView(this.allMakers);
        }
      }

      this.isInitMarkerList('markerList').then(() => {
        renderAndCluster();
      })

    },
    /* 判断markerlist是否已经初始化，经常遇到markerlist还未初始化完毕，直接调用报错 */
    isInitMarkerList: function(markerList) {
      return new Promise((resolve, reject) => {
        let limitCount = 10; //limitCount设置重复调用的限制次数，防止无限调用。
        let timeoutObject = null;
        let isInitOverviewMarkerListFnc = () => {
          if (this[markerList]) {
            if (timeoutObject) {
              clearTimeout(timeoutObject);
            }
            return resolve();
          } else {
            if (limitCount > 0) {
              limitCount--;
              timeoutObject = setTimeout(() => {
                isInitOverviewMarkerListFnc();
              }, 500)
            } else {
              clearTimeout(timeoutObject);
              return resolve();
            }
          }
        }
        isInitOverviewMarkerListFnc();
      })
    },
    getSiteOfCustomerDetail: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.id,
        };

        this.$$http('getSiteOfCustomerDetail', postData).then((results) => {
          if (results.data && results.data.code == 0) {

            this.siteOfCusmerDetail = results.data.data;

            this.formData.map_position = this.siteOfCusmerDetail.map_station_name;

            this.formData.consignee = this.siteOfCusmerDetail.consignee;
            this.formData.consignee_phone = this.siteOfCusmerDetail.consignee_phone;
            this.formData.short_name = this.siteOfCusmerDetail.owner && this.siteOfCusmerDetail.owner.length && this.siteOfCusmerDetail.owner[0] || '';

            this.formData.station_type = this.siteOfCusmerDetail.station_type;

            this.formData.position_name = this.siteOfCusmerDetail.station_name;

            this.formData.address = this.siteOfCusmerDetail.address;

            this.formData.is_active = this.siteOfCusmerDetail.is_active;

            this.formData.station_category = this.siteOfCusmerDetail.station_category;


            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })

    },
  },

  created() {

  },
  mounted: function() {
    this.init();
  },
  beforeDestroy: function() {
    //注销地图对象，内存释放，清空地图容器,防止内存泄漏。
    this.map.destroy();
  },
};

</script>
<style scoped lang="less">
.out-contain {
  position: relative;
}

.search-filters-form {
  /deep/ .el-input-group__prepend {
    width: 140px;
    background-color: #fff;
  }
}

.map-out-container {
  width: 100%;
  height: 700px;
  position: relative;

  .map-loading {
    position: absolute;
    height: 50px;
    width: 100%;
    left: 0;
    top: 0;

    /deep/ .el-loading-mask {
      background-color: rgba(250, 250, 250, 0);
    }
  }

  .icon-description {
    padding: 10px;
    position: absolute;
    left: 0px;
    bottom: 10px;
    border-bottom: 300px;
    height: 220px;
    width: 140px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 9999;

    >div {
      &:nth-child(2) {
        margin-left: 1px;
      }

      line-height: 24px;
      margin-bottom: 4px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }

      span {
        line-height: 24px;
        font-size: 13px;
      }

      i {
        height: 18px;
        width: 18px;
        border-radius: 50%;
        margin: 1px 6px 0 1px;
        font-size: 13px;
      }

      .bg-1 {
        background-color: #47d2d0;
      }

      .bg-2 {
        background-color: #4a9bf8;
      }

      .bg-3 {
        background-color: #f56c6c;
      }

      .bg-4 {
        background-color: #7c8fa0;
      }
    }
  }
}

#map-container {
  width: 100%;
  height: 700px;
}

.map-choose-address {
  /deep/ .el-row {
    padding: 0 !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.side-alert-traggle {
  position: absolute;
  top: 450px;

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

.landmark-dialog {
  position: absolute;
  left: 0;
  top: 190px;
  width: 400px;
  padding-bottom: 30px;
  background-color: #fff;
  z-index: 999;

  h4 {
    text-align: center;
    line-height: 60px;
  }

  /deep/ .el-select {
    display: block;
  }
}

</style>
