<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in bookData" :key="index">
				<view class="uni-list-cell-navigate" @tap="getDetails" :data-idx='index' :style="{background:item.reading?'#c7d6ed':''}">
					{{item.title}}<text :class="item.isVip?'vip':'novip'">VIP</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookData:[],
				bookid:'',
				userData:[]
			};
		},
		onLoad(e) {
			this.bookid = e.id;
			this.userData= uni.getStorageSync('user');
			this.getBookMeun();
		},
		methods:{
			//获取书籍目录
			getBookMeun() {
				uni.showLoading({
				  title: '加载中...'
				})
				var that = this,
						zhang = '',
						bid = that.bookid,
						userData = this.userData;
				if (userData.length) {
					userData.forEach(value => {
						if (value.chapId == bid) {
							zhang = value.zhang
						}
					})
				}
				uni.request({
				  url: 'https://novel.juhe.im/book-chapters/' + bid,
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					uni.hideLoading()
					var timeData = new Date(res.data.updated.replace("T", " ").replace("Z", "").replace(/-/g, '/').split('.')[0])
					var bookData = res.data.chapters;
					if (zhang > 1) {
						uni.showModal({
							title: '提示',
							content: '亲爱的，你上次读到第' + zhang + '章，是否继续阅读',
							success: function (res) {
								if (res.confirm) {
									let nowCap= zhang - 1;
									uni.navigateTo({
										url: '../bookcontenr/bookcontenr?idx=' +　nowCap + '&bid=' + bid
									});
								} else if (res.cancel) {
								 
								}
							},
							fail: function (res) { },
							complete: function (res) { },
						})
					}
					bookData.forEach((val,index)=>{
						val.reading = false;
						if(index==zhang-1){
							val.reading = true;
						}
					})
					that.bookData = bookData;
					that.maxCap= res.data.chapters.length-1;
					that.laiYuanName= res.data.name;
					that.newChap= res.data.chapters[res.data.chapters.length-1]
				  }
				})
			},
			//选择章节
			getDetails(e){
				var idx = e.target.dataset.idx,
						bid = this.bookid
				this.nowCap = idx;
				uni.navigateTo({
					url: '../bookcontenr/bookcontenr?idx=' + idx + '&bid=' + bid
				});
			}
		}
	}
</script>

<style>
	.textarea{
		padding: 26upx;
	}
	.textarea0{
		font-size: 36upx;
	}
	.mulu{
		height: 60upx;
		line-height: 60upx;
		font-size: 32upx;
		text-align: center;
		width: 100%;
		position: fixed;
		top: 0;
		right: 0;
		background: #666;
		color: #fff;
	}
	.muludi{
		height: 60upx;
	}
	.fanye{
		margin:20upx 0;
		padding: 0 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.nowPage{
		color: #666666;
	}
	.vip{
		color: #ff0000;
		font-weight: bold;
	}
	.novip{
		color: #eee;
		font-weight: bold;
	}
</style>
