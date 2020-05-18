<template>
	<div id="app" class="fillcontain">
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>
<script>
	export default {
		name: 'App',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true,
			}
		},
		methods: {
			reload() {
				this.isRouterAlive =false;
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		},		
		onLaunch: function() {	
			//console.log('App Launch')
			uni.setEnableDebug({
			    enableDebug: true
			})
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>
	/*每个页面公共css */
</style>
