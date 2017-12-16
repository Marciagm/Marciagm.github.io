## Canvas
canvas最早由Apple引入WebKit，用于Mac OS X的Dashboard，后来Safari和Google Chrome也实现了。

* canvas画布默认为300px*150px，可以通过width和height样式改变。
* canvas只有width和height两个属性，没有src或者alt这些
* canvas的宽高比例如果和原始比例不同，会出现扭曲（宽高2:1）（作为属性的宽高和作为样式的宽高区别？？？）
* 退化方案：当浏览器不支持canvas标签的时候，直接在canvas标签中给出提示即可。
* 在绘图前需要知道是2d还是3d绘图，所以要先获取context
    
    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');

* 可以使用canvas.getContext判断browsers是否支持canvas标签
* top left corner坐标是(0, 0)向右x轴正向，向下y轴正向（此处应该有配图），父容器的左上角，不是页面的
### Shape
* 不像SVG，Canvas只提供了很少的形状，一个是rectangles矩形（其他图形用点、线绘制），有三个绘制矩形相关的方法（所以fillStyle不是方法啊，因为只有三个啊，而且这三个方法还是绘制环境的方法ctx）
    - fillRect(x, y, width, height)：填充
    - strokeRect(x, y, width, height)：画边框
    - clearRect(x, y, width, height)：透明化指定区域
* 另一个是path
    - beginPath：每次这个方法被调用，列表被清空重置，开始绘制新的图形。（closePath的时候也不会关上之前的path啦，moveTo也能起到隔离的效果）
    - Path methods
    - closePath: 闭合之后，绘制命令重新指向上下文（连接当前点和起始点）
    - stroke：使用closePath后再使用stroke就可以完成一个闭合的图形了（起点终点相连）
    - fill：当调用此方法时，没闭合的形状都会自动闭合，不需要再调用closePath
* rectangle的三个函数执行完，立刻生效，path相关的不行，还要下个指令：fill或者stroke
* arcs
    - arc(x, y, radius, startAngle, endAngle, anticlockwise)：默认是顺时针，因为默认就是不传这个字段，那这个字段就是false，anticlockwise的相反就是clockwise啊
    - arcTo(x1, y1, x2, y2, radius)：这个要利用到起始点，加上参数的两个点，一共三个点，起始点到端点以为一条边，断点一到端点二为另一条边，画半径为radius的圆和边一及边二相切，切点一和切点二组成的弧线，为所画最短的弧线（两个方向都可以，取最短的那个）。所以这个弧线不一定会经过这两个端点。（终于搞明白了）。必须要有起始点吗？是的，因为没有三个点，组不成两条边啊。
* rect: 绘制矩形，调用此方法后，moveTo(0, 0);
* Path2D：
* Bezier曲线（二次quadratic&三次cubic）
    - quadraticCurveTo(cp1x, xp1y, x, y)：
    - bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)：

### Styles and Colors
#### colors
* fillStyle
这是一个属性，不是一个方法。样式应用于填充。默认为black #000000
    
    ctx.fillStyle = 'orange';
    ctx.fillStyle = '#FFA500';
    ctx.fillStyle = 'rgb(255, 165, 0)';
    // a 从0.0(fully transparent)到1.0(fully opaque)
    ctx.fillStyle = 'rgba(255, 165, 0, 1)';

* strokeStyle
这是一个属性，不是一个方法。样式应用于轮廓。默认为black #000000

当你设置了一次fillStyle和strokeStyle（context）。后面会一直生效。

#### tranparency
* globalAlpha 
context的一个属性。负责fully transparent到fully opaque
* rgba()

#### Line styles(property)
样式等使用属性，动态使用方法（这个和设计对象的思想一致）
* lineWidth: self-explanatary 线的宽度。可以这么理解，只要有stroke的地方，这个就会生效。
半个像素，准确不准确那块，愣是没明白。
* lineCap：端点显示的样式（一条线的时候）
    - butt：默认样式，正常结束，
    - round：端点加了一个小半圆，圆的半径是lineWidth的一半。
    - square：端点加了一个小方块，方块的宽度和lineWidth相同，高度是lineWidth的一半。
* lineJoin：两个片段相交时的样式，比如两条线、两条弧、两条曲线。
    - round：小圆弧，半径是lineWidth的一半
    - bevel：
    - miter: 默认样式
* miterLimit：（lineJoin）两条线夹角大的时候，miter类型的样式看起来还行，当夹角小的时候，内外交点的距离就呈指数级增长，设置此属性，可以设置距离上限，当超过这个值的时候就用bevel样式。默认值为10.0。
    - 
* getLineDash(): 返回的是数组，且数组元素个数为偶数。（如果setLineDash为奇数，就再列一遍，如：setLineDash：[1, 3]  getLineDash: [1, 3]; setLineDash：[1, 2, 3]  getLineDash: [1, 2, 3, 1, 2, 3]）
* setLineDash(segments):根据segments内容，一个line一个gap
* lineDashOffset: 设置setLineDash生效开始位置

#### gradient
* createLinearGradient(x1, y1, x2, y2)
* createRadialGradient(x1, y1, r1, x2, y2, r2)
* gradient.addColorStop(position, color)
* ctx.fillStyle = gradient;

#### patterns
* createPattern(image, type): type as follow
    - repeat
    - repeat-x
    - repeat-y
    - no-repeat
like drawImage(),在使用前，要确保图片已经加载成功了：使用img.onload来确保。

#### shadows
* shadowOffsetX: float
* shadowOffsetY: float
* shadowBlur: float
* shadowColor: color
ctx.shadowXXXX： 所以作用域是整个环境

#### fill rules
* nonzero: default
* evenodd: 

### Drawing text
* fillText(text, x, y, [, maxWidth])
* strokeText(text, x, y, [, maxWidth])

maxWidth: text的最大宽度

相关样式
* font: default是'10px sans-serif'，字号+字体家族
* textAlign: 
    - start: default 和left什么区别？
    - end：和right什么区别？
    - left
    - right
    - center
* textBaseline
    - top
    - hanging
    - middle
    - alphabetic: default
    - ideographic
    - bottom
* direction
    - ltr
    - rtl
    - inherit: default

* measureText(): 返回textMetrics对象，包含width（pixels为单位）

### Using images
* canvas API可以获得如下任意一种图片资源
    - HTMLImageElement: Image()
    - SVGImageElement: <img>
    - HTMLVideoElement: <video>
    - HTMLCanvasElement: <canvas>


* 获取当前页面的图片
    - document.images
    - document.getElementsByTagName()
    - document.getElementById()


* 获取别的域名下的图片
    - HTMLImageElement.crossOrigin属性来设置


* 获取其他canvas元素
    - document.getElementsByTagName()
    - document.getElementById()
 使用最多的场景是，把第二个canvas当作缩略图


data:url
    * 好处是，字符串就是图片的内容，可以随意使用，不用关心路径问题
    * 坏处是，不能够cache起来，图片如果很大的话，字符串超长的


* 使用视频帧



    function getMyVideo() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            return document.getElementById('myvideo');
        }
    }

* drawImage(iamge, x, y): 在(x, y)绘制图片资源
* drawImage(image, x, y, width, height)
* drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight): 裁剪图片，position:(sx, sy) sWidth and sHeight是宽和高。(dx, dy)和dWidth和sHeight是最终的位置和尺寸。

24位PNG图片包括一个完整的8位alpha通道，与GIF和8位PNG图片不同，可以将它作为背景而不必担心底色问题。

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
关闭自动平滑图片的功能。















