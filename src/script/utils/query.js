/*点击获取索引*/

(function () {
    /*类似jquery的index()*/
   function searchIndex(obj,_this) {
       for (var i = 0; i < obj.length; i++) {
           var index = -1;
           if (obj[i] == _this) {
               index = i;
               break;
           }
       }
       return index;
   }
    window.utils.query = {
        index: searchIndex
    }
})();
