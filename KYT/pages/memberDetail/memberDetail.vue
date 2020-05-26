<template>
	<view>
		<!-- <image src="../../static/delete.png" class="delIcon" @click="delMember"></image> -->
		<uni-icons type="trash" size="30" color="#1a87ff" class="delete"  @click="delMember"></uni-icons>
		<navigator class="container-edit" :url="'../memberEdit/memberEdit?englishName='+englishName+'&chineseName='+chineseName+'&img='+img+'&birthday='+birthday">
			<uni-icons type="compose" size="30" color="#1a87ff" class="edit" ></uni-icons>
		</navigator>
		<view class="container">
			<image class="mode-avtor":src="img" mode="scaleToFill"></image>
		</view>
		<view class="mode-input">
			<text>{{memberInfo.englishName}}:	{{englishName}}</text>
		</view>
		<view class="mode-input">
			<text>{{memberInfo.chineseName}}:	{{chineseName}}</text>
		</view>
		<view class="mode-input">
			<text>{{memberInfo.birthday}}:	{{birthday}}</text>
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
		computed: {
			addMember () {
				return this.$t('addMember');  
			},
			memberInfo () {
				return this.$t('memberInformation');
			},
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
				title: this.englishName
			})
		}, 
		methods: {
			delMember: function() {
				uni.showModal({
					title: this.$t('memberDetail.popUp.title'),
					content: this.$t('memberDetail.popUp.content'),					
					cancelText: this.$t('memberDetail.popUp.exit'),
					confirmText: this.$t('memberDetail.popUp.confirm'),
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
	.delete {
		align-items: baseline;
		float: left; 
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
		width: 100%;
		height: 750rpx;
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
