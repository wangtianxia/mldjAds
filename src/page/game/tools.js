/**
 * Created by Bkz on 2018/8/11.
 */

let imageData = require('./imageData');

var tools  = function () {

};
var t = tools.prototype;

/**
 * 从集合图片中获取数组图片
 * @param text 数字
 * @param storeName 集合的名字
 * @returns {createjs.BitmapText}
 */
t.getBitmapText = function(text,storeName,loader){
    let store = {};
    let storeData = imageData[storeName];
    let data = {
        images:[loader.getResult(storeData.file.substring(0,storeData.file.indexOf(".")))],
        animations:{},
        frames:[]
    },index = 0;
    for(var key in storeData.frames){
        var f = storeData.frames[key];
        data.frames.push([f.x, f.y, f.w, f.h,0, f.offX, f.offY]);
        data.animations[key] = {frames:[index]};
        index++;
    }
    store = data;
    var ss = new createjs.SpriteSheet(store);
    var bt = new createjs.BitmapText(text.toString(), ss);
    var b = bt.getBounds()||{};
    bt.width = b.width||0;
    bt.height = b.height||0;
    bt.changeText = function (text) {
        this.text = text;
        var b = this.getBounds()||{};
        this.width = b.width||0;
        this.height = b.height||0;
    };
    return bt;
};


/**
 * 获取截取图片
 * @param name 截取区域名称
 * @param animationName 分组名称
 * @param dataName 数据名称
 * @param scale 缩放比
 * @returns {*}
 */
t.getImageFromDatas = function (name,dataName,scale,loader) {

    var dataObject = imageData[dataName];
    var imgName = dataObject.file.slice(0,-4);
    if(!dataObject.frames) return;
    var data = dataObject.frames || {};
    var img = this.createBitmap(imgName,scale,loader),x = data[name].x,y = data[name].y,w = data[name].w,h = data[name].h;
    //防止截取区域超出
    if(img.image.width < (x+w)) w = img.image.width - x;
    if(img.image.height < (y+h)) h = img.image.height - y;
    img.sourceRect = new createjs.Rectangle(x,y,w,h);
    img.width = w;
    img.height = h;
    img.offX = data[name].offX;
    img.offY = data[name].offY;
    img.sw = w*(scale||1);
    img.sh = h*(scale||1);
    return img;
}


t.createBitmap = function(name,scale,loader){
    var b = new createjs.Bitmap(loader.getResult(name));
    b.scaleX = b.scaleY = scale||1;
    b.sw = b.image.width*(scale||1)>>0;
    b.sh = b.image.height*(scale||1)>>0;
    b.width = b.image.width;
    b.height = b.image.height;
    return b;
};

module.exports = tools;
