function construcObjectProxy(vm,obj,namespace){
    let proxyObj = {};
    for(let prop in obj){
        Object.defineProperty(proxyObj,prop,{
            configurable:true,
            get(){
               return obj[prop];
            },
            set:function(vaule){
                console.log(prop);
                obj[prop]=vaule;
            }
        })
        Object.defineProperty(vm,prop,{
            configurable:true,
            get(){
               return obj[prop];
            },
            set:function(vaule){
                console.log(prop);
                obj[prop]=vaule;
            }
        })
        
    }

    return proxyObj;

}
//我们要知道哪个属性被修改了，我们才能对页面上的内容进行更新
//所以我们必须先能够捕获修改的这个事件
//所以我们需要用代理的方式来监听
export function construcProxy(vm,obj,namespace){
   
    //vm表示Due对象，obj表示进行代理的对象，namespace表示命名空间
    //递归
    let proxyObj = null;
    if(obj instanceof Array){

    }else if(obj instanceof Object){
        proxyObj = construcObjectProxy(vm,obj,namespace);
    }else{
        throw new Error("error");
    }
    return proxyObj;
}