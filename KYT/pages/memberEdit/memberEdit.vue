<template>
	<view class="content">
		<image :src="member.img" class="mod-head-photo" @click="selectImage"></image>
		<view class="mode-input-view">
			English Name:<input class="mode-input" type="text" v-model="member.englishName"></input>
		</view>
		<view class="mode-input-view">
			Chinese Name:<input class="mode-input" type="text" v-model="member.chineseName"></input>
		</view>
		<view  class="mode-input-view">
			<picker mode="date" :start="startDate" :end="endDate" @change="bindDateChange" color="#7f7fa0">
				Birthday:  {{member.birthday === undefined ? '':member.birthday}}
			</picker>
		</view>
		<button class="mod-button" @click="upDate()">Update</button>
		<view class="blank"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				member: {
					img: '',
					oldImg: '',
					englishName: '',
					oldEnglishName:'',
					chineseName: '',
					oldChineseName: '',
					birthday: '',
					oldBirthday: ''
				},
				members: ''
			}
		},
		methods: {
			onLoad:function(option) {
				this.member.oldImg = option.img;
				this.member.img = option.img;
				
				this.member.oldEnglishName = option.englishName;
				this.member.englishName = option.englishName;
				
				this.member.chineseName = option.chineseName;
				this.member.oldChineseName = option.chineseName;
				
				this.member.birthday = option.birthday;
				this.member.oldBirthday = option.birthday;
				
				uni.getStorage({
					key: 'member',
					success: (res) => {
						var object = JSON.parse(res.data);	
						this.members = object;
					}
				});
			},
			computed: {
			    startDate() {
			        return this.getDate('start');
			    },
			    endDate() {
			        return this.getDate('end');
			    }
			},
			selectImage: function() {
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['compressed'], //You can specify whether it is an original or a compressed diagram, and the default is both
				    sourceType: ['album','camera'],
					success: (res) => {
						this.member.img = res.tempFilePaths[0];
						uni.saveFile({
							tempFilePath:this.member.img,
							success:(res) =>{
								this.member.img = res.savedFilePath;
							}
						});
						
					}
				});
			},
			upDate: function() {
				//judge the modified name is exited.
				for(var i = 0; i < this.members.length; i++){
					if(this.members[i].englishName === this.member.oldEnglishName){
						this.members[i].englishName = this.member.englishName;
						this.members[i].img = this.member.img;
						this.members[i].chineseName =this.member.chineseName;
						this.members[i].birthday = this.member.birthday;
						break;
					}
				}
				 this.saveMembersData(this.members)
			},
			saveMembersData:function(members){
				var data = JSON.stringify(members);
				uni.setStorage({
					key: 'member',
					data: data,
					success:function(){
					    uni.switchTab({
							url: '../index/listInfo',
						});
					}
				})
			},
			bindDateChange: function(e) {
			    this.member.birthday = e.target.value
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
				
			    if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year + 2;
			    }
			    month = month > 9 ? month : '0' + month;;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.container {
		width: 90%;
		display: flex;
		flex-direction: column;
	}
	.mod-head-photo {
		margin-top: 35rpx;
		border-radius: 30rpx;
		width: 90%;
		margin-left: 5%;
		height: 730rpx;
	}
	.mod-button{
		color: #e9f3ff;
		border-radius: 30rpx;
		background-color: #007aff;
		width: 90%;
		margin-left: 5%;
		margin-top: 50rpx;
	}
	.mode-input-view{
		border-style: hidden hidden solid hidden;
		border-color: #f2f2f2;
		width: 80%;
		margin-left: 10%;
		color: #cacaca;
		position: relative;
		margin-top: 50rpx;
	}
	.mode-input {
		float: right;
	}
</style>
