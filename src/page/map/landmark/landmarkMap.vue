<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="列表" name="first">
        </el-tab-pane>
        <el-tab-pane label="地图" name="second">
          <span class="icon-location"></span>
          <img src="@/assets/img/svgIcon/location.svg">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.position_type" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in fieldSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                  </el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item label="审核状态:">
                    <el-select v-model="searchFilters.confirm_status" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in checkStatusSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="地标来源:">
                    <el-select v-model="searchFilters.landmarkFrom" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in landmarkFromSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="是否同步:">
                    <el-select v-model="searchFilters.async_status" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in isSynchronizeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="地标区域:" class="map-choose-address">
                    <choose-address :address.sync="address" v-on:chooseProvince="chooseProvince" :addressName.sync="addressName"></choose-address>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary">搜索</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="map-out-container">
            <div class="icon-description"></div>
            <div id="map-container"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import chooseAddress from '@/components/chooseAddress';
console.log('AMap', AMap);
//创建地图
let map;
let markerList;
let allMakers;
export default {
  name: 'landMarkMap',
  components: {
    chooseAddress: chooseAddress,
  },
  computed: {
    landmarkFromSelect: function() {
      console.log('this.$store.state.common.selectData', this.$store.state.common.selectData);
      return this.$store.getters.getIncludeAllSelect.landmark_source_type;
    },
    checkStatusSelect: function() {
      return this.$store.getters.getIncludeAllSelect.landmark_confirm_status;
    },
    fieldSelect: function() {
      return this.$store.state.common.selectData.landmark_position_type;
    },
    isSynchronizeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.landmark_async_status;
    }
  },
  data() {
    return {
      activeName: 'second',
      landmarkList: [],
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
        landmarkFrom: '',
        position_type: 'DELIVER_POSITION',
        confirm_status: '',
        async_status: '',
      },
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: '/mapManage/landmark/landmarkList' });
      }
    },
    getList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          pagination: false,
          province: '山东省',
          source_type: this.searchFilters.landmarkFrom,
          confirm_status: this.searchFilters.confirm_status,
          async_status: this.searchFilters.async_status
        };

        if (this.searchFilters.keyword.length) {
          postData.position_type = this.searchFilters.position_type;
          postData.position_name = this.searchFilters.keyword;
        }

        if (this.addressName.province) {
          postData.province = this.addressName.province;
        }

        postData = this.pbFunc.fifterObjIsNull(postData);

        this.pageLoading = true;

        this.$$http('getLandMarkList', postData).then((results) => {
          console.log('results', results.data.data.results);
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkList = results.data.data.results;
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
      this.getList();
    },
    chooseProvince: function() {
      this.getList();
      console.log('this.address', this.address);
    },
    getIconSrc: function(item) {
      let src = ''
      /*lng加气站*/
      if (item.position_type && item.position_type.key === 'LNG') {
        if (item.async_status.key === 'ASYNCED') {
          src = 'gas_1.png';
        } else {
          switch (item.async_status.key) {
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
      if (item.position_type && item.position_type.key === 'DELIVER_POSITION') {
        if (item.async_status.key === 'ASYNCED') {
          src = 'l_1.png';
        } else {
          switch (item.async_status.key) {
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
      if (item.position_type && item.position_type.key === 'REST_AREA') {
        if (item.async_status.key === 'ASYNCED') {
          src = 'parking_1.png';
        } else {
          switch (item.async_status.key) {
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
      if (item.position_type && item.position_type.key === 'LNG_FACTORY') {
        if (item.async_status.key === 'ASYNCED') {
          src = 'lng_1.png';
        } else {
          switch (item.async_status.key) {
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

          map.addControl(new BasicControl.Zoom({
            position: 'lt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

          let $ = MarkerList.utils.$; //即jQuery/Zepto

          let defaultIconStyle = 'red', //默认的图标样式
            hoverIconStyle = 'green', //鼠标hover时的样式
            selectedIconStyle = 'purple'; //选中时的图标样式

          markerList = new MarkerList({

            map: map,

            //从数据中读取位置, 返回lngLat
            getPosition: function(item) {
              return [item.location.longitude, item.location.latitude];
            },

            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
              return index;
            },

            getInfoWindow: function(data, context, recycledInfoWindow) {

              let infoTitleStr = '<span class="fs-13">地标名称：' + data.position_name + '</span>';
              let infoBodyStr = '<div class="fs-13">地标类型：' + data.position_type.verbose +
                '</div><div class="fs-13">地标位置：' + data.address +
                '</div><div class="fs-13">审核状态：' + data.confirm_status.verbose +
                '</div><div class="fs-13">上传来源：' + data.source_type.verbose +
                '</div><div class="fs-13">是否同步：' + data.async_status.verbose +
                '</div>';

              return new SimpleInfoWindow({
                infoTitle: infoTitleStr,
                infoBody: infoBodyStr,
                offset: new AMap.Pixel(0, -37)
              });

            },

            //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function(dataItem, context, recycledMarker) {
              let src = '';
              src = _this.getIconSrc(dataItem);
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
                  content: dataItem.truck_no,
                  offset: new AMap.Pixel(30, 0)
                }
              });

            },

            //marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],

            selectedClassNames: 'selected',

            autoSetFitView: false

          });

          markerList.on('selectedChanged', function(event, info) {
            if (info.selected) {
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
      markerList.render(this.landmarkList);
      map.plugin(["AMap.MarkerClusterer"], function() {
        allMakers = markerList.getAllMarkers();
        let cluster = new AMap.MarkerClusterer(map, allMakers, {
          gridSize: 80,
          minClusterSize: 2,
        });
      });
    }
  },
  mounted: function() {
    let _this = this;
    map = new AMap.Map('map-container', {
      zoom: 5
    });
    this.initMarkList();
    _this.getList().then((data) => { //展示该数据
      _this.renderMarker();
    })

  },
  activated: function() {
    this.activeName = 'second';
  },


}

</script>
<style scoped lang="less">
.map-out-container {
  width: 100%;
  height: 600px;
  position: relative;
  .icon-description {
    position: absolute;
    border-bottom: 300px;
    height: 300px;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.6);
  }
}

#map-container {
  width: 100%;
  height: 600px;
}

.map-choose-address {
  /deep/ .el-row {
    padding: 0 !important;
  }
}

</style>
