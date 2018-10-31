/**
 * Created by Bkz on 2018/8/11.
 */
let tool = require('./tools');
var missAndNice = function () {
    this.closeTime = 1000;
    this.y = 300;
};

var m = missAndNice.prototype;

m.createItem = function (id,queue,father,score) {
    let tools = new tool();
    let item = tools.getImageFromDatas(id,'game',1,queue);
    let container = new createjs.Container();
    container.x = (750 - 346)/2 +346/2;
    container.y = this.y;
    container.alpha = 0;
    container.scaleX =3;
    container.scaleY = 3;
    container.addChild(item);
    container.regX = 346>>1;
    container.regY = 186>>1;

    if(score){
        let tools = new tool();
        let tempScore = this.text = tools.getBitmapText('+'+score+'','number', queue);
        tempScore.x = 300;
        tempScore.y = (206-tempScore.height)/2;
        container.addChild(tempScore);
    }

    this.createAnimateAc(container);
    father.addChild(container);
};

m.createAnimateAc = function(item){
    createjs.Tween.get(item)
        .to({scaleX:1,scaleY:1},300).wait(this.closeTime).call(function () {
            if(item.parent){
                item.parent.removeChild(item);
            }
        });

    createjs.Tween.get(item)
        .to({alpha:1},300)
}


module.exports = missAndNice;