import md5 from 'md5'
export  function getSendData() {
  let obj = {
    system_id:85916832,
    timestamp:Date.parse(new Date()).toString().substring(0,10),
    store_id:localStorage.getItem('storeId')
  }
    let newkey = Object.keys(obj).sort();
    let newObj = {};
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]];
    }
    let strings = "";
    let key = localStorage.getItem('Key');
    for(let i in newObj){
      strings += i + "=" + newObj[i] + "&"
    }
    strings +="key" + "=" + key;
    let signValue = md5(strings).toUpperCase();
    return signValue;
}

export function sendData(datas) {
   let item = {
     "store_id":localStorage.getItem('storeId'),
     "system_id":85916832,
     "timestamp":Date.parse(new Date()).toString().substring(0,10),
     "sign":getSendData(),
     "data":datas
   }
   return item;

}
