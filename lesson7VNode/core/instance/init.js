import { construcProxy } from "./proxy.js";
import { mount } from "./mount.js";
let uid = 0;
export function initMixin(Due) {

    Due.prototype._init = function (options) {
        const vm = this;
        vm.uid = uid++;
        vm._isDue = true;
        //初始化data
        if (options && options.data) {
            vm._data = construcProxy(vm, options.data, "");
        }
        //初始化created方法
        //初始化methods
        //初始化computed
        //初始化el并挂载
        if (options && options.el) {
            console.log(options.el)
            let rootDom = document.getElementById(options.el);
            console.log(rootDom);
            mount(vm, rootDom);
        }

    }

}
