<template>
	<view>
		<view :class="isXuan?'header_k':'header'">
			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" :value="kw" type="text" placeholder="输入搜索关键词" />
			</view>
			<view @tap="startRecognize">
				<uni-icon type="mic-filled" size="22" color="#666666" @tap="startRecognize"></uni-icon>
			</view>
		</view>
		<view class="uni-padding-wrap" style="margin-top:10upx;">
			<view class="uni-list">  
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in bookList" :key="index">
					<view class="uni-media-list" @tap="openInfo" :data-id="item._id">
						<image class="uni-media-list-logo" :src="item.cover" mode="widthFix"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.title}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{item.author}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{item.lastChapter}}</view>
							<view class="uni-media-list-text-bottom duoeli">{{item.shortIntro}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText" v-if="bookList.length"></uni-load-more>
	</view>
</template>
<script>
	import uniLoadMore from '../../components/uni-load-more.vue';
	import uniIcon from '../../components/uni-icon.vue';
	export default {
		data() {
			return {
				isXuan:false,
				kw:'',
				bookList:[],
				chang:0,
				total:0,
				loadingType:0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		components: {
			uniLoadMore,uniIcon
		},
		onLoad() {
		
		},
		// 监听页面滚动
		onPageScroll(e){
			this.isXuan = e.scrollTop>50 ? true:false
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			if (this.chang < this.total) {
				var that = this;
				var chang = this.chang;
				var bookList = this.bookList;
				uni.request({
					url: 'http://api.zhuishushenqi.com/book/fuzzy-search?query=' + encodeURIComponent(that.kw) + '&start=' + chang + '&limit=10',
					data: {},
					header: {
						'content-type': 'application/json' // 默认值
					},
					method: 'GET',
					success: function (res) {
						that.loadingType = 0;
						var datas = res.data;
						datas.books.forEach((value) => {
						value.cover = decodeURIComponent(value.cover).replace("/agent/", "")
						})
						var total = Math.ceil(datas.total / datas.books.length) * datas.books.length
						datas.books.forEach((value) => {
							bookList.push(value)
						})
						if (bookList.length == datas.books.length) {
							chang = datas.books.length
						} else {
							chang = bookList.length + datas.books.length
						}
						that.bookList = bookList;
						that.chang = chang;
						that.total = total
					}
				})
			}else{
				this.loadingType = 2;
				return;
			}
		},
		methods: {
			// 获取页面数据--全部书单
			//获取分类下的详情
			getStyleDeitai(keyWord, start) {
				uni.showLoading({
				  title: '加载中...',
				})
				console.log('01ss',keyWord, start)
				var that = this,
				  chang = this.chang,
				  bookList = this.bookList;
				uni.request({
				  url: 'http://api.zhuishushenqi.com/book/fuzzy-search?query=' + encodeURIComponent(keyWord) + '&start=' + start + '&limit=10',
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					uni.hideLoading();
					var datas = res.data;
					datas.books.forEach((value) => {
					  value.cover = decodeURIComponent(value.cover).replace("/agent/", "")
					})
					var total = Math.ceil(datas.total / datas.books.length) * datas.books.length
					datas.books.forEach((value) => {
					  bookList.push(value)
					})
					if (bookList.length == datas.books.length) {
					  chang = datas.books.length
					} else {
					  chang = bookList.length + datas.books.length
					}
					that.bookList = bookList;
					that.chang = chang;
					that.total = total
				  }
				})
			},
			// 语音识别
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'baidu';
				that.kw = "";
				plus.speech.startRecognize(options, function (s) {
					let ky = s.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
					that.kw = ky
					this.getStyleDeitai(ky,0)
				}, function (e) {
					uni.showToast({
						title: "语音识别失败,请再说一次",
						mask: false,
						icon:'none',
						duration: 1500
					})
				});
			},
			confirm(e) {
				this.bookList=[];
				this.chang=0;
				this.total=0;
				this.kw = e.detail.value;
				this.getStyleDeitai(e.detail.value,0)
			},
			openInfo(e){
				uni.navigateTo({
					url: '../booknote/booknote?bookid=' + e.currentTarget.dataset.id
				});
			}
		},
	}
</script>

<style>
	.header {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
	}
	.header_k {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 5;
		width: 92%;
	}
	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}

</style>
