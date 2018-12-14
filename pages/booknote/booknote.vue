<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt" style="position:fixed;background:#fff;height:70upx;padding-top:30upx;margin-top: 0;z-index: 100;">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content">
			<view v-show="current === 0">
				<image mode="widthFix" :src="bookdetail.cover" class="bookImg"></image>
				<view class="title">{{bookdetail.title}}</view> 
				<view>
					<view class="tag-view" v-for="(item,index,key) in bookdetail.tags" :key="key">
						<uni-tag :text="item" type="success" size="small"></uni-tag>
					</view>
				</view>
				<navigator url='../bookauthor/bookauthor?author=bookdetail.author' class="at">{{bookdetail.author}}</navigator>
				<view class="at">{{bookdetail.lastChapter}}</view>
				<view class="at">更新于 {{bookdetail.updated}}</view>
				<view>
					<view class="tag-view" v-for="(item,index,key) in sourceList" :key="key" @tap="goread" :data-idx='index'>
						<uni-tag :text="item.name" inverted="true" :type="item.sl?'primary':'danger'" :circle="true"></uni-tag>
					</view>
				</view>
				<view class="at lt">{{bookdetail.longIntro}}</view>
			</view>
			<view v-show="current === 1">
				<view class="uni-product-list">
					<view class="uni-product" v-for="(product,index) in relatedBooks" :key="index" @tap="readSelf(product._id)">
						<view class="image-view">
							<image class="uni-product-image" :src="product.cover"></image>
						</view>
						<view class="uni-product-title">{{product.title}}</view>
						<view class="uni-product-price">
							<text class="uni-product-price-original">{{product.author}}</text>
							<text class="uni-product-tip">{{product.majorCate}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 2">
				<view class="uni-comment">
					<view class="uni-comment-list"  v-for="(item,index) in comments" :key="index">
						<view class="uni-comment-face"><image src="http://img1.imgtn.bdimg.com/it/u=3006625703,782606588&fm=26&gp=0.jpg" mode="widthFix"></image></view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text>{{item.author.nickname}}</text>
							</view>
							<view class="uni-comment-content">{{item.title}}</view>
							<view class="uni-comment-content">{{item.content}}</view>
							<view class="uni-comment-date">
								<text>{{item.updated}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 3">
				<view class="uni-product-list">
					<view class="uni-product" v-for="(product,index) in otherbookList" :key="index" @tap="readSelf(product._id)">
						<view class="image-view">
							<image class="uni-product-image" :src="product.cover"></image>
						</view>
						<view class="uni-product-title">{{product.title}}</view>
						<view class="uni-product-price">
							<text class="uni-product-price-original">{{product.author}}</text>
							<text class="uni-product-tip">{{product.majorCate}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '../../components/uni-segmented-control.vue';
	import util from "../../common/util.js";
	import uniTag from '@/components/uni-tag.vue'
	export default {
		data() {
			return {
				items: [
					'书籍信息',
					'相关推荐',
					'评论',
					'作者书库'
				],
				current: 0,
				activeColor: '#007aff',
				styleType: 'button',
				bookid:'',
				bookdetail:{},
				sourceList:[],
				relatedBooks:[],
				comments:[],
				otherbookList:[],
				author:'',
				userData:[]
			}
		},
		components: {
			uniSegmentedControl,
			uniTag
		},
		onLoad(e){
			this.bookid = e.bookid;
		},
		onShow(){
			this.userData= uni.getStorageSync('user');
			this.getMoreData(this.bookid);
		},
		methods: {
			onClickItem(index) {
				uni.hideLoading()
				if (this.current !== index) {
					this.current = index;
				}
				if(index==0){
					this.getMoreData()
				}else if(index==1){
					this.relatedBook()
				}else if(index==2){
					this.comment()
				}else if(index==3){
					this.authorOtherBook()
				}
			},
			readSelf(id){
				uni.navigateTo({
					url: '../booknote/booknote?bookid=' + id
				});
			},
			 //获取许多数据
			getMoreData(bookId){
				var that = this;
				uni.showLoading({
				  title: '加载中...'
				})
				uni.request({
				  url: 'https://novel.juhe.im/book-info/' + bookId,
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					uni.hideLoading()
					uni.setNavigationBarTitle({
					  title: res.data.title//页面标题为路由参数
					})
					res.data.cover = decodeURIComponent(res.data.cover).replace("/agent/", "")
					var timeData = new Date(res.data.updated.replace("T", " ").replace("Z", "").replace(/-/g, '/').split('.')[0])
					res.data.updated = util.newDate(timeData.getTime() + 28800000, 'YMDHMS')
					console.log('书籍信息',res)
					that.bookdetail = res.data;
					that.author = res.data.author;
					that.getBookSource()
				  }
				})
			},
			//获取书源
			getBookSource(){
				var that = this,
						name = '',
						userData = this.userData;
				if (userData.length){
				  userData.forEach(value=>{
						if (value.bId == this.bookid){
							name = value.name
						}
				  })
				}
				uni.request({
				  url: 'https://novel.juhe.im/book-sources?view=summary&book=' + this.bookid,
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					res.data.forEach(value=>{
					  if(value.name == name){
							value.sl = true
					  }
					})
				   that.sourceList=res.data
				  }
				})
			},
			//相关作品
			relatedBook(bookId) {
				var that = this
				uni.request({
				  url: 'http://novel.juhe.im/recommend/' + this.bookid,
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					res.data.books.forEach((value) => {
					  value.cover = decodeURIComponent(value.cover).replace("/agent/", "")
					})
					that.relatedBooks=res.data.books
				  }
				})
			},
			//评论区
			comment(bookId){
				var that = this
				uni.request({
				  url: 'http://api.zhuishushenqi.com/post/by-book?book=' + this.bookid + '&sort=updated&start=0&limit=4000',
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					res.data.posts.forEach((value)=>{
					  var timeData = new Date(value.updated.replace("T", " ").replace("Z", "").replace(/-/g, '/').split('.')[0])
					  value.updated = util.newDate(timeData.getTime() + 28800000,'YMDHMS')
					})
					console.log('评论区', res)
					that.comments = res.data.posts							
				  }
				})
			},
			//作者其他作品
			authorOtherBook() {
				var that = this;
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: 'http://novel.juhe.im/author-books?author=' + encodeURIComponent(that.author),
					data: {},
					header: {
						'content-type': 'application/json' // 默认值
					},
					method: 'GET',
					success: function (res) {
						uni.hideLoading()
						var datas = res.data
						datas.books.forEach((value) => {
							value.cover = decodeURIComponent(value.cover).replace("/agent/", "")
						})
						that.otherbookList= datas.books
					}
				})
			},
			// 进入小说章节目录
			goread(e){
				var idx = e.currentTarget.dataset.idx,
				bookdetail = this.bookdetail,
				userData = this.userData,
				sourceList = this.sourceList;
				var zhang = 1;
				if (userData.length) {
					userData.forEach(value => {
						if (value.bId == bookdetail._id) {
							zhang = value.zhang
						} 
					})
				}
				var dattl = { 'bId': bookdetail._id, 'title': bookdetail.title, 'zhang': zhang, 'url': bookdetail.cover, 'name': sourceList[idx].name, 'chapId': sourceList[idx]._id}
				if (userData.length){
					userData.forEach(value => {
						if (value.bId == bookdetail._id) {
							value.name = sourceList[idx].name;
							value.chapId = sourceList[idx]._id
						} else { 
							userData.unshift(dattl)
						}
					})
				}else{
					userData.unshift(dattl)
				}
				var hash = {};
				userData = userData.reduce(function (item, next) {
					hash[next.title] ? '' : hash[next.title] = true && item.push(next);
					return item
				}, []) 
				uni.setStorageSync('user', userData)
				uni.navigateTo({
					url: '../bookmulu/bookmulu?id='+sourceList[idx]._id
				});
		}
	},
}
</script>

<style>
	.uni-product{
		padding: 16upx 10upx !important;
	}
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 110upx 24upx 30upx 24upx;
	}
	.color-tag {
		width: 50upx;
		height: 50upx;
	}
	.bookImg{
		width: 70%;
		display: block;
		margin: 20upx auto;
	}
	.title{
		font-size: 34upx;
		font-weight: bold;
		color: #000000;
	}
	.at{
		font-size: 24upx;
		font-weight: normal;
		color: #666;
	}
	.lt{
		text-align: left;
		margin-top: 32upx;
	}
	.tag-view {
		margin: 10upx;
		display: inline-block;
	}
	.image-view {
		height:auto;
		width:330rpx;
		margin:12rpx 0;
	}
	.uni-comment{
		text-align: left;
	}
	.uni-comment-list {
		-webkit-flex-wrap:nowrap;
		flex-wrap:nowrap;
		padding:10rpx 0;
		margin:10rpx 0;
		width:730upx;
		display:-webkit-box;
		display:-webkit-flex;
		display:flex;
		padding-left:20upx;
	}
	.uni-comment-date{
		font-size: 24upx;
		color: #C0C0C0;
	}
	.uni-product-price {
		text-align: left;
		padding-left: 10upx;
	}
</style>
