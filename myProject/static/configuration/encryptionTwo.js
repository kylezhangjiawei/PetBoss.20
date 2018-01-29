import md5 from 'md5'
export  function objKeySort(obj) {
  var newkey = Object.keys(obj).sort();
  var newObj = {};
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  let strings = "";
  let key ='e3aa19a71687700a259bdf8a9078ffea';
  for (let i in newObj){
    strings+=i+"="+newObj[i] + "&"
  }
  //拼接秘钥
  strings+="key"+"="+key;
  //加密后的字符串
  let signValue = md5(strings).toUpperCase();
  return signValue;
}
