// 插件
// 实现一个install 方法
let _vue;
class XRouter {
  constructor(options) {
    this.$options = options;
    // 响应数据
    const initPath = window.location.hash.slice(1) || "/";
    _vue.util.defineReactive(this, "current", initPath);
    // this.current = "/";
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
    _vue;
  }
  onHashChange() {
    this.current = window.location.hash.slice(1);
    console.log("我改变了");
  }
}

XRouter.install = function (Vue) {
  _vue = Vue;
  // 1.挂载$router
  Vue.mixin({
    beforeCreate() {
      // 全局混入 将来在组件实例时候在执行
      // 此时 router 实例是不是存在
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  // 2.实现两个全局组件

  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
  // router-view 是个容器
  Vue.component("router-view", {
    render(h) {
      // 获取路由表
      const routes = this.$router.$options.routes;
      const current = this.$router.current;
      const route = routes.find((item) => item.path == current);
      const comp = route ? route.component : null;
      return h(comp);
    },
  });
};

export default XRouter;
