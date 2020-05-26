
export default {
	score: [],
	count: 0,
	percent: 10,
	wrongList: [],
	finishFlag: false,
	testItemCount: 1,
	resultInfo: '',
	setScore(data) {
		this.score = data;
	},
	setCount(data) {
		this.count = data;
	},
	setPercent(data) {
		this.percent = data;
	},
	setTestItemCount(data) {
		this.testItemCount = data;
	},
	addWrongList(typeIndex,rightAnswerIndex,array) {
		let obj = {
			typeIndex: typeIndex,
			rightAnswerIndex: rightAnswerIndex,
			array: array
		}
		this.wrongList.push(obj);
	},
	delWrongListFirstOne(index) {
		this.wrongList.shift();
	},
	initWrongList() {
		this.wrongList = [];
	},
	setWrongInfo(language) {
		let correctName = arguments[1];
		let wrongName = arguments[2];
		let imageIndex = arguments[3];
		if(arguments.length === 2) {
			if(language === "English") {
				this.resultInfo = 'Nope,this is ' + correctName;
			}
			else {
				this.resultInfo = '错了，这是 ' + correctName;
			}
		}
		else {
			if(language === "English") {
				this.resultInfo = 'this is ' + wrongName + ',' + correctName + ' is the ' + imageIndex + ' image';	
			}
			else {
				this.resultInfo = '这是 ' + wrongName + ',' + correctName + '是第 ' + imageIndex + '张照片';
			}	
		}
	} 
}