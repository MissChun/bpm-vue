<style scoped lang="less">
.listTableAll {
	text-align: left;
	font-size: 13px;
}

.el-table {
	/deep/ .el-table__header-wrapper tr th .cell {
		text-align: left;
	}
	/deep/ .el-table__body {
		.el-table__row {
			background-color: #f5f6fa;
			&.expanded {
				td {
					border-top: 1px solid #e4e7ed;
					border-bottom: 1px solid #e4e7ed;
				}
			}
		}
		.el-table__expanded-cell[class*=cell] {
			padding-left: 0;
			padding-right: 0;
		}
		.listDetalis {
			float: left;
			text-align: left;
		}
		td {
			border-bottom: 0px solid #ebeef5;
			font-size: 13px;
			height: 25px;
			padding: 5px 0;
			.el-table th.is-leaf {
				border-top: none;
			}
		}
		.colinfo {
			float: left;
			height: 30px;
			line-height: 30px;
			font-size: 10px;
		}
		.el-icon-location {
			font-size: 10px;
			margin-left: 5px;
			color: #409eff;
		}
		.carList .el-col {
			height: 25px;
			line-height: 25px;
		}

		.el-col-3 {
			width: 11.5%;
		}
		.el-button {
			min-width: 70px;
		}
		.el-table__row td:nth-child(1) .cell {
			padding-left: 40px;
		}
	}
}

.dialog-footer {
	text-align: center;
}

.el-button--success {
	color: #67c23a !important;
	background: #f0f9eb !important;
	border-color: #c2e7b0 !important;
}

.commh {
	line-height: 28px;
	margin-top: 5px;
	height: 28px;
}

.carInfo {
	width: 70%;
	text-align: left;
	margin-left: 15%;
}

.el-dialog__wrapper .el-dialog {
	-webkit-backface-visibility: hidden;
}

.whiteSpan {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 13px;
	line-height:18px;
}

.el-icon-location {
	cursor: pointer;
}

#map-container {
	height: 400px;
	width: 100%;
}

.listDetalis .el-row {
	margin-top: 10px;
}

.listDetalis>div:nth-child(1) {
	margin-top: 0px;
}

.unloadList {
	margin-top: 30px;
}

