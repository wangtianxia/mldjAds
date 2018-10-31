/**
 * Created by Bkz on 2018/8/11.
 */

let tool = require('./tools');
var gift = function () {
    this.cb=null
};

var b = gift.prototype;

b.createItem = function (id,queue,x,y,father,cb) {
    this.cb = cb;
    let tools = new tool();
    let img = tools.getImageFromDatas(id,'game',0.2,queue);
    img.regX = 263>>1;
    img.regY = 263>>1;
    img.x =x;
    img.y = y;
    this.createAnimate(img);
    father.addChild(img);
    img.addEventListener('click',function (e) {
        if(img.y>=800){
            if(cb){
                cb(true);
                if(img.parent){
                    img.parent.removeChild(img);
                }
            }
        }
    })
};

b.createAnimate = function(item){
    var self = this;
    createjs.Tween.get(item)
        .to({y:1200},3500)
        .call(function () {
            if(item.parent){
                if(self.cb){
                    self.cb(false)
                }
                item.parent.removeChild(item);
            }
        });
    createjs.Tween.get(item)
        .to({alpha:1,scaleX:1,scaleY:1},2000)
};

module.exports = gift;
