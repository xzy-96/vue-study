let _vue;
class Store {
  constructor(options) {
    // 保存选项
    this.$options = options;
    this.getters = {};
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._getters = options.getters;
    const computed = {};
    // api: state
    // 用户传入state选项应该是响应式的

    // 异步的调用 this会不确定 所加一个bind
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
    // getters
    const store = this;
    for (let key in store._getters) {
      // debugger;
      const fn = store._getters[key];
      computed[key] = function () {
        return fn(store.state);
      };
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key], // 读取computed
      });
      // let data = this._getters[key](this.state);
      // // _vue.util.defineReactive(this.getters, key, data);
      // this.getters[key] = data;
    }
    this._vm = new _vue({
      data() {
        return {
          // 不希望$$state被代理，所以加两个$
          $$state: options.state,
        };
      },
      computed,
    });
  }

  // 存取器
  get state() {
    // console.log(this._vm);
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("请使用reaplaceState()去修改状态");
  }

  // commit('add')
  commit(type, payload) {
    // 匹配type对应的mutation
    const entry = this._mutations[type];
    if (!entry) {
      console.error("error");
      return;
    }
    entry(this.state, payload);
  }

  dispatch(type, payload) {
    // 匹配type对应的mutation
    const entry = this._actions[type];
    if (!entry) {
      console.error("error");
      return;
    }
    // 此处上下文是什么？
    // {commit, dispatch, state}
    return entry(this, payload);
  }
}

function install(Vue) {
  _vue = Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}
export default {
  install,
  Store,
};
