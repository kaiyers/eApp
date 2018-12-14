<template>
    <view class="uni-tab-bar">
        <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
            <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
                :id="tab.id" :data-current="index" @tap="tapTab">{{tab.name}}</view>
        </scroll-view>
        <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" style="height: 26.6rem;">
            <swiper-item>
                <scroll-view class="list" scroll-y  style="height: 26.4rem;padding-left: 2%;">           
					<view v-for="(newsitem,index) in female" :key="index" class="itembtn" @tap="goDetail" :data-id="newsitem._id">
						{{newsitem.shortTitle}}
					</view>
                </scroll-view>
            </swiper-item>
			<swiper-item>
				<scroll-view class="list" scroll-y  style="height: 26.4rem;padding-left: 2%;">           
					<view v-for="(newsitem,index) in male" :key="index" class="itembtn" @tap="goDetail" :data-id="newsitem._id">
						{{newsitem.shortTitle}}
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="list" scroll-y  style="height: 26.4rem;padding-left: 2%;">           
					<view v-for="(newsitem,index) in epub" :key="index" class="itembtn" @tap="goDetail" :data-id="newsitem._id">
						{{newsitem.shortTitle}}
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="list" scroll-y  style="height: 26.4rem;padding-left: 2%;">           
					<view v-for="(newsitem,index) in picture" :key="index" class="itembtn" @tap="goDetail" :data-id="newsitem._id">
						{{newsitem.shortTitle}}
					</view>
				</scroll-view>
			</swiper-item>
        </swiper>
    </view>
</template>
<script>
	export default {
			data() {
					return {
							scrollLeft: 0,
							isClickChange: false,
							tabIndex: 0,
							female: [],       
							male: [],       
							picture: [],       
							epub: [],       
							tabBars: [{
									name: '女生',
									id: 'female'
							}, {
									name: '男生',
									id: 'male'
							}, {
									name: '出版物',
									id: 'epub'
							}, {
									name: '漫画',
									id: 'picture'
							}]
					}
			},
			onShow: function() {
					var that = this;
					uni.showLoading({
						title: '加载中...'
					})
					uni.request({
						url: 'https://novel.juhe.im/rank-category',
						data: {},
						header: {
						'content-type': 'application/json' // 默认值
						},
						method: 'GET',
						success: function (res) {
						uni.hideLoading()
						var datas = res.data;
						that.female= datas.female;
						that.male= datas.male;
						that.picture= datas.picture;
						that.epub= datas.epub;
						},
						fail: function (fal) {
						}
					})
        },
        methods: {
			// 进入下一级详情列表
            goDetail(e) {
                uni.navigateTo({
                    url: '../booklist/booklist?listId=' + e.currentTarget.dataset.id
                })
            },
			// 左右滑动切换
            async changeTab(e) {
                let index = e.target.current;
                if (this.isClickChange) {
                    this.tabIndex = index;
                    this.isClickChange = false;
                    return;
                }
                let tabBar = await this.getElSize("tab-bar"),
                    tabBarScrollLeft = tabBar.scrollLeft;
                let width = 0;

                for (let i = 0; i < index; i++) {
                    let result = await this.getElSize(this.tabBars[i].id);
                    width += result.width;
                }
                let winWidth = uni.getSystemInfoSync().windowWidth,
                    nowElement = await this.getElSize(this.tabBars[index].id),
                    nowWidth = nowElement.width;
                if (width + nowWidth - tabBarScrollLeft > winWidth) {
                    this.scrollLeft = width + nowWidth - winWidth;
                }
                if (width < tabBarScrollLeft) {
                    this.scrollLeft = width;
                }
                this.isClickChange = false;
                this.tabIndex = index; //一旦访问data就会出问题
            },
            getElSize(id) { //得到元素的size
                return new Promise((res, rej) => {
                    uni.createSelectorQuery().select("#" + id).fields({
                        size: true,
                        scrollOffset: true
                    }, (data) => {
                        res(data);
                    }).exec();
                })
            },
            async tapTab(e) { //点击tab-bar
                if (this.tabIndex === e.target.dataset.current) {
                    return false;
                } else {
                    let tabBar = await this.getElSize("tab-bar"),
                        tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
                    this.scrollLeft = tabBarScrollLeft;
                    this.isClickChange = true;
                    this.tabIndex = e.target.dataset.current
                }
            }
        }
    }
</script>

<style>
.itembtn{
	color:#f0ad4e;
	background-color:#FFFFFF;
	border:1px solid #f0ad4e;
	width: 22%;
	height: 1.8rem;
	text-align: center;
	line-height: 1.8rem;
	font-size: 36upx;
	display: inline-block;
	margin-top: .4rem;
	margin-right: 2%;
}
</style>