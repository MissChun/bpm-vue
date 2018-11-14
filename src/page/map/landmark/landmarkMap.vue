<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="列表" name="first">
        </el-tab-pane>
        <el-tab-pane label="地图" name="second">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in fieldSelect" :key="key" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                  </el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="地标类型:">
                    <el-select v-model="searchFilters.mark_type" placeholder="请选择">
                      <el-option v-for="(item,key) in typeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="审核状态:">
                    <el-select v-model="searchFilters.check_status" placeholder="请选择">
                      <el-option v-for="(item,key) in checkStatusSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="地标来源:">
                    <el-select v-model="searchFilters.mark_source" placeholder="请选择">
                      <el-option v-for="(item,key) in landmarkFromSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否同步:">
                    <el-select v-model="searchFilters.is_synced" placeholder="请选择">
                      <el-option v-for="(item,key) in isSynchronizeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="地标区域:" class="map-choose-address">
                    <choose-address :address.sync="address" v-on:chooseProvince="chooseProvince" :addressName.sync="addressName"></choose-address>
                  </el-form-item>
                </el-col>
                <el-col :span="4" :offset="20">
                  <el-form-item>
                    <el-button type="primary" @click="startSearch" :loading="searchBtn.loading" :disabled="searchBtn.isDisabled" class="float-right">{{searchBtn.text}}</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="map-out-container mt-25">
            <div class="map-loading" v-loading="pageLoading"></div>
            <div class="icon-description">
              <div class="clearfix">
                <img src="@/assets/img/lng_4.png" class="float-left" />
                <span class="float-left">气源液厂</span>
              </div>
              <div class="clearfix">
                <img src="@/assets/img/gas_4.png" class="float-left" />
                <span class="float-left">加油／LNG加气站</span>
              </div>
              <div class="clearfix">
                <img src="@/assets/img/l_4.png" class="float-left" />
                <span class="float-left">卸货站</span>
              </div>
              <div class="clearfix">
                <img src="@/assets/img/parking_4.png" class="float-left" />
                <span class="float-left">食宿停</span>
              </div>
              <div class="clearfix">
                <i class="float-left bg-3"></i>
                <span class="float-left">待审核</span>
              </div>
              <div class="clearfix">
                <i class="float-left bg-2"></i>
                <span class="float-left">审核通过</span>
              </div>
              <div class="clearfix">
                <i class="float-left bg-1"></i>
                <span class="float-left">已经同步</span>
              </div>
              <div class="clearfix">
                <i class="float-left bg-4"></i>
                <span class="float-left">审核失败</span>
              </div>
            </div>
            <div id="map-container"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import chooseAddress from '@/components/chooseAddress';
