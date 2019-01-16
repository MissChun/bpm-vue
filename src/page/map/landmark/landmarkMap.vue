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
                <el-col :span="2">
                  <el-form-item>
                    <el-button type="primary" @click="startSearch" :loading="searchBtn.loading" :disabled="searchBtn.isDisabled" class="float-right">{{searchBtn.text}}</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="地标类型:">
                    <el-select v-model="searchFilters.position_type" placeholder="请选择">
                      <el-option v-for="(item,key) in typeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="审核状态:">
                    <el-select v-model="searchFilters.confirm_status" placeholder="请选择">
                      <el-option v-for="(item,key) in checkStatusSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="地标来源:">
                    <el-select v-model="searchFilters.landmarkFrom" placeholder="请选择">
                      <el-option v-for="(item,key) in landmarkFromSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否同步:">
                    <el-select v-model="searchFilters.async_status" placeholder="请选择">
                      <el-option v-for="(item,key) in isSynchronizeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--
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
              </el-row>-->
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
            <transition name="fade">
              <div class="search-filters-contain" v-show="showLeftWindow" v-loading="getDetailLoading">
                <div class="md-10">地标名称：{{landmarkDetail.position_name || '无'}}</div>
                <div class="md-10">地标类型：{{landmarkDetail.position_type && landmarkDetail.position_type.verbose || '无'}}</div>
                <div class="md-10">地标位置：{{landmarkDetail.address || '无'}}</div>
                <div class="md-10">审核状态：{{landmarkDetail.confirm_status && landmarkDetail.confirm_status.verbose || '无'}}</div>
                <div class="md-10">上传来源：{{landmarkDetail.source_type && landmarkDetail.source_type.verbose || '无'}}</div>
                <div class="md-10">是否同步：{{landmarkDetail.async_status && landmarkDetail.async_status.verbose || '无'}}</div>
                <div class="md-10">联系人：{{landmarkDetail.contacts || '无'}}</div>
                <div class="md-10">联系电话：{{landmarkDetail.tel || '无'}}</div>
                </br>
                <div class="text-right">
                  <el-button type="primary" class="float-right" @click="goLandmarkDetail(landmarkDetail.id)">查看</el-button>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div class="side-alert-traggle side-alert-traggle-right" v-show="showLeftWindow" v-on:click="triggerAlert"><span>收起</span></div>
            </transition>
            <transition name="fade">
              <div class="side-alert-traggle side-alert-traggle-left" v-show="!showLeftWindow && landmarkDetail" v-on:click="triggerAlert">
                <span>展开</span></div>
            </transition>
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
        landmarkFrom: '',
        position_type: 'DELIVER_POSITION',
        confirm_status: 'SUCCESS',
        async_status: '',
        field: 'position_name',
        province: '',
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

      searchBtn: {
        isDisabled: false,
        isLoading: false,
        text: '搜索'
      },

      overviewData: [],
      overviewMarkerList: '',
      districtSearch: '',

      zoomstartNum: '',
      zoomendNum: '',
      zoomBoundary: 8,
      postDataCopy: '',
      keywordCopy: '',
      showLeftWindow: false,
      getDetailLoading: false,

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

    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: '/mapManage/landmark/landmarkList' });
      }
    },
    init: function() {
      this.initMap(); //初始化地图
      this.getLandmarkOverviewAndRenderMarker(); //获取概览数据
    },
    //获取所有省份概览数据后，获取省份中心点经纬度信息，并生成标注列表。
    getLandmarkOverviewAndRenderMarker: function() {
      this.getLandmarkOverviewAjax()
        .then(() => {
          AMap.plugin('AMap.DistrictSearch', () => {
            this.districtSearch = new AMap.DistrictSearch({
              // 关键字对应的行政区级别，country表示国家
              level: 'country',
              //  显示下级行政区级数，1表示返回下一级行政区
              subdistrict: 1,
            })
            //因为后端没有返回经纬度信息，只能通过高德地图获取各省份中心点的经纬度信息
            this.districtSearch.search('中国', (status, result) => {
              if (status === 'complete') {
                let districtList = result.districtList[0].districtList;
                let newOverviewData = [];
                for (let i = 0, overviewDataLength = this.overviewData.length; i < overviewDataLength; i++) {
                  for (let j = 0, overviewDataLength = districtList.length; j < overviewDataLength; j++) {
                    if (this.overviewData[i].area_name === districtList[j].name) {
                      this.overviewData[i].location = [districtList[j].center.lng, districtList[j].center.lat];
                      this.overviewData[i].area_code = districtList[j].adcode;
                      newOverviewData.push(this.overviewData[i]);
                      break;
                    }
                  }
                }
                this.overviewData = newOverviewData;
                if (this.markerList && this.landmarkList.length) {
                  this.cluster.clearMarkers();
                }
                this.isInitMarkerList('overviewMarkerList').then(() => {
                  this.overviewMarkerList.render(this.overviewData);
                })

              }
              // 查询成功时，result即为对应的行政区信息
            })
          })
        })
    },
    //获取所有省份概览数据
    getLandmarkOverviewAjax: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          source_type: this.searchFilters.landmarkFrom,
          position_type: this.searchFilters.position_type,
          confirm_status: this.searchFilters.confirm_status,
          async_status: this.searchFilters.async_status,
        };
        postData = this.pbFunc.fifterObjIsNull(postData);
        this.pageLoading = true;
        this.$$http('getLandmarkOverview', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.overviewData = results.data.data;
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
    //初始化地图
    initMap: function() {
      this.map = new AMap.Map('map-container', {
        zoom: 5,
        resizeEnable: true,
      });
      //初始化概览和地标列表标注列表
      this.initMarkList();
      //引起地图视图变化的有三种情况1、地图放大缩小。2、地图平移。3、浏览器窗口大小调整。
      this.watchZoomChange();
      this.watchMapmove();
      //this.watchMapResize();
    },
    //监测地图放大缩小
    watchZoomChange: function() {
      this.map.on('zoomstart', () => {
        //记录zoom改变开始时的zoom值
        this.zoomstartNum = this.map.getZoom();
      })
      this.map.on('zoomend', () => {
        //记录zoom改变结束时的zoom值
        this.zoomendNum = this.map.getZoom();
        this.zoomeChangeCallback();
      })
    },
    zoomeChangeCallback: function() {
      if (this.zoomstartNum < this.zoomendNum) {
        //如果是定位搜索
        if (this.keywordCopy === '') {
          if (this.zoomstartNum < this.zoomBoundary && this.zoomendNum >= this.zoomBoundary) {
            this.mapChangeSearch();
          }
        }
      } else if (this.zoomstartNum > this.zoomendNum) {
        if (this.keywordCopy === '') {
          if (this.zoomendNum >= this.zoomBoundary) {
            this.mapChangeSearch();
          } else {
            if (this.zoomstartNum >= this.zoomBoundary) {
              this.searchFilters.province = '';
              this.getLandmarkOverviewAndRenderMarker();
            }
          }
        }
      }

    },
    //监测地图中心点移动
    watchMapmove: function() {
      this.map.on('moveend', () => {
        this.zoomendNum = this.map.getZoom();
        if (this.keywordCopy === '' && this.zoomendNum >= this.zoomBoundary) {
          this.mapChangeSearch();
        }
      })
    },
    //监测用于浏览器改变大小引起的地图容器尺寸改变
    watchMapResize: function() {
      this.map.on('resize', () => {
        this.zoomendNum = this.map.getZoom();
      })
    },
    //初始化概览和地标列表标注列表
    initMarkList: function() {

      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        (MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) => {

          this.map.addControl(new BasicControl.Zoom({
            position: 'rt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

          this.initOverviewMarkList(MarkerList, SimpleMarker, SimpleInfoWindow);

          this.initLandmarkMarkList(MarkerList, SimpleMarker, SimpleInfoWindow);

        });
    },
    //初始化概览标注列表
    initOverviewMarkList: function(MarkerList, SimpleMarker, SimpleInfoWindow) {

      /* 概览标注列表 */
      this.overviewMarkerList = new MarkerList({
        map: this.map,
        //从数据中读取位置, 返回lngLat
        getPosition: (item) => {
          return item.location;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: (item, index) => {
          return index;
        },
        getInfoWindow: (data, context, recycledInfoWindow) => {

        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: (dataItem, context, recycledMarker) => {
          let htmlStr = '<div style="width: 70px;height:70px;font-size: 12px;border-radius: 50%;background-color: rgba(38,198,218, 0.7); text-align:center;" class="province-wraper"><div style="color:#fff;height:20px;line-height:20px;padding-top:18px;overflow:hidden;">' + dataItem.area_name + '</div><div style="color:#fff;height:20px;overflow:hidden;">' + dataItem.count + '</div></div>';
          return new SimpleMarker({
            containerClassNames: 'my-marker',
            iconStyle: htmlStr,
            offset: new AMap.Pixel(-34, -37),
          });
        },
        //marker上监听的事件
        markerEvents: ['click', 'mouseover', 'mouseout'],
        selectedClassNames: 'selected',
        autoSetFitView: false

      });

      this.overviewMarkerList.on('selectedChanged', (event, info) => {
        if (info.selected) {
          /*通过setZoom来修改zoom值，触发zoomchange事件，从而获取数据（watchZoomChange）。
           **值得注意：使用settimeout,因为点击marker后，高德默认会把点击的marker置在地图中心，这会触发centerchange事件，也会获取数据（watchMapmove）
           **这样就执行了两次获取数据的操作。地图渲染两次。页面会卡顿，
           **因此，这里使用settimeout，等marker被置入地图中心的动画结束后，即centerchange事件触发结束后（不会触发数据请求），
           **再执行this.map.setZoom(this.zoomBoundary)，就只会触发一次数据请求。这里的逻辑请查看watchZoomChange，watchMapmove
           */
          const itemData = info.selected.data;
          this.searchFilters.province = info.selected.data.area_name;

          let timeoutObject = null;
          timeoutObject = setTimeout(() => {
            this.map.setZoom(this.zoomBoundary);
            clearTimeout(timeoutObject);
          }, 300)

        }
      });

    },
    //初始化地标列表标注列表
    initLandmarkMarkList: function(MarkerList, SimpleMarker, SimpleInfoWindow) {
      this.markerList = new MarkerList({
        map: this.map,
        //从数据中读取位置, 返回lngLat
        getPosition: (item) => {
          return [item.location.longitude, item.location.latitude];
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: (item, index) => {
          return item.id;
        },
        getInfoWindow: (data, context, recycledInfoWindow) => {

        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: (dataItem, context, recycledMarker) => {
          let src = '';
          src = this.getIconSrc(dataItem);
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
      //点击地标icon动态获取地标详情
      this.markerList.on('selectedChanged', (event, info) => {
        if (info.selected) {
          let id = info.selected.data.id;

          this.getLandmarkDetail(id).then((results) => {
            this.showLeftWindow = true;
          })
        }
      });

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
    startSearch: function() {
      if (this.searchFilters.keyword.length) { //如果选择了省份或者在输入框内定向搜索则直接过去真实数据
        let postData = {
          pagination: false,
          source_type: this.searchFilters.landmarkFrom,
          confirm_status: this.searchFilters.confirm_status,
          async_status: this.searchFilters.async_status,
          position_type: this.searchFilters.position_type,
          simplify: true,
        };
        postData[this.searchFilters.field] = this.searchFilters.keyword;

        this.postDataCopy = Object.assign({}, postData);
        this.keywordCopy = this.searchFilters.keyword.toString();

        postData = this.pbFunc.fifterObjIsNull(postData);

        this.searchBtn.isDisabled = true;
        this.searchBtn.loading = true;
        this.searchBtn.text = '搜索中';
        this.pageLoading = true;
        this.getLandmarkListAjax(postData).then((data) => { //展示该数据
          this.renderMarker();
          this.searchBtn.isDisabled = false;
          this.searchBtn.loading = false;
          this.searchBtn.text = '搜索';
        })
      } else {
        this.getLandmarkOverviewAndRenderMarker();
      }
    },
    mapChangeSearch: function() {
      //引起地图视图变化的有三种情况1、地图放大缩小。2、地图平移。3、浏览器窗口大小调整。
      let postData = {};
      if (this.postDataCopy) {
        postData = Object.assign({}, this.postDataCopy);
      } else {
        postData = {
          pagination: false,
          source_type: this.searchFilters.landmarkFrom,
          confirm_status: this.searchFilters.confirm_status,
          async_status: this.searchFilters.async_status,
          position_type: this.searchFilters.position_type,
          simplify: true,
          province: this.searchFilters.province,
        }
      }
      let mapCenter = this.map.getCenter();
      let bounds = this.map.getBounds();
      let lnglat1 = new AMap.LngLat(bounds.northeast.lng, bounds.northeast.lat);
      let lnglat2 = new AMap.LngLat(bounds.northeast.lng, bounds.southwest.lat);
      let distance = Math.floor(lnglat1.distance(lnglat2));

      postData.longitude = mapCenter.lng;
      postData.latitude = mapCenter.lat;
      postData.distance = distance;

      postData = this.pbFunc.fifterObjIsNull(postData);

      this.getLandmarkListAjax(postData).then(() => {
        this.renderMarker();
      });
    },
    //获取地标列表
    getLandmarkListAjax: function(postData) {
      return new Promise((resolve, reject) => {
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
    //在地图上渲染MarkerList
    renderMarker: function() {
      if (this.overviewMarkerList) {
        this.overviewMarkerList.clearData();
      }

      this.markerList.render(this.landmarkList);
      this.map.plugin(["AMap.MarkerClusterer"], () => {
        this.allMakers = this.markerList.getAllMarkers();
        if (this.cluster) {
          //this.cluster.clearMarkers();
          this.cluster.setMarkers(this.allMakers);
        } else {
          this.cluster = new AMap.MarkerClusterer(this.map, this.allMakers, {
            minClusterSize: 3,
            maxZoom: 17,
          });
        }
      });
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
    //获取地标详情
    getLandmarkDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.getDetailLoading = true;
        this.$$http('getLandMarkDetail', postData).then((results) => {
          this.getDetailLoading = false;
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
    triggerAlert: function() {
      this.showLeftWindow = !this.showLeftWindow;
    },
    goLandmarkDetail: function(id) {
      this.$router.push({
        path: `/mapManage/landMark/landmarkDetail/${id}`,
      })
    },
  },
  mounted: function() {
    //初始化，需要在mounted里面执行，因为地图的挂载需要dom结构已经建立
    this.init();
  },
  beforeDestroy: function() {
    //注销地图对象，内存释放，清空地图容器。
    this.map.destroy();
  },
  activated: function() {
    this.activeName = 'second';
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
    right: 0px;
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

.search-filters-contain {
  padding: 20px 10px 0 10px;
  background-color: #fff;
  height: 700px;
  width: 380px;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 999;
}

.side-alert-traggle {
  position: absolute;
  top: 340px;

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
