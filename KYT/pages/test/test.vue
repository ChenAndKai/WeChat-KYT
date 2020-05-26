<template>	
	<view class="content">
		<test-item :show='show' v-on:pConfirm="confirm"></test-item>	
		<view class="top_first" v-show="firstFlag">
			<cmd-circle type="circle" :percent="100" stroke-color="#E2E2E2" :stroke-width="20" :width="width" :showInfo="false"></cmd-circle>
			<view class="first_text">
				<view>{{test.firstContent}}</view>
			</view>
		</view>
		<view class="top_score" v-show="!firstFlag">
			<cmd-circle type="circle" :percent="averageScore"  stroke-color="#4CD964" :stroke-width="20" :width="width" :showInfo="false"></cmd-circle>
			<view class="score_text">
				<view>{{test.infoOne}}</view>
				<view class="score">{{averageScore}}</view>
				<view>{{test.infoTwo}}</view>
			</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
		<view class="blank"></view>
		<view class="testButton" @click="gotoTest()">
			{{test.button}}
		</view>
	</view>
	
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaLineA=null;
	export default {
		data: function() {
			return {
				firstFlag: false,
				score: [],
				width: 0,
				averageScore: 0,
				show: false,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				score: [],
				count: [],

			}
		},
		computed: {
			test () {
				return this.$t('test');  
			},
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: (res) => {
					this.width = res.windowWidth-30;
				}
			})
			this.getScoreFromStorage();
			this.$common.percent = 0;
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			uni.getStorage({
				key:"score",
				success:(res) => {
					this.score = res.data[1];
					var res =[];
					for(var i = 0;i < this.score.length; i++){
						res.push(i+1);
					}
					this.count = res;
				}
			});

		},
		onShow: function() {
			this.$setBar.setNavigationBar(this.$t('test.navigationBarTitleText'));	
			this.showCharts();
		},
		onReady() {
			this.showCharts();
		},
		methods: {
			gotoTest: function() {
				// this.show = true;
				this.$common.finishFlag = false;
				this.$common.initWrongList();
				let typeIndex =  Math.floor((Math.random() * 3));
				uni.redirectTo({
					url: 'testType?typeIndex=' + typeIndex,
				})
			},
			confirm: function(n) {
				// this.$common.setTestItemCount(n.length);
				// this.show = false;
				// this.$common.finishFlag = false;
				// this.$common.initWrongList();
				// let typeIndex =  Math.floor((Math.random() * 3));
				// uni.redirectTo({
				// 	url: 'testType?typeIndex=' + typeIndex,
				// })
			},
			getScoreFromStorage: function() {
				let sum = 0;
				uni.getStorage({
					key: 'score',
					success: (res) => {		
						let tempScore = res.data[1];
						tempScore[tempScore.length] = 0;
						this.$common.setScore(tempScore);
						this.$common.setCount(res.data[0]);
						for(let i = 0;i<res.data[1].length;i++) {
							sum += res.data[1][i];
						}
						this.averageScore = (sum / res.data[0]).toFixed(0);
				   },
				   fail: (err) => {
						this.firstFlag = true;
						this.$common.score = [0];
				   }
				});
			},
			showCharts: function() {
				let LineA = {categories:[],series:[]};
				LineA.categories = this.count;
				var temp = {
					name: this.$t('test.nickName'),
					color: "#1890ff",
					data: this.score,
					index: 0,
					pointShape: "circle",
					show: true,
					type: "line"
				}
				LineA.series.push(temp);
				this.showLineA("canvasLineA",LineA);
			},
			showLineA: function(canvasId,chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {show:true},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: 100,
						format: (val)=>{return val.toFixed(0)+''}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});
				
			},
			touchLineA: function(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return item.name + ':' + item.data 
					}
				});
			}
		}
	}
	
</script>

<style>
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.content {
		width: auto;
		min-height: 100vh;
		display: flex; 
		flex-direction: column; 
		align-items: center;
	}
	.top_first {
		display: flex;
		justify-content: center;
		position: relative;

	}
	.top_first .first_text {
		position: absolute;
		text-align: center;
		color: #717070;
		top: 39%;
		font-size: 45rpx;
		font-weight: bold;
		width: 70%;
	}
	.top_score {
		display: flex;
		justify-content: center;
		position: relative;
	
	}
	.top_score .score_text {
		position: absolute;
		text-align: center;
		top: 25%;
		font-size:40rpx;
		font-weight: bold;
	}
	.top_score .score_text .score {
		font-size:200rpx;
		line-height: 1;
		padding-bottom: 23rpx;
		padding-top: 23rpx;
		color: #4CD964;
	}
	.blank {
		flex: 1;
	}
	.testButton {
		width: 80%;
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 70rpx;
		background-color: #118cff;
		border-radius: 15rpx;
		text-align: center;
		color: #FFF;
	}
	
</style>
