<template>
	<view>
		<navigator class="container-edit" :url="'../memberEdit/memberEdit?englishName='+englishName+'&chineseName='+chineseName+'&img='+img">
			<uni-icons type="compose" size="30" color="#1a87ff" class="edit" ></uni-icons>
		</navigator>
		<view class="container">
			<image class="mode-avtor":src="img" mode="scaleToFill"></image>
		</view>
		<view>
			<input type="text" :value="englishName" class="mode-input" disabled="true"></input>
		</view>
		<view>
			<input type="text" :value="chineseName" class="mode-input"  disabled="true"></input>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				englishName: '',
				chineseName: '',
				teamMembersInfo: '',
				img: ''
			}
		},
		onLoad:function(option){
			this.englishName = option.englishName;
			var teamMembersInfo = JSON.parse(decodeURIComponent(option.teamMembers));
			this.teamMembersInfo = teamMembersInfo;
			for(var i = 0; i<teamMembersInfo.length; i++){
				if(teamMembersInfo[i].englishName === this.englishName){
					this.img = teamMembersInfo[i].img;
					this.chineseName = teamMembersInfo[i].chineseName;
					break;
				}
			}
			uni.setNavigationBarTitle({
				title:this.englishName
			})
		}
	}
</script>

<style>
	.edit{
		align-items: baseline;
		float: right; 
	}
	.container{
		width: 90%;
		margin-left:5%;
		
	}
	.mode-avtor{
			border-radius: 30rpx;
			width: 90%;
			margin-left: 5%;
			height: 880rpx;
	}
	.nameStyle{
		 text-align: center;
	}
	.container-edit{
		display: flex;
		flex-direction: row-reverse;
	}
	.mode-input{
		border-style: hidden hidden solid hidden;
		border-color: #f2f2f2;
		width: 80%;
		margin-left: 10%;
		color: #cacaca;
		position: relative;
		margin-top: 50rpx;
	}
</style>
