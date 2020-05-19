<template>
	<view >
		<navigator class=".container-plus" :url="'../addNewMember/addNewMember?teamMembers='+ encodeURIComponent(JSON.stringify(this.teamMembersInfo))">
			<uni-icons type="plusempty" size="30" color="#1a87ff" class="mode-plus" ></uni-icons>
		</navigator>
		<view  v-for="(item,index) in teamMembersInfo" >		
			<navigator :url="'../memberDetail/memberDetail?teamMembers='+ encodeURIComponent(JSON.stringify(this.teamMembersInfo))+'&englishName='+item.englishName " class="mod-item">
				<view class="mod-img" style="mode-member-image-show">
					<image :src="item.img" class="mode-image" ></image>
					<text class="member-mod-show">{{item.englishName}}</text>  
				</view>
			</navigator>
		</view>	
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				teamMembersInfo: [],		
			}
		},
		methods: {
			getDataFromStorage: function() {				
				uni.getStorage({
					key: 'member',
					success: (res) => {
						let obj = JSON.parse(res.data);
						this.teamMembersInfo = obj;
					}
				});
			},
		},
		onShow: function() {
			this.getDataFromStorage();
		},	
		components: {uniIcons}
	}
</script>
	
<style>
	.mode-plus {
		align-items: baseline;
		float: right; 
	}
	.container-plus {
		width: 100%;
		display: flex;
		flex-direction: row-reverse;
	}
	.mod-plus-view {
		width: 100%;
	}
	.mod-item {
	 width:46%;
	 height: 400rpx;
	 float: left;
	 margin-left:20rpx;
	 margin-top:40rpx;
	 position: relative;
	}
	.mod-img {
	  width:100%;
	  height:400rpx;
	} 
	image {
		border-radius: 30rpx;
		width: 50rpx;
		height:100rpx;
	}
	.member-mod-show{
		height: 20%; 
		position: absolute; 
		bottom: 0; left: 0; 
		width: 100%; 
		background-color: rgba(255,255,255,0.6);
		text-align: center;
	}
	.mode-image{
		width: 100%; height: 100%;
	}
	.mode-member-image-show{
		position: relative;
		text-align: center;
	}
</style>
