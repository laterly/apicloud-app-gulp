apiready = function () {
    var return_1 = $api.dom('.return_1');
    $api.addEvt(return_1, 'click', function () {
        api.closeWin({
            name: api.winName
        });
    });

}