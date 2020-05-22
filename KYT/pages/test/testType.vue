<template>
	<view class="content">
		<page-head style="width: 100%;"></page-head>			
		<view v-if="typeIndex===0||typeIndex===1">
			<view class="text-box">
				{{title}}
			</view>
			<view class="img-box">
				<image :src="imgPathList[0]" class="memberImg"></image>
			</view>
			<view class="nameList-box">
				<li v-for="(item,index) in nameList" :class="{'select': selectIndex === index}"  @tap="selectOne(index)">
				    {{ item }}
				</li>
			</view>
		</view>
		<view v-if="typeIndex===2" style="width: 100%;">
			<view class="text-box" >
				{{title}}
			</view>
			<view  v-for="(item,index) in imgPathList" class="imageItem">				
				<view class="img" >
					<text class="imageIndex">{{index + 1}}</text>
					<image :src="item" :class="{'select': selectIndex === index}" @click="selectOne(index)"></image>
				</view>
			</view>	
		</view>
		<view class="blank"></view>
		<page-foot v-on:pCheck="checkAndContinue()"
		:checkBoxText='checkBoxText' :bgColor='bgColor' :checkColor='checkColor' 
		:color='color' :selectIndex='selectIndex' :resultInfo='resultInfo' 
		></page-foot>	
	</view>
</template>

<script>	
	export default {
		data: function() {
			return {
				title: '',	
				
				checkBoxText: '', 		//Bottom button text
				resultInfo: ' ', 									
				checkColor: '',  			//Bottom button color
				bgColor: '',   				//The background color at the bottom
				color: '',    				//Bottom button text color
							
				checkedFlag: false, 		//Whether you checked it
				
				nameList: [],											
				imgPathList: [],
				wrongList: [],  
				array: [],					//List of current question information
				
				optionNumber: 3,											
				rightAnswerIndex: -1,		
				selectIndex: -1,	
				typeIndex: 0,				//Question type index	
			}
		},		
		methods: {	 
			showModal: function() {
				uni.showModal({
					title: this.$common.language.content.testType.finishPopUp.title,
					content: this.$common.language.content.testType.finishPopUp.content,					
					cancelText: this.$common.language.content.testType.finishPopUp.leftButton,
					confirmText: this.$common.language.content.testType.finishPopUp.rightButton,
					confirmColor: '#007AFF',
					cancelColor: '#FF464F',
					success: (res) => {
						if(res.confirm) {							
							uni.redirectTo({
								url: 'testType?typeIndex=' + this.$common.wrongList[0].typeIndex,
							});
						} 
						else if(res.cancel) {	
							uni.switchTab({
								url: 'test',
							})
						}
					},				
				})
			},		
			getRandomArrayElements: function(arr) {
				let shuffled = arr.slice(0), i = arr.length, min = i - this.optionNumber, temp, index;
				while (i-- > min) {
					index = Math.floor(i * Math.random());
					temp = shuffled[index];
					shuffled[index] = shuffled[i];
					shuffled[i] = temp;
				}
				return shuffled.slice(min);
			},
			selectOne: function(e) {
				if(!this.checkedFlag) {	
					this.selectIndex = e;
					this.checkColor = '#4CD964';
				}
			},
			saveScoreData: function() {
				//Each examination result and examination times
				let scoreDataInfo = [];  
				scoreDataInfo.push(this.$common.count + 1);
				scoreDataInfo.push(this.$common.score);
				uni.setStorage({
					key: 'score',
					data: scoreDataInfo,
				});
			},
			changeFootPartStyle: function(bgColor,color,checkColor,resultInfo) {
				this.bgColor = bgColor;
				this.color = color;
				this.checkColor = checkColor;
				this.resultInfo = resultInfo;
			},
			checkAndContinue: function() {
				if(this.checkedFlag) {
					this.$common.percent += 10;				
					//just finish 10 questions
					if(this.$common.percent === 100) {
						this.$common.finishFlag = true;
						//save 10 questions score
						this.saveScoreData();
						if(this.$common.wrongList.length > 0) {
							//Exit test or continue wrong question
							this.showModal();
						}
						//get 100 score
						else {
							uni.switchTab({
								url: 'test',
							})
						}
					}
					//haven't done 10 questions yet
					else if(!this.$common.finishFlag) {
						let typeIndex =  Math.floor((Math.random() * 3));
						uni.redirectTo({
							url: 'testType?typeIndex=' + typeIndex,
						})
					}
					//do wrong questions
					else {
						if(this.$common.wrongList.length > 0) {
							uni.redirectTo({
								url: 'testType?typeIndex=' + this.$common.wrongList[0].typeIndex,
							})
						}
						else {
							uni.switchTab({
								url: 'test',
							})
						}
					}
				}	
				if(!this.checkedFlag && this.selectIndex !== -1) {
					let resultInfo;
					if(this.selectIndex === this.rightAnswerIndex) {
						resultInfo = this.$common.language.content.testType.correctInfo;						
						this.changeFootPartStyle('#C7F7CC','#01500F','#4CD964',resultInfo);
						if(!this.$common.finishFlag) {
							this.$common.score[this.$common.score.length - 1] += 10;
						} 
						else if(this.$common.finishFlag) {
							this.$common.delWrongListFirstOne();
						}
					} 
					else {
						if(this.typeIndex === 2) {
							this.$common.setWrongInfo(this.nameList[this.selectIndex],this.nameList[this.rightAnswerIndex],this.rightAnswerIndex + 1);
							// resultInfo = 'this is ' + this.nameList[this.selectIndex] + ',' + this.nameList[this.rightAnswerIndex] + ' is the ' + (this.rightAnswerIndex + 1) + ' image';						
							resultInfo = this.$common.resultInfo;
						}		
						else {
							this.$common.setWrongInfo(this.nameList[this.rightAnswerIndex]);
							resultInfo = this.$common.resultInfo;	
						}
						this.changeFootPartStyle('#F7C7C7','#510303','#FF3B30',resultInfo);			
						if(this.$common.finishFlag) {
							this.$common.delWrongListFirstOne();
						}
						this.$common.addWrongList(this.typeIndex,this.rightAnswerIndex,this.array);
					}	
					this.checkBoxText = this.$common.language.content.testType.continueButton;
					this.checkedFlag = true;
				}
			},			 
			questionList: function() {	
				if(this.typeIndex === 0) {
					//Choose an English name according to the picture
					this.title = this.$common.language.content.testType.titleOne;	
					this.imgPathList.push(this.array[this.rightAnswerIndex].img);
					for(let i = 0;i < this.optionNumber;i++) {
						this.nameList.push(this.array[i].englishName);
					}
				}
				else if(this.typeIndex === 1) {
					//Choose an Chinese name according to the picture
					this.title = this.$common.language.content.testType.titleOne;	
					this.imgPathList.push(this.array[this.rightAnswerIndex].img);
					for(let i = 0;i < this.optionNumber;i++) {
						this.nameList.push(this.array[i].chineseName);
					}					
				}
				else if(this.typeIndex === 2) {
					//Choose an picture according to the English name	
					this.title = this.$common.language.content.testType.titleTwo + this.array[this.rightAnswerIndex].englishName+'?';
					for(let i = 0;i < this.optionNumber;i++) {
						this.nameList.push(this.array[i].englishName);
						this.imgPathList.push(this.array[i].img);	
					}	
				}
			}
		},
		onLoad: function(option) {
			this.typeIndex = parseInt(option.typeIndex);	
		},
		onShow: function() {
			this.checkBoxText = this.$common.language.content.testType.checkButton;
			this.$setBar.setNavigationBar(this.$common.language.content.testType.navigationBarTitleText);
			if(!this.$common.finishFlag) {
				uni.getStorage({
					key: 'member',
					success: (res) => {
						let obj = JSON.parse(res.data);
						if (this.typeIndex === 0 || this.typeIndex === 1) {
							this.optionNumber = obj.length>3?3:obj.length;
						}
						else if (this.typeIndex === 2) {						
							this.optionNumber = obj.length>4?4:obj.length;	
						}
						if(this.imgPathList.length === 0) {
							this.array = this.getRandomArrayElements(obj);
							this.rightAnswerIndex = Math.floor((Math.random() * this.optionNumber));
							this.questionList();
						}
					}
				})
			}
			else {
				if(this.imgPathList.length === 0) {
					this.typeIndex = this.$common.wrongList[0].typeIndex;
					this.rightAnswerIndex = this.$common.wrongList[0].rightAnswerIndex;
					this.array = this.$common.wrongList[0].array;
					this.questionList();
				}
			}
		}
	}
