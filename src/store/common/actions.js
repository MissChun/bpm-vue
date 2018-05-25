/* 异步操作 部分业务逻辑代码写这里 */
export default {
  ChangeinitParam({ commit }, values) {
    console.log(values);
    commit("ChangeinitParam", values)
  }
}
