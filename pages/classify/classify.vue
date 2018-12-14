<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @tap="categoryClickMain(index)" :key="index" :class="index==categoryActive?'active':''" v-for="(item,index) in categoryList">
					{{item}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index" @tap="gonext(item.name)">
					<image :src="item.img" />
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: ["女生","男生","漫画","出版物"],
				subCategoryList: [],
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(index) {
				this.categoryActive = index;
				console.log(index)
				if(index==0){
					this.subCategoryList = this.categroy.female;
				}else if(index==1){
					this.subCategoryList = this.categroy.male;
				}else if(index==2){
					this.subCategoryList = this.categroy.picture;
				}else if(index==3){
					this.subCategoryList = this.categroy.press;
				}
				this.scrollTop = -this.scrollHeight * index;
			},
			//获取小说分类
			getBookStyle(){
				uni.showLoading({
				  title: '加载中...'
				})
				this.categoryActive = 0;
				var that = this;
				uni.request({
				  url: 'https://novel.juhe.im/categories',
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					uni.hideLoading();
					var datas = res.data;
					datas.female.forEach(val=>{
						val.img = decodeURIComponent(val.bookCover[0]).replace("/agent/", "")
					})
					datas.male.forEach(val=>{
						val.img = decodeURIComponent(val.bookCover[0]).replace("/agent/", "")
					})
					datas.picture.forEach(val=>{
						val.img = decodeURIComponent(val.bookCover[0]).replace("/agent/", "")
					})
					datas.press.forEach(val=>{
						val.img = decodeURIComponent(val.bookCover[0]).replace("/agent/", "")
					})
					that.categroy = datas
					that.subCategoryList = datas.female;
				  }
				})
			},
			// 去下一级
			gonext(name){
				var gender = ''
				if(this.categoryActive==0){
					gender = 'female';
				}else if(this.categoryActive==1){
					gender = 'male';
				}else if(this.categoryActive==2){
					gender = 'picture';
				}else if(this.categoryActive==3){
					gender = 'press';
				}
				console.log(name,gender)
				uni.navigateTo({
					url: '../booknav/booknav?mername='+name+'&gender='+gender
				});
			}
		},
		onLoad: function () {
			this.height = uni.getSystemInfoSync().windowHeight;
		},
		onShow:function(){
			this.getBookStyle()
		}
	}
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 20%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 80%;
	}

	.nav-right-item {
		width: 30%;
		float: left;
		text-align: center;
		padding: 10upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100%;
		height: 226upx;
	}

	.active {
		color: #007AFF;
	}
</style>
