<template name="page-head" >
	<view class="top">
		<image class="icon-box" src="../static/close.png" @click="shutDown()"></image>		
		<view class="progress-box" >
			<cmd-progress :percent="percent" class="progress" :showInfo="false"></cmd-progress>
		</view>			
	</view>	
</template>
<script>
	export default {
		name: "page-head",
		data: function() {
			return {
				percent: this.$common.percent+10,
			}
		},
		methods: {
			shutDown: function() {
				uni.showModal({
					title: this.$t('testType.exitPopUp.title'),
					content: this.$t('testType.exitPopUp.content'),
					cancelText: this.$t('testType.exitPopUp.leftButton'),
					cancelColor: '#007AFF',
					confirmText: this.$t('testType.exitPopUp.rightButton'),
					confirmColor: '#FF464F',
					success: (res) => {
						if (res.confirm) {
							uni.switchTab({
							    url: 'test',
							});
						} 
					}
				})	
			},			
		},
	}
</script>

<style>
	.top {
		width: 100vw;
		height: auto;
		display: flex; 
		flex-direction: row; 
	}
	.icon-box {
		width: 90rpx;
		height: 90rpx;
		margin-left: 10rpx;
	}
	.progress-box {		
		margin-left: 25rpx;
		height: 10rpx; 
		width: 80%;
		margin-top: 30rpx;
	}
</style>
