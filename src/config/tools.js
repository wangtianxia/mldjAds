import imgData from './data'

let tools = function () {
}
/**
 * 获取截取图片
 * @param name 截取区域名称
 * @param animationName 分组名称
 * @param dataName 数据名称
 * @param scale 缩放比
 * @returns {*}
 */
tools.getImageFromDatas = function (name, dataName, scale) {
    let spd = cg.store || {}
    if (!spd[dataName]) return {}
    let dataObject = spd[dataName]

    let imgName = dataObject.file.slice(0, -4)
    if (!dataObject.frames) return
    let data = dataObject.frames || {}
    if (!imgName || !cg.loader.getResult(imgName)) return
    let img = cg.getBitmapFromLoader(imgName, scale), x = data[name].x, y = data[name].y, w = data[name].w,
        h = data[name].h
    // 防止截取区域超出
    if (img.image.width < (x + w)) w = img.image.width - x
    if (img.image.height < (y + h)) h = img.image.height - y
    img.sourceRect = new createjs.Rectangle(x, y, w, h)
    img.width = w
    img.height = h
    img.offX = data[name].offX
    img.offY = data[name].offY
    img.sw = w * (scale || 1)
    img.sh = h * (scale || 1)
    return img
}

/**
 * 获取图片文字
 * @param text
 * @param storeName
 * @returns {*}
 */
tools.getBitmapText = function (text, storeName, loader) {
    let store = {}
    let spd = imgData || {}
    if (!spd[storeName]) return null
    store = spd[storeName]
    let imgName = store.file.substring(0, store.file.indexOf('.'))
    let data = {
        images: [loader.getResult(imgName)],
        animations: {},
        frames: []
    }, index = 0

    for (let key in store.frames) {
        let f = store.frames[key]
        data.frames.push([f.x, f.y, f.w, f.h, 0, f.offX, f.offY])
        data.animations[key] = {frames: [index]}
        index++
    }
    store = data
    let ss = new createjs.SpriteSheet(store)
    let bt = new createjs.BitmapText(text.toString(), ss)
    let b = bt.getBounds() || {}
    bt.width = b.width || 0
    bt.height = b.height || 0

    bt.changeText = function (text) {
        this.text = text
        let b = this.getBounds() || {}
        this.width = b.width || 0
        this.height = b.height || 0
    }
    return bt
};

export default tools