export default {
  name: 'landMarkMap',
  components: {
    chooseAddress: chooseAddress,
  },
  computed: {

  },
  data() {
    return {
      activeName: 'second',
      map: '',
      markerList: '',
      allMakers: '',
      cluster: '',
      pageLoading: true,
      activeName: 'second',
      landmarkList: [],
      companyLandmarkList: [],
      companyLandmarkIdList: [],
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
      searchFilters: {
        keyword: '',
        mark_source: '',
        mark_type: 'DELIVER_POSITION',
        check_status: 'SUCCESS',
        is_synced: '',
        field: 'position_name',
      },
      fieldSelect: [{
        label: '地标名称',
        id: 'position_name',
      }, {
        label: '联系人',
        id: 'contacts',
      }, {
        label: '联系电话',
        id: 'tel',
      }, {
        label: '上传人姓名',
        id: 'upload_user_nick_name',
      }],
      landmarkDetail: {},

      landmarkFromSelect: [{
        key: '',
        verbose: '全部'
      }, {
        key: 'PLATFORM',
        verbose: '平台'
      }, {
        key: 'DRIVER_UPLOAD',
        verbose: '司机端上传'
      }, {
        key: 'RESIDENCE_POINT',
        verbose: '轨迹停留点'
      }],
      checkStatusSelect: [{
        key: '',
        verbose: '全部'
      }, {
        key: 'TO_CONFIRM',
        verbose: '未审核'
      }, {
        key: 'SUCCESS',
        verbose: '审核通过'
      }, {
        key: 'FAILURE',
        verbose: '审核拒绝'
      }],

      typeSelect: [{
        "key": "DELIVER_POSITION",
        "verbose": "卸货站"
      }, {
        "key": "LNG_FACTORY",
        "verbose": "气源液厂"
      }],
      isSynchronizeSelect: [{
        key: '',
        verbose: '全部'
      }, {
        "key": "TO_ASYNC",
        "verbose": "未同步"
      }, {
        "key": "ASYNCED",
        "verbose": "已同步"
      }],
      searchBtn: {
        isDisabled: false,
        isLoading: false,
        text: '搜索'
      }
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: '/mapManage/landmark/landmarkList' });
      }
    },

    getCompanyLandmark: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          need_all: true,
        };
        this.$$http('getCompanyLandmark', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.companyLandmarkList = results.data.data;
            for (let i in this.companyLandmarkList) {
              this.companyLandmarkIdList.push(this.companyLandmarkList[i].map_position);
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

    getList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          ids: this.companyLandmarkIdList,
          pagination: false,
          source_type: this.searchFilters.mark_source,
          confirm_status: this.searchFilters.check_status,
          async_status: this.searchFilters.is_synced,
          position_type: this.searchFilters.mark_type,
          simplify: true,
        };

        if (this.searchFilters.keyword.length) {
          postData[this.searchFilters.field] = this.searchFilters.keyword;
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

        postData = this.pbFunc.fifterObjIsNull(postData);

        this.pageLoading = true;

        this.$$http('getLandMarkList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkList = results.data.data.results;
            if (!this.landmarkList.length) {
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
    startSearch: function() {
      this.searchBtn.isDisabled = true;
      this.searchBtn.loading = true;
      this.searchBtn.text = '搜索中';

      this.getList().then((data) => { //展示该数据
        this.renderMarker();
        this.searchBtn.isDisabled = false;
        this.searchBtn.loading = false;
        this.searchBtn.text = '搜索';
      })
      /*
      if (this.companyLandmarkIdList.length) {
        this.getList().then((data) => { //展示该数据
          this.renderMarker();
          this.searchBtn.isDisabled = false;
          this.searchBtn.loading = false;
          this.searchBtn.text = '搜索';
        })
      } else {
        this.getCompanyLandmark().then(() => {
          return this.getList();
        }).then(() => {
          this.renderMarker();
          this.searchBtn.isDisabled = false;
          this.searchBtn.loading = false;
          this.searchBtn.text = '搜索';
        })
      }*/
    },
    chooseProvince: function() {
      //this.getList();
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
    getInfoWindowDom: function(data) {
      let position_type = (data.position_type && data.position_type.verbose) ? data.position_type.verbose : '无';
      let confirm_status = (data.confirm_status && data.confirm_status.verbose) ? data.confirm_status.verbose : '无';
      let source_type = (data.source_type && data.source_type.verbose) ? data.source_type.verbose : '无';
      let async_status = data.async_status.verbose || '未同步';
      let infoBodyStr = '<div class="fs-13  md-5">地标类型：' + position_type +
        '</div><div class="fs-13  md-5">地标位置：' + data.address +
        '</div><div class="fs-13  md-5">审核状态：' + confirm_status +
        '</div><div class="fs-13  md-5">上传来源：' + source_type +
        '</div><div class="fs-13">是否同步：' + async_status +
        '</div></br><div class="fs-13 text-right"><a class="el-button el-button--primary el-button--mini" href="/#/mapManage/landMark/landmarkDetail/' + data.id + '" target="_blank">查看</a></div>';

      return infoBodyStr;
    },
    getIconSrc: function(item) {
      let src = '';
      /*lng加气站*/
      if ((item.position_type && item.position_type === 'LNG') || (item.position_type && item.position_type === 'GAS_STATION')) {
        if (item.async_status === 'ASYNCED') {
          src = 'gas_1.png';
        } else {
          switch (item.confirm_status) {
            case 'SUCCESS':
              src = 'gas_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'gas_3.png'
              break;
            default:
              src = 'gas_4.png'
          }
        }
      }
      /*卸货站*/
      if (item.position_type && item.position_type === 'DELIVER_POSITION') {
        if (item.async_status === 'ASYNCED') {
          src = 'l_1.png';
        } else {
          switch (item.confirm_status) {
            case 'SUCCESS':
              src = 'l_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'l_3.png'
              break;
            default:
              src = 'l_4.png'
          }
        }
      }
      /*食宿停*/
      if (item.position_type && item.position_type === 'REST_AREA') {
        if (item.async_status === 'ASYNCED') {
          src = 'parking_1.png';
        } else {
          switch (item.confirm_status) {
            case 'SUCCESS':
              src = 'parking_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'parking_3.png'
              break;
            default:
              src = 'parking_4.png'
          }
        }
      }
      /*气源液厂*/
      if (item.position_type && item.position_type === 'LNG_FACTORY') {
        if (item.async_status === 'ASYNCED') {
          src = 'lng_1.png';
        } else {
          switch (item.confirm_status) {
            case 'SUCCESS':
              src = 'lng_2.png'
              break;
            case 'TO_CONFIRM':
              src = 'lng_3.png'
              break;
            default:
              src = 'lng_4.png'
          }
        }
      }
      return src;

    },
    initMarkList: function() {

      let _this = this;
      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        function(MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) {

          _this.map.addControl(new BasicControl.Zoom({
            position: 'lt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

          let $ = MarkerList.utils.$; //即jQuery/Zepto

          _this.markerList = new MarkerList({

            map: _this.map,

            //从数据中读取位置, 返回lngLat
            getPosition: function(item) {
              return [item.location.longitude, item.location.latitude];
            },

            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
              return index;
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
              let src = '';
              src = _this.getIconSrc(dataItem);
              if (recycledMarker) {
                recycledMarker.setIconStyle({
                  src: require('../../../assets/img/' + src),
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
                    src: require('../../../assets/img/' + src),
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

          _this.markerList.on('selectedChanged', function(event, info) {
            if (info.selected) {
              let infoWindow = _this.markerList.getInfoWindow();
              let id = info.selected.data.id;
              _this.getLandmarkDetail(id).then((results) => {

                let infoBodyStr = _this.getInfoWindowDom(_this.landmarkDetail);
                infoWindow.setInfoBody(infoBodyStr);

              }).catch(() => {
                let infoBodyStr = '<br><div class="fs-13 text-center">数据加载失败</div><br>';
                infoWindow.setInfoBody(infoBodyStr);
              })
              //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
              if (!info.sourceEventInfo.isListElementEvent) {

                if (info.selected.listElement) {
                  scrollListElementIntoView($(info.selected.listElement));
                }

              }
            }
          });

        });
    },
    renderMarker: function() {
      let _this = this;
      const renderAndCluster = () => {
        _this.markerList.render(_this.landmarkList);
        _this.map.plugin(["AMap.MarkerClusterer"], function() {
          _this.allMakers = _this.markerList.getAllMarkers();
          if (_this.cluster) {
            _this.cluster.setMarkers(_this.allMakers);
          } else {
            _this.cluster = new AMap.MarkerClusterer(_this.map, _this.allMakers, {
              minClusterSize: 4,
              maxZoom: 17,
            });
          }

        });
      }
      if (_this.markerList) {
        renderAndCluster();
      } else {
        setTimeout(() => {
          _this.renderMarker();
        }, 200)
      }

      _this.map.setFitView(_this.allMakers);

    }
  },
  mounted: function() {
    let _this = this;
    _this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    this.initMarkList();

    /*this.getCompanyLandmark().then(() => {
      return this.getList();
    }).then(() => {
      this.renderMarker();
    })*/

    this.getList().then(() => {
      this.renderMarker();
    })

  },
  activated: function() {
    this.activeName = 'second';
  },


}

</script>
<style scoped lang="less">
.map-loading {
  /deep/ .el-loading-mask {
    background-color: rgba(250, 250, 250, 0);
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

</style>
