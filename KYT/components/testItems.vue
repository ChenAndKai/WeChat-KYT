<template>
	<view>
		<view class="mask" catchtouchmove="preventTouchMove" v-if='show'></view>
		<view v-if="show" class="box">
			<view class="uni-list">
				<text class="title">{{text}}</text>
				<checkbox-group >
					<label  class="uni-list-cell uni-list-cell-pd">
						<checkbox checked disabled="disabled" />
						<view class="text">English Name</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
						<checkbox :value="item.value" :checked="item.checked" @change="checkboxChange"/>
						<view class="text">{{item.name}}</view>
					</label>
				</checkbox-group>
				<view class="blank"></view>
				<button class="confirm-button" @click="confirm">Confirm</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: function() {
		    return {
				items: [
					{
		                value: 'chineseName',
		                name: 'Chinese Name',
		            },
					{
						value: 'birthday',
						name: 'Birthday',
					}
		        ],
				text: 'Please select the items to test',
		        title: 'checkbox 复选框',	
				selectItem: [],
		    }
		},
		props: {
			show: {
				type: Boolean,
				default: false,
			}
		},
		methods: {
		    checkboxChange: function (e) {
				this.selectItem = [{value: 'englishName',name: 'English Name'}];
		        let items = this.items,
		            values = e.detail.value;
		        for (let i = 0, lenI = items.length; i < lenI; ++i) {
		            const item = items[i]
		            if(values.includes(item.value)){
		                this.$set(item,'checked',true)
						this.selectItem.push(item);
		            }else{
		                this.$set(item,'checked',false)
		            }
		        }
		    },
			preventTouchMove:function () {
			},
			confirm: function() {	
				this.$emit("pConfirm",this.selectItem);
			}
		}
	}
</script>

<style>
.mask{
	width:100%;
	height:100%;
	position:fixed;
	top:0;
	left:0;
	background:#000;
	z-index:9000;
	opacity:0.5;
}
.title {
	margin: 20rpx;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	color:#888888;
}
.box {
	position:fixed;
	left:0;
	right:0;
	z-index:9999;
	display: flex;
	flex-direction: column;
	align-items:center;
}
/* 列表 */
.uni-list {
	background-color: #FFFFFF;
	position: relative;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 36%;
	border: 1rpx solid rgba(0,0,0,.2);
	border-radius: 30rpx;
	color: #888888;
}

.uni-list-cell {
	width: 450rpx;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}

.uni-list-cell-pd {
	padding: 30rpx 30rpx;
	/* border-bottom: 1rpx solid #999999; */
}
.uni-list-cell-pd .text {
	margin-left: 50rpx;
}
.blank {
	min-height: 60rpx;
}
.confirm-button {
	color: #007AFF;
	background-color: transparent;
	width: 650rpx;
	border: none;
}
.confirm-button:after {
  border: none;
  border-top: 1rpx solid #999999;
}
</style>
