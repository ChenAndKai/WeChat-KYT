<template>
	<view class="content">		
		<view class="language-box">
			<view class="selectItem">
				<li v-for="(item,index) in options" :class="{'select': selectIndex === index}"  @tap="selectOne(index)">
					{{ item }}
				</li>
			</view>
		</view>
		<button class="button" @click="confirm"><text>{{config.button}}</text></button>
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				selectIndex: 0,
				options: ['English','中 文'],
			}
		},
		computed: {
		    config () {  
		      return this.$t('config')  
		    }  
		},
		onShow: function() {
			this.getLastLanguageStorage();
			this.$setBar.setNavigationBar(this.$t('config.navigationBarTitleText'));	
		},
		methods: {
			getLastLanguageStorage: function() {
				if(this.$t('config.language') === "English") {
					this.selectIndex = 0;
				}
				else {
					this.selectIndex = 1;
				}
			},
			selectOne: function(index) {
				this.selectIndex = index;
			},
			confirm: function() {
				const system_info = uni.getStorageSync('system_info')
				if(this.selectIndex === 0) {
					system_info.language = this._i18n.locale = 'en'
				}
				else {
					system_info.language = this._i18n.locale = 'zh_CN'
				}
				uni.showToast({
					title: this.$t('config.title'),
					duration: 1500,
				});
				setTimeout(
					function(){
						uni.switchTab({
							url: '../index/listInfo',
						})
					}
				,1500);
				this.$setBar.setTabBar(this.$t('test.tabBarText'),this.$t('listInfo.tabBarText'),this.$t('config.tabBarText'));
				this.$setBar.setNavigationBar(this.$t('config.navigationBarTitleText'));	
				uni.setStorageSync('system_info', system_info);
			},
		}
	}
</script>

<style>
	.content {
		display: flex; 
		flex-direction: column; 
		align-items: center;
	}
	.selectItem {
		margin-bottom: 40rpx;
	}
	.selectItem li{
		width: 650rpx;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #EEEEEE;
		text-align: center;
		margin-top: 50rpx;
		border-radius:15rpx;	
		font-size: 40rpx;
		color: #007AFF;
	}
	.selectItem .select {
		background-color: white;
		width: 650rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 50rpx;
		text-align: center;
		border-radius:15rpx;	
		font-size: 40rpx;
		color: #007AFF;		
		box-shadow: 0 6rpx 10rpx rgba(0,0,0,0.5);
	}
	.button {
		background-color: #4CD964;
		margin: 35rpx;
		width: 650rpx;
		border-radius:25rpx;
	} 
	.button text {
		line-height: 95rpx; 
		text-align: center;
		color: #E9F3FF;
	}
</style>
