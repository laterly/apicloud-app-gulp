// const hotData = $api.getStorage('hotData') || '';
// apiready = function () {
//     let topic = document.querySelector('#topic');
//     api.showProgress({
//         title: '请稍后...',
//         text: ''
//     });
//     if (!hotData){
//     app.http.getJson('/api/topics/hot.json').then((res) => {
//         let data=res;
//         $api.setStorage('hotData', data);
//         topic.innerHTML = htmlData(data);
//         api.hideProgress();
//     }).catch((err) => {
//         api.toast({
//             msg: '接口错误'
//         });
//         api.hideProgress();
//         app.http.error(err);
//     })
//     }else{
//         topic.innerHTML = htmlData(hotData);
//     }
// };
// function htmlData(data){
//     let html = '';
//     for (let item of data) {
//         html += `<li class="aui-list-item aui-list-item-middle">
//                         <div class="aui-media-list-item-inner">
//                             <div class="aui-list-item-media">
//                                 <img src="${item.node.avatar_normal}" class="aui-img-round aui-list-img-sm">
//                             </div>
//                             <div class="aui-list-item-inner aui-list-item-arrow">
//                                 <div class="aui-list-item-text">
//                                     <div class="aui-list-item-title aui-font-size-14"><span>${item.title}</span><span class="item-title-des">${item.node.title}</span></div>
//                                     <div class="aui-list-item-right">${item.replies}</div>
//                                 </div>
//                                 <div class="aui-list-item-text">
//                                     ${app.date.timestampFormat(item.last_touched)}•最后回复来自${item.last_reply_by}
//                                 </div>
//                             </div>
//                         </div>
//                     </li>`;
//     }
//     return html;
// }