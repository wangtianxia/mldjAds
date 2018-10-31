/**
 * Created by Bkz on 2018/5/11.
 */
//拼图item
let jigsawItem =function() {
    this.shape = null;
    this.itemName = null;
    this.id = null;
    this.smallItemContainer = null;
    this.posX = 0;
    this.posY = 0;


    this.createItem = (itemName,px,py,father,loadFather,cb) =>{
        this.itemName = itemName;
        this.id = itemName;
        let container = this.smallItemContainer = new createjs.Container();
        container.x=px;
        container.y=py;
        container.width = 200;
        container.height = 200;
        father.addChild(container);
        this.posX = px;
        this.posY = py;
        let smallJigsaw =  this.getImgId(itemName,loadFather);
        container.addChild(smallJigsaw);
        container.addEventListener('click',()=>{
            cb(this.id)
        })
    };



    this.getImgId = (imgName,loadFather)=>{
        let bitmap = new createjs.Bitmap(loadFather.getResult(imgName));
        bitmap.width=bitmap.image.width;
        bitmap.height=bitmap.image.height;
        return bitmap;
    };

    this.createShapeSelect = ()=>{
        let graphics = new createjs.Graphics().beginStroke('#0000ff').setStrokeStyle(4).drawRect(0,0,196,196);
        this.shape = new createjs.Shape(graphics);
        this.smallItemContainer.addChild(this.shape);
    };

    this.exChangeTween = (target,x,y,time,cb)=>{
        createjs.Tween.get(target).to({x:x,y:y},time).call(()=>{
            if(cb){
                cb();
            }
        })
    }
};

module.exports =  jigsawItem;


