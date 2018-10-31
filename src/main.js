// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import './style/reset.css';
import  './config/rem.js'

import animate from 'animate.css'
Vue.use(animate);

Vue.config.productionTip = false;


Vue.directive('disabletouchmove', {
    bind: (el, binding, vnode, oldVnode) => {
        let cb_name = binding.expression;
        if (cb_name) {
            var cb = vnode.context[cb_name];
        }
        el.addEventListener('touchmove', (e) => {
            if (cb && cb()) {

            } else {
                e.preventDefault();
            }
        })
    },
    unbind: (el) => {
        el.removeEventListener('touchmove', (e) => {
            e.preventDefault()
        }, false)
    }
});


import './style/reset.css';
import './config/rem.js'

import dataManager from './dataManager/data';
import Tools from './config/tool';

let user_id = Tools.getUrlParams('user_id');
let group_openid = Tools.getUrlParams('group_openid');
let bid = Tools.getUrlParams('bid');
let ad_id = Tools.getUrlParams('ad_id');
let comefrom= Tools.getUrlParams('from');
let external = Tools.getUrlParams('external');
let member_num = Tools.getUrlParams('member_num');


dataManager.user_id = user_id;
dataManager.group_openid = group_openid;
dataManager.bid = bid;
dataManager.ad_id = ad_id;
dataManager.comefrom = comefrom;
dataManager.external = external;
dataManager.member_num = member_num; //群人数


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
