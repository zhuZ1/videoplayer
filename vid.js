var oplay = document.querySelector(".left-play")
var obtn = document.querySelector(".btn")
var otop = document.querySelector(".con-top")
var opro = document.querySelector(".pro")
var ofull = document.querySelector(".right-full")
var ocurrent = document.querySelector(".current")
var ototal = document.querySelector(".total")
var mark = true
var timer = null
ofull.onclick = function() {
    vid.webkitRequestFullScreen();  //视频全屏
}
oplay.onclick = function() {
    if(mark) {
        vid.play()
        timer = setInterval(nowTime, 1000)
    } else {
        vid.pause()
    }
    mark = !mark
}
function nowTime() {
    var n = vid.currentTime / vid.duration
    obtn.style.left = n * otop.offsetWidth + 'px'
    opro.style.width =  n * otop.offsetWidth + 'px'
}
obtn.onmousedown = function(e) {
    var x = e.clientX - this.offsetLeft
    document.onmousemove = function (e) {
        var _left = e.clientX - x
        obtn.style.left = _left + 'px'
        opro.style.width = _left + 'px'
        n = _left / otop.offsetWidth
        vid.currentTime = n * vid.duration
        nowTime()
        if(_left > otop.offsetWidth) {
            _left = otop.offsetWidth
        } else if(_left < 0) {
            _left = 0
        }
    }
    document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
    }
}
vid.oncanplay = function() {
    tTime = vid.duration;  //获取视频总时长(单位秒)
    var tTimeStr = getTimeStr(tTime);
    ototal.innerHTML = tTimeStr;
}

//当视频当前播放时间更新的时候
vid.ontimeupdate = function() {
    var cTime = vid.currentTime;  //获取当前播放时间
    var cTimeStr = getTimeStr(cTime);
    console.log(cTimeStr);
    ocurrent.innerHTML = cTimeStr;
    opro.style.width = cTime / tTime * 100 + '%';
}
//将以秒为单位的时间变成“00:00:00”格式的字符串
function getTimeStr(time) {
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 60);
    h = h >= 10 ? h : "0" + h;
    m = m >= 10 ? m : "0" + m;
    s = s >= 10 ? s : "0" + s;
    return h + ":" + m + ":" + s;
}
otop.onclick= function(e) {
    var left = e.offsetX
    obtn.style.left = left + 'px'
    opro.style.width = left + 'px'
    var n = e.offsetX / otop.offsetWidth
    vid.currentTime = n * vid.duration
    nowTime()
    if(_left > otop.offsetWidth) {
        _left = otop.offsetWidth
    } else if(_left < 0) {
        _left = 0
    }
}
vid.onended = function() {
    vid.currentTime = 0
}