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
            <div class="search-filters-contain" v-show="showLeftWindow">
              <div>
                <el-form class="search-filters-form" label-width="80px" status-icon>
                  <el-row :gutter="0">
                    <el-col :span="24">
                      <el-form-item label="车牌号:">
                        {{carNumber}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="0">
                    <el-col :span="24">
                      <el-form-item label="搜索时间:">
                        {{todayStart}} - {{todayEnd}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="0">
                    <el-col :span="24">
                      <div class="float-left time-spacing">{{timeSpacing.day}}天{{timeSpacing.hours}}小时{{timeSpacing.minutes}}分钟</div>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="nav-tab point-tab">
                  <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="停留点" name="stopPoint">
                      <el-table :data="curentStopPoint" stripe style="width: 100%" size="mini" v-loading="pageLoading">
                        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                        </el-table-column>
                        <el-table-column align="center" label="操作" :width="60">
                          <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="checkPoint(scope)">查看</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="page-list text-center">
                        <el-pagination background layout="prev, pager, next,jumper" :total="stopPointPage.total" :page-size="stopPointPage.pageSize" :current-page.sync="stopPointPage.currentPage" @current-change="stopPointPageChange" v-if="!pageLoading && stopPointPage.total>10">
                        </el-pagination>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="离线点" name="offlinePoint">
                      <el-table :data="curentOfflinePoint" stripe style="width: 100%" size="mini" v-loading="pageLoading">
                        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                        </el-table-column>
                        <el-table-column align="center" label="操作" :width="60">
                          <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="checkPoint(scope)">查看</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="page-list text-center">
                        <el-pagination background layout="prev, pager, next,jumper" :total="offlinePointPage.total" :page-size="offlinePointPage.pageSize" :current-page.sync="offlinePointPage.currentPage" @current-change="offlinePointPageChange" v-if="!pageLoading && offlinePointPage.total>10">
                        </el-pagination>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </div>
            <div class="side-alert-traggle side-alert-traggle-right" v-show="showLeftWindow" @click="triggerAlert"><span>«</span></div>
            <div class="side-alert-traggle side-alert-traggle-left" v-show="!showLeftWindow" @click="triggerAlert"><span>»</span></div>
            <div class="map-loading" v-loading="pageLoading"></div>
            <div id="map-container"></div>
            <div class="bottom-operate">
              <div class="display-distance">{{distanceMile}}公里</div>
              <div class="startAndPause text-center"><img v-show="!isDisplay" @click="resumeDriving" src="@/assets/img/play.png" /><img v-show="isDisplay" @click="pauseDriving" src="@/assets/img/suspend.png" /></div>
              <div class="speed-control">
                <span>{{speed}}km/h</span>
                <input class="speedRange" type="range" min="1000" max="200000" step="5000" v-model="speed" @change="changeSpeed">
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
    id: function() {
      console.log('this.$route.params', this.$route.params.id);
      return this.$route.params.id;
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
        pageSize: 8,
      },
      offlinePointPage: { //自定义离线点数据分页信息
        total: '',
        currentPage: 1,
        pageSize: 7,
      },
      navg1: '', //巡航
      distanceMile: '', //总里程
      speed: 0, //巡航的展示速度
      driveringTime: 10, //巡航时间
      startMarker: '', //起点标记
      endMarker: '', //终点标记
      deviceDetail: '', //设备详情，获取设备详情是为了页面初始化的时候，获取绑定车辆信息carNumber
      carNumber: '', //绑定车辆信息
      todayStartDateCopy: this.todayStartDate,
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
      showLeftWindow: true,
      isDisplay: false,
      landmarkList: [], //地标列表

      startTime: '',
      endTime: '',
    }
  },
  methods: {
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
    getConOrderDetalis: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.setpId
        };
        this.$$http('getConOrderDetalis', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            console.log('getConOrderDetalis results', results);
            let resultsData = results.data.data;
            this.choosedDeviceId = resultsData.device_id;
            this.startTime = this.todayStart;
            this.endTime = this.todayEnd;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    /* 页面初始化时获取设备详细信息，为了获取车牌号。carNumber */
    getDeviceDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.id
        };
        this.$$http('getDeviceDetail', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.deviceDetail = results.data.data;
            this.carNumber = this.deviceDetail.tractor.plate_number;

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
    /* 获取轨迹点数据ajax请求 */
    getTripRecords: function() {
      return new Promise((resolve, reject) => {
        this.dataResult = [];
        this.stopPointResult = [];
        this.offlinePointResult = [];
        this.path = [];

        let postData = {
          device_id: this.choosedDeviceId,
          page: this.totalPage.currentPage,
          page_size: this.totalPage.pageSize,
          start_time: this.startTime,
          end_time: this.endTime,
          offline_stopping_infl: true,
        };

        this.$$http('getTripRecords', postData).then((results) => {

          if (results.data && results.data.code == 0 && results.data.data) {
            console.log('results.data.data', results.data.data);

            this.dataResult = results.data.data.data;
            this.stopPointResult = results.data.data.stopping_point_locations;
            this.offlinePointResult = results.data.data.offline_point_locations;

            for (let i in this.dataResult) {
              this.path[i] = [this.dataResult[i].location.longitude, this.dataResult[i].location.latitude];
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
    /* 获取轨迹点数据返回的结果中的离线点和停留点只包含开始时间和持续多少秒，calculateEndTime是用来计算结束时间 */
    calculateEndTime: function(startTime, duration) {
      let time = Date.parse(startTime) + duration * 1000;
      let timeDetail = this.pbFunc.getDateDetail(new Date(time));
      let timeStr = timeDetail.year + '-' + timeDetail.month + '-' + timeDetail.day + ' ' + timeDetail.hour + ':' + timeDetail.minute + ':' + timeDetail.second;
      return timeStr;
    },
    /* 处理离线点和停留点的结束时间和持续时长，后端没有直接返回结果，需要自己计算，data参数为停留点数据或者离线点数据 */
    dealSatrtEndTime: function(data) {
      console.log('datafdfsdf', data);
      let resultsData = [];
      for (let i in data) {
        console.log('data', data[i], typeof data[i]);
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
    /* 这里巡航时，实时展示点信息时，设置点信息 */
    setCurrentInfo: function() {
      let _this = this;
      let cursor = _this.navg1.getCursor(); //获取当前点信息，见高德api
      console.log('cursor', cursor, cursor.idx, cursor.tail, Number(cursor.idx) >= 0, _this.totalDataResult.length);
      if (Number(cursor.idx) >= 0) {
        let pointMsgStr = '';
        let longitude = _this.totalDataResult[cursor.idx].location.longitude;
        let latitude = _this.totalDataResult[cursor.idx].location.latitude;
        pointMsgStr = '<div class="fs-13">车牌号：' + _this.carNumber +
          '</div><div class="fs-13">定位时间：' + _this.totalDataResult[cursor.idx].create_time +
          '</div><div class="fs-13">行驶速度：' + _this.totalDataResult[cursor.idx].speed +
          'km/h</div>';

        _this.infoWindow.setInfoBody(pointMsgStr);
        _this.infoWindow.setPosition([longitude, latitude]);

      }

      if (cursor.idx == (_this.totalDataResult.length - 1)) {
        _this.isDisplay = false;
      }
    },
    renderPath: function(data) {
      let _this = this;
      let allowTime = 20;
      if (_this.pathSimplifierIns) {
        if (_this.path.length) { //如果有数据
          /*拼接所有轨迹点数据（totalDataResult），离线点（totalOfflinePoint），停留点（totalStopPoint），轨迹展示所需数据（resultPath）*/
          _this.totalDataResult = [..._this.totalDataResult, ..._this.dataResult];
          _this.totalStopPoint = [..._this.totalStopPoint, ..._this.stopPointResult];
          _this.totalOfflinePoint = [..._this.totalOfflinePoint, ..._this.offlinePointResult];
          _this.resultPath = [..._this.resultPath, ..._this.path];
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

          _this.navg1.destroy();

          _this.pathSimplifierIns.setData([{
            name: '路线0',
            zIndex: 0,
            path: []
          }]);

          return;
        }

        _this.startMarker.setPosition(_this.resultPath[0]);

        if (Math.ceil(data.data.data.count / _this.totalPage.pageSize)) {
          /* 一次只拿1000条数据，如果数据没有拿完则继续去获取数据 */
          if (_this.totalPage.currentPage < Math.ceil(data.data.data.count / _this.totalPage.pageSize)) {
            _this.totalPage.currentPage++;
            _this.getTripRecords().then((data) => {
              _this.renderPath(data);
            })
          } else {
            _this.pageLoading = false;
            /* 停留点逻辑处理
             **这里后端是返回了当次接口请求返回结果的离线点或者停留点数据，前端通过多次请求获取完整数据后，拼接数据到totalStopPoint／totalOfflinePoint中，并需要自己做分页，
             */
            _this.stopPointPage.currentPage = 1;
            _this.stopPointPage.total = _this.totalStopPoint.length;
            _this.curentStopPoint = _this.totalStopPoint.slice(0, _this.stopPointPage.pageSize);
            _this.curentStopPoint = _this.dealSatrtEndTime(_this.curentStopPoint);
            /* 离线点逻辑处理同停留点 */
            _this.curentOfflinePoint = _this.totalOfflinePoint.slice(0, _this.offlinePointPage.pageSize);
            _this.curentOfflinePoint = _this.dealSatrtEndTime(_this.curentOfflinePoint);
            _this.offlinePointPage.currentPage = 1;
            _this.offlinePointPage.total = _this.totalOfflinePoint.length;
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
              _this.endMarker.setPosition(_this.resultPath[endMarkerIndex]);
              /*监测巡航move事件（调用moveByDistance（动画过程会调用该方法）， moveToPoint 时触发），实时展示轨迹点信息。
               **这里有个问题是，moveByDistance，moveToPoint才出发move事件，导致轨迹点信息展示只能在导航到达点时才获取信息。没有实时跟着导航移动，需要优化。
               */
            }
            _this.navg1.on('move', function() {
              _this.setCurrentInfo();
            })
          }

        }
      } else {
        if (allowTime > 0) {
          /* 防止代码出错无限调用renderPath */
          allowTime--;
          /* 这里发现pathSimplifierIns有时还没初始化好,所以如果没有初始化好则再次执行renderPath */
          setTimeout(() => {
            console.log('xxxx');
            _this.renderPath(data);
          }, 200)
        }

      }

    },
    searchAndRender: function() {
      let _this = this;
      if (_this.navg1) {
        _this.navg1.stop();
      }
      _this.totalDataResult = [];
      _this.totalStopPoint = [];
      _this.curentStopPoint = [];
      _this.totalOfflinePoint = [];
      _this.curentOfflinePoint = [];
      _this.stopPointPage = {
        total: '',
        currentPage: 1,
        pageSize: 8,
      }
      _this.offlinePointPage = {
        total: '',
        currentPage: 1,
        pageSize: 7,
      };
      _this.totalPage = {
        currentPage: 1,
        pageSize: 1000,
      };
      _this.resultPath = [];
      _this.pageLoading = true;
      _this.getTripRecords().then((data) => {
        _this.renderPath(data);
      })
    },

    getIconSrc: function(item) {
      let src = ''
      /*lng加气站*/
      if (item.position_type && item.position_type === 'LNG') {
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
          switch (item.confirm_status.key) {
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

    /* 初始化地图内的各种需要的控件 */
    initPath: function() {
      let _this = this;
      AMapUI.loadUI(['misc/PathSimplifier', 'overlay/SimpleInfoWindow', 'overlay/SimpleMarker'], function(PathSimplifier, SimpleInfoWindow, SimpleMarker) {

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
        _this.pathSimplifierIns.on('pointMouseover pointClick', function(e, info) {
          let pointMsgStr = '';
          pointMsgStr = '<div class="fs-13">车牌号：' + _this.carNumber +
            '</div><div class="fs-13">定位时间：' + _this.totalDataResult[info.pointIndex].create_time +
            '</div><div class="fs-13">行驶速度：' + _this.totalDataResult[info.pointIndex].speed +
            'km/h</div>';

          _this.infoWindow.setInfoBody(pointMsgStr);

          _this.infoWindow.open(_this.map, info.pathData.path[info.pointIndex]);



        });

      });

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
      console.log('row', row);

      let _this = this;
      let pointMsgStr = '';
      _this.navg1.pause();
      _this.isDisplay = false;
      _this.navg1.pause();

      pointMsgStr = '<div class="fs-13">车牌号：' + _this.carNumber +
        '</div><div class="fs-13">定位时间：' + row.row.create_time +
        '</div><div class="fs-13">行驶速度：' + row.row.speed +
        'km/h</div>';

      _this.infoWindow.setInfoBody(pointMsgStr);

      _this.infoWindow.open(_this.map, [row.row.location.longitude, row.row.location.latitude]);

    },
    pauseDriving: function() { //暂停
      this.isDisplay = false;
      this.navg1.pause();
    },
    resumeDriving: function() { //恢复
      this.isDisplay = true;
      let naviStatus = this.navg1.getNaviStatus();
      console.log('naviStatus', naviStatus);
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
    getLandMarkList: function() {
      return new Promise((resolve, reject) => {
        let mapCenter = this.map.getCenter();
        let bounds = this.map.getBounds();
        let lnglat1 = new AMap.LngLat(bounds.northeast.lng, bounds.northeast.lat);
        let lnglat2 = new AMap.LngLat(bounds.northeast.lng, bounds.southwest.lat);
        let distance = Math.floor(lnglat1.distance(lnglat2));
        let postData = {
          pagination: false,
          longitude: mapCenter.lng,
          latitude: mapCenter.lat,
          distance: distance,
        };
        this.$$http('getLandMarkList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkList = results.data.data.results;
            console.log('this.landmarkList', this.landmarkList);
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
    getLandmarkDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getLandMarkDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkDetail = results.data.data;
            console.log('deviceDetail', this.landmarkDetail);
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'second') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${this.setpId}/${this.willId}` });
      }
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
    this.getConOrderDetalis().then((results) => {
      this.searchAndRender();
    })
    // this.getDeviceDetail();
    // this.searchAndRender();
    // this.timeSpacing = this.calculateTimeSpacing();
    console.log('this.$route.params', this.$route.params);
  },
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
    top: 0;
  }
  .search-filters-contain {
    padding: 20px 10px 0 10px;
    background-color: #fff;
    height: 660px;
    width: 480px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .time-spacing {
    padding-left: 10px;
    line-height: 40px;
    font-size: 14px;
  }
  .point-tab {
    margin-top: 20px;
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
    top: 280px;

    width: 26px;
    height: 28px;

    line-height: 28px;

    cursor: pointer;
    text-align: center;

    border: 1px solid #bbb;
    border-left: 0 none;
    background-color: #f4f5f7;
    z-index: 999;
    span {
      font-size: 22px;
    }
  }
  .side-alert-traggle-right {
    left: 500px;
  }

  .side-alert-traggle-left {
    left: 0px;
  }
}

</style>
