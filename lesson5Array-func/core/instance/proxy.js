const arrayProto = Array.prototype;
function defArrayFunc(obj,func,namespace,vm){
 
    Object.defineProperty(obj,func,{
        enumerable:true,
        configurable:true,
        value:function(...args){
            let original = arrayProto[func];
            const result = original.apply(this,args);
            console.log(getNameSpace(namespace,""));
            return result;
        }
    })
}

function proxyArr(vm,arr,namespace){

    let obj = {
        eleType:"Array",
        toString:function(){
            let result = "";
            for(let i = 0;i<arr.length;i++){
                result += arr[i] + ", ";
            }
            return result.substring(0,result.length-2);
        },
        push(){},
        pop(){},
        shift(){},
        unshift(){}

    }
    defArrayFunc.call(vm,obj,"push",namespace,vm);
    defArrayFunc.call(vm,obj,"pop",namespace,vm);
    defArrayFunc.call(vm,obj,"shift",namespace,vm);
    defArrayFunc.call(vm,obj,"unshift",namespace,vm);
    arr._proto_ = obj;
    return arr;

}


function construcObjectProxy(vm,obj,namespace){
    let proxyObj = {};
    for(let prop in obj){
        Object.defineProperty(proxyObj,prop,{
            configurable:true,
            get(){
               return obj[prop];
            },
            set:function(vaule){
                console.log(getNameSpace(namespace,prop));
                obj[prop]=vaule;
            }
        })
        Object.defineProperty(vm,prop,{
            configurable:true,
            get(){
               return obj[prop];
            },
            set:function(vaule){
                console.log(getNameSpace(namespace,prop));
                obj[prop]=vaule;
            }
        });
        if(obj[prop] instanceof Object){
            proxyObj[prop] = construcProxy(vm,obj[prop],getNameSpace(namespace,prop));
        }
        
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
        proxyObj = new Array(obj.length);
        for(let i = 0;i<obj.length;i++){
            proxyObj[i] = construcProxy(vm,obj[i],namespace);
        }
        proxyObj = proxyArr(vm,obj,namespace);
    }else if(obj instanceof Object){
        proxyObj = construcObjectProxy(vm,obj,namespace);
    }else{
        throw new Error("error");
    }
    return proxyObj;
}

function getNameSpace(nowNameSpace,nowProp){
    if(nowNameSpace = null || nowNameSpace==""){
        return nowProp;
    }else if(nowProp = null || nowProp==""){
        return nowNameSpace;
    }else{
        return nowNameSpace + "." + nowProp;
    }
}