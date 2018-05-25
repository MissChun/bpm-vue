export const apiAxiosRe= function(url,param,fn){
   axios.post(url,encodeURIComponent(JSON.stringify(param)))
    .then(function(data) {
        if(typeof fn==='function'){
            fn(data);
        }
    });
}
