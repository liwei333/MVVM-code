import VNode from "../vdom/vnode.js";
export function initMount(Due) {//可以通过$mount方式挂载
    Due.prototype.$mount = function (el) {
        let vm = this;
        let rootDom = document.getElementById(el);
        mount(vm, rootDom);
    }
}

export function mount(vm, elm) {
    //进行挂载
    vm._vnode = constructVNode(vm, elm, null);
    console.log(vm._vnode)
    //进行预备渲染(建立渲染索引，通过模板找vnode,通过vnode找模板)

}
function constructVNode(vm, elm, parent) {//深度优化搜索  构建虚拟dom树
    let vnode = null;
    let children = [];
    let text = getNodeText(elm);
    let data = null;
    let nodeType = elm.nodeType;
    let tag = elm.nodeName;
    vnode = new VNode(tag, elm, children, text, data, parent, nodeType);
    //childNodes子节点们
    let childs = vnode.elm.childNodes;


    for (let i = 0; i < childs.length; i++) {
        //递归深度优先搜索

        let childNodes = constructVNode(vm, childs[i], vnode);

        if (childNodes instanceof VNode) {//返回单一节点的时候

            vnode.children.push(childNodes);
        } else {//返回节点数组
            vnode.children = vnode.children.concat(childNodes);

        }

    }
    return vnode;

}
function getNodeText(elm) {
    if (elm.nodeType == 3) {
        return elm.nodeValue;
    } else {
        return "";
    }
}