/**
 * Created by Bkz on 2017/11/15.
 */
// (function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if(clientWidth>750){
//                 clientWidth = 750
//             }
//             if (!clientWidth) return;
//             docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);



(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientHeight = docEl.clientHeight;
      if(clientHeight>1460){
        clientHeight = 1460
      }
      if (!clientHeight) return;
      docEl.style.fontSize = 100 * (clientHeight / 1460) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
