<template>
	<view class="showAera">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in bookList" :key="index">
				<view class="uni-media-list" @tap="openInfo" :data-newsId="item.book._id">
					<image class="uni-media-list-logo" :src="item.book.cover" mode="widthFix"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.book.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.book.author}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.book.majorCate}}</view>
						<view class="uni-media-list-text-bottom duoeli" >{{item.comment}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listId:'',
				shuDanId:'',
				bookList:[]
			};
		},
		onLoad(e) {
			this.shuDanId = e.shuDanId?e.shuDanId:'';
			this.listId = e.listId?e.listId:'';
			var tr = this
			setTimeout(function(){
				tr.getListData()
			},200)
		},
		methods:{
			getListData(){
				uni.showLoading({
					title: '加载中...'
				})
				var that = this;
				if (that.listId){
					uni.request({
						url: 'https://novel.juhe.im/rank/' + that.listId,
						data: {},
						header: {
						'content-type': 'application/json' // 默认值
						},
						method: 'GET',
						success: function (res) {
							uni.hideLoading()
							var datas = res.data.ranking
							uni.setNavigationBarTitle({
								title: datas.title//页面标题为路由参数
							})
							datas.books.forEach((value) => {
								value.cover = decodeURIComponent(value.cover).replace("/agent/", "")
							})
							that.bookList = datas.books
						}
					})
				}else{
					uni.request({
						url: 'https://api.zhuishushenqi.com/book-list/' + that.shuDanId,
						data: {},
						header: {
						'content-type': 'application/json' // 默认值
						},
						method: 'GET',
						success: function (res) {
							uni.hideLoading()
							var datas = res.data.bookList
							uni.setNavigationBarTitle({
								title: datas.title//页面标题为路由参数
							})
							datas.books.forEach((value) => {
								value.book.cover = decodeURIComponent(value.book.cover).replace("/agent/", "")
							})
							that.bookList = datas.books
						}
					})
				}
			}
		}
	}
</script>

<style>
	.uni-media-list-body{
		height: auto;
	}
	.uni-media-list-logo{
		width: 2rem;
	}
</style>
