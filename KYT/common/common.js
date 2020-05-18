export default {
	score: [],
	count: 0,
	percent: 10,
	wrongList: [],
	finishFlag: false,
	testItemCount: 1,
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
	}
}