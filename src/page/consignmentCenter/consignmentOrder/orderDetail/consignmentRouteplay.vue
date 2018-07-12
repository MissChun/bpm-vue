<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeNameOut" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second">
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
          <div class="out-contain">
            <div class="nav-tab">
              <div class="tab-screen">
                <el-form class="search-filters-form" label-width="80px" status-icon>
                  <el-row :gutter="0">
                    <el-col :span="6">
                      <el-form-item label="车牌号:">
                        {{carNumber}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="搜索时间:">
                        <span v-if="startTime">{{startTime}} - {{endTime}}</span>
                        <span v-if="!startTime">无</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item>
                        <span v-if="timeSpacing.day">{{timeSpacing.day}}天{{timeSpacing.hours}}小时{{timeSpacing.minutes}}分钟</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <transition name="fade">
              <div class="search-filters-contain" v-show="showLeftWindow">
                <div>
                  <div class="nav-tab point-tab">
                    <el-tabs v-model="activeName" type="card">
                      <el-tab-pane label="停留点" name="stopPoint">
                        <el-table :data="curentStopPoint" stripe style="width: 100%" size="mini" v-loading="offlineAndstopLoading">
                          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                          </el-table-column>
                          <el-table-column align="center" label="操作" :width="60">
                            <template slot-scope="scope">
                              <el-button type="primary" size="mini" @click="checkPoint(scope)">查看</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div class="page-list text-center">
                          <el-pagination background layout="prev, pager, next" :total="stopPointPage.total" :page-size="stopPointPage.pageSize" :current-page.sync="stopPointPage.currentPage" @current-change="stopPointPageChange" v-if="!offlineAndstopLoading && stopPointPage.total>10">
                          </el-pagination>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="离线点" name="offlinePoint">
                        <el-table :data="curentOfflinePoint" stripe style="width: 100%" size="mini" v-loading="offlineAndstopLoading">
                          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                          </el-table-column>
                          <el-table-column align="center" label="操作" :width="60">
                            <template slot-scope="scope">
                              <el-button type="primary" size="mini" @click="checkPoint(scope)">查看</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div class="page-list text-center">
                          <el-pagination background layout="prev, pager, next" :total="offlinePointPage.total" :page-size="offlinePointPage.pageSize" :current-page.sync="offlinePointPage.currentPage" @current-change="offlinePointPageChange" v-if="!offlineAndstopLoading && offlinePointPage.total>10">
                          </el-pagination>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div class="side-alert-traggle side-alert-traggle-right" v-show="showLeftWindow" @click="triggerAlert"><span>收起</span></div>
            </transition>
            <transition name="fade">
              <div class="side-alert-traggle side-alert-traggle-left" v-show="!showLeftWindow" @click="triggerAlert">
                <span>展开</span></div>
            </transition>
            <div class="map-loading" v-loading="pageLoading"></div>
            <div id="map-container"></div>
            <div class="bottom-operate">
              <div class="display-distance">{{distanceMile}}公里</div>
              <div class="startAndPause text-center"><img v-show="!isDisplay" @click="resumeDriving" src="@/assets/img/play.png" /><img v-show="isDisplay" @click="pauseDriving" src="@/assets/img/suspend.png" /></div>
              <div class="speed-control">
                <input class="speedRange" type="range" min="1000" max="200000" step="5000" v-model="speed" @change="changeSpeed">
                <span>{{speed}}km/h</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'routePlayback',
  computed: {
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    },
    todayStart: function() {
      let today = new Date();
      let todayDetail = this.pbFunc.getDateDetail(today);
      let start = '';
      start = todayDetail.year + '-' + todayDetail.month + '-' + todayDetail.day + ' ' + '00:00:00';
      return start;
    },
    todayEnd: function() {
      let today = new Date();
      let todayDetail = this.pbFunc.getDateDetail(today);
      let end = '';
      end = todayDetail.year + '-' + todayDetail.month + '-' + todayDetail.day + ' ' + todayDetail.hour + ':' + todayDetail.minute + ':' + todayDetail.second;
      return end;
    }
  },
  data() {
    return {
      activeNameOut: 'third',
      activeName: 'stopPoint',
      pageLoading: true,
      offlineAndstopLoading: true,
      map: '', //地图实列
      cluster: '', //点聚合实例
      pathSimplifierIns: '', //轨迹实列
      infoWindow: '', //简单信息窗体实列
      totalDataResult: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后的总数据集合
      totalStopPoint: [], //接口请求返回所有停留点数据，
      totalOfflinePoint: [], //接口请求返回所有离线点数据，
      dataResult: [], //接口请求返回坐标点数据，
      stopPointResult: [], //接口请求返回停留点数据，
      offlinePointResult: [], //接口请求返回离线点点数据，
      curentStopPoint: [], //当前分页停留点数据
      curentOfflinePoint: [], //当前分页停留点数据
      resultPath: [], //接口一次请求1000条数据，数据大的时候需要多次请求，这里是多次请求后经纬度集合
      path: [], //接口请求返回数据，过滤后只包含经纬度信息。
      pathNavigatorStyle: {}, //巡航样式
      totalPage: { //获取轨迹点数据分页信息
        currentPage: 1,
        pageSize: 1000,
      },
      stopPointPage: { //自定义停留点数据分页信息
        total: '',
        currentPage: 1,
        pageSize: 10,
      },
      offlinePointPage: { //自定义离线点数据分页信息
        total: '',
        currentPage: 1,
        pageSize: 10,
      },
      navg1: '', //巡航
      distanceMile: '', //总里程
      speed: 0, //巡航的展示速度
      driveringTime: 10, //巡航时间
      startMarker: '', //起点标记
      endMarker: '', //终点标记
      carNumber: '', //绑定车辆信息
      masterDriver: '',
      choosedDeviceId: '', //筛选所选择的车辆所绑定的设备id，所有轨迹信息是通过设备id来获取
      carLoading: false, //获取车辆列表的loading
      oneDayMillisecond: 24 * 3600 * 1000, //一天的毫秒数
      timeSpacing: {}, //所选择的时间间隔

      timeQuickPick: { //选择时间的快捷按钮
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            let start = new Date();
            let end = new Date();
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000);
            let end = new Date(new Date() - 24 * 3600 * 1000);
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            end.setHours('23');
            end.setMinutes('59');
            end.setSeconds('59');
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '三天内',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000 * 2);
            let end = new Date();
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '七天内',
          onClick(picker) {
            let start = new Date(new Date() - 24 * 3600 * 1000 * 6);
            let end = new Date();
            start.setHours('00');
            start.setMinutes('00');
            start.setSeconds('00');
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      thTableList: [{
          title: '开始时间',
          param: 'create_time',
        },
        {
          title: '结束时间',
          param: 'end_time',
        },
        {
          title: '持续时长',
          param: 'duration',
          width: '120'
        },
      ],
      showLeftWindow: false,
      isDisplay: false,
      landmarkList: [], //地标列表

      startTime: '',
      endTime: '',

      actualFluidId: '',
      stationIdArray: [],
      markerList: '',
      fluidStationList: [],
    }
  },
  methods: {
    dateToStr: function(date) {
      let dateDetail = this.pbFunc.getDateDetail(date);
      let str = '';
      str = dateDetail.year + '-' + dateDetail.month + '-' + dateDetail.day + ' ' + dateDetail.hour + ':' + dateDetail.minute + ':' + dateDetail.second;
      return str;
    },
    /*compareTime calculateTimestamps calculateTimeSpacing 组合起来都是为了计算所选择搜索时间间隔的函数*/
    calculateTimestamps: function(timestamps) {

      let resultObject = {
        day: '',
        hours: '',
        minutes: ''
      }

      resultObject.day = Math.floor(timestamps / (24 * 3600 * 1000));

      resultObject.hours = Math.floor((timestamps % (24 * 3600 * 1000)) / (3600 * 1000));

      resultObject.minutes = Math.floor(((timestamps % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000));

      return resultObject;

    },
    calculateTimeSpacing: function() {

      let resultObject = {};

      let timestamps = (Date.parse(this.endTime) - Date.parse(this.startTime));

      resultObject = this.calculateTimestamps(timestamps);

      return resultObject;

    },
    /* 获取分段详情 */
    getSectionTrips: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.setpId
        };
        this.$$http('getConOrderDetalis', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            let resultsData = results.data.data;
            this.choosedDeviceId = resultsData.device_id;
            this.startTime = (resultsData.waybill && resultsData.waybill.start_time) ? resultsData.waybill.start_time : '';
            this.endTime = (resultsData.waybill && resultsData.waybill.stop_time) ? resultsData.waybill.stop_time : this.todayEnd;
            this.carNumber = resultsData.driver_no;
            this.timeSpacing = this.calculateTimeSpacing();
            this.masterDriver = resultsData.master_driver_name;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    /* 获取轨迹点数据返回的结果中的离线点和停留点只包含开始时间和持续多少秒，calculateEndTime是用来计算结束时间 */
    calculateEndTime: function(startTime, duration) {
      let time = Date.parse(startTime) + duration * 1000;
      let timeDetail = this.pbFunc.getDateDetail(new Date(time));
      let timeStr = timeDetail.year + '-' + timeDetail.month + '-' + timeDetail.day + ' ' + timeDetail.hour + ':' + timeDetail.minute + ':' + timeDetail.second;
      return timeStr;
    },
    /* 处理离线点和停留点的结束时间和持续时长，后端没有直接返回结果，需要自己计算，data参数为停留点数据或者离线点数据 */
    dealSatrtEndTime: function(data) {
      let resultsData = [];
      for (let i in data) {
        resultsData[i] = data[i];
        if (data[i].hasOwnProperty('offline_seconds')) {
          let durationMinutes = Math.floor(data[i].offline_seconds / 60);
          let durationSeconds = data[i].offline_seconds % 60;
          resultsData[i].duration = durationMinutes + '分' + durationSeconds + '秒';
          resultsData[i].end_time = this.calculateEndTime(data[i].create_time, data[i].offline_seconds);
        } else {
          let durationMinutes = Math.floor(data[i].stopping_seconds / 60);
          let durationSeconds = data[i].stopping_seconds % 60;
          resultsData[i].duration = durationMinutes + '分' + durationSeconds + '秒';
          resultsData[i].end_time = this.calculateEndTime(data[i].create_time, data[i].stopping_seconds);
        }

      }

      return resultsData;
    },
    getDaySpace: function(startTime, endTime) {
      let start = new Date(startTime);
      let end = new Date(endTime);

      start.setHours('00');
      start.setMinutes('00');
      start.setSeconds('00');

      end.setHours('00');
      end.setMinutes('00');
      end.setSeconds('00');


      let daySpace = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      return daySpace;
    },
    /* 获取到所有数据以后对数据进行再次组合排序 */
    sortResult: function(dataArray, apiName) {
      if (apiName === 'getTripRecords') {
        for (let i = 0; i < dataArray.length; i++) {
          this.totalDataResult = this.totalDataResult.concat(dataArray[i].totalDataResult);
          this.resultPath = this.resultPath.concat(dataArray[i].resultPath);
        }
        this.renderPath();
      } else if (apiName === 'getOfflineAndStopRecords') {
        for (let i = 0; i < dataArray.length; i++) {
          this.totalStopPoint = this.totalStopPoint.concat(dataArray[i].totalStopPoint);
          this.totalOfflinePoint = this.totalOfflinePoint.concat(dataArray[i].totalOfflinePoint);
        }
        this.offlineStopPointSetPage();
      }
    },
    /* 触发搜索时，需要初始化一些数据 */
    initData: function() {
      if (this.navg1) {
        this.navg1.stop();
      }
      this.totalDataResult = [];
      this.totalStopPoint = [];
      this.curentStopPoint = [];
      this.totalOfflinePoint = [];
      this.curentOfflinePoint = [];
      this.stopPointPage = {
        total: '',
        currentPage: 1,
        pageSize: 8,
      }
      this.offlinePointPage = {
        total: '',
        currentPage: 1,
        pageSize: 7,
      };
      this.totalPage = {
        currentPage: 1,
        pageSize: 1000,
      };
      this.resultPath = [];
      this.pageLoading = true;

    },
    /* 获取轨迹点数据ajax请求，一次请求默认获取1000条数据 */
    getTripRecords: function(startTime, endTime, currentPage, apiName) {
      return new Promise((resolve, reject) => {
        let postData = {
          device_id: this.choosedDeviceId,
          page: currentPage,
          page_size: this.totalPage.pageSize,
          start_time: startTime,
          end_time: endTime,
        };
        this.$$http(apiName, postData).then((results) => {
          if (results.data && results.data.code == 0 && results.data.data) {
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    /* 获取一天的轨迹点数据 */
    getOneDayRecords: function(startTime, endTime, dataObject, apiName) {
      return new Promise((resolve, reject) => {
        let currentPage = 1;

        /* 使用递归获取一天的数据 */
        let getRecords = (startTime, endTime) => {
          this.getTripRecords(startTime, endTime, currentPage, apiName).then((results) => {
            /* 一次请求所返回的停留点数据（stopPointResult），离线点数据（offlinePointResult），轨迹点数据（dataResult），path是用于轨迹回放的源数据 */

            if (apiName === 'getTripRecords') { //获取轨迹点
              let dataResult = results.data.data.data;
              /* path是用于轨迹回放的源数据只取经纬度 */
              let path = [];
              for (let i in dataResult) {
                path[i] = [dataResult[i].location.longitude, dataResult[i].location.latitude];
              }
              /* 每次取回的数据合并到一天的总数据里面 */
              dataObject.totalDataResult = [...dataObject.totalDataResult, ...dataResult];
              dataObject.resultPath = [...dataObject.resultPath, ...path];
            } else if (apiName === 'getOfflineAndStopRecords') { //获取离线点和停留点
              let stopPointResult = results.data.data.stopping_point_locations;
              let offlinePointResult = results.data.data.offline_point_locations;

              dataObject.totalStopPoint = [...dataObject.totalStopPoint, ...stopPointResult];
              dataObject.totalOfflinePoint = [...dataObject.totalOfflinePoint, ...offlinePointResult];
            }

            /* 如果一天的轨迹点数据大于1000条，则得继续获取数据，这里使用递归，获取一天的数据 */
            if (currentPage < Math.ceil(results.data.data.count / this.totalPage.pageSize)) {
              currentPage++;
              getRecords(startTime, endTime)
            } else {
              resolve();
            }
          })

        }

        getRecords(startTime, endTime)

      });
    },
    /* 获取一次搜索的所有轨迹点数据 */
    getAllRecords: function(apiName) {
      /*业务逻辑：
       **后端轨迹点表结构以天为单位，所以，一次请求只能获取一天的数据。并只对这一天的数据进行分页。所以这里需要循环获取一次搜索的多天数据
       **这里我使用 getOneDayRecords 并发来获取各天的数据。这样可以减少一次搜索的时长，然后再对并发获取回来的数据，使用 sortResult 进行组装。
       ***/

      /* daySpace为一次搜索所间隔的天数，如果为0，则为一天的请求。大于0得需要循环请求各天数据。*/
      return new Promise((resolve, reject) => {
        let daySpace = this.getDaySpace(Date.parse(this.startTime), Date.parse(this.endTime));
        /* dataArray 用于存储所有的一天请求返回的数据，最后用于数据组装 */
        let dataArray = [];
        let callBackFun = (dataArray, apiName) => {
          if (apiName === 'getTripRecords') {
            this.pageLoading = false;
          } else if (apiName === 'getOfflineAndStopRecords') {
            this.offlineAndstopLoading = false;
          }
          this.sortResult(dataArray, apiName);
          resolve()
        }
        if (daySpace > 0) { //如果多天数据需要循环请求
          /* ajaxEndNum，一天的数据获取完成，ajaxEndNum加1，如果ajaxEndNum-1==daySpace,代表所有数据获取完成 */
          let ajaxEndNum = 0;
          for (let i = 0; i < (daySpace + 1); i++) {
            dataArray[i] = {
              totalDataResult: [],
              totalStopPoint: [],
              totalOfflinePoint: [],
              resultPath: [],
            }
            if (i === 0) { //第一天

              let endTime = new Date(Date.parse(this.startTime));
              endTime.setHours('23');
              endTime.setMinutes('59');
              endTime.setSeconds('59');
              let endTimeStr = this.dateToStr(endTime);

              this.getOneDayRecords(this.startTime, endTimeStr, dataArray[i], apiName).then(() => {
                ajaxEndNum++;
                if (ajaxEndNum - 1 === daySpace) {
                  callBackFun(dataArray, apiName);
                }
              });
            } else if (i === daySpace) { //最后一天
              let startTime = new Date(Date.parse(this.endTime));
              startTime.setHours('00');
              startTime.setMinutes('00');
              startTime.setSeconds('00');
              let startTimeStr = this.dateToStr(startTime);
              let endTime = new Date(Date.parse(this.endTime));
              let endTimeStr = this.dateToStr(endTime);

              this.getOneDayRecords(startTimeStr, endTimeStr, dataArray[i], apiName).then(() => {
                ajaxEndNum++;
                if (ajaxEndNum - 1 === daySpace) {
                  callBackFun(dataArray, apiName);
                }
              });
            } else { //中间的天数
              let startTime = new Date(Date.parse(this.startTime) + 1000 * 60 * 60 * 24 * i);
              startTime.setHours('00');
              startTime.setMinutes('00');
              startTime.setSeconds('00');
              let startTimeStr = this.dateToStr(startTime);

              let endTime = new Date(Date.parse(this.startTime) + 1000 * 60 * 60 * 24 * i);
              endTime.setHours('23');
              endTime.setMinutes('59');
              endTime.setSeconds('59');
              let endTimeStr = this.dateToStr(endTime);

              this.getOneDayRecords(startTimeStr, endTimeStr, dataArray[i], apiName).then(() => {
                ajaxEndNum++;
                if (ajaxEndNum - 1 === daySpace) {
                  callBackFun(dataArray, apiName);
                }
              });
            }
          }
        } else { //如果只有一天数据
          dataArray[0] = {
            totalDataResult: [],
            totalStopPoint: [],
            totalOfflinePoint: [],
            resultPath: [],
          }
          this.getOneDayRecords(this.startTime, this.endTime, dataArray[0], apiName).then(() => {
            callBackFun(dataArray, apiName);

          });
        }
      })


    },

    searchAndRender: function() {
      this.initData();
      this.getAllRecords('getTripRecords').then(() => {
        this.getAllRecords('getOfflineAndStopRecords');
      });
    },
    getIconSrc: function(item) {
      let src = ''

      /*卸货站*/
      if (item.position_type && item.position_type.key === 'DELIVER_POSITION') {
        src = 'l_2.png';
      }

      /*气源液厂*/
      if (item.position_type && item.position_type.key === 'LNG_FACTORY') {
        src = 'lng_2.png';
      }
      return src;

    },
    /* 初始化地图内的各种需要的控件 */
    initPath: function() {
      let _this = this;
      AMapUI.loadUI(['misc/PathSimplifier', 'overlay/SimpleInfoWindow', 'overlay/SimpleMarker', 'misc/MarkerList'], function(PathSimplifier, SimpleInfoWindow, SimpleMarker, MarkerList) {

        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }

        //初始化信息窗口
        _this.infoWindow = new SimpleInfoWindow({
          infoTitle: '<div class="fs-16">点位置信息</div>',
          infoBody: ''
        });
        //初始化起点icon
        _this.startMarker = new SimpleMarker({
          map: _this.map,
          iconStyle: {
            src: require('@/assets/img/origin.png'),
            style: {
              width: '20px',
              height: '25px',
            },

          },
          offset: new AMap.Pixel(-9, -24),
          visible: false,
        });
        //初始化终点icon
        _this.endMarker = new SimpleMarker({
          map: _this.map,
          iconStyle: {
            src: require('@/assets/img/finish.png'),
            style: {
              width: '22px',
              height: '27px',
            }
          },
          offset: new AMap.Pixel(-10, -26),
          visible: false,
        });
        //初始化轨迹
        _this.pathSimplifierIns = new PathSimplifier({
          zIndex: 100,

          map: _this.map, //所属的地图实例

          getPath: function(pathData, pathIndex) {

            return pathData.path;
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            return
          },

          renderOptions: {

            renderAllPointsIfNumberBelow: 1000, //绘制路线节点，如不需要可设置为-1

            pathLineStyle: {
              strokeStyle: 'rgb(255,0,0)',
              lineWidth: 5,
              dirArrowStyle: true,
            },
          },

          autoSetFitView: true, //页面自适应

        });
        //初始化巡航样式
        _this.pathNavigatorStyle = {

          loop: false, //循环播放

          speed: 100, //巡航速度，单位千米/小时

          pathNavigatorStyle: {
            width: 20,
            height: 20,
            content: PathSimplifier.Render.Canvas.getImageContent(require('@/assets/img/direction_1.png')), //使用图片
            initRotateDegree: -90,
            pathLinePassedStyle: {
              lineWidth: 5,
              strokeStyle: '#087ec4',
            }
          },

          keyPointOnSelectedPathLineStyle: {
            radius: 10,
            fillStyle: 'rgb(244,18,71)',
          }

        }
        //轨迹点添加事件
        //轨迹点添加事件
        _this.pathSimplifierIns.on('pointMouseover pointClick', function(e, info) {

          AMap.plugin('AMap.Geocoder', function() {

            let lnglat = [_this.totalDataResult[info.pointIndex].location.longitude, _this.totalDataResult[info.pointIndex].location.latitude]
            let geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: ''
            })
            geocoder.getAddress(lnglat, function(status, data) {
              if (status === 'complete' && data.info === 'OK') {
                let pointMsgStr = '';
                let addressDetail = data.regeocode.formattedAddress;
                let speed = _this.totalDataResult[info.pointIndex].speed ? _this.totalDataResult[info.pointIndex].speed : '0';
                pointMsgStr = '<div class="fs-13 md-5">主驾驶员：' + _this.masterDriver +
                  '</div><div class="fs-13 md-5">车牌号：' + _this.carNumber +
                  '</div><div class="fs-13 md-5">定位时间：' + _this.totalDataResult[info.pointIndex].create_time +
                  '</div><div class="fs-13 md-5">行驶速度：' + speed +
                  'km/h</div><div class="fs-13 md-5">定位地址：' + addressDetail +
                  '</div>';


                _this.infoWindow.setInfoBody(pointMsgStr);

                _this.infoWindow.open(_this.map, info.pathData.path[info.pointIndex]);
              }
            })
          })

        });

        //初始化卸货站，液厂信息。
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



            let infoTitleStr = '<div class="fs-13 ">地标信息：' + data.position_name + '</div>';
            let position_type = (data.position_type && data.position_type.verbose) ? data.position_type.verbose : '无';
            let address = data.address ? data.address : '无';
            let contacts = data.contacts ? data.contacts : '无';
            let tel = data.tel ? data.tel : '无';
            let infoBodyStr = '<br><div class="fs-13 md-5">地标类型：' + position_type + '</div><div class="fs-13 md-5">地址：' + address + '</div>';

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
            src = _this.getIconSrc(dataItem);

            if (recycledMarker) {

              recycledMarker.setIconStyle({
                src: require('../../../../assets/img/' + src),
                style: {
                  width: '20px',
                  height: '20px',
                  transform: 'rotate(' + rotateDeg + ')',
                }
              });

              recycledMarker.setLabel({
                content: dataItem.position_name,
                offset: new AMap.Pixel(30, 0)
              });

              return recycledMarker
            } else {
              return new SimpleMarker({
                containerClassNames: 'my-marker',
                iconStyle: {
                  src: require('../../../../assets/img/' + src),
                  style: {
                    width: '20px',
                    height: '20px',
                    transform: 'rotate(' + rotateDeg + ')',
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

      });

    },
    /* 这里巡航时，实时展示点信息时，设置点信息 */
    setCurrentInfo: function() {
      let _this = this;
      let cursor = _this.navg1.getCursor(); //获取当前点信息，见高德api
      if (Number(cursor.idx) >= 0) {
        let pointMsgStr = '';
        let longitude = _this.totalDataResult[cursor.idx].location.longitude;
        let latitude = _this.totalDataResult[cursor.idx].location.latitude;
        let speed = _this.totalDataResult[cursor.idx].speed ? _this.totalDataResult[cursor.idx].speed : '0';
        pointMsgStr = '<div class="fs-13 md-5">主驾驶员：' + _this.masterDriver +
          '</div><div class="fs-13 md-5">车牌号：' + _this.carNumber +
          '</div><div class="fs-13 md-5">定位时间：' + _this.totalDataResult[cursor.idx].create_time +
          '</div><div class="fs-13 md-5">行驶速度：' + speed +
          'km/h</div>';

        _this.infoWindow.setInfoBody(pointMsgStr);
        _this.infoWindow.setPosition([longitude, latitude]);

      }

      if (cursor.idx == (_this.totalDataResult.length - 1)) {
        _this.isDisplay = false;
      }
    },
    offlineStopPointSetPage: function() {
      /* 停留点逻辑处理
       **这里后端是返回了当次接口请求返回结果的离线点或者停留点数据，前端通过多次请求获取完整数据后，拼接数据到totalStopPoint／totalOfflinePoint中，并需要自己做分页，
       */
      this.stopPointPage.currentPage = 1;
      this.stopPointPage.total = this.totalStopPoint.length;
      this.curentStopPoint = this.totalStopPoint.slice(0, this.stopPointPage.pageSize);
      this.curentStopPoint = this.dealSatrtEndTime(this.curentStopPoint);
      /* 离线点逻辑处理同停留点 */
      this.curentOfflinePoint = this.totalOfflinePoint.slice(0, this.offlinePointPage.pageSize);
      this.curentOfflinePoint = this.dealSatrtEndTime(this.curentOfflinePoint);
      this.offlinePointPage.currentPage = 1;
      this.offlinePointPage.total = this.totalOfflinePoint.length;
    },
    renderPath: function() {
      let _this = this;
      let allowTime = 20;
      if (_this.pathSimplifierIns) {
        if (_this.resultPath.length) { //如果有数据
          //设置数据，绘制轨迹
          _this.pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: _this.resultPath
          }]);
        } else {
          _this.pageLoading = false;
          /* 如果没有轨迹数据展示提示，并清空轨迹展示 */
          _this.$message({
            message: '无车辆信息',
            type: 'success'
          });

          if (_this.navg1) {
            _this.navg1.destroy();
          }

          _this.pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: []
          }]);

          return;
        }

        _this.startMarker.show();
        _this.startMarker.setPosition(_this.resultPath[0]);

        /*对第一条线路（即索引 0）创建一个巡航器,这里就只有一条路线。*/
        _this.navg1 = _this.pathSimplifierIns.createPathNavigator(0, _this.pathNavigatorStyle);

        if (_this.resultPath.length) {
          /* 计算里程
           **利用高德地图getMovedDistance方法计算里程，详情请查看“UI组件库－轨迹展示api”
           */
          _this.navg1.moveToPoint(_this.resultPath.length - 1);
          _this.distanceMile = Math.ceil(_this.navg1.getMovedDistance() / 1000);
          /*计算巡航速度*/
          _this.speed = Math.floor(_this.distanceMile / _this.driveringTime * 3600);
          /*设置终点marker*/
          let endMarkerIndex = _this.resultPath.length - 1;
          _this.endMarker.show();
          _this.endMarker.setPosition(_this.resultPath[endMarkerIndex]);
          /*监测巡航move事件（调用moveByDistance（动画过程会调用该方法）， moveToPoint 时触发），实时展示轨迹点信息。
           **这里有个问题是，moveByDistance，moveToPoint才出发move事件，导致轨迹点信息展示只能在导航到达点时才获取信息。没有实时跟着导航移动，需要优化。
           */
        }
        _this.navg1.on('move', function() {
          _this.setCurrentInfo();
        })

      } else {
        if (allowTime > 0) {
          /* 防止代码出错无限调用renderPath
           */
          allowTime--;
          /* 这里发现pathSimplifierIns有时还没初始化好,所以如果没有初始化好则再次执行renderPath */
          setTimeout(() => {
            _this.renderPath();
          }, 200)
        }

      }

    },
    stopPointPageChange: function() {
      setTimeout(() => {
        this.curentStopPoint = this.totalStopPoint.slice((this.stopPointPage.currentPage - 1) * this.stopPointPage.pageSize, this.stopPointPage.currentPage * this.stopPointPage.pageSize);
        this.curentStopPoint = this.dealSatrtEndTime(this.curentStopPoint);
      })
    },
    offlinePointPageChange: function() {
      setTimeout(() => {
        this.curentOfflinePoint = this.totalOfflinePoint.slice((this.offlinePointPage.currentPage - 1) * this.offlinePointPage.pageSize, this.offlinePointPage.currentPage * this.offlinePointPage.pageSize);
        this.curentOfflinePoint = this.dealSatrtEndTime(this.curentOfflinePoint);
      })
    },
    /* 停留点或者离线点，查看操作 */
    checkPoint: function(row) {
      let _this = this;
      _this.isDisplay = false;
      _this.navg1.pause();

      AMap.plugin('AMap.Geocoder', function() {

        let lnglat = [row.row.location.longitude, row.row.location.latitude]
        let geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: ''
        })
        geocoder.getAddress(lnglat, function(status, data) {
          if (status === 'complete' && data.info === 'OK') {
            let pointMsgStr = '';
            let addressDetail = data.regeocode.formattedAddress;
            let speed = row.row.speed ? row.row.speed : '0';
            pointMsgStr = '<div class="fs-13 md-5">主驾驶员：' + _this.masterDriver +
              '</div><div class="fs-13 md-5">车牌号：' + _this.carNumber +
              '</div><div class="fs-13 md-5">定位时间：' + row.row.create_time +
              '</div><div class="fs-13 md-5">行驶速度：' + speed +
              'km/h</div><div class="fs-13 md-5">定位地址：' + addressDetail +
              '</div>';


            _this.infoWindow.setInfoBody(pointMsgStr);

            _this.infoWindow.open(_this.map, [row.row.location.longitude, row.row.location.latitude]);
          }
        })
      })

    },
    pauseDriving: function() { //暂停
      this.isDisplay = false;
      this.navg1.pause();
    },
    resumeDriving: function() { //恢复
      this.isDisplay = true;
      let naviStatus = this.navg1.getNaviStatus();
      if (naviStatus === 'stop') {
        this.infoWindow.open(this.map, this.resultPath[0]);
        this.navg1.setSpeed(this.speed);
        this.navg1.start();
      } else {
        let cursor = this.navg1.getCursor();
        if (cursor.idx == (this.totalDataResult.length - 1)) {
          this.infoWindow.open(this.map, this.resultPath[0]);
          this.navg1.setSpeed(this.speed);
          this.navg1.start();
        } else {
          this.navg1.resume();
        }
      }
    },
    changeSpeed: function() {
      this.navg1.setSpeed(this.speed);
    },
    triggerAlert: function() {
      this.showLeftWindow = !this.showLeftWindow;
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'second') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${this.setpId}/${this.willId}` });
      }
    },

    /* 获取运单详情，为了获取液厂和卸货站 */
    getConOrderDetail: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.willId
        };
        this.$$http('getConOrderDetail', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            let resultsData = results.data.data;
            /*获取实际液厂id，用来获取液厂*/
            this.actualFluidId = (resultsData.delivery_order && resultsData.delivery_order.actual_fluid_id) ? resultsData.delivery_order.actual_fluid_id : '';
            /*获取运单卸货站id，因为存在分卸情况，卸货站可能有多个。*/
            if (resultsData.trips && resultsData.trips.length) {
              for (let i = 0, tripsLength = resultsData.trips.length; i < tripsLength; i++) {
                /*当分段状态处于卸车分段时（unload），此时才有卸货站信息*/
                if (resultsData.trips[i].section_type && resultsData.trips[i].section_type.key === 'unload') {
                  if (resultsData.trips[i].business_order && resultsData.trips[i].business_order.map_postion && resultsData.trips[i].business_order.map_postion.length == 24) {
                    this.stationIdArray.push(resultsData.trips[i].business_order.map_postion);
                  }
                }
              }
            }

            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },

    /* 获取实际液厂详情 */
    getFulidDetalis: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getFulidDetalis', postData).then((results) => {
          if (results.data && results.data.code == 0) {

            let fluidDetail = results.data.data;
            fluidDetail.position_name = fluidDetail.actual_fluid_name;
            fluidDetail.address = fluidDetail.coordinate.address;
            fluidDetail.location = {
              longitude: fluidDetail.coordinate.longitude,
              latitude: fluidDetail.coordinate.latitude
            };
            fluidDetail.position_type = {
              key: 'LNG_FACTORY',
              verbose: '气源液厂',
            };

            this.fluidStationList.push(fluidDetail);
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })

    },

    /* 获取卸货站 */
    getLandMarkList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          ids: this.stationIdArray.join(','),
          position_type: 'DELIVER_POSITION',
        };

        this.$$http('getLandMarkList', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.fluidStationList.push(results.data.data.results)
            resolve(results)
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
  activated: function() {
    this.activeName = 'third';
  },
  mounted() {
    /* 创建地图 */
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });
    this.initPath();
    this.getSectionTrips().then((results) => {
      if (this.startTime) {
        this.searchAndRender();
      } else {
        this.pageLoading = false;
        this.$message({
          message: '无轨迹信息',
          type: 'success'
        });
      }

      this.getConOrderDetail().then(() => {
        if (this.stationIdArray.length) {
          this.getLandMarkList().then(() => {
            this.markerList.render(this.fluidStationList);
          });
        }
        if (this.actualFluidId) {
          this.getFulidDetalis(this.actualFluidId).then(() => {
            this.markerList.render(this.fluidStationList);
          });
        }
      });

    })
  },
  beforeDestroy() {
    if (this.navg1) {
      this.navg1.destroy();
    }
    if (this.map) {
      this.map.destroy();
    }
  }
}

</script>
<style scoped lang="less">
.out-contain {

  position: relative;
  #map-container {
    width: 100%;
    height: 700px;
    .amap-logo {
      right: 0px !important;
      left: auto !important;
      display: none;
    }

    .amap-copyright {
      right: 0px !important;
      left: auto !important;
      display: none;
    }
  }
  .map-loading {
    position: absolute;
    height: 50px;
    width: 100%;
    left: 0;
    top: 80px;
    /deep/ .el-loading-mask {
      background-color: rgba(250, 250, 250, 0);
    }
  }
  .search-filters-contain {
    padding: 20px 10px 0 10px;
    background-color: #fff;
    height: 570px;
    width: 480px;
    position: absolute;
    left: 0;
    top: 140px;
    z-index: 999;
  }
  .time-spacing {
    padding: 0 20px;
    line-height: 40px;
    font-size: 14px;
  }

  .bottom-operate {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: relative;
    font-size: 14px;
    .display-distance {
      position: absolute;
      top: 0;
      left: 10px;
      line-height: 50px;
      width: 100px;
    }
    .landmark-operate {
      position: absolute;
      top: 11px;
      left: 110px;
      width: 100px;
    }
    .startAndPause {
      width: 50px;
      padding-top: 9px;
      margin: 0 auto;
      img {
        cursor: pointer;
      }
    }

    .speed-control {
      position: absolute;
      top: 0;
      right: 10px;
      line-height: 50px;
      width: 250px;
    }
  }
  .side-alert-traggle {
    position: absolute;
    top: 380px;

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
    left: 500px;
  }

  .side-alert-traggle-left {
    left: 0px;
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

</style>
