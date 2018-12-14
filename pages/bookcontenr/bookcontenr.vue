<template>
	<scroll-view :class="setStyle.class" scroll-y :style="{height: pheight + 'px'}" :scroll-top="stop" @scrolltolower="lower" scroll-with-animation='true'>
		<!-- #ifdef MP-WEIXIN -->
		<view class="icon" @tap="showRightDrawer">
			<uni-icon type="bars" color="#666666" size="22"></uni-icon>
		</view>
		<!-- #endif -->
		<view class="textarea0" :style="{fontSize: numberValue + 'px'}">
			{{chapter}}
		</view>
		<view v-if="imagesList.length">
			<image :src="item" v-for="(item,index) in imagesList" :key="index" mode="widthFix" style="width: 700upx;"></image>
		</view>
		<view class="fanye">
			<button type="primary" size="mini" :loading="prevLoading" :disabled="prevdisabled" @tap="changePage" data-fanye='prev'> 上一章 </button>
			<button type="primary" size="mini" :loading="nextLoading" :disabled="nextdisabled" @tap="changePage" data-fanye='next'> 下一章 </button>
		</view>
		<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
			<view class="dwtitel">模式选择</view>
			<view class="quyu">
				<view class="tag-view" v-for="(item,index,key) in navList" :key="key" @tap="getList(index)">
					<uni-tag :text="item.name" inverted="true" :type="item.show?'primary':'default'" :circle="true"></uni-tag>
				</view>
			</view>
			<view class="uni-input-row dwtitel">
				<label>字体大小</label>
				<uni-number-box :min="16" :max="32" :value="numberValue" v-on:change="onNumberChange"></uni-number-box>
			</view>
			<view class="uni-input-row dwtitel">
				<label>自动阅读</label>
				<switch name="switch" :checked='checked' @change="switchChange"/>
			</view>
			<view class="uni-input-row dwtitel">
				<label>阅读速度</label>
				<uni-number-box :min="5" :max="15" :value="numberValue1" v-on:change="onNumberChange1"></uni-number-box>
			</view>
			<view class="uni-input-row dwtitel">
				<label>语音播放</label>
				<switch name="switch" :checked='checked1' @change="switchChange1"/>
			</view>
			<view>
				<view class="uni-input-row dwtitel">
					<label>语速</label>
					<uni-number-box :min="0" :max="15" :value="spdValue" v-on:change="onNumberChangeSpd"></uni-number-box>
				</view>
				<view class="uni-input-row dwtitel">
					<label>音调</label>
					<uni-number-box :min="0" :max="15" :value="pitValue" v-on:change="onNumberChangePit"></uni-number-box>
				</view>
				<view class="uni-input-row dwtitel">
					<label>音量</label>
					<uni-number-box :min="0" :max="15" :value="volValue" v-on:change="onNumberChangeVol"></uni-number-box>
				</view>
				<view class="dwtitel">人物选择</view>
				<view class="quyu">
					<view class="tag-view" v-for="(item,index,key) in renList" :key="key" @tap="getRen(index)">
						<uni-tag :text="item.name" inverted="true" :type="item.show?'primary':'default'" :circle="true"></uni-tag>
					</view>
				</view>
				<view class="dwtitel" style="margin-top: 10upx;">
					<button class="button" type="warn" size="mini" @tap="closeRightDrawer">关闭</button>
				</view>
			</view>
		</uni-drawer>
	</scroll-view>
