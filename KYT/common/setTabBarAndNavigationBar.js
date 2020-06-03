const setTabBar = (test,index,config) => {
	uni.setTabBarItem({
	  index: 0,
	  text: test,
	})
	uni.setTabBarItem({
	  index: 1,
	  text: index,
	})
	uni.setTabBarItem({
	  index: 2,
	  text: config,
	})
}
const setNavigationBar = data => {
	uni.setNavigationBarTitle({
	    title: data,
	});
}

export default {
	setTabBar,	
	setNavigationBar
}