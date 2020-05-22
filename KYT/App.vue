<script>
	export default {
		onLaunch: function() {	
			this.updateManager();
		},
		onShow: function() {
		},
		onHide: function() {
			//console.log('App Hide')
		},
		methods: {			
			updateManager: function() {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// Request a callback for new version information
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function(res2) {
							uni.showModal({
								title: 'Update tip',
								content: 'Find a new version,whether\r\n to restart the application?',
								confirmText: 'Confirm',
								cancelText: 'Cancel',
								cancelColor:'#eeeeee',
								confirmColor:'#FF0000',
								success(res2) {
									if (res2.confirm) {
										// The new version has been downloaded, call applyUpdate to apply the new version and restart
										updateManager.applyUpdate();
									}
								}
							});
						});
					}
				});
					
				updateManager.onUpdateFailed(function(res) {
					// The new version download failed
					uni.showModal({
						title: 'Attention',
						content: 'New version, but the download failed.\r\n Please check the network Settings',
						success(res) {
							if (res.confirm) {
								// The new version has been downloaded, call applyUpdate to apply the new version and restart
								updateManager.applyUpdate();
							}
						}
					});
				});
			}
		}
	}
</script>

<style>
	@import url("./common/uni.css");
</style>
