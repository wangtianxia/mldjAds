/**
 * Created by Bkz on 2018/8/11.
 */


let tool = require('./tools');

var score = function () {
    this.score = '0';
    this.text = null;
    this.storeName = '';
    this.loader = null;
    this.father = null;
};

var s = score.prototype;

s.createScore = function (text,storeName,loader,father) {
    this.score = text+'';
    this.storeName = storeName;
    this.loader = loader;
    this.father = father;


    let tools = new tool();
    let tempScore = this.text = tools.getBitmapText(this.score,this.storeName, this.loader);
    let width = tempScore.width;
    tempScore.x = 750 - width - 20;
    tempScore.y = 20;
    this.father.addChild(tempScore);
};

s.updateScore = function(text){
    if(this.text){
        if(this.text.parent){
            this.text.parent.removeChild(this.text);
            this.createScore(text,this.storeName, this.loader,this.father);
        }
    }
};


module.exports = score;
