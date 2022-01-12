const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = "500";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//default로 먼저 컨버스 배경을 흰색으로 한다.
//default를 설정 안했더니 이미지를 다운로드 할 때 투명으로 됨
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}
 
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath(); //path는 선이다
        ctx.moveTo(x, y);
    } else {
        //마우스를 움직이는 내내 계속 발생 (마우스를 누르고 움직을 때) 
        ctx.lineTo(x, y);
        ctx.stroke(); //현재의 sub-path를 현재의 stroke style로 획을 그음
    }
    
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange (event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick (){
    if(filling ===true){
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick () {
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM (event) {
    event.preventDefault(); //우클릭 방지
}

function handleSaveClick (event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseLeave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//Array.from() 메소드는 object로부터 array를 만든다.
//color 이름은 potato로 해도 상관 없음
//ex) Array.from(colors).forEach(potato => potato.addEventListener("click", handleColorClick)); 
//이건 그냥 그 array 안에 있는 각각의 아이템들을 대표하는 것뿐이다.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}