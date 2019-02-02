(function(){
    var baseUrl='https://wap.01hour.com';
    var timeout = 5;
    function get(url,data,opts){
        opts=opts||{};
        return new Promise((resolve,reject)=>{
            if(!url.startsWith('/'))
                url='/'+url;
            let func=()=>{
                let qs='';
                for(let key in data){
                    if(!qs){
                        qs+='?';
                    }
                    else {
                        qs+='&';
                    }
                    qs+=key+'='+data[key];
                }
                api.ajax({
                    url:baseUrl+url+qs,
                    method:'get',
                    timeout:timeout,
                    returnAll:opts.returnAll,
                    dataType:opts.dataType||'json'
                },function(res,err){
                    if(err){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                })
            }
            if(opts.noEncypt){
                func();
            }else{
                app.encrypt(data,(eData)=>{
                    data=eData;
                    func();
                })
            }
        })
    }

    function post(url,data,opts){
        opts=opts||{};
        return new Promise((resolve,reject)=>{
            if(!url.startsWith('/'))
                url='/'+url;
            let func=()=>{
                api.ajax({
                    url:baseUrl+url,
                    method:'post',
                    data:{
                        values:data
                    },
                    timeout:timeout,
                    returnAll:opts.returnAll,
                    dataType:opts.dataType||'json'
                },function(res,err){
                    if(err){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                })
            }
            if(opts.noEncypt){
                func();
            }else{
                app.encrypt(data,(eData)=>{
                    data=eData;
                    func();
                })
            }
        })
    }

    function error(err){
        console.log(JSON.stringify(err));
        if(err.body){
            api.toast({msg:'未知故障，请联系管理员'});
        }else{
            api.toast({msg:'未知故障'});
        }
    }

    window.utils.http={
        get:get,
        post:post,
        error:error
    };
})();
