<template>
	<view>
		<view class="uni-list" v-if="listId">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in bookList" :key="index">
				<view class="uni-media-list"  @tap="openInfo" :data-id="item._id">
					<image class="uni-media-list-logo" mode="widthFix" :src="item.cover"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							{{item.author}}
							<view class="tag-view">
								<uni-tag :text="item.majorCate" type="success" size="small"></uni-tag>
							</view>
						</view>
						<view class="uni-media-list-text-bottom duoeli">{{item.shortIntro}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-list" v-else>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in bookList" :key="index">
				<view class="uni-media-list"  @tap="openInfo" :data-id="item.book._id">
					<image class="uni-media-list-logo" mode="widthFix" :src="item.book.cover"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.book.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							{{item.book.author}}
							<view class="tag-view">
								<uni-tag :text="item.book.majorCate" type="success" size="small"></uni-tag>
							</view>
						</view>
						<view class="uni-media-list-text-bottom duoeli">{{item.comment}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTag from '@/components/uni-tag.vue'
	export default {
		data() {
			return {
				listId:'',
				shuDanId:'',
				bookList:[]
			};
		},
		onLoad(e) {
			this.listId = e.listId ? e.listId:'';
			this.shuDanId = e.shuDanId ? e.shuDanId:'';
			this.getlist()
		},
		components: {
			uniTag
		},
		methods:{
			getlist(){
				var that = this;
				uni.showLoading({
				  title: '加载中...'
				})
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
					  that.bookList=datas.books
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
					  that.bookList= datas.books
					}
				  })
				}
			},
			openInfo(e){
				uni.navigateTo({
					url: '../booknote/booknote?bookid=' + e.currentTarget.dataset.id
				});
			}
		}
	}
</script>

<style>
.tag-view {
		margin:0 10upx;
		display: inline-block;
	}
</style>
