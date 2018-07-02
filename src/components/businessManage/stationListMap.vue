<template>
  <div>
    <div class="tab-screen">
      <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="客户:">
              <el-select v-model="searchFilters.choosedCustomer" clearable filterable remote :loading="getCustomerLoading" placeholder="请选择客户" :remote-method="searchCustomerList">
                <el-option v-for="(item,key) in customerList" :key="key" :label="item.consumer_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="站点名称:">
              <el-input placeholder="请输入" @keyup.native.13="startSearch" v-model="searchFilters.stationName" class="search-filters-screen">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="startSearch" :loading="searchBtn.loading" :disabled="searchBtn.isDisabled">{{searchBtn.text}}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="map-out-container mt-25">
        <div class="map-loading" v-loading="pageLoading"></div>
        <div id="map-container"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'stationListMap',
  computed: {

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
        choosedCustomer: '',
        stationName: '',
      },
      landmarkDetail: {},
      customerList: [],
      siteList: [],
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

    searchCustomerList: function(query) {
      return new Promise((resolve, reject) => {
        let postData = {
          page: 1,
          page_size: 100,

        };
        if (query) {
          postData.consumer_name = query;
        }
        this.$$http('searchCustomerList', postData).then((results) => {
          this.getCustomerLoading = false;
          if (results.data && results.data.code == 0) {
            this.customerList = results.data.data.data;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {

          this.getCustomerLoading = false;
          reject(err);
        })

      })
    },

    getCustomerSiteList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          need_all: true,
          consumer_id: this.searchFilters.choosedCustomer,
          station_name: this.searchFilters.station_name,
        };
        postData = this.pbFunc.fifterObjIsNull(postData);
        this.$$http('getSiteList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.siteList = results.data.data;
            if (!this.siteList.length) {
              this.$message({
                message: '无站点数据',
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

      this.getCustomerSiteList().then((data) => { //展示该数据
        this.renderMarker();
        this.searchBtn.isDisabled = false;
        this.searchBtn.loading = false;
        this.searchBtn.text = '搜索';
      })


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
              return [item.longitude, item.latitude];
            },

            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
              return index;
            },

            getInfoWindow: function(data, context, recycledInfoWindow) {
              let isActive = data.is_active ? '启用' : '未启用';
              let infoTitleStr = '<div class="marker-info-window"><span class="fs-13">' + data.station_name + '</span></div>';
              let infoBodyStr = '<div class="fs-13">所属客户：' + data.short_name + '</div><div class="fs-13">站点类型：' + data.station_type_display + '</div><div class="fs-13">实际站点名称：' + data.map_station_name + '</div><div class="fs-13">联系人：' + data.consignee + '</div><div class="fs-13">联系电话：' + data.consignee_phone + '</div><div class="fs-13">地址：' + data.address + '</div><div class="fs-13">启用状态：' + isActive + '</div><br><div class="text-right "><a href="/#/businessManage/customerManage/stationManageAll/stationManageEditAdd?id=' + data.id + '" class="el-button el-button--primary el-button--mini">修改</a></div>';

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
                  content: dataItem.station_name,
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
                    content: dataItem.station_name,
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

        });
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
              minClusterSize: 4,
              maxZoom: 17,
            });
          }

        });
      }
      if (this.markerList) {
        renderAndCluster();
      } else {
        setTimeout(() => {
          this.renderMarker();
        }, 200)
      }

      this.map.setFitView(this.allMakers);

    }
  },
  mounted: function() {

    this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    this.searchCustomerList();

    this.initMarkList();

    this.getCustomerSiteList().then(() => {
      this.renderMarker();
    })


  },
}

</script>
<style scoped lang="less">
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

</style>
