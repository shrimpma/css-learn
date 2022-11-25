var banna = document.getElementById("banana");
var textblock = document.getElementById("block1");
var container = document.getElementById("container");

banna.addEventListener("mouseover", handleMouseEvent);
banna.addEventListener("mouseout", handleMouseEvent);
textblock.addEventListener("mouseover", handleDescendantEvent, true);
textblock.addEventListener("mouseout", handleDescendantEvent, true);

textblock.addEventListener("mouseover",handleBubble,true);
textblock.addEventListener("mouseout",handleBubble,true);

function handleDescendantEvent(e) {
  console.log('1');
  if (e.type == "mouseover" && e.eventPhase == Event.CAPTURING_PHASE) {
    e.target.style.border = "10px solid red";
    e.currentTarget.style.border = "10px double red";
  } else if (e.type == "mouseout" && e.eventPhase == Event.CAPTURING_PHASE) {
    e.target.style.removeProperty("border");
    e.currentTarget.style.removeProperty("border");
  }

//   e.stopPropagation();
 
}

function handleMouseEvent(e) {
    console.log('2');
  if (e.type == "mouseover") {
    e.target.style.color = "red";
  } else {
    e.target.style.removeProperty("color");
    e.target.style.removeProperty("background");
  }
}


function handleBubble(e){
    console.log('e:',e);
    if(e.type == 'mouseover' && e.eventPhase == Event.BUBBLING_PHASE){
        e.target.style.textTransform ="uppercase";
    }else if(e.type == 'mouseout' && e.eventPhase == Event.BUBBLING_PHASE){
        e.target.style.textTransform ="none";
    }
}


/*
capature  捕获

target  目标


bubble  冒泡 
   <div onclick="alert('The handler!')">
        <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
      </div>



*/ 