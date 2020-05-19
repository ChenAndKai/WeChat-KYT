<template>
	<view>
		<image src="../../static/delete.png" class="delIcon" @click="delMember"></image>
		<navigator class="container-edit" :url="'../memberEdit/memberEdit?englishName='+englishName+'&chineseName='+chineseName+'&img='+img+'&birthday='+birthday">
			<uni-icons type="compose" size="30" color="#1a87ff" class="edit" ></uni-icons>
		</navigator>
		<view class="container">
			<image class="mode-avtor":src="img" mode="scaleToFill"></image>
		</view>
		<view class="mode-input">
			English Name:	{{englishName}}
		</view>
		<view class="mode-input">
			Chinese Name:	{{chineseName}}
		</view>
		<view class="mode-input">
			Bithday:	{{birthday}}
		</view>
		<view class="blank"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				englishName: '',
				chineseName: '',
				teamMembersInfo: '',
				img: '',
				index: 0,
				birthday: '',
			}
		},
		onLoad:function(option){
			this.englishName = option.englishName;
			let teamMembersInfo = JSON.parse(decodeURIComponent(option.teamMembers));
			this.teamMembersInfo = teamMembersInfo;
			for(let i = 0; i < teamMembersInfo.length; i++) {
				if(teamMembersInfo[i].englishName === this.englishName) {
					this.img = teamMembersInfo[i].img;
					this.chineseName = teamMembersInfo[i].chineseName;
					this.birthday = teamMembersInfo[i].birthday;
					this.index = i;
					break;
				}
			}
			uni.setNavigationBarTitle({
				title:this.englishName
			})
		}, 
		methods: {
			delMember: function() {
				uni.showModal({
					title: 'Attention',
					content: 'Be sure to delete the member information',					
					cancelText: 'Eixt',
					confirmText: 'Confirm',
					confirmColor: '#007AFF',
					cancelColor: '#FF464F',
					success: (res) => {
						if(res.confirm) {							
							let data = JSON.stringify(this.delOneElement());
							uni.setStorage({
								key: 'member',
								data: data,
								success:function(){
								    uni.switchTab({
								    url: '../index/listInfo',
									});
								}				
							})
						} 
					},				
				})				
			},
			delOneElement: function() {
				let array = [];
				for(let i = 0; i < this.teamMembersInfo.length; i++) {
					if(this.teamMembersInfo[i].englishName !== this.englishName) {
						array.push(this.teamMembersInfo[i]);
					}
				}
				return array;
			}
		}
	}
</script>

<style>
	.delIcon {
		align-items: baseline;
		float: left;
		width: 35px;
		height: 50rpx;
		margin: 2rpx auto auto 5rpx;
	}
	.edit {
		align-items: baseline;
		float: right; 
	}
	.container {
		width: 90%;
		margin-left:5%;
		
	}
	.mode-avtor {
			border-radius: 30rpx;
			width: 90%;
			margin-left: 5%;
			height: 880rpx;
	}
	.nameStyle {
		 text-align: center;
	}
	.container-edit {
		display: flex;
		flex-direction: row-reverse;
	}
	.mode-input {
		border-style: hidden hidden solid hidden;
		border-color: #f2f2f2;
		width: 80%;
		margin-left: 10%;
		color: #cacaca;
		position: relative;
		margin-top: 50rpx;
	}
</style>
