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
				percent: this.$member.percent+10,
			}
		},
		methods: {
			shutDown: function() {
				uni.showModal({
					title: 'Exit test?',
					content: 'Your progress will be lost\r\n if you exit now!',
					showCancel: true,
					cancelText: 'Not Now',
					cancelColor: '#007AFF',
					confirmText: 'Exit',
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
