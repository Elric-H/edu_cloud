export default function(info){ //info为数组
	console.log("test mock-------");
	var length=info.length;
	for(var i=0;i<length;i++){
		info[i]["status"]="正常";//正常 维修 报废
		info[i]["supplier"]="A公司";
		info[i]["brand"]="王牌";
		info[i]["modelNum"]="K45345GTHF";
		info[i]["usePerson"]="王五";
		info[i]["chargePerson"]="小李";
	}
}