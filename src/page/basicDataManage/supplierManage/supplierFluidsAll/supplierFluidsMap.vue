<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="供应商管理" name="supplierManage">
        </el-tab-pane>
        <el-tab-pane label="供应商液厂" name="supplierFluids">
          <div class="tab-screen">
            <div class="nav-tab">
              <el-tabs v-model="childActiveName" type="card" @tab-click="clickChildtabs">
                <el-tab-pane label="列表" name="fluidsList">
                </el-tab-pane>
                <el-tab-pane label="地图" name="fluidsMap">
                  <div>
                    <div class="tab-screen">
                      <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
                        <el-row :gutter="20">
                          <el-col :span="6">
                            <el-form-item label="供应商:">
                              <el-select v-model="searchFilters.supplier" clearable filterable remote :loading="getSupplierLoading" placeholder="请输入选择供应商" :remote-method="searchSupplierList">
                                <el-option v-for="(item,key) in supplierList" :key="key" :label="item.supplier_name" :value="item.id"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="液厂名称:">
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
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'supplierFluidsMap',
  data() {
    return {
      pageLoading: false,
      activeName: "supplierFluids",
      childActiveName: 'fluidsMap',

      map: '',
      markerList: '',
      allMakers: '',
      cluster: '',
      pageLoading: true,
      searchFilters: {
        supplier: '',
        stationName: '',
      },
      landmarkDetail: {},

      supplierList: [],
      getSupplierLoading: true,
      chosedSupplierName: '',




      fluidList: [],

      searchBtn: {
        isDisabled: false,
        isLoading: false,
        text: '搜索'
      }
    };
  },
  computed: {

  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'supplierManage') {
        this.$router.push({ path: "/basicDataManage/supplierManage/supplierManageAll/supplierManageList" });
      }
    },

    clickChildtabs: function(targetName) {

      if (targetName.name == 'fluidsList') {
        this.$router.push({ path: "/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsList" });
      }
    },

    searchSupplierList: function(query) {
      let postData = {
        page_size: 100,
        page: 1,
      }
      if (query) {
        postData.supplier_name = query;
      }
      this.getSupplierLoading = true;
      this.$$http('searchSupplierList', postData).then((result) => {
        this.getSupplierLoading = false;
        if (result.data.code == 0) {
          this.supplierList = result.data.data.data;
        }
      }).catch((error) => {
        this.getSupplierLoading = false;
      });
    },

    getList() {

      return new Promise((resolve, reject) => {

        let postData = {
          need_all: true,
          map: true,
          supplier: this.searchFilters.supplier,
          fluid_name: this.searchFilters.stationName
        };

        postData = this.pbFunc.fifterObjIsNull(postData);
        this.pageLoading = true;

        this.$$http('getFluidsList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.fluidList = results.data.data;

            if (!this.fluidList.length) {
              this.$message({
                message: '无数据',
                type: 'success'
              });
            }
            resolve()
          } else {
            reject()
          }
        }).catch((err) => {
          this.pageLoading = false;
          reject()
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
              return [item.coordinate.longitude, item.coordinate.latitude];
            },

            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
              return index;
            },

            getInfoWindow: function(data, context, recycledInfoWindow) {
              let gasType = data.fluid_type ? data.fluid_type : '无';
              let infoTitleStr = '<div class="marker-info-window fs-13">液厂名称：<span class="fs-13">' + data.fluid_name + '</span></div>';
              let infoBodyStr = '<div class="fs-13 md-5">所属供应商：' + data.supplier_name + '</div><div class="fs-13 md-5">实际液厂：' + data.actual_fluid + '</div><div class="fs-13 md-5">气种：' + gasType + '</div><br><div class="text-right "><a href="/#/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsEditAdd?id=' + data.id + '" class="el-button el-button--primary el-button--mini">修改</a></div>';
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
                  content: dataItem.fluid_name,
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
                    content: dataItem.fluid_name,
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
        this.markerList.render(this.fluidList);
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
  created() {

    this.searchSupplierList();

  },
  mounted: function() {
    let _this = this;
    _this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    this.initMarkList();

    this.getList().then(() => {
      this.renderMarker();
    })

  },
};

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
