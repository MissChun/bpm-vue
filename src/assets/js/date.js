export const getDateDetail = function(date) {
  if (date && date.getFullYear()) {
    let dateDetail = {};
    dateDetail.year = date.getFullYear();
    dateDetail.month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    dateDetail.day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    dateDetail.hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    dateDetail.minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    dateDetail.second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();

    return dateDetail;
  } else {
    return date;
  }

}
export const getNowTime = function() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
  return currentdate;
}
