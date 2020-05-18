<template name="page-foot"> 
	<view class="information-box" :style="{color:color,backgroundColor:bgColor}">
		<text>{{resultInfo}}</text> 
		<view class="check-box"  @click="checkAndContinue()">			
			<view :class="{'checked': selectIndex !== -1}" :style="{backgroundColor:checkColor}">{{checkBoxText}}</view>
		</view>
	</view>	
</template>

<script>
	export default {
		name: 'page-foot',
		props: {
			bgColor: '',
			color: '',
			checkColor: '',
			checkBoxText: {
				type: String,
				default: "Check",
			},
			selectIndex: '',
			resultInfo: '',		
		},
		methods: {	 
			checkAndContinue: function() {	
				this.$emit("pCheck");
			}
		},
	}
</script>

<style>
	.check-box {
		background-color: #EEEEEE;
		margin: 35rpx;
		width: 650rpx;
		height: 95rpx;
		line-height: 95rpx; 
		border-radius:25rpx;
		text-align: center;
		color: #007AFF;
	}
	.check-box .checked {
		color: #FFF;		
		border-radius:25rpx;
		background-color: #F7C7C7;
	}
	.information-box {
		height: 250rpx;
	}
	.information-box text {
		margin-top: 20rpx;
		margin-left: 50rpx;
		font-size: 50rpx;
		line-height: 40rpx;
	}
</style>
