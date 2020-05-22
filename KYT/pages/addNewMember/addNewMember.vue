<template>
	<view class="content">
		<view class="mode-backgroud">
			<image :src="imgPath" class="mod-image"></image>
			<uni-icons type="camera" size="30" color="#808080" class="mode-camera-icon" @click="selectImg()" ></uni-icons>
		</view>
		<view>
			<input type="text" :placeholder="english_Name" class="mode-input" v-model="englishName"></input>
		</view>
		
		<view>
			<input type="text" :placeholder="chinese_Name" class="mode-input" v-model="chineseName"></input>
		</view>
		<view>
			<picker mode="date" v-model="birthday" :start="startDate" :end="endDate" @change="bindDateChange" color="#7f7fa0">
				<view class="mode-input" v-if="isSelectedDate" ><text class="label">{{birth}}:</text></view>
				<view class="mode-input" v-if="!isSelectedDate" ><text class="label">{{birthday}}</text> </view>
			</picker>
		</view>
		<button class="mod-button" @click = "saveData()">{{button}}</button>
		<view class="blank"></view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			const currentDate = this.getDate({  //acquire the newesr information
			    format: true
			})
			return {
				imgPath: '',
				englishName: '',
				chineseName:'',
				birthday: currentDate,
				flag: false,//Determines if the current information has been successfully saved
				teamMembers: [],
				isSelectedDate: true ,
				english_Name: '',
				chinese_Name: '',
				birth: '',
				button: '',
			}
		},
		computed: {
		    startDate() {
		        return this.getDate('start');
		    },
		    endDate() {
		        return this.getDate('end');
		    }
		},
		onLoad: function(option) {
			
			let item = JSON.parse(decodeURIComponent(option.teamMembers));
			
			this.teamMembers = item;
		},
		onShow:function(){
			this.english_Name = this.$common.language.content.memberInformation.englishName;
			this.chinese_Name = this.$common.language.content.memberInformation.chineseName;
			this.birth = this.$common.language.content.memberInformation.birthday;
			this.button = this.$common.language.content.addMember.button;
			this.$setBar.setNavigationBar(this.$common.language.content.addMember.navigationBarTitleText);
		},
		methods: {
			//Select a photo from the gallery or take a photo with the camera
			selectImg: function() {
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['compressed'], //You can specify whether it is an original or a compressed diagram, and the default is both
				    sourceType: ['album','camera'],
					success: (res) => {
						this.imgPath = res.tempFilePaths[0];
						this.flag = false;	
					}
				});
			},
			saveData: function() {	
				if(this.flag) {
					this.showModal(this.$common.language.content.addMember.popUp.uploadedContent);
				}	
				if(this.englishName === '' || this.imgPath === '' || this.chineseName === '') {		
					this.showModal(this.$common.language.content.addMember.popUp.emptyContent);
				}
				else {
					this.updateOrAdd();				
				}				
			},	
			updateOrAdd: function() {
				let i = 0;
				if(this.teamMembers.length > 0) {
					for(i = 0;i < this.teamMembers.length;i++) {
						if(this.englishName.trim().toLocaleLowerCase() === this.teamMembers[i].chineseName|| 
						  this.chineseName.trim() === this.teamMembers[i].chineseName) {
							this.showModal(this.$common.language.content.addMember.popUp.existContent,false);
							break;
						}									
					}
				}
				if(this.teamMembers.length === 0 || i === this.teamMembers.length) {
					uni.saveFile({
						tempFilePath: this.imgPath,
						success: (res) => {
							this.imgPath = res.savedFilePath;							
							this.saveDataToStorage();
						},
					});
				}	 				
			},
			showModal: function(content,flag) {
				uni.showModal({		
					showCancel: false,
					content: content,
					confirmText: this.$common.language.content.addMember.confirm,
					success: (res) => {
						if(flag) {
							uni.switchTab({
							    url: '../index/listInfo',
							});
						}
					}
				})	
			},		
			saveDataToStorage: function() {
				let obj = {
					img: this.imgPath,
					chineseName: this.chineseName.trim(),
					englishName: this.englishName.trim().toLowerCase(),
					birthday: this.birthday
				}
				this.teamMembers.push(obj);
				
				let jsonData = JSON.stringify(this.teamMembers);
				uni.setStorage({
					key: 'member',
					data: jsonData,
					success: () => {
						this.showModal(this.$common.language.content.addMember.popUp.successContent,true);	
					},
				});
			},
			bindDateChange: function(e) {
				this.isSelectedDate = false;
			    this.birthday = e.target.value
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
	.mod-image{
		height: 880rpx;
		width: 100%;
		border-radius: 30rpx;
	}
	.mode-camera-icon{
		position: absolute;
		left: 50rpx;
		top: 100rpx;
	}
	.content{
		display: flex;
		flex-direction: column;
	}
	.mode-backgroud{
		background-color: #e5e5e5; 
		width: 90%; 
		height: 880rpx;
		margin-left: 5%;
		border-radius: 30rpx;
		margin-top: 50rpx;
		position: relative;
		text-align: center;
		color: white;
		
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
	.mod-button{
		color: #e9f3ff;
		border-radius: 30rpx;
		background-color: #007aff;
		width: 90%;
		margin-left: 5%;
		margin-top: 50rpx;
	}
	.label {
		color: #cacaca;
	}
</style>
