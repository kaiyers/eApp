<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" @click-left="back" @click-right="showMenu" left-text="返回" right-text="菜单"
		title="导航栏组件"></uni-nav-bar>
		<view :class="isXuan?'header_k':'header'">
			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" :value="value" type="text" placeholder="输入搜索关键词" />
			</view>
			<!-- <uni-icon type="mic-filled" size="22" color="#666666" @tap="startRecognize"></uni-icon> -->
			<view @tap="startRecognize">
				<uni-icon type="mic-filled" size="22" color="#666666" @tap="startRecognize"></uni-icon>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="icon" @tap="showRightDrawer">
				<uni-icon type="bars" color="#666666" size="22"></uni-icon>
			</view>
			<!-- #endif -->
		</view>
		<!-- <image src="http://img.mp.sohu.com/upload/20170602/716a86a1ef4e46bb8eed2287a4a97bdc_th.png" mode="widthFix" style="width: 100%;"></image> -->
		<view class="readArea" v-if="bookname" @tap="godetal">
			<view class="biaoti">{{bookname}}</view>
			<view class="zhangshu">{{nowCapName}}</view>
		</view>
		<view class="uni-padding-wrap" style="margin-top:10upx;">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in bookLists" :key="index">
					<view class="uni-media-list" @tap="openInfo" :data-id="item._id">
						<image class="uni-media-list-logo" :src="item.cover" mode="widthFix"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.title}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{item.author}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">共 {{item.bookCount}} 本</view>
					<view class="uni-media-list-text-bottom duoeli">{{item.desc}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
			<navigator url="../ziding/ziding">一统江湖，千秋万代</navigator>
			<view style="padding:30upx;">
				<view class="tag-view" v-for="(item,index,key) in navList" :key="key" @tap="getList" :data-idx='index'>
					<uni-tag :text="item.name" inverted="true" :type="item.show?'primary':'danger'" :circle="true"></uni-tag>
				</view>
				<view class="uni-common-mt">
					<button class="button" type="warn" size="mini" @tap="closeRightDrawer">关闭</button>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>
<script>
	import uniDrawer from '../../components/uni-drawer.vue';
	import uniIcon from '../../components/uni-icon.vue';
	import uniTag from '@/components/uni-tag.vue'
	export default {
		components: {  
			uniDrawer,
			uniIcon,
			uniTag
		},
		data() {
			return {
				rightDrawerVisible: false,
				isXuan:false,
				bookLists:[], 
				navList: [],
				value:'',
				reading:null,
				useData:[],
				bookname:'',
				nowCapName:''
			}
		},
		onLoad() {
			this.getAllShuDan()
			this.navList = [{ 'name': '全部', 'show': true }, { 'name': '热门', 'show': false }, { 'name': '最新', 'show': false }, { 'name': '收藏', 'show': false }];
			const valueq = uni.getStorageSync('user');
			if (valueq) {
				this.useData = valueq;
			}else{
				uni.setStorageSync('user', [])
			};
		},
		onShow:function(){
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
		// 监听页面滚动
		onPageScroll(e){
			this.isXuan = e.scrollTop>50 ? true:false
		},
		onUnload(){
			console.log('ffffffffffff')
			this.value = ""
		},
		methods: {
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			// 选择分类
			getList(e){
				console.log(e)
				this.rightDrawerVisible = false;
				var navList = this.navList,
					idx = e.currentTarget.dataset.idx;
				if (navList[idx].name == '全部'){
					this.getAllShuDan()
				} else if (navList[idx].name == '热门'){
					this.getAllShuDan('sort=collectorCount&duration=last-seven-days&start=0')
				} else if (navList[idx].name == '最新') {
					this.getAllShuDan('sort=created&duration=all')
				} else if (navList[idx].name == '收藏') {
					this.getAllShuDan('sort=collectorCount&duration=all')
				}
				this.navList = navList
			},
			// 获取页面数据--全部书单
			getAllShuDan(query){
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				var that = this;
				uni.request({
					url: 'https://api.zhuishushenqi.com/book-list?' + query,
					data: {},
					header: {
					'content-type': 'application/json' // 默认值
					},
					method: 'GET',
					success: function (res) {
						uni.hideLoading()
						var datas = res.data.bookLists;
						datas.forEach((value) => {
							value.cover = decodeURIComponent(value.cover).replace("/agent/", "")
						})
						that.bookLists = datas
					}
				})
			},
			// 进入详情列表
			openInfo(e){
				console.log(e)
				uni.navigateTo({
					url: '../booklist/booklist?shuDanId='+e.currentTarget.dataset.id
				});
			},
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'baidu';
				that.value = "";
				plus.speech.startRecognize(options, function (s) {
					that.value = s;
					let ky = s.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
					uni.navigateTo({
						url: '../seekDetail/seekDetail?keyword='+ky,
					});
				}, function (e) {
					uni.showToast({
						title: "语音识别失败,请再说一次",
						mask: false,
						icon:'none',
						duration: 1500
					})
				});
			},
			godetal(){
				var valu = uni.getStorageSync('reading');
				uni.navigateTo({
					url: '../bookcontenr/bookcontenr?idx=' + valu.nowCap + '&bid=' + valu.bid + '&isread=' + true
				});
			},
			confirm(e) {
				uni.navigateTo({
					url: '../seekDetail/seekDetail?keyword='+e.detail.value,
				});
			}
		},
		onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		},
		onHide:function(){
			this.closeRightDrawer()
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

	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}
	.tag-view{
		width: 100%;
		margin-bottom: 20upx;
	}
</style>