</template>
<script>
	import uniDrawer from '../../components/uni-drawer.vue';
	import uniIcon from '../../components/uni-icon.vue';
	import uniTag from '@/components/uni-tag.vue';
	import uniNumberBox from '../../components/uni-number-box.vue';
	var util = require('../../common/util.js');
	export default {
		components: {  
			uniDrawer,
			uniIcon,
			uniTag,
			uniNumberBox
		},
		data() {
			return {
				bookData:[],
				bookid:'',
				imagesList:[],
				chapter:'',
				nowCap:0,
				nowCapName:'',
				maxCap:0,
				laiYuanName:'',
				skipPage: 0,
				prevLoading:false,
				nextLoading:false,
				prevdisabled:false,
				nextdisabled:false,
				userData:[],
				rightDrawerVisible: false,
				navList:[],
				renList:[],
				setStyle:{},
				numberValue:20,
				numberValue1:8,
				pheight:0,
				stop:0,
				checked:false,
				checked1:false,
				bgAudioMannager:null,
				readList:[],
				bookname:'',
				readDuan:0,
				per:0,     //	人物
				pitValue:5,// 语调
				spdValue:5,// 语速
				volValue:5,// 音调
			};
		},
		onLoad(e) {
			let bgAudioMannager = uni.getBackgroundAudioManager();			
			bgAudioMannager.onPlay(() => {
				console.log("开始播放");	
			})
			bgAudioMannager.onPause(() => {
				console.log("暂停播放");		
			})
			bgAudioMannager.onEnded(() => {
				this.palyEnd()
			})
			this.bgAudioMannager = bgAudioMannager;
			this.bookid = e.bid;
			this.nowCap = e.idx;
			this.checked1 = e.isread?true:false;
			console.log(e.isread?true:false)
			this.navList = [
				{ 'name': '正常', 'show': true ,'class':'textarea1'}, 
				{ 'name': '夜间', 'show': false,'class':'textarea2'}, 
				{ 'name': '护眼', 'show': false,'class':'textarea3'}, 
				{ 'name': '暖系', 'show': false,'class':'textarea4'}
			];
			this.renList = [
				{ 'name': '普通女声', 'show': true ,'id':0}, 
				{ 'name': '普通男声', 'show': false,'id':1}, 
				{ 'name': '百度逍遥', 'show': false,'id':3}, 
				{ 'name': '百度丫丫', 'show': false,'id':4}
			]
			this.getpageHeight()
			this.userData= uni.getStorageSync('user');
			this.getBookMeun();
			this.setStyle = this.navList[0]
		},
		onShow(){
			
		},
		methods:{
			// 获取页面高度
			getpageHeight(){
				var that = this;
				uni.getSystemInfo({
						success: function (res) {
							that.pheight = res.windowHeight
						}
				});
			},
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			//获取书籍目录
			getBookMeun() {
				uni.showLoading({
				  title: '加载中...'
				})
				var that = this;
				uni.request({
				  url: 'https://novel.juhe.im/book-chapters/' + that.bookid,
				  data: {},
				  header: {
					'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function (res) {
					uni.hideLoading();
					var timeData = new Date(res.data.updated.replace("T", " ").replace("Z", "").replace(/-/g, '/').split('.')[0]);
					var bookData = res.data.chapters;			
					that.bookData = bookData;
					that.maxCap= res.data.chapters.length-1;
					that.laiYuanName= res.data.name;
					that.getNeirong(bookData[that.nowCap].link)
					that.nowCapName = bookData[that.nowCap].title;
					uni.setNavigationBarTitle({
						title: bookData[that.nowCap].title //页面标题为路由参数
					})
				  }
				})
			},
			saveUserData(){
				var userData = this.userData,
						id = this.bookid,
						nowCap = this.nowCap;
				userData.forEach(value=>{
					if(value.chapId == id){
						value.zhang = parseInt(nowCap)+1;
						this.bookname = value.title
					}
				})
				uni.setStorageSync('user', userData)
			},
			//选择章节
			getDetails(e){
				var idx = e.target.dataset.idx;
				this.nowCap = idx
				console.log(e,idx)
				if(idx==0){
					this.prevdisabled = true
				}else if(idx==this.maxCap){
					this.nextdisabled = true
				}else{
					this.prevdisabled = false;
					this.nextdisabled = false
				}
				this.nowCapName = this.bookData[idx].title;
				this.getNeirong(this.bookData[idx].link);
			},
			// 翻页
			changePage(e){
				var bkj = this.nowCap
				if(e.target.dataset.fanye=='prev'){
					// 上一章
					bkj--;
					if(bkj>=0){
						this.nowCap = bkj;
						this.prevLoading = true;
						this.nextdisabled = false;
						this.nowCapName = this.bookData[bkj].title;
						this.getNeirong(this.bookData[bkj].link)
					}else{
						this.prevdisabled = true
					}
				}else{
					// 下一章
					bkj++;
					if(bkj<=this.maxCap){
						this.nowCap = bkj;
						this.nextLoading = true;
						this.prevdisabled = false;
						this.nowCapName = this.bookData[bkj].title;
						this.getNeirong(this.bookData[bkj].link)
					}else{
						this.nextdisabled = true
					}
				}
			},
			//获取章节详细内容
			getNeirong(url){
				var that  = this;
				that.showMulu = false
				that.readDuan = 0;
				that.chapter='';
				that.saveUserData()
				uni.setNavigationBarTitle({
					title: that.nowCapName //页面标题为路由参数
				})
				if (that.laiYuanName == "176小说"){
				  uni.request({
						url: 'https://chapter2.zhuishushenqi.com/chapter/' + encodeURIComponent(url) + '?k=2124b73d7e2e1945&t=1468223717',
						data: {},
						header: {
							'content-type': 'application/json' // 默认值
						},
						method: 'GET',
						success: function (res) {
							that.prevLoading = false;
							that.nextLoading = false;
							that.chapter= res.data.chapter.body;
							var str = res.data.chapter.body;
							that.readList = str.StrCut2Arr(500);//从0开始，每10个字符串截取一次，返回字符串数组
							console.log('我读到这里了176',that.checked1)
							if(that.checked1){
								console.log('我读到这里了')
								var thy = that
								setTimeout(function(){
									thy.readBook()
								},500)
							}
						}
				  })
				} else if (that.laiYuanName == "优质书源"){
				  uni.request({
					url: 'https://novel.juhe.im/chapters/' + encodeURIComponent(url),
					data: {},
					header: {
					  'content-type': 'application/json' // 默认值
					},
					method: 'GET',
					success: function (res) {
						that.prevLoading = false;
						that.nextLoading = false;
					  that.imagesList = res.data.chapter.images ? res.data.chapter.images.split(','):'';
					  that.chapter= res.data.chapter.cpContent ? res.data.chapter.cpContent:'';
						var str = res.data.chapter.cpContent ? res.data.chapter.cpContent:'';
						that.readList = str.StrCut2Arr(500);//从0开始，每10个字符串截取一次，返回字符串数组
						if(that.checked1){
							var thy = that
							setTimeout(function(){
								thy.readBook()
							},500)
						}
					}
				  })
				}else{
				  uni.request({
						url: 'https://novel.juhe.im/chapters/' + encodeURIComponent(url),
						data: {},
						header: {
							'content-type': 'application/json' // 默认值
						},
						method: 'GET',
						success: function (res) {
							that.prevLoading = false;
							that.nextLoading = false;
							that.chapter= res.data.chapter.body;
							var str = res.data.chapter.body;
							that.readList = str.StrCut2Arr(500);//从0开始，每10个字符串截取一次，返回字符串数组
							if(that.checked1){
								var thy = that
								setTimeout(function(){
									thy.readBook()
								},500)
							}
						}
				  })
				}
			},
			// 选择分类
			getList(indx){
				console.log(indx)
				this.rightDrawerVisible = false;
				var navList = this.navList;
				navList.forEach((val,index)=>{
					val.show = false
					if(index == indx){
						val.show = true;
						this.setStyle = val;
					}
				})
				this.navList = navList
			},
			// 选择人物
			getRen(indx){
				this.checked1 = false;
				this.bgAudioMannager.stop();
				var renList = this.renList;
				renList.forEach((val,index)=>{
					val.show = false
					if(index == indx){
						val.show = true;
						this.per = val.id;
					}
				})
				this.renList = renList
			},
			// 字体大小
			onNumberChange(value) {
				this.numberValue = value;
			},
			// 自动阅读
			switchChange(e){
				this.checked = e.detail.value
				if(e.detail.value){
					uni.setKeepScreenOn({
							keepScreenOn: true
					});
					this.closeRightDrawer()
					var that = this;
					var ft = parseInt(that.pheight/2) 
					that.timer = setInterval(function () {
						that.stop+=ft;
					}, that.numberValue1*1000)
				}else{
					clearInterval(this.timer)
					uni.setKeepScreenOn({
							keepScreenOn: false
					});
				}
			},
			// 阅读速度
			onNumberChange1(value) {
				this.bgAudioMannager.stop();
				clearInterval(this.timer)
				this.checked = false
				this.numberValue1 = value;
			},
			// 语速  
			onNumberChangeSpd(value) {
				this.bgAudioMannager.stop();
				this.checked1 = false
				this.spdValue = value;
			},
			// 语调
			onNumberChangePit(value) {
				this.bgAudioMannager.stop();
				this.checked1 = false
				this.pitValue = value;
			},
			// 音调
			onNumberChangeVol(value) {
				this.bgAudioMannager.stop();
				this.checked1 = false
				this.volValue = value;
			},
			// 触底
			lower(){
				if(this.checked){
					var that = this;
					setTimeout(function(){
						var bkj = that.nowCap
						bkj++;
						if(bkj<=that.maxCap){
							that.nowCap = bkj;
							that.nextLoading = true;
							that.prevdisabled = false;
							that.nowCapName = that.bookData[bkj].title;
							that.stop = 0;
							that.getNeirong(that.bookData[bkj].link)
						}else{
							that.nextdisabled = true
						}
					},3000)
				}
			},
			zMa(text){
				var stringh = encodeURIComponent(text);                                                                                                                   
				stringh = encodeURIComponent(stringh);                                                                     //  per:0,     //	人物pitValue:5,// 语调spdValue:5,// 语速volValue:5,// 音调
				return 'http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=24.49c470166e0160c5b9f0a3b8efaf25a4.2592000.1547256837.282335-15142951&aue=3&vol='+this.volValue+'&per='+this.per+'&spd='+this.spdValue+'&pit='+this.pitValue+'&tex='+stringh;
			},
			readBook(){
				this.bgAudioMannager.title = '致爱丽丝';
				this.bgAudioMannager.singer = '暂无';
				this.bgAudioMannager.src = this.zMa(this.readList[this.readDuan]);
				this.bgAudioMannager.play();
				var setvalue = {bid:this.bookid,nowCap:this.nowCap,nowCapName:this.nowCapName,bookname:this.bookname}
				uni.setStorageSync('reading',setvalue)
			},
			// 语音朗读
			switchChange1(e){
				if(e.detail.value){
					this.checked1 = e.detail.value;
					this.closeRightDrawer()
					uni.setKeepScreenOn({
							keepScreenOn: true
					});
					this.readBook();
				}else{
					this.bgAudioMannager.stop();
					uni.setKeepScreenOn({
							keepScreenOn: false
					});
					uni.setStorageSync('reading', {})
				}
			},
			// 朗读停止
			palyEnd(){
				this.bgAudioMannager.stop();
				console.log('播放停止')
				if(this.readDuan<this.readList.length-1){
					this.readDuan++;
					this.readBook()
				}else{
					var bkj = this.nowCap
					bkj++;
					if(bkj<=this.maxCap){
						this.nowCap = bkj;
						this.nextLoading = true;
						this.prevdisabled = false;
						this.nowCapName = this.bookData[bkj].title;
						this.getNeirong(this.bookData[bkj].link)
					}else{
						this.nextdisabled = true
					}
				}
			}
		},
		onHide() {
			clearInterval(this.timer);
			// this.bgAudioMannager.stop();
		},
		onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		}
	}
	String.prototype.StrCut2Arr=function(n){
		var str=this;
		var arr=[];
		var len=Math.ceil(str.length/n);
		for(var i=0;i < len;i++){
			if(str.length >= n){
				var strCut=str.substring(0,n);
				arr.push(strCut);
				str=str.substring(n);
			}else{
				str=str;
				arr.push(str);
			}
		}
		return arr;
	}
</script>

<style>
	.textarea1{
		padding: 0 16upx;
		background: #ffffff;
		color: #000000;
	}
	.textarea2{
		padding: 0 16upx;
		background: #111111;
		color: #ffffff;
	}
	.textarea3{
		padding: 0 16upx;
		background: url(http://img4.imgtn.bdimg.com/it/u=1441836535,74210295&fm=26&gp=0.jpg);
		background-size: 100% 100%;
		color: #ffffff;
	}
	.textarea4{
		padding: 0 16upx;
		background: url(http://img3.imgtn.bdimg.com/it/u=191202121,458334980&fm=26&gp=0.jpg);
		background-size: 100% 100%;
		color: #333;
	}
	.textarea0{
		width:720upx
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
	.dwtitel{
		height: 60upx;
		line-height: 60upx;
		font-size: 32upx;
		text-align: center;
		color: #007AFF;
	}
	.tag-view{
		display: inline-block;
		margin: 10upx 14upx;
	}
</style>
