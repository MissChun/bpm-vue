<template>
  <div class="nav-tab">
    <div class="tab-screen">
      <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-input placeholder="请输入车牌号" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
              <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
            </el-input>
          </el-col>
          <el-col :span="1">
            &nbsp;
          </el-col>
          <el-col :span="4">
            <el-form-item label="任务状态:">
              <el-select v-model="searchFilters.waybillStatus" @change="startSearch" placeholder="请选择">
                <el-option v-for="(item,key) in waybillStatusSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="map-out-container">
      <div class="map-loading" v-loading="pageLoading"></div>
      <div class="total-data">
        <div class="total-data-item">全部({{monitorData.total_count}})</div>
        <div class="total-data-item"><span><img src="@/assets/img/direction_1.png" class="float-left" /></span><span class="float-left">行驶中({{monitorData.driving && monitorData.driving.length}})</span></div>
        <div class="total-data-item"><span><img src="@/assets/img/direction_2.png" class="float-left" /></span><span class="float-left">停留({{monitorData.stopping && monitorData.stopping.length}})</span></div>
        <div class="total-data-item"><span><img src="@/assets/img/direction_4.png" class="float-left" /></span><span class="float-left">离线({{monitorData.offline && monitorData.offline.length}})</span></div>
      </div>
      <div id="map-container"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'realTimeMonitor',
  data() {
    return {
      map: '',
      markerList: '',
      allMakers: '',
      cluster: '',
      pageLoading: false,
      monitorData: {},
      carList: [],
      deviceDetail: {},
      searchFilters: {
        keyword: '',
        field: '',
        waybillStatus: '',
      },
      typeSelect: [],
      waybillStatusSelect: [{
          key: '',
          verbose: '全部',
        },
        {
          key: 'to_fluid',
          verbose: '前往装车',
        },
        {
          key: 'reach_fluid',
          verbose: '已到装货地',
        },
        {
          key: 'waiting_seal',
          verbose: '待上传铅封',
        },
        {
          key: 'waiting_match',
          verbose: '待匹配卸货单',
        },
        {
          key: 'already_match',
          verbose: '已匹配卸货单',
        },
        {
          key: 'to_site',
          verbose: '前往卸货地',
        },
        {
          key: 'reach_site',
          verbose: '已到达卸货地',
        },
      ]

    };
  },
  computed: {

  },
  methods: {
    /* 获取车辆数据 */
    getMonitorList: function() {
      return new Promise((resolve, reject) => {
        this.pageLoading = true;
        let postData = {

        };
        if (this.searchFilters.keyword.length) {
          postData.plate_number = this.searchFilters.keyword;
        }
        if (this.searchFilters.waybillStatus) {
          postData.status = this.searchFilters.waybillStatus;
        }
        this.$$http('realTimeMonitor', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.carList = results.data.data;
            this.monitorData = {
              total_count: [],
              driving: [],
              stopping: [],
              offline: [],
            };
            this.monitorData.total_count = this.carList.length;
            for (let i in this.carList) {
              if (this.carList[i].device_status && this.carList[i].device_status.key) {
                let key = this.carList[i].device_status.key;

                switch (key) {
                  case 'OFF_LINE':
                    this.monitorData.offline.push(this.carList[i]);
                    break;
                  case 'STOPPING':
                    this.monitorData.stopping.push(this.carList[i]);
                    break;
                  default:
                    this.monitorData.driving.push(this.carList[i]);
                }

              }
            }
            console.log('this.carList', this.carList);
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
      this.getMonitorList().then((data) => {
        this.renderMarker();
      });
    },
    getIconSrc: function(item) {
      let src = ''
      if (item.speed) {
        src = 'direction_1.png'
      } else {
        if (item.device_status && item.device_status.key) {
          if (item.device_status.key === 'OFF_LINE') {
            src = 'direction_4.png'
          } else {
            src = 'direction_2.png'
          }
        }
      }
      return src;
    },
    /* 获取设备详情，在获取列表时没有返回设备数据，必须单独获取 */
    getDeviceDetail: function(plate_number) {
      return new Promise((resolve, reject) => {
        let postData = {
          plate_number: plate_number
        };
        this.$$http('getDeviceDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.deviceDetail = results.data.data;
            console.log('deviceDetail', this.deviceDetail);
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    /* 初始化标注列表，详见高德地图标注列表api */
    initMarkList: function() {

      let _this = this;
      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        function(MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) {

          _this.map.addControl(new BasicControl.Zoom({
            position: 'lt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

          let jQuery = MarkerList.utils.$; //即jQuery/Zepto

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

              let infoTitleStr = '<div>车辆信息</span>';
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
              let rotateDeg = (dataItem.direction - 90) + 'deg';
              console.log('rotateDeg', rotateDeg);
              src = _this.getIconSrc(dataItem);

              if (recycledMarker) {
                recycledMarker.setIconStyle({
                  src: require('../../../assets/img/' + src),
                  style: {
                    width: '20px',
                    height: '20px',
                    transform: 'rotate(' + rotateDeg + ')',
                  }
                });
                recycledMarker.setLabel({
                  content: dataItem.tractor.plate_number,
                  offset: new AMap.Pixel(30, 0)
                });

                return recycledMarker
              } else {
                return new SimpleMarker({
                  containerClassNames: 'my-marker',
                  iconStyle: {
                    src: require('../../../assets/img/' + src),
                    style: {
                      width: '20px',
                      height: '20px',
                      transform: 'rotate(' + rotateDeg + ')',
                    }
                  },
                  label: {
                    content: dataItem.tractor.plate_number,
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

            let plate_number = info.selected.data.tractor.plate_number;
            let infoWindow = _this.markerList.getInfoWindow();
            if (info.selected) {
              _this.getDeviceDetail(plate_number).then((results) => {

                AMap.plugin('AMap.Geocoder', function() {

                  let lnglat = [info.selected.data.location.longitude, info.selected.data.location.latitude]
                  let geocoder = new AMap.Geocoder({
                    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                    city: '010'
                  })
                  geocoder.getAddress(lnglat, function(status, data) {
                    if (status === 'complete' && data.info === 'OK') {
                      results.data.data.addressDetail = data.regeocode.formattedAddress;
                      let infoWindowDom = _this.getInfoWindowDom(results, jQuery);

                      infoWindow.setInfoTitle(infoWindowDom.infoTitleStr);
                      infoWindow.setInfoBody(infoWindowDom.infoBodyStr);
                      console.log('data', data);
                    }
                  })
                })

              }).catch(() => {
                let infoTitleStr = `<div class="fs-13 ">车辆信息:${plate_number}</div>`;
                let infoBodyStr = `<br><div class="fs-13 ">数据加载失败</div><br>`;
                infoWindow.setInfoTitle(infoTitleStr);
                infoWindow.setInfoBody(infoBodyStr);
              })
              //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
              if (!info.sourceEventInfo.isListElementEvent) {

                if (info.selected.listElement) {
                  scrollListElementIntoView(jQuery(info.selected.listElement));
                }

              }
            }
          });

        });
    },
    /* 渲染infoWindow */
    getInfoWindowDom: function(results, jQuery) {
      console.log('jQuery', jQuery);
      let _this = this;
      let infoWindowDom = {};
      let detailData = results.data.data;
      let carMsg = (detailData.driver && detailData.driver.tractor) ? detailData.driver.tractor.plate_number : '无';
      let create_time = (detailData.map_data && detailData.map_data.create_time) ? detailData.map_data.create_time : '无';

      let device_status = detailData.map_data ? detailData.map_data.device_status.verbose : '无';
      let status = (detailData.status) ? detailData.status.verbose : '无';
      let master_driver = (detailData.driver && detailData.driver.master_driver) ? detailData.driver.master_driver.name : '无';
      let vice_driver = (detailData.driver && detailData.driver.vice_driver) ? detailData.driver.vice_driver.name : '无';
      let escort_staff = (detailData.driver && detailData.driver.escort_staff) ? detailData.driver.escort_staff.name : '无';

      let operatorDom = '';

      let fellowOrder = () => {
        _this.$router.push({
          path: `/consignmentCenter/consignmentOrders/orderDetail/consignmentRouteplay/${detailData.id}/${detailData.waybill}`,
        })
      }

      operatorDom = `<div><a href="javascript:void(0)" id="order-follow" class="el-button el-button--success el-button--mini">订单跟踪</a></div>`;


      infoWindowDom.infoTitleStr = `<div class="fs-13 ">车辆信息:${carMsg}</div>`;
      infoWindowDom.infoBodyStr = `<div class="fs-13 ">主驾驶：${master_driver}</div><div class="fs-13 ">副驾驶：${vice_driver}</div><div class="fs-13 ">押运员：${escort_staff}</div><div class="fs-13 ">任务状态：${status}</div><div class="fs-13 ">GPS状态：${device_status}</div><div class="fs-13 ">定位时间：${create_time}</div><div class="fs-13 ">当前位置：${detailData.addressDetail}</div><br>${operatorDom}`;

      /* 这里需要在vue框架下面操作dom有点无奈，使用setTimeout也不够严谨 */
      setTimeout(function() {
        jQuery('#order-follow').click(function() {
          fellowOrder();
        })
      }, 200)

      return infoWindowDom;
    },
    /* 生成marker并点聚合 */
    renderMarker: function() {
      console.log('markerList', this.markerList);
      let _this = this;
      let renderAndCluster = function() {
        /* 生成marker，详见高德地图标注列表api */
        _this.markerList.render(_this.carList);
        _this.map.plugin(["AMap.MarkerClusterer"], function() {
          _this.allMakers = _this.markerList.getAllMarkers();
          if (_this.cluster) {
            _this.cluster.clearMarkers();
          }
          /* 点聚合，详见高德地图点聚合api */
          _this.cluster = new AMap.MarkerClusterer(_this.map, _this.allMakers, {
            minClusterSize: 4,
            maxZoom: 17,
          });
        });
      }
      if (_this.markerList) {
        renderAndCluster();
      } else {
        setTimeout(() => {
          renderAndCluster();
        }, 1000)

      }

      _this.map.setFitView(_this.allMakers);

    }
  },
  created() {

  },
  mounted() {
    let _this = this;
    _this.map = new AMap.Map('map-container', {
      zoom: 5
    });
    this.initMarkList();
    _this.getMonitorList().then((data) => { //展示该数据
      _this.renderMarker();
    })

  }
};

</script>
<style scoped lang="less">
.map-out-container {
  width: 100%;
  height: 700px;
  position: relative;
  .search-cloumn {
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    z-index: 9999;
  }
  .total-data {
    background-color: #fff;
    height: 40px;
    width: 100%;
    line-height: 40px;

    .total-data-item {
      text-align: center;
      width: 100px;
      padding-left: 10px;
      border-right: 1px solid #ddd;
      float: left;
      img {
        width: 18px;
        height: 18px;
        position: relative;
        top: 10px;
        margin-right: 5px;
      }
    }
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 9999;
  }
  .icon-description {
    padding: 10px;
    position: absolute;
    left: 0px;
    bottom: 50px;
    border-bottom: 300px;
    height: 80px;
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

</style>