</style>
<template>
	<div style="position:relative;font-size: 10px;">
		<noData v-if="ListData.length==0&&ListDataSearch"></noData>
		<el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandStatus" :expand-row-keys="returnId" :row-key="getRowKeys" @expand-change="changeExpand" ref="tableConList" height="500">
			<el-table-column type="expand">
				<template slot-scope="props">
					<div style="width:90%;float:left;font-size:13px;padding:10px 0 10px 45px;">
						<div v-if="expendShowConfig[props.row.status.key]=='loadExtend'" style="margin:10px 0;">
							<el-row style="margin-top:5px;">
								<el-col :span="4">
									订单号: {{props.row.delivery_order.order_number}}
								</el-col>
								<el-col :span="4">
									液厂地址: <span v-if="props.row.delivery_order.fluid_address&&props.row.delivery_order.fluid_address.length<10">{{props.row.delivery_order.fluid_address}}</span>
									<el-tooltip v-else class="item" effect="light" :content="props.row.delivery_order.fluid_address" placement="top-start">
										<span>{{props.row.delivery_order.fluid_address.slice(0,8)}}....</span>
									</el-tooltip>
								</el-col>
								<el-col :span="4">
									实际液厂: <span v-if="props.row.delivery_order.actual_fluid_name&&props.row.delivery_order.actual_fluid_name.length<10">{{props.row.delivery_order.actual_fluid_name}}</span>
									<el-tooltip v-else class="item" effect="light" :content="props.row.delivery_order.actual_fluid_name" placement="top-start">
										<span>{{props.row.delivery_order.actual_fluid_name.slice(0,8)}}....</span>
									</el-tooltip>
								</el-col>
								<el-col :span="4">
									车号: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
									<span v-else>无</span>
								</el-col>
								<el-col :span="4">
									主驾: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span>
								</el-col>
								<el-col :span="4">
									主驾电话: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
								</el-col>
							</el-row>
							<el-row style="margin-top:20px;">
								<el-col :span="4">
									卸货区域:
								</el-col>
								<el-col :span="4">
									供应商: <span v-if="props.row.delivery_order.trader.length<10">{{props.row.delivery_order.trader}}</span>
									<el-tooltip v-else class="item" effect="light" :content="props.row.delivery_order.trader" placement="top-start">
										<span>{{props.row.delivery_order.trader.slice(0,8)}}....</span>
									</el-tooltip>
								</el-col>
								<el-col :span="4">
									采购价: {{props.row.delivery_order.unit_price}}
									</el-tooltip>
								</el-col>
								<el-col :span="4">
									挂车号: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.semitrailer">{{props.row.transPowerInfo.semitrailer.plate_number}}</span>
									<span v-else>无</span>
								</el-col>
								<el-col :span="4">
									车队: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.group&&props.row.transPowerInfo.group.group_name">{{props.row.transPowerInfo.group.group_name}}</span>
								</el-col>
							</el-row>
						</div>
						<div v-if="expendShowConfig[props.row.status.key]=='matchExtend'">
							<el-row style="margin:5px 0;" :gutter="20">
								<el-col :span="4">
									液厂: <span v-if="props.row.delivery_order.fluid&&props.row.delivery_order.fluid.length<10">{{props.row.delivery_order.fluid}}</span>
									<el-tooltip v-else class="item" effect="light" :content="props.row.delivery_order.fluid" placement="top-start">
										<span>{{props.row.delivery_order.fluid.slice(0,8)}}....</span>
									</el-tooltip>
								</el-col>
								<el-col :span="4" class="whiteSpan">
									计划装车时间:
									<el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.delivery_order.plan_time" placement="top-start" v-if="props.row.delivery_order&&props.row.delivery_order.plan_time">
										<span>{{props.row.delivery_order.plan_time}}</span>
									</el-tooltip>
									<span v-else>无</span>
								</el-col>
								<el-col :span="4" class="whiteSpan">
			                  实际到厂时间:
			                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_time">
			                      <div slot="content" style="width:180px;">
			                        <el-row>
			                          <el-col>原数据:{{props.row.pick_active_time}}</el-col>
			                          <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_time">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_time}}</el-col>
			                        </el-row>
			                      </div>
			                      <span v-if="props.row.pick_active_time">{{props.row.pick_active_time}}<img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
			                    <span v-else>无<img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
			                  </el-tooltip>
			                  <span v-else>{{props.row.pick_active_time}}</span>
			                </el-col>
							<el-col :span="4" class="whiteSpan">
			                  实际装车吨位: 
			                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage">
			                      <div slot="content" style="width:120px;">
			                        <el-row>
			                          <el-col>原数据:{{props.row.pick_active_tonnage}}吨</el-col>
			                          <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage}}吨</el-col>
			                        </el-row>
			                      </div>
			                    <span v-if="props.row.pick_active_tonnage">{{props.row.pick_active_tonnage}}<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showPound(props.row)">(磅)</a> <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
			                    <span v-else>无<img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
			                  </el-tooltip>
			                  <span v-else>{{props.row.pick_active_tonnage}}吨<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showPound(props.row)">(磅)</a></span>
			                </el-col>
								<el-col :span="4">
									主车: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.group&&props.row.transPowerInfo.group.group_name">{{props.row.transPowerInfo.group.group_name}}</span>
								</el-col>
								<el-col :span="4">
									主驾: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
								</el-col>
							</el-row>
							<el-row v-for="(Uitem,Uindex) in props.row.unload_trips" style="position:relative;margin:10px 0 0 0;" :gutter="20">
								<el-col :span="4" style="position:absolute;left:-20px;"><span>{{Uindex+1}}.</span></el-col>
								<el-col :span="4" class="whiteSpan"><span>卸货站:{{Uitem.business_order.station}}</span></el-col>
								<el-col :span="4" class="whiteSpan">卸货地址:<span v-if="Uitem.business_order.station_address.length<10">{{Uitem.business_order.station_address}}</span>
									<el-tooltip v-else class="item" effect="light" :content="Uitem.business_order.station_address" placement="top-start">
										<span>{{Uitem.business_order.station_address.slice(0,8)}}....</span>
									</el-tooltip>
								</el-col>
								<el-col :span="4" class="whiteSpan">计划到站时间:{{Uitem.business_order.plan_arrive_time}}</el-col>
								<el-col :span="4" class="whiteSpan">计划卸车:{{Uitem.business_order.plan_tonnage}}吨</el-col>
								<el-col :span="8" class="whiteSpan">收货人:{{Uitem.business_order.consignee}}／{{Uitem.business_order.consignee_phone}}</el-col>
							</el-row>
						</div>
						<div v-if="expendShowConfig[props.row.status.key]=='unloadExtend'">
							<el-row style="margin-top:5px;" :gutter="20">
								<el-col :span="4">
									液厂: <span v-if="props.row.delivery_order.fluid&&props.row.delivery_order.fluid.length<10">{{props.row.delivery_order.fluid}}</span>
								</el-col>
								<el-col :span="4" class="whiteSpan">
					                  实际到厂时间:
					                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_time">
					                      <div slot="content" style="width:180px;">
					                        <el-row>
					                          <el-col>原数据:{{props.row.pick_active_time}}</el-col>
					                          <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_time">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_time}}</el-col>
					                        </el-row>
					                      </div>
					                      <span v-if="props.row.pick_active_time">{{props.row.pick_active_time}}<img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                    <span v-else>无<img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                  </el-tooltip>
					                  <span v-else>{{props.row.pick_active_time}}</span>
					                </el-col>
					                <el-col :span="4" class="whiteSpan">
					                  实际装车吨位: 
					                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage">
					                      <div slot="content" style="width:120px;">
					                        <el-row>
					                          <el-col>原数据:{{props.row.pick_active_tonnage}}吨</el-col>
					                          <el-col v-if="props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage">新数据:{{props.row.pickup_trip&&props.row.pickup_trip.last_active_tonnage}}吨</el-col>
					                        </el-row>
					                      </div>
					                    <span v-if="props.row.pick_active_tonnage">{{props.row.pick_active_tonnage}}吨<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showPound(props.row)">(磅)</a> <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                    <span v-else>无<img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                  </el-tooltip>
					                  <span v-else>{{props.row.pick_active_tonnage}}吨<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showPound(props.row)">(磅)</a></span>
					                </el-col>
								<el-col :span="4">
									车号:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
									<span v-else>无</span>
								</el-col>
								<el-col :span="4">
									主驾: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span> <span style="margin-left:5px;" v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
								</el-col>
								<el-col :span="4">
									车队: <span v-if="props.row.transPowerInfo && props.row.transPowerInfo.group&&props.row.transPowerInfo.group.group_name">{{props.row.transPowerInfo.group.group_name}}</span>
								</el-col>
							</el-row>
							<el-row style="margin-top:20px;" :gutter="20">
								<el-col :span="4">
									卸货站: {{props.row.business_order.station}}
								</el-col>
								<el-col :span="4">
									卸货地: <span v-if="props.row.business_order.station_address.length<10">{{props.row.business_order.station_address}}</span>
									<el-tooltip v-else class="item" effect="light" :content="props.row.business_order.station_address" placement="top-start">
										<span>{{props.row.business_order.station_address.slice(0,8)}}....</span>
									</el-tooltip>
								</el-col>
								<el-col :span="4" class="whiteSpan">
				                  实际卸车吨位: 
				                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.last_actual_quantity">
				                      <div slot="content" style="width:120px;">
				                        <el-row>
				                          <el-col>原数据:{{props.row.active_tonnage}}吨</el-col>
				                          <el-col><span v-if="props.row.last_actual_quantity">新数据:{{props.row.last_actual_quantity}}吨 </span></el-col>
				                        </el-row>
				                      </div>
				                    <span v-if="props.row.active_tonnage">{{props.row.active_tonnage}}吨<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showDownPound(props.row)">(磅)</a> <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span></span>
				                    <span v-else>无 <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span></span>
				                  </el-tooltip>
				                  <span v-else>{{props.row.active_tonnage}}吨<a style="line-height:0px;height:0px;padding-left:0px;color:rgb(64, 158, 255);cursor:pointer" type="text" @click="showDownPound(props.row)">(磅)</a></span>
				                </el-col>
								<el-col :span="4" class="whiteSpan">
									实际卸货时间:
									<el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.work_end_time" placement="top-start" v-if="props.row.work_end_time">
										<span>{{props.row.work_end_time}}</span>
									</el-tooltip>
									<span v-else>无</span>
								</el-col>
								<el-col :span="4" class="whiteSpan">
									实际到站时间:
									<el-tooltip class="item" effect="light" :open-delay="1000" :content="props.row.arrival_time" placement="top-start" v-if="props.row.arrival_time">
										<span>{{props.row.arrival_time}}</span>
									</el-tooltip>
									<span v-else>无</span>
								</el-col>
								<el-col :span="4" class="whiteSpan">
				                  离站时间:
				                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.last_weight_audit_time">
				                      <div slot="content" style="width:180px;">
				                        <el-row>
				                          <el-col>原数据:{{props.row.weight_audit_time}}</el-col>
				                          <el-col><span v-if="props.row.last_weight_audit_time">新数据:{{props.row.last_weight_audit_time}}</span></el-col>
				                        </el-row>
				                      </div>
				                    <span v-if="props.row.weight_audit_time">{{props.row.weight_audit_time}} <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
				                    <span v-else>无 <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
				                  </el-tooltip>
				                  <span v-else>{{props.row.weight_audit_time}}</span>
				                </el-col>
							</el-row>
								<el-row style="margin-top:20px;" :gutter="20">
					                <el-col :span="4" class="whiteSpan" v-if="false">
					                  标准里程: 
					                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.last_standard_mile">
					                      <div slot="content" style="width:120px;">
					                        <el-row>
					                          <el-col>原数据:{{props.row.standard_mile}}km</el-col>
					                          <el-col v-if="props.row.last_standard_mile">新数据:{{props.row.last_standard_mile}}km</el-col>
					                        </el-row>
					                      </div>
					                    <span v-if="props.row.standard_mile">{{props.row.standard_mile}}km <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                    <span v-else>0km <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                  </el-tooltip>
					                 <span v-else>{{props.row.standard_mile}}km</span>
					                </el-col>
					                <el-col :span="4" class="whiteSpan">
					                  实际里程: 
					                  <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="props.row.last_weight_active_mile">
					                      <div slot="content" style="width:120px;">
					                        <el-row>
					                          <el-col>原数据:{{props.row.weight_active_mile}}km</el-col>
					                          <el-col v-if="props.row.last_weight_active_mile">新数据:{{props.row.last_weight_active_mile||'0'}}km</el-col>
					                        </el-row>
					                      </div>
					                    <span v-if="props.row.weight_active_mile">{{props.row.weight_active_mile}}km <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                    <span v-else>无 <img style="margin-left:5px;vertical-align:top" src="@/assets/img/tipGroup_4.png" alt="" ></span>
					                  </el-tooltip>
					                  <span v-else>{{props.row.weight_active_mile}}km</span>
					                </el-col>
								<el-col :span="4">
									收货人: {{props.row.business_order.consignee}}
									</el-tooltip>
								</el-col>
								<el-col :span="4">
									收货人电话: {{props.row.business_order.consignee_phone}}
								</el-col>
								<el-col :span="4">
									下单人: {{props.row.business_order.sale_man_name}}
									</el-tooltip>
								</el-col>
								<el-col :span="4">
									下单人电话: {{props.row.business_order.sale_man_phone}}
								</el-col>
							</el-row>
						</div>
						<div style="clear:both"></div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="运单号" prop="waybill.waybill_number" min-width="150">
				<template slot-scope="props">
					<div :title="props.row.waybill.waybill_number" class="whiteSpan">
						<a style="color:#409EFF" @click="gotoDetalis(props.row)"><span style="cursor:pointer;">运单号:{{props.row.waybill.waybill_number}}</span></a >
				</div>
			</template>
			</el-table-column>
			<el-table-column label="业务单号" prop="" min-width="150" v-if="this.nowHead=='unloadHead'">
				<template slot-scope="props">
					<el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.business_order.order_number" placement="top-start" v-if="props.row.business_order.order_number">
								 <span >{{props.row.business_order.order_number}}</span>
						</el-tooltip>
					 <span v-else>无</span>
				</template>
			</el-table-column>
			<el-table-column label="装车液厂" prop="" min-width="150">
				<template slot-scope="props">
					<span style="color:rgb(97,126,253);font-weight:bold;font-size:13px;">{{props.row.delivery_order.fluid}}</span><i class="el-icon-location primary" @click="showMapDetalis('load',props.row.delivery_order.actual_fluid_id)"></i>
					</template>
			</el-table-column>
			 <el-table-column label="卸货站" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
				<template slot-scope="props">
					<span v-if="props.row.plan_time">{{props.row.business_order.station}}</span><span v-else>无</span>
				</template>
			</el-table-column>
			<el-table-column label="计划装车时间" prop="" min-width="180" v-if="this.nowHead!='unloadHead'">
				<template slot-scope="props">
					<div class="whiteSpan">
						<el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.delivery_order.plan_time" placement="top-start" v-if="props.row.delivery_order&&props.row.delivery_order.plan_time">
								 <span >{{props.row.delivery_order.plan_time}}</span>
						 </el-tooltip>
					 <span v-else>无</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="计划装车吨位" prop="" min-width="150" v-if="this.nowHead=='loadHead'">
				<template slot-scope="props">
					<span v-if="props.row.delivery_order&&props.row.delivery_order.plan_tonnage">{{props.row.delivery_order.plan_tonnage}}吨</span><span v-else>无</span>
				</template>
			</el-table-column>
			<el-table-column label="计划到站时间" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
				<template slot-scope="props">
					<el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.plan_time" placement="top-start" v-if="props.row.plan_time">
								 <span >{{props.row.plan_time}}</span>
						 </el-tooltip>
					 <span v-else>无</span>
				</template>
			</el-table-column>

			<el-table-column label="计划卸车吨位" prop="" min-width="150" v-if="this.nowHead=='unloadHead'">
				<template slot-scope="props">
					<span v-if="props.row.plan_tonnage">{{props.row.plan_tonnage}}吨</span><span v-else>无</span>
				</template>
			</el-table-column>

			<el-table-column label="实际到厂时间" prop="" min-width="180" v-if="this.nowHead!='unloadHead'">
				<template slot-scope="props">
					<el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.pick_active_time" placement="top-start" v-if="props.row.pick_active_time">
								 <span >{{props.row.pick_active_time}}</span>
						 </el-tooltip>
					 <span v-else>无</span>
				</template>
			</el-table-column>
			<el-table-column label="实际装车吨位" prop="" min-width="150" v-if="this.nowHead!='unloadHead'">
				<template slot-scope="props">
					<span v-if="props.row.pick_active_tonnage">{{props.row.pick_active_tonnage}}吨</span><span v-else>无</span>
				</template>
			</el-table-column>

			 <el-table-column label="实际到站时间" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
				<template slot-scope="props">
					<el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.arrival_time" placement="top-start" v-if="props.row.arrival_time">
								 <span >{{props.row.arrival_time}}</span>
						 </el-tooltip>
					 <span v-else>无</span>
				</template>
			</el-table-column>
			<el-table-column label="实际卸车吨位" prop="" min-width="180" v-if="this.nowHead=='unloadHead'">
				<template slot-scope="props">
					<span v-if="props.row.pick_active_time">{{props.row.active_tonnage}}</span><span v-else>无</span>
				</template>
			</el-table-column>
			<el-table-column label="卸车信息" prop="" min-width="150" v-if="this.nowHead=='matchHead'">
			 <template slot-scope="props">
				<el-tooltip class="item" effect="light"  placement="right">
					<div slot="content" style="width:250px;">
						<el-row v-for="(Uitem,Uindex) in props.row.unload_trips" v-bind:class="{unloadList:Uindex!=0}">
							<el-col style="margin-top:10px;">站点:{{Uitem.business_order.station}}</el-col>
							<el-col style="margin-top:10px;" >计划吨位:<span v-if="Uitem.business_order.plan_tonnage">{{Uitem.business_order.plan_tonnage}}吨</span></el-col>
							<el-col style="margin-top:10px;" class="whiteSpan">计划到站时间:{{Uitem.business_order.plan_arrive_time}}</el-col>
						</el-row>
					</div>
					<div class="whiteSpan"><span v-for="(Uitem,Uindex) in props.row.unload_trips"><span v-if="props.row.unload_trips.length>1&&Uindex!=props.row.unload_trips.length-1">{{Uitem.business_order.station}}/</span><span v-else>{{Uitem.business_order.station}}</span></span></div>
				</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column label="车辆信息" prop="" min-width="150">
				<template slot-scope="props">
					<el-tooltip class="item" effect="light"  placement="right">
						<div slot="content" style="width:130px;">
							<el-row>
								<el-col>车号:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
								<span v-else>无</span></el-col>
								<el-col>挂车号:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.semitrailer">{{props.row.transPowerInfo.semitrailer.plate_number}}</span>
								<span v-else>无</span></el-col>
								<el-col>主驾:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.name">{{props.row.transPowerInfo.master_driver.name}}</span>
								<span v-else>无</span></el-col>
								<el-col>主驾电话:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.master_driver&&props.row.transPowerInfo.master_driver.mobile_phone">{{props.row.transPowerInfo.master_driver.mobile_phone}}</span>
								<span v-else>无</span></el-col>
								<el-col>副驾:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.vice_driver&&props.row.transPowerInfo.vice_driver.name">{{props.row.transPowerInfo.vice_driver.name}}</span>
								<span v-else>无</span ></el-col>
								<el-col>押运:<span v-if="props.row.transPowerInfo && props.row.transPowerInfo.escort_staff&&props.row.transPowerInfo.escort_staff.name">{{props.row.transPowerInfo.escort_staff.name}}</span>
								<span v-else>无</span></el-col>
							</el-row>
						</div>
						<span v-if="props.row.transPowerInfo&&props.row.transPowerInfo.tractor">{{props.row.transPowerInfo.tractor.plate_number}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			 <el-table-column label="状态" prop="" min-width="150" >
				<template slot-scope="props">
					<span v-if="props.row.interrupt_status.key=='canceling'||props.row.interrupt_status.key=='modifying'||props.row.interrupt_status.key=='abnormal'">{{props.row.interrupt_status.verbose}}</span>
					<span v-else>{{props.row.status.verbose}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" prop="" width="100" fixed="right">
				<template slot-scope="props">
					<el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key" v-if="props.row.interrupt_status.key=='normal'">
							<el-col v-if="key==0">
								<el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
							</el-col>
						</el-row>
						<el-row v-if="props.row.interrupt_status.key!='normal'" v-for="(item,key) in buttonModyfiyAll[props.row.interrupt_status.key]" :key="key">
							<el-col v-if="key==0">
								<el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
							</el-col>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="提交变更" :visible.sync="changeSatusShow" width="25%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;">
			<el-form class="change_Status" label-width="80px" ref="changeStatusForm" style="width:80%;margin-left:10%">
				<el-form-item label="变更类型:" label-width="80px">
					<el-select v-model="changeStatusParam.changeStatusType" placeholder="请选择变更类型">
						<el-option v-for="(item,key) in changeSatusTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="变更内容:" label-width="80px">
					<el-select v-model="changeStatusParam.changeStatusFied" filterable placeholder="请选择变更类型" v-if="changeStatusParam.changeStatusType=='truck'" v-loading="seletPadding">
						<el-option v-for="(item,key) in changeSatusCarList" :key="key" :label="item.plate_number" :value="item.id"></el-option>
					</el-select>
					<el-select v-model="changeStatusParam.changeStatusFied" placeholder="请选择" v-else filterable>
						<el-option v-for="(item,key) in changeSatusPerList" :key="key" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注:" label-width="80px">
					<el-input type="textarea" :rows="3" v-model="changeStatusParam.changeSatusDesc"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer" style="text-align: center;">
			 <el-button @click="changeSatusShow = false">取 消</el-button>
			 <el-button type="primary" @click="upStatus">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="详细地址" :visible.sync="showMap" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" @open="openDigo">
			<div id="map-container" v-if="showMap"></div>
		</el-dialog>
		<el-dialog :title="surePoundTitle" center :visible.sync="isShowSurePound" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
			<loadingReview :isEdit="isEditSurePound" :surePoundData="choosedListData"></loadingReview>
		</el-dialog>

		<el-dialog :title="sureDownPoundTitle" center :visible.sync="isShowSureDownPound" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg">
			<unloadingReview  :isEdit="isEditSureDownPound" :surePoundData="choosedListData" ></unloadingReview>
		</el-dialog>
	</div>
</template>
<script>
let landmarkMap;
let positionMark;
import noData from '@/components/common/noData';
import loadingReview from '@/components/order/loadingReview';
import unloadingReview from '@/components/order/unloadingReview';

export default {
	name: 'orderFifterList',
	components: {
		noData: noData,
		loadingReview,
		unloadingReview
	},
	data() {
		return {
			lockFalg: false,
			delayTime: 500,
			showMap: false,
			loadPosition: {},
			ListDataSearch:false,
			fifterStatus: ['driver_pending_confirmation', 'to_fluid', 'reach_fluid', 'loading_waiting_audit', 'loading_audit_failed', 'waiting_match', 'confirm_match', 'already_match', 'waiting_seal'],
			buttonModyfiyAll: {
				canceling: [],
				abnormal: [{
					text: "确认变更",
					type: "primary",
					attrPlan: true,
					methods_type: "sureChangeCar",
				}],
				modifying: []
			},
			tableHeadConfig:{
				 'first': [{ key: 'all', value: 'loadHead' }, { key: 'driver_pending_confirmation', value: 'loadHead' }, { key: 'to_fluid', value: 'loadHead' }, { key: 'reach_fluid', value: 'loadHead' }, { key: 'loading_waiting_audit', value: 'loadHead' }, { key: 'loading_audit_failed', value: 'loadHead' }],
				'second': [{ key: 'all', value: 'matchHead' }, { key: 'waiting_match', value: 'matchHead' }, { key: 'confirm_match', value: "matchHead" }, { key: 'already_match', value: 'matchHead' }],
				'third': [{ key: 'all', value: 'unloadHead' }, { key: 'unload_driver_pending_confirmation', value: 'unloadHead' },{ key: 'to_site', value: 'unloadHead' }, { key: 'reach_site', value: 'unloadHead' }, { key: 'unloading_waiting_audit', value: 'unloadHead' }, { key: 'unloading_audit_failed', value: 'unloadHead' }],
				'fourth': [{ key: 'all', value: 'unloadHead' }, { key: 'waiting_settlement', value: 'unloadHead' }, { key: 'in_settlement', value: 'unloadHead' }],
				'fifth': [{ key: 'all', value: 'unloadHead' }, { key: 'canceing', value: 'matchHead' }, { key: 'modifying', value: 'matchHead' }, { key: 'abnormal', value: 'loadHead' }],
				'sxith': [{ key: 'all', value: 'unloadHead' }, { key: 'finished', value: 'unloadHead' }, { key: 'canceled', value: 'unloadHead' }],
				'seven': [{ key: 'all', value: 'unloadHead' }]
			},
			expendShowConfig:{
				'driver_pending_confirmation':'loadExtend',
				'to_fluid':'loadExtend',
				'reach_fluid':'loadExtend',
				'loading_waiting_audit':'loadExtend',
				'loading_audit_failed':'loadExtend',
				'waiting_match':'matchExtend',
				'confirm_match':'matchExtend',
				'already_match':'matchExtend',
				'to_site':'unloadExtend',
				'reach_site':'unloadExtend',
				'unloading_waiting_audit':'unloadExtend',
				'unloading_audit_failed':'unloadExtend',
				'unload_driver_pending_confirmation':'unloadExtend',
				'waiting_seal':'loadExtend',
				'waiting_settlement':'unloadExtend',
				'in_settlement':'unloadExtend',
				'canceing':'matchExtend',
				'modifying':'matchExtend',
				'abnormal':'loadExtend',
				'finished':'unloadExtend',
				'canceled':'loadExtend'
			},
			buttonAll: {
				//装车
				driver_pending_confirmation: [{ //司机未确认
					text: "取消运单",
					type: "danger",
					methods_type: "cancleOrder",
					attrPlan: true
				}],
				to_fluid: [{
					text: "取消运单",
					type: "danger",
					methods_type: "cancleOrder", //前往装车
					attrPlan: true
				}],
				reach_fluid: [{ //已到装货地
					text: "取消运单",
					type: "danger",
					methods_type: "cancleOrder",
					attrPlan: true
				}],
				waiting_seal:[{ //待上传铅封
					text: "取消运单",
					type: "danger",
					methods_type: "cancleOrder",
					attrPlan: true
				}],
				loading_waiting_audit:[{ //已装车待审核
					text: "取消运单",
					type: "danger",
					methods_type: "cancleOrder",
					attrPlan: true
				}],
				//匹配卸车
				waiting_match: [{ //待匹配卸货单
					text: "匹配卸货单",
					type: "primary",
					methods_type: "matchUnload",
					attrPlan: true
				}],
				confirm_match:[{ //待匹配卸货单
					text: "查看卸货地",
					type: "success",
					methods_type: "sureUnload",
					attrPlan: true
				}],
				already_match: [{ //已匹配卸货单
					text: "变更卸货单",
					type: "primary",
					methods_type: "changeUnload",
				}],
				//卸车
				// to_site: [{ //前往卸货地
				//   text: "变更卸货单",
				//   type: "primary",
				//   methods_type: "changeUnload",
				// }],
				// reach_site: [{ //已到卸货地
				//   text: "变更卸货单",
				//   type: "primary",
				//   methods_type: "changeUnload",
				// }],
				//历史
				finished: [{ //已完成
					text: "查看详情",
					type: "primary",
					methods_type: "showDetalis",
				}],
				canceled: [{ //已取消
					text: "查看详情",
					type: "primary",
					methods_type: "showDetalis",
				}]
			},
			changeSatusShow: false,
			changeStatusParam: {
				changeStatusType: "",
				changeStatusFied: "",
				changeSatusDesc: "",
				sectiontrip: ""
			},
			changeSatusTypeSelect: [
				{ key: 'truck', verbose: "车辆故障需替换" },
				{ key: 'master_driver', verbose: "驾驶员更换" },
				{ key: 'copilot_driver', verbose: "押运员更换" },
				{ key: 'supercargo_driver', verbose: "副驾驶更换" }
			],
			changeSatusCarList: [],
			changeSatusPerList: [],
			seletPadding: false,
			returnId:[],
			isShowSurePound:false,
			surePoundTitle:'装车磅单审核通过',
			isEditSurePound:true,
			isShowSureDownPound:false,
			sureDownPoundTitle:'卸车磅单审核通过',
			isEditSureDownPound:true,
			choosedListData:{},
		};
	},
	props: ['ListData','firstMenu','secondMenu','expandStatus'],
	computed: {
		nowHead:function(){
			var returnHead="";
			this.tableHeadConfig[this.firstMenu].forEach((item)=>{
				if(item.key==this.secondMenu){
					returnHead=item.value;
				}
			});
			return returnHead;
		}
	},
	mounted() {

	},
	methods: {
		showPound:function(rowData){

			let rowDataCopy = Object.assign({},rowData);

			if(rowDataCopy && rowDataCopy.section_type && rowDataCopy.section_type.key && rowDataCopy.section_type.key ==='unload'){
				rowDataCopy.weight_note = rowDataCopy.pickup_weight_note;
				rowDataCopy.active_time = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.active_time || rowDataCopy.active_time;
				rowDataCopy.work_start_time = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.work_start_time || rowDataCopy.work_start_time;
				rowDataCopy.work_end_time = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.work_end_time || rowDataCopy.work_end_time;
				rowDataCopy.gross_weight = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.gross_weight || rowDataCopy.gross_weight;
				rowDataCopy.tare_weight = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.tare_weight || rowDataCopy.tare_weight;
				rowDataCopy.net_weight = rowDataCopy.pickup_trip && rowDataCopy.pickup_trip.net_weight || rowDataCopy.net_weight;
				rowDataCopy.carseal = rowDataCopy.pickup_carseal || rowDataCopy.carseal;
			}

			this.isShowSurePound = true;

			this.choosedListData = rowDataCopy;

			this.surePoundTitle = '查看装车磅单'

			this.isEditSurePound = false;
		},
		showDownPound:function(rowData){

			this.isShowSureDownPound = true;

			this.choosedListData = rowData;

			this.sureDownPoundTitle = '查看卸车车磅单'

			this.isEditSureDownPound = false;
		},
		expandArr: function() {
			if(this.expandStatus){
				this.returnId=[];
				this.ListData.forEach((item)=>{
					this.returnId.push(item.id);
				});
			}else{
				this.returnId=[];
			}
		},
		gotoDetalis: function(rowData) {
			this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/${rowData.id}/${rowData.waybill.id}` });
		},
		SpanMethod: function({ row, column, rowIndex, columnIndex }) {

		},
		upStatus: function() {
			var sendData = {};
			var vm = this;
			sendData.content = this.changeStatusParam.changeStatusFied;
			sendData.change_type = this.changeStatusParam.changeStatusType;
			sendData.desc = this.changeStatusParam.changeSatusDesc;
			sendData.sectiontrip = this.changeStatusParam.sectiontrip;
			this.$$http("upStatus", sendData).then((results) => {
				//vm.$emit("changeTabs", 'fifth');
				//vm.changeSatusShow = false;
			})
		},
		getRowKeys: function(row) {
			return row.id;
		},
		showMapDetalis: function(type, id) {
			var vm = this;
			if (type == "load") {
				this.$$http('getFulidDetalis', { id: id }).then((results) => {
					if (results.data.code == 0) {
						vm.showMap = true;
						var pointObj = results.data.data;
						vm.loadPosition.longitude = pointObj.coordinate.longitude;
						vm.loadPosition.latitude = pointObj.coordinate.latitude;
						vm.loadPosition.position = pointObj.coordinate.address;
						//vm.openDigo(pointObj.coordinate);
					}
				}).catch(() => {

				});
			} else if (type == "unload") {
				this.$$http('getStationDetalis', { id: id }).then((results) => {
					if (results.data.code == 0) {
						vm.showMap = true;
						var pointObj = results.data.data;
						vm.loadPosition.longitude = pointObj.location.longitude;
						vm.loadPosition.latitude = pointObj.location.latitude;
						vm.loadPosition.position = pointObj.address;
						//vm.openDigo(pointObj.coordinate);
					}
				}).catch(() => {

				});
			}
		},
		openDigo: function(obj) {
			var vm = this;
			setTimeout(() => {
				landmarkMap = new AMap.Map('map-container', {
					zoom: 10,
				});
				// /*创建点标记*/
				positionMark = new AMap.Marker({
					map: landmarkMap,
				});
				positionMark.setLabel({
					content: vm.loadPosition.position,
					offset: new AMap.Pixel(30, 0)
				});
				let lnglat = [vm.loadPosition.longitude, vm.loadPosition.latitude];
				landmarkMap.setCenter(lnglat);
				positionMark.setPosition(lnglat);
			}, 100);
		},
		changeExpand: function(row, expandedRows) {
			// var vm = this;
			// if (row.transPowerInfo) {} else {
			//   var sendData = {};
			//   sendData.tractor_list = [row.capacity];
			//   vm.$$http("getTransPowerInfo", sendData).then((transPowerInfo) => {
			//     if (transPowerInfo.data.code == 0) {
			//       row.transPowerInfo = transPowerInfo.data.data.results[0];
			//       //vm.ListData[1].transPowerInfo=transPowerInfo.data.data.results[0];
			//     }
			//   }).catch((err) => {
			//     console.log('errs',err);
			//   });
			// }
		},
		operation: function(type, rowData) {
			var vm = this;
			var sendData = {};
			if (type == 'cancleOrder') { //取消运单
				sendData.id = rowData.id;
				sendData.status = "canceled";
				this.$confirm('取消运单后,系统将通知驾驶员,是否确认', '确认取消运单', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					vm.$$http("changeStatusSection", sendData).then((results) => {
						if (results.data.code == 0) {
							vm.$message({
								type: "success",
								message: "取消运单成功",
							});
							vm.$emit("chiledchangeTabs", { first: 'first', second: "all" });
							vm.$emit('searchList');
						} else {
							vm.$message.error(results.data.msg);
						}
					})

				}).catch((err) => {

				});
			} else if (type == 'matchUnload') { //匹配卸货单
				this.$router.push({ path: `/consignmentCenter/consignmentOrders/matchLoadPlan/unloadPlanList/${rowData.waybill
.id}/${rowData.id}` });
			} else if (type == 'upUnload') { //提交卸货单

			} else if (type == 'changeUnload') { //变更卸货单
				this.$router.push({ path: `/consignmentCenter/consignmentOrders/matchLoadPlan/unloadPlanList/${rowData.waybill
.id}/${rowData.id}` });
			} else if (type == 'showDetalis') { //查看详情
				this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/${rowData.id}/${rowData.waybill.id}` });
			} else if (type == 'sureDownOrder') {
				this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
			} else if (type == 'sureChangeCar') {
				this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
			} else if (type=='sureUnload') {
				this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
			}
		},

		changeSatusBox: function(rowData) {
			//判断各种数据弹窗
			this.changeSatusShow = true;
		}
	},
	created() {
		if(this.expandStatus){
			this.ListData.forEach((item)=>{
				this.returnId.push(item.id)
			});
		}
	},
	watch: {
		changeStatusParam: {
			handler(val, oldVal) {
				var sendData = {};
				var vm = this;
				if (val.changeStatusType == 'truck' && this.changeSatusCarList.length == 0) {
					sendData.pagination = false;
					this.seletPadding = true;
					this.$$http("searchHeadCarList", sendData).then((results) => {
						vm.seletPadding = false;
						if (results.data.code == 0) {
							vm.changeSatusCarList = results.data.data;
						}
					}).catch((err) => {
						vm.seletPadding = false;

					});
				}
				if (val.changeStatusType != 'truck' && this.changeSatusPerList.length == 0) {
					sendData.pagination = false;
					this.seletPadding = true;
					this.$$http("getDriversList", sendData).then((results) => {
						vm.seletPadding = false;
						if (results.data.code == 0) {
							vm.changeSatusPerList = results.data.data;
						}

					}).catch((err) => {
						vm.seletPadding = false;

					});
				}
			},
			deep: true　
		},
		ListData: {
			handler(newValue, oldValue) {
				this.expandArr();
				setTimeout(()=>{
					this.ListDataSearch=true;
				})
			},
			deep: true
		},
		expandStatus:{
			handler(val, oldVal) {
				setTimeout(()=>{
					this.expandArr();
				})
			},
		}
	}
}

</script>
