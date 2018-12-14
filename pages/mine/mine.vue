<template>
	<view>
		<view class="readArea" v-if="bookname" @tap="godetal">
			<view class="biaoti">{{bookname}}</view>
			<view class="zhangshu">{{nowCapName}}</view>
		</view>
		<view class="uni-product-list" v-if="datashow">
			<view class="uni-product" v-for="(product,index) in userData" :key="index" @tap="readSelf(product.bId)" @longtap="deletData(index)">
				<view class="image-view">
					<image class="uni-product-image" :src="product.url"></image>
				</view>
				<view class="uni-product-title">{{product.title}}</view>
				<view class="uni-product-price">
					<text class="uni-product-price-original">{{product.name}}</text>
					<text class="uni-product-tip">第 {{product.zhang}} 章</text>
				</view>
			</view>
		</view>
		<view v-else>
			<image src="http://img.zcool.cn/community/01956b5a31ebaaa80120ba38fb641a.gif" class="nullImg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData:[],
				datashow:true,
				bookname:'',
				nowCapName:''
			};
		},
		onShow() {
			this.refreh();
			var value = uni.getStorageSync('reading');
			if(value){
				if(value.bid){
					this.bookname = value.bookname
					this.nowCapName = value.nowCapName
				}else{
					this.bookname = ''
					this.nowCapName = ''
				}
			}else{
				this.bookname = ''
				this.nowCapName = ''
			}
		},
		methods:{
			refreh(){
				this.userData= uni.getStorageSync('user');
				this.datashow = uni.getStorageSync('user').length==0?false:true
			},
			readSelf(id){
				uni.navigateTo({
					url: '../booknote/booknote?bookid=' + id
				});
			},
			godetal(){
				var valu = uni.getStorageSync('reading');
				uni.navigateTo({
					url: '../bookcontenr/bookcontenr?idx=' + valu.nowCap + '&bid=' + valu.bid + '&isread=' + true
				});
			},
			deletData(index){
				var userData = this.userData,
					that = this;
				uni.showModal({
				  title: '提示',
				  content: '确定要删除' + userData[index].title + '吗？',
				  showCancel: true,
				  success: function (res) {
						if (res.confirm) {
							userData.remove(index)
							uni.setStorageSync('user', userData)
							that.refreh()
						} else if (res.cancel) {

						}
				  }
				})
			}
		}
	}
	/** 
	*删除数组指定下标或指定对象 
	*/
	Array.prototype.remove = function (obj) {
		for (var i = 0; i < this.length; i++) {
			var temp = this[i];
			if (!isNaN(obj)) {
			temp = i;
			}
			if (temp == obj) {
			for (var j = i; j < this.length; j++) {
				this[j] = this[j + 1];
			}
			this.length = this.length - 1;
			}
		}
	} 
</script>

<style>
	.readArea{
		height: 300upx;
		padding: 20upx 5%;
		background: url('http://img.mp.itc.cn/upload/20170422/0d5b690ce4564ef9868bceb51ad3cf63_th.gif');
		background-size: 100% 100%;
	}
	.biaoti{
		color:red;
		font-size:32rpx;
		font-weight:700;
	}
	.zhangshu{
		color:yellow;
		font-size:28rpx;
	}
.uni-product-title{
	text-align: center;
	font-size: 30upx;
	font-weight: 700;
	color: #007AFF;
}
.nullImg{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
}
</style>
