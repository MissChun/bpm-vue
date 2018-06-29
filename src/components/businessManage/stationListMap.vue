<template>
  <div>
    <div class="tab-screen">
      <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="客户:">
              <el-select v-model="searchFilters.choosedCustomer" filterable :loading="getCustomerLoading" placeholder="请选择客户">
                <el-option v-for="(item,key) in customerList" :key="key" :label="item.consumer_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="站点名称:">
              <el-input placeholder="请输入" v-model="searchFilters.stationName" class="search-filters-screen">
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

    getCustomerList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          need_all: true,
        };
        this.$$http('searchCustomerList', postData).then((results) => {
          this.getCustomerLoading = false;
          if (results.data && results.data.code == 0) {
            this.customerList = results.data.data.data;
            if (!this.customerList.length) {
              this.$message({
                message: '无客户数据',
                type: 'success'
              });
            }
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
          consumer_id: this.searchFilters.choosedCustomer
        };
        this.$$http('getSiteList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.siteList = results.data.data.data;
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

    getAllSiteList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          //pagination: false,
          confirm_status: 'SUCCESS',
          position_type: 'DELIVER_POSITION',
          simplify: true,
          page_size: 100,
          page: 1,
        };

        if (this.searchFilters.stationName.length) {
          postData.position_name = this.searchFilters.stationName;
        }

        this.pageLoading = true;

        this.$$http('getLandMarkList', postData).then((results) => {
          console.log('this.pageLoading', this.pageLoading);
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

    startSearch: function() {
      this.searchBtn.isDisabled = true;
      this.searchBtn.loading = true;
      this.searchBtn.text = '搜索中';



      if (this.searchFilters.choosedCustomer) {
        this.getSiteList().then((data) => { //展示该数据
          this.renderMarker();
          this.searchBtn.isDisabled = false;
          this.searchBtn.loading = false;
          this.searchBtn.text = '搜索';
        })
      } else {
        this.getAllSiteList().then((data) => { //展示该数据
          this.renderMarker();
          this.searchBtn.isDisabled = false;
          this.searchBtn.loading = false;
          this.searchBtn.text = '搜索';
        })
      }

    },
    getInfoWindowDom: function(data) {
      let mark_type = (data.mark_type && data.mark_type.verbose) ? data.mark_type.verbose : '无';
      let check_status = (data.check_status && data.check_status.verbose) ? data.check_status.verbose : '无';
      let mark_source = (data.mark_source && data.mark_source.verbose) ? data.mark_source.verbose : '无';
      let is_synced = data.is_synced ? '已同步' : '未同步';
      let infoBodyStr = '<div class="fs-13">地标类型：' + mark_type +
        '</div><div class="fs-13">地标位置：' + data.address +
        '</div><div class="fs-13">审核状态：' + check_status +
        '</div><div class="fs-13">上传来源：' + mark_source +
        '</div><div class="fs-13">是否同步：' + is_synced +
        '</div></div>';

      return infoBodyStr;
    },
    getIconSrc: function(item) {
      let src = ''
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
              console.log('src', src);
              if (recycledMarker) {
                recycledMarker.setIconStyle({
                  src: require('../../assets/img/' + src),
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
                    src: require('../../assets/img/' + src),
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
            console.log('info', info);
            if (info.selected) {
              let infoWindow = _this.markerList.getInfoWindow();
              let id = info.selected.data.id;
              _this.getLandmarkDetail(id).then((results) => {
                console.log('detailresults', results);
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

      _this.map.setFitView(_this.allMakers);

    }
  },
  mounted: function() {
    let _this = this;
    _this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    this.getCustomerList();

    this.initMarkList();

    this.getAllSiteList().then(() => {
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
