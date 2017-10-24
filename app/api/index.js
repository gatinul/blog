import axios from "axios";

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  /**
   * 获取文章列表
   * @param {object} param 
   */
  getBlogList(param) {
    return fetch("getBlogList", param);
  },
  getPage(param) {
    return fetch("getPage", param);
  }
};
