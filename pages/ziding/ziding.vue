<template>
    <view>
        <web-view :src="srcl"></web-view>
    </view>
</template>
<script>
	export default {
		data() {
			return {
				srcl:""
			}
		},
		onLoad: function (e) {
			this.srcl= "https://cdn.yangju.vip/k/?url=" + e.url
			uni.setKeepScreenOn({
					keepScreenOn: true
			});
		}
	}
</script>
<style>
</style>
