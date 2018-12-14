<template>
	<view>
		<view>
			请输入需要解析的视频网址
		</view>
		<input type="text" :value="vaol" @input="setval" class="inp"/>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @tap="goplay(item.url)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.img"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-bottom">{{item.url}}</view>
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
				vaol:'',
				list: [
						{ 'img': '../../static/video.png', 'title': '超清解析' ,'url':'https://cdn.yangju.vip/k/?url='}, 
// 						{ 'img': '../../static/video.png', 'title': '拉车视频' ,'url':'https://jx.lache.me/cc/?url='}, 
// 						{ 'img': '../../static/video.png', 'title': '180解析' ,'url':'https://api.653520.top/vip/?url='}, 
// 						{ 'img': '../../static/video.png', 'title': 'AB解析' ,'url':'https://jx.ab33.top/vip/?url='},
// 						{ 'img': '../../static/video.png', 'title': '人人解析仅做学习交流所有' ,'url':'https://vip.mpos.ren/v/?url='},
// 						{ 'img': '../../static/video.png', 'title': '1802解析' ,'url':'https://jx.000180.top/jx/?url='},
// 						{ 'img': '../../static/video.png', 'title': '58解析' ,'url':'https://jx.km58.top/jx/?url='},
					],
			};
		},
		methods:{
			setval(e){
				this.vaol = e.detail.value
			},
			goplay(url){
				if(this.vaol){
					uni.navigateTo({
						url: '../ziding/ziding?url='+this.vaol,
					});
				}else{
					uni.showToast({
						title: '请先输入视频地址！',
						icon:"none",
						duration: 1500
					});
				}
			}
		}
	}
</script>

<style>
.uni-media-list-logo{
	width: 100upx;
	height: 80upx;
}
.inp{
	border: 2upx solid #007AFF;
	width: 730upx;
	margin: 20upx auto;
}
</style>
