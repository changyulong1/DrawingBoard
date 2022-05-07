let canvas = document.getElementById('canvas')
let colorList = document.getElementById('optionColor')
let remove = document.getElementById('remove')
let clear = document.getElementById('clear')
let color = document.getElementsByClassName('color')[0]
let choice = document.getElementById('color')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

let ctx = canvas.getContext("2d");
let x = false
let s = false
ctx.fillStyle = "#000";
ctx.strokeStyle = 'none';
ctx.lineWidth = 8;
ctx.lineCap = "round";
let xian;
function hua(x, y, x1, y1) {
    if (s) {
        ctx.lineWidth = 40;
        ctx.strokeStyle = 'white'
        ctx.fillStyle = 'white'
    } else {
        ctx.lineWidth = 8;
    }
    ctx.beginPath()
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke()
}
let isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        xian = [x, y]
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        hua(xian[0], xian[1], x, y)
        xian = [x, y]

    }
} else {
    canvas.onmousedown = (e) => {
        document.body.className = "active"
        x = true
        xian = [e.clientX, e.clientY]
    }
    canvas.onmousemove = (e) => {
        if (x === true) {
            hua(xian[0], xian[1], e.clientX, e.clientY)
            xian = [e.clientX, e.clientY]
        } else {

        }
    }
    canvas.onmouseup = () => {
        x = false
    }
}
function drawCricle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}
colorList.onclick = (e) => {
    const target = e.target
    if (target.tagName === "LI") {
        s = false
        const style = getComputedStyle(e.target)
        console.log(ctx.strokeStyle)
        ctx.strokeStyle = style.backgroundColor
        color.style.backgroundColor = style.backgroundColor
        console.log(ctx.strokeStyle)
    }
}
remove.onclick = () => {
    s = true
}
clear.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
color.onclick = () => {
    choice.onchange = function () {
        color.style.backgroundColor = this.value
        ctx.strokeStyle = this.value
    }
}
