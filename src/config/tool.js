export default{
    /**
     * 解码
     * @param {*} str
     */
    hexToDec(str){
        str = str.replace(/\\/g, "%");
        return this.htmlDecode(unescape(str));
    },

    /**
     * 编码
     * @param {*} str
     */
    decToHex(str){
        var res = [];
        for (var i = 0; i < str.length; i++)
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        return "\\u" + res.join("\\u");
    },

    /**
     * 格式化字符串
     * @param {*} str
     */
    forMateStar(str){
       return this.htmlDecode(str);
    },

    /**
     * html实体转换
     * @param {*} str
     */
    htmlDecode(str) {
        var s = "";
        if (str.length == 0) return s;
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    },

    /**
     * 获取对象长度
     * @param {*} obj
     */
    getObjLen(obj){
        let len = false;
        for(let i in obj){
            len = true;
        }
        return len;
    },

    /**
     * 获取对象长度
     * @param {*} obj
     */
    getObjMaxLen(obj){
        let len = 0;
        for(let i in obj){
            len += 1;
        }
        return len;
    },
    /**
     * 获取url 参数
     * @param {*} name
     */
    getUrlParams(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    },

    /**
     * 计算长度
     * @param {*} str
     */
    getStrLen(str){
        let len=0;
        for(let i in str){
            if(str.charCodeAt(str[i]) > 255){
                len+=2
            }else{
                len+=1;
            }
        }
        return len;
    },

    /**
     * 是不是iphone
     */
    isIphone(){
        var s = navigator.userAgent.toLowerCase();
        if (s.indexOf("iPhone") > -1 || s.indexOf("iPad") > -1 || s.indexOf("iphone") > -1) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 分享到群里
     * @param {*} obj
     * @param {*} cb
     */
    shareInGroup(obj,cb){
        window.openGroup.share({
            appid: obj.appid,
            openid: obj.openid,
            group_openid: obj.group_openid,
            title: obj.title,
            desc: obj.desc,
            share_url: obj.share_url,
            image_url: obj.image_url,
            onSuccess(){
                if(cb && typeof cb === 'function'){
                    cb('ok');
                }
            },
            onCancel(){
                if(cb && typeof cb === 'function'){
                    cb('cancel');
                }
            },
            onError(){
                if(cb && typeof cb === 'function'){
                    cb('err');
                }
            }
        })
    }
}
