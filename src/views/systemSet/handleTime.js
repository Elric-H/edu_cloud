
function formatDate(now) {
    now=new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}

function handleTime(data){
    var length=data.length;
    for(var i=0;i<length;i++){
        data[i].createTime=formatDate(data[i].createTime);
        data[i].updateTime=formatDate(data[i].updateTime);
    }
}
export default handleTime