</script>
<style>
	.content {
		min-height: 100vh;
		display: flex; 
		flex-direction: column; 
		align-items: center;
	}
	.text-box {
		font-size: 45rpx;
		margin:0 auto;	
		margin-bottom: 20rpx;
		margin-left: 40rpx;
	}
	.img-box {
		margin-bottom: 30rpx;
	}
	.img-box .memberImg {	
		width: 100%;
		height: 450rpx;
		border-radius:15rpx;	
	}
	.nameList-box {
		margin-bottom: 40rpx;
	}
	.nameList-box li {
		width: 650rpx;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #EEEEEE;
		margin-top: 25rpx;
		text-align: center;
		border-radius:15rpx;	
		font-size: 40rpx;
		color: #007AFF;
	}
	.nameList-box .select {
		background-color: white;
		width: 650rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 25rpx;
		text-align: center;
		border-radius:15rpx;	
		font-size: 40rpx;
		color: #007AFF;		
		box-shadow: 0 6rpx 10rpx rgba(0,0,0,0.5);
	}	
	.blank {
		flex:1 ; 
	}	
	.imageItem {
		width:46%;
		height: 400rpx;
		float: left;
		margin-left:20rpx;
		position: relative;
		margin-bottom: 20rpx;
	}
	.imageItem .img {
		width:100%;
		height:370rpx;
		position: relative; 
	}
	.imageItem .img image {
		border-radius: 30rpx;
		overflow: hidden;
		width: 100%; 
		height: 100%;
	}
	.imageItem .img .select {
		box-shadow: 10rpx 15rpx 30rpx rgba(0,0,0,0.7);
	}
	.imageItem .imageIndex {
		margin-left: 20rpx;
		font-size: 40rpx;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}
</style>