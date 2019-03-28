/**
 * Created by hz on 2018/9/7.
 */


/**
*实心圆类
*/
class Disk {
    /**
     * 实心圆构造器
     * @param [Object] ctx 画布上下文对象
     * @param [Number] radius 实心圆半径
     * @param [String] fillStyle 实心圆颜色样式
     */
    constructor(ctx = null, radius = 10, fillStyle = "red") {
        this.ctx = ctx
        this.radius = radius
        this.fillStyle = fillStyle
    }

    /**
     * 实心圆绘制方法
     * @param [Number] cX 圆心X坐标
     * @param [Number] cY 圆心Y坐标
     */
    drawDisk(cX, cY) {
        this.ctx.beginPath()
        this.ctx.arc(cX, cY, this.radius, 0, 2 * Math.PI)
        this.ctx.fillStyle = this.fillStyle
        this.ctx.fill()
        this.ctx.closePath()
    }
}

/**
 * 刻度类
 */
class Scale {
    /**
     * 刻度构造器
     * @param [Object] ctx 画布上下文对象
     * @param [Number] count 刻度的个数
     */
    constructor(ctx = null, count = 600) {
        this.ctx = ctx
        this.count = count
    }

    /**
     * 刻度绘制方法
     * @param [Number] cX 刻度所在圆的圆心X坐标
     * @param [Number] cY 刻度所在圆的圆心Y坐标
     * @param [Number] radius 刻度所在圆的半径
     */
    drawScale(cX, cY, radius) {
        this.ctx.beginPath()
        for (var i = 0; i < this.count; i++) {
            this.ctx.moveTo(cX, cY)
            this.ctx.arc(cX, cY, radius, i * 2 * Math.PI / this.count, (i + 1) * 2 * Math.PI / this.count)
        }
        this.ctx.stroke()
        this.ctx.closePath()
    }
}
/**
 * 钟表指针类
 */
class Hand {
    /**
     * 钟表指针类构造器
     * @param [Object] ctx 画布上下文对象
     * @param [Number] length 指针长度
     * @param [Number] lineWidth 指针宽度
     * @param [String] strokeStyle 指针颜色样式
     */
    constructor(ctx = null, length = 20, lineWidth = 2, strokeStyle = "black") {
        this.ctx = ctx
        this.length = length
        this.lineWidth = lineWidth
        this.strokeStyle = strokeStyle
    }

    /**
     * 指针绘制方法
     * @param cX
     * @param cY
     * @param deg
     */
    drawHand(cX, cY, deg) {
        this.ctx.beginPath()
        this.ctx.moveTo(cX, cY)
        this.ctx.arc(cX, cY, this.length, deg, deg)
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.strokeStyle
        this.ctx.lineCap = "round"
        this.ctx.stroke()
        this.ctx.closePath()
    }
}
/**
 * 时间指示数字类
 */
class Number{
    constructor(num){
        this.num=num
    }
    drawNumber(){

    }

}

/**
 * 钟表类
 */
class Clock {
    /**
     * 钟表类构造器
     * @param [Object] ctx1 指针画布上下文对象
     * @param [Object] ctx2 表盘画布上下文对象
     * @param [Number] cX 钟表圆心X左标
     * @param [Number] cY 钟表圆心Y左标
     * @param [Number] radius 钟表半径
     */
    constructor(ctx1 = null, ctx2 = null, cX = 100, cY = 100, radius = 100) {
        this.ctx1 = ctx1
        this.ctx2 = ctx2
        this.cX = cX
        this.cY = cY
        this.radius = radius
        this.bigDisk = new Disk(this.ctx1, this.radius, "#ccc")
        this.midDisk = new Disk(this.ctx1, this.radius * 0.9, "white")
        this.smallDisk = new Disk(this.ctx1, this.radius * 0.8, "white")
        this.dotDisk = new Disk(this.ctx2, 5, "red")

        this.thinScale = new Scale(this.ctx1, 60)   /*60个细刻度*/
        this.wideScale = new Scale(this.ctx1, 12)   /*12个粗刻度*/

        this.hHand = new Hand(this.ctx2, this.radius * 0.5, 6)
        this.mHand = new Hand(this.ctx2, this.radius * 0.68, 4)
        this.sHand = new Hand(this.ctx2, this.radius * 0.8, 2, 'red')
    }

    /**
     * 钟表绘制方法
     */
    drawClock() {
        this.bigDisk.drawDisk(this.cX, this.cY)	                /*画底盘*/
        this.thinScale.drawScale(this.cX, this.cY, this.radius)		    	/*画60个细的刻度*/
        this.midDisk.drawDisk(this.cX, this.cY)	                /*画一个圆盘盖住细刻度的多余部分*/
        this.wideScale.drawScale(this.cX, this.cY, this.radius)		    	/*画12个粗的刻度*/
        this.smallDisk.drawDisk(this.cX, this.cY)	                /*画一个圆盘盖住粗刻度的多余部分*/
        //画表盘数字
        for(let i = 1; i < 13; i++){
            this.ctx1.fillStyle = "pink"
            this.ctx1.fillText(i+"",this.cX+70*Math.sin(i*Math.PI/6)-4,this.cY-70*Math.cos(i*Math.PI/6))
        }

        /**
         * 钟表指针重绘函数
         */
        let renewHand=()=> {
            var d = new Date()
            var h = d.getHours()
            var m = d.getMinutes()
            var s = d.getSeconds()
            //console.log(h,m,s)
            this.ctx2.clearRect(this.cX - this.radius, this.cY - this.radius, this.radius * 2, this.radius * 2)
            this.hHand.drawHand(this.cX, this.cY, h * 30 * Math.PI / 180 + m * 0.5 * Math.PI / 180 - 0.5 * Math.PI)	//时针
            this.mHand.drawHand(this.cX, this.cY, m * 6 * Math.PI / 180 - 0.5 * Math.PI)	//分针
            this.sHand.drawHand(this.cX, this.cY, s * 6 * Math.PI / 180 - 0.5 * Math.PI)	//秒针
            this.dotDisk.drawDisk(this.cX, this.cY)		            //画一个小圆点作为钟表的中心
        }
        renewHand()
        setInterval(renewHand, 1000)
    }
}






