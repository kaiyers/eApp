<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="icon" @tap="showRightDrawer">
			<uni-icon type="bars" color="#666666" size="22"></uni-icon>
		</view>
		<!-- #endif -->
		<scroll-view scroll-y @scrolltolower='loadmore' class='bookWai'>
			<view class="uni-padding-wrap">
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
		</scroll-view>
		<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
			<view style="padding:30upx;">
				<view class='daohang'><text v-for='(item,index) in typeList' :class="item.sl?'slct':''" :data-idx='index' @tap='choseStyle'  :key='index'>{{item.name}}</text></view>
				<view class="subCt">
					<view v-if='navList'>
						<view v-for='(item,index) in navList' :class="item==sleNav?'showNav':'navView'" :data-cont='item' @tap='choseSubNav' :key='index'>
							{{item}}
						</view>
					</view>
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
	export default {
		components: {
			uniDrawer,
			uniIcon
		},
		data() {
			return {
				mername:'',
				sleNav:'全部',
				load:false,
				gender:'',
				minor:'',
				stylel:'hot',
				navList:[],
				bookList:[],
				total:'',
				chang:'',
				typeList: [
				  { value: 'hot', name: '热门', sl:true },
				  { value: 'new', name: '新书', sl: false},
				  { value: 'reputation', name: '好评', sl: false},
				  { value: 'over', name: '完结', sl: false},
				  { value: 'monthly', name: '包月', sl: false}
				],
				rightDrawerVisible: false
			};
		},
		onLoad(e) {
			var that = this;
			that.mername = e.mername;//e为页面路由过程中传递的参数
			that.gender = e.gender;
			uni.setNavigationBarTitle({
			  title: that.mername//页面标题为路由参数
			})
			this.getnavball();
			setTimeout(function(){
				that.getStyleDeitai(that.gender, that.stylel, that.mername, that.minor, 0)
			},200)
		},
		methods:{
			//获取分类下的详情
		  getStyleDeitai(gender,typel,major,minor,start){
			uni.showLoading({
			  title: '加载中...'
			})
			var that = this,
			  load = this.load,
			  chang = this.chang,
			  bookList = this.bookList;
			uni.request({
			  url: 'https://novel.juhe.im/category-info?gender=' + gender + '&type=' + typel + '&major=' + encodeURIComponent(major) + '&minor=' + encodeURIComponent(minor) + '&start=' + start + '&limit=10',
			  data: {},
			  header: {
				'content-type': 'application/json' // 默认值
			  },
			  method: 'GET',
			  success: function (res) {
				uni.hideLoading()
				var datas = res.data;
				var total = Math.ceil(datas.total / datas.books.length) * datas.books.length
				datas.books.forEach((value)=>{
				  value.cover = decodeURIComponent(value.cover).replace("/agent/", "")
				})
				datas.books.forEach((value) => {
				  bookList.push(value)
				})
				if (bookList.length == datas.books.length){
				  chang = datas.books.length
				}else{
				  chang = bookList.length + datas.books.length
				}		
				that.bookList= bookList;
				that.chang= chang;
				that.total= total;
			  }
			})
		  },
		  //获取小说类型
		  choseStyle(e){
			var typeList = this.typeList;
			var idx = e.currentTarget.dataset.idx;
			typeList.forEach((value,index)=>{
			  value.sl = false;
			  if(index == idx){
				value.sl = true;
			  }
			})
			this.typeList= typeList;
			this.stylel= typeList[idx].value;
			this.total= '';
			this.chang= 0;
			this.bookList= []
			this.getStyleDeitai(this.gender, this.stylel, this.mername, this.minor, 0)
		  },
		  loadmore(){
			var total = this.total,
			  chang = this.chang;
			if (chang < total){
			  this.getStyleDeitai(this.gender, this.stylel, this.mername, this.minor, chang)
			  this.load=true
			}else{
			  uni.showToast({
				title: '亲，到底了 ^_^!!!',
				icon:'none'
			  })
			}
		  },
		  //分组获取次级分类
		  getnavball(){
			var gender = this.gender;
			var mername = this.mername;
			console.log('0001',gender,mername)
			var that = this;
			//获取次级菜单
			uni.request({
				url: 'https://novel.juhe.im/sub-categories',
				data: {},
				header: {
					'content-type': 'application/json' // 默认值
				},
				method: 'GET',
				success: function (res) {
					var datas = null;
					if(gender=="female"){
						datas = res.data.female;
					}else if(gender=="male"){
						datas = res.data.male;
					}else if(gender=="picture"){
						datas = res.data.picture;
					}else if(gender=="press"){
						datas = res.data.press;
					}
					console.log(res,datas)
					var navList = [];
					datas.forEach( va => {
						if (va.major == mername){
							navList = va.mins
						}
					})
					navList.unshift("全部")
					console.log('次级列表',navList)
					that.navList= navList
				}
			})
		  },
		  //选择分类
		  choseSubNav(e){
			var navList = this.navList;
			var minor = e.target.dataset.cont;
			this.sleNav=minor,
			this.minor= minor,
			this.total= '',
			this.chang= 0,
			this.bookList=[]
			if (minor == '全部'){
			  this.minor= ''
			  this.getStyleDeitai(this.gender, 'hot', this.mername, this.minor, 0)
			}else{
			  this.getStyleDeitai(this.gender, 'hot', this.mername, this.minor, 0)
			}
		  },
		  closeRightDrawer() {
		  	this.rightDrawerVisible = false;
		  },
		  showRightDrawer() {
		  	this.rightDrawerVisible = true;
		  },
			openInfo(e){
				uni.navigateTo({
					url: '../booknote/booknote?bookid=' + e.currentTarget.dataset.id
				});
			}
		},
		onNavigationBarButtonTap() {
			this.rightDrawerVisible = !this.rightDrawerVisible
		}
	}
</script>

<style>
	.daohang{
	  color: #222;
	}
	.daohang text{
	  color: #666;
	  margin-right: 20upx
	}
	.daohang .slct{
	  color: #222;
	}
	.subCt{
		margin: 10upx 0;
		padding: 10upx 0;
		border-top: 2upx dashed #CCCCCC;
		border-bottom: 2upx dashed #CCCCCC;
	}
	.navView{
	  font-size: 24upx;
	  padding: 6upx 10upx;
	  border:2upx solid #999;
	  margin: 10upx;
	  border-radius: 8upx;
	  display: inline-block;
	} 
	.showNav{
	  display: inline-block;
	  font-size: 24upx;
	  padding: 6upx 10upx;
	  margin: 10upx;
	  border-radius: 8upx;
	  color: #FFD306;
	  border:2upx solid #FFD306;
	}
	.bookWai{
	  height:100vh;
	  width:100%;
	  margin-top: 20upx
	}
</style>
