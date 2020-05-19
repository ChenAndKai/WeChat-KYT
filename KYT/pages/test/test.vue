<template>	
	<view class="content">
		<test-item :show='show' v-on:pConfirm="confirm"></test-item>	
		<view class="top_first" v-show="firstFlag">
			<cmd-circle type="circle" :percent="100" stroke-color="#E2E2E2" :stroke-width="20" :width="width" :showInfo="false"></cmd-circle>
			<view class="first_text">
				<view>You haven't take any tests yet</view>
			</view>
		</view>
		<view class="top_score" v-show="!firstFlag">
			<cmd-circle type="circle" :percent="averageScore"  stroke-color="#4CD964" :stroke-width="20" :width="width" :showInfo="false"></cmd-circle>
			<view class="score_text">
				<view>You've got</view>
				<view class="score">{{averageScore}}</view>
				<view>Average Score</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="testButton" @click="gotoTest()">
			Start a new Test
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data: function() {
			return {
				firstFlag: false,
				score: [],
				width: 0,
				averageScore: 0,
				show: false,
			}
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: (res) => {
					this.width = res.windowWidth-30;
				}
			})
			this.getScoreFromStorage();
			this.$member.percent = 0;
		},
		methods: {
			gotoTest: function() {
				// this.show = true;
				this.$member.finishFlag = false;
				this.$member.initWrongList();
				let typeIndex =  Math.floor((Math.random() * 3));
				uni.redirectTo({
					url: 'testType?typeIndex=' + typeIndex,
				})
			},
			confirm: function(n) {
				// this.$member.setTestItemCount(n.length);
				// this.show = false;
				// this.$member.finishFlag = false;
				// this.$member.initWrongList();
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
						this.$member.setScore(tempScore);
						this.$member.setCount(res.data[0]);
						for(let i = 0;i<res.data[1].length;i++) {
							sum += res.data[1][i];
						}
						this.averageScore = (sum / res.data[0]).toFixed(0);
				   },
				   fail: (err) => {
						this.firstFlag = true;
						this.$member.score = [0];
				   }
				});
			}
		},
	}
	
</script>

<style>
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
