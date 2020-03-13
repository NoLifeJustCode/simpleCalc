var isClick=false;
                    var validKeys=['+','-','*','=','.','/']
                    var stack=[],rear=-1
                    var isFloat=false;
                    var context_active="context-active"
                    var menuVisible=false;
                    var cellCount=4
                    var op=[]
                    op['+']=add
                    op['-']=sub
                    op['*']=mul
                    op['/']=div
                    function createLi(id,text,isColorPicker){
                        var li=document.createElement('li')
                        var a=document.createElement('a')
                        var input=null;
                        if(isColorPicker==true){
                            input=document.createElement('input')
                            input.type="color"
                            input.style="position: absolute; display: none;"
                        }
                        li.classList.add('context-items')
                        li.id=id;
                        a.href="#"
                        a.classList.add('item_link')
                        a.innerText=text
                        li.appendChild(a)
                        if(input!=null){
                            li.appendChild(input)
                        }
                        return li;
                    }
                    function navCreate(){
                        var nav=document.createElement('nav');
                        var ul=document.createElement('ul')
                        ul.classList.add('context-menu')
                        nav.classList.add('context')
                        nav.id="contextId"
                        nav.appendChild(ul)
                        ul.appendChild(createLi("keysColor","keysColor",true))
                        ul.appendChild(createLi("dispColor","display Color",true))
                        ul.appendChild(createLi("fontColor","font Color",true))
                        ul.appendChild(createLi("addButton","addButton",false))
                        ul.appendChild(createLi("settings","settings",false))
                        document.body.appendChild(nav);
                        document.getElementById('contextId').addEventListener('contextmenu',function(event){
                        event.preventDefault();
                        event.stopPropagation();
                    })
                     document.getElementById('settings').addEventListener('click',function(){
                            menuOff();
                        document.getElementById('setting').style.display="block"
                        })
                    var li=document.getElementById('keysColor')
                    li.children[1].addEventListener('change',keysColor)
                    li.addEventListener('click',keysColorPicker)
                     li=document.getElementById('dispColor')
                    li.children[1].addEventListener('change',dispColor)
                    li.addEventListener('click',dispColorPicker) 
                     li=document.getElementById('fontColor')
                    li.children[1].addEventListener('change',fontColor)
                    li.addEventListener('click',fontColorPicker)
                    document.getElementById('addButton').addEventListener('click',function(event){
                        menuOff()
                        document.getElementById('textEditor').style.display="block";
                        document.getElementById('textEditor').focus()
                    })
                    }
                    function textEditor(){
                        var div=document.createElement('div')
                        var textarea=document.createElement('textarea')
                        var button=document.createElement('button')
                        div.id="textEditor";
                        textarea.id="functionDef"
                        button.setAttribute('id','submitCode');
                        button.innerText="submit"
                        // document.body.insertAdjacentElement('afterBegin',div);
                        document.body.appendChild(div)
                        div.appendChild(textarea);
                        div.appendChild(button);
                        button.addEventListener('click',function(event){
                        var a=new Function("return "+document.getElementById('functionDef').value)();
                        console.log(a)
                        addButton("Ac",'click',a)
                        div.style.display="none";
                    })
                   
                    }
           
      
                    function createLayoutSelector(table,rows,cols){
                            var tbody=table.tBodies[0];
                            for(var i=0;i<rows;i++){
                                var row=tbody.insertRow();
                                for(var j=0;j<cols;j++){
                                        var cell=row.insertCell()
                                        cell.classList.add('cellBlocks')
                                }
                            }
                    }
                    function settings(){
                        var containerDiv=document.createElement('div');
                        var closeButton=document.createElement('button')
                        var fontDiv=document.createElement('div')
                        var dimensionDiv=document.createElement('div')
                        var layoutDiv=document.createElement('div')
                        var layoutContainer=document.createElement('div')
                        var layoutTable=document.createElement('table')
                        var saveButton=document.createElement('button');
                        containerDiv.id="setting"
                        closeButton.innerText="X"
                        closeButton.classList.add("close")
                        fontDiv.classList.add("option")
                        fontDiv.innerHTML='font-size&nbsp:<input id="font-size" type="number" max="30" min="5" style="width: 50px;">';
                        dimensionDiv.classList.add('option')
                        dimensionDiv.innerHTML='<h4>Calc Container Attributes</h4>\
                                               \width&nbsp:<input id="calcW">\
                                                \height&nbsp:<input id="calcH">';
                        layoutDiv.classList.add('option');
                        layoutDiv.innerHTML='<h4 style="position: relative;">Calc Layout <button id="i" style="position: absolute;left:40%">i</button>\
                                            <p id="pi" >\
                                            re design the keys layout of the calc<br>\
                                            by selecting the number of rows and cols \
                                             </p></h4>';
                        layoutContainer.classList.add('layout')
                        layoutTable.style.margin="auto";
                        layoutTable.style.marginBottom="10px";
                        layoutTable.createTBody()
                        createLayoutSelector(layoutTable,6,6);
                        layoutContainer.appendChild(layoutTable);
                        
                        layoutDiv.appendChild(layoutContainer)
                        layoutDiv.innerHTML+='No of rows &nbsp :&nbsp<input id="rowInput" type="number" style="width: 50px;">\
                                              No of cols &nbsp :&nbsp<input id= "colInput" type="number" style="width: 50px;">'
                        saveButton.id="save"
                        saveButton.style="position: absolute;bottom: 10%;right: 10%;"
                        saveButton.innerHTML="save"
                        
                        document.body.appendChild(containerDiv)
                        containerDiv.appendChild(closeButton)
                        containerDiv.appendChild(fontDiv)
                        containerDiv.appendChild(dimensionDiv)
                        containerDiv.appendChild(layoutDiv)
                        containerDiv.appendChild(saveButton)
                       
                    document.getElementById('i').addEventListener('click',function(event){
                        toggleHide(document.getElementById('pi'))
                    })
                    document.getElementById('save').addEventListener('click',saveChanges)
                    
                    
                    var cellBlocks=document.getElementsByClassName('cellBlocks')
                    for(var celli=0;celli<cellBlocks.length;celli++)
                        {
                            cellBlocks[celli].addEventListener('mouseover',layoutHover)
                            cellBlocks[celli].addEventListener('mouseout',layoutOut)
                            cellBlocks[celli].addEventListener('click',layoutClick)
                        }
                     
                        closeButton.addEventListener('click',closeEvent)
                    }
                    function createCalc(){
                    var table= document.createElement('table')
                    var rowCount=4
                    table.id='calc';
                    table.createTBody()
                    document.getElementById('calcContainer').appendChild(table)
                    createTextArea(table)
                    for(var i=0;i<rowCount;i++)
                        createRow(table,4)
                    console.log('creating rows')
                    var rows=table.rows
                    var ButtonText=['7','8','9','+','4','5','6','-','1','2','3','*','0','.','/','=']
                    addButtons(rows,'events',ButtonText,1)
                    
                    }
                    function createTextArea(table){
                    var cell=table.insertRow().insertCell()
                    
                    cell.colSpan=4
                    var textArea=document.createElement('textArea')
                    cell.insertAdjacentElement('afterBegin',textArea)
                    textArea.id='disp'
                    textArea.addEventListener('keypress',validate)
                    }
                    function createRow(table,cellCount){
                    var row=table.insertRow()
                    for(var i =0;i<cellCount;i++)
                        row.insertCell();
                    console.log('exiting')
                    }
                    function addButtons(rows,className,ButtonText,startIndex){
                    
                        for(var i=startIndex,BT=0;i<rows.length;i++){
                        var cells=rows[i].cells
                        for(var j=0;j<cells.length;j++,BT++){
                        var Button=document.createElement('Button')
                        Button.className=className
                        Button.addEventListener('click',keysValidate)
                        Button.appendChild(document.createTextNode(ButtonText[BT]))
                        cells[j].insertAdjacentElement('afterBegin',Button)
                        }
                    }
                    }
                   
                    function isOP(key){
                            for(var i in validKeys)
                                if(validKeys[i]==key)
                                return true;
                            return false;
                            }
                    function keysValidate(event){
                        var textarea=document.getElementById('disp')
                        var buttonText=event.target.textContent;
                        if(evaluate(buttonText)){
                            textarea.value=textarea.value+buttonText;
                        }else if(buttonText=='.'&&!isFloat){
                            isFloat=true;
                            textarea.value=textarea.value+buttonText;
                        }
                    }
                    function validate(event){
                        if(event.key>='0'&&event.key<='9'||(isOP(event.key))){
                            if(event.key=='.'){
                            if(isFloat)
                            { event.preventDefault();
                                return false;
                            }
                            isFloat=true;
                            }
                            evaluate(event.key)
                            if(event.key!='=')  
                                return true;
                        }
                        event.preventDefault();
                        return false;
                        }
                    function evaluate(key){
                            var textarea=document.getElementById('disp');
                            console.log(key)
                            var value=textarea.value;
                            if(value=="")
                                value=0
                            if((!isOP(key)&&!isOP(value)))
                                return true;
                            if(key=='.'||(isOP(value)&&isOP(key)))
                                return false;
                            stack[++rear]=value;
                            if(isOP(key)&&key!='=')
                                isFloat=false;
                            textarea.value="";
                            if(rear==2)
                                calculate();
                            if(key=='=')
                            {
                                textarea.value=stack[rear--];
                                return false;
                            }
                            return true;
                    }
                    function calculate(){
                        console.log(stack,rear)
                        var second=parseFloat(stack[rear--]),operator=stack[rear--],first=parseFloat(stack[rear--])
                        
                        stack[++rear]=op[operator](first,second)
                        }
                    function add(first,second){
                        return first+second
                        }
                    function sub(first,second){
                        return add(-first,second)
                        }
                    function mul(first,second){
                        return first*second
                        }
                    function div(first,second){
                        return mul(first,1/second)
                        }
                    function keysColor(event){
                            console.log(event)
                            var keys=document.getElementsByClassName('events')
                            for(var i=0;i<keys.length;i++){
                                keys[i].style.backgroundColor=event.target.value;
                            }
                       }
                     function keysColorPicker(){
                        var color_picker=document.getElementById('keysColor').children[1]
                        console.log(color_picker)
                        menuOff()
                        color_picker.focus();
                        click=false;
                        color_picker.click();
                        
                        
                        }
                        function dispColor(event){
                            var disp=document.getElementById('disp')
                            disp.style.backgroundColor=event.target.value;
                       }
                     function dispColorPicker(){
                        var color_picker=document.getElementById('dispColor').children[1]
                        menuOff();
                        console.log(color_picker)
                        color_picker.focus();
                        click=false;
                        color_picker.click();
                        
                        
                        } 
                        function fontColor(event){
                            console.log(event)
                            var keys=document.getElementsByClassName('events')
                            for(var i=0;i<keys.length;i++){
                                keys[i].style.color=event.target.value;
                            }
                       }
                     function fontColorPicker(){
                        var color_picker=document.getElementById('fontColor').children[1]
                        menuOff()
                        console.log(color_picker)
                        color_picker.focus();
                        click=false;
                        color_picker.click();
                        
                        
                        }
                    function getValidXY(windowH,windowW,x,y,menuH,menuW){
                        var menuPosition={}
                        menuPosition.x=x
                        menuPosition.y=y
                        console.log(windowH,windowW)
                        console.log(y,x)
                        console.log(menuH,menuW)
                        console.log(windowH-y,windowW-x)
                        if(windowH-y<menuH){
                            console.log("menuH")
                            menuPosition.y=windowH-menuH-4;
                        }
                        if(windowW-x<menuW){
                            menuPosition.x=windowW-menuW-4;
                        }
                        
                        return menuPosition
                    }
                    function menuOn(event){
                        event.preventDefault();
                        var containerElement=null
                        var contextElement=document.getElementById('contextId')
                        console.log(event)
                        for (var i =0;i<event.path.length;i++)
                            if(event.path[i].id=='calcContainer')
                                {
                                    containerElement=event.path[i];
                                    break;
                                }
                        var menuPosition=null;
                                                        
                        if(!menuVisible){
                            contextElement.classList.add(context_active);
                            menuVisible=!menuVisible;
                            
                        }
                        if(containerElement){
                            menuPosition=getValidXY(containerElement.offsetHeight,containerElement.offsetWidth,event.clientX,event.clientY,contextId.offsetHeight,contextId.offsetWidth)

                        }
                        if(menuPosition){
                                contextElement.style.left=menuPosition.x+"px"
                                contextElement.style.top=menuPosition.y+"px"
                                console.log(menuPosition)
                            }
                    }
                    function menuOff(){
                        if(menuVisible){
                            document.getElementById('contextId').classList.remove(context_active);
                            menuVisible=!menuVisible;
                        }
                    }
                    function getFunction(){
                        var func=document.getElementById('functionDef')
                    }
                    function addButton(ButtonText,eventType,eventHandler){
                        var button=document.createElement('button')
                        var row=document.getElementById('calc').tBodies[0].lastChild
                        button.innerText=ButtonText
                        if(row.cells.length==cellCount){
                            document.getElementById('calc').insertRow();
                            row=document.getElementById('calc').tBodies[0].lastChild
                        }
                        console.log(row)
                        row.insertCell().appendChild(button)
                        button.classList.add('events')
                        button.addEventListener(eventType,eventHandler)
                    }
                    function closeEvent(event){
                        var parent=event.srcElement
                        isClick=false;
                        layoutOut(event)
                        while(parent.id!="setting"){
                            console.log(parent)
                            parent=parent.parentNode
                        }
                        parent.style.display="none"
                    }
                    function layoutHover(event){
                        console.log("layoutHover",isClick)
                        if(isClick==true)
                            return;
                        var colIndex=event.srcElement.cellIndex,rowIndex=event.srcElement.parentNode.rowIndex
                        var table=null,temp=event.srcElement;
                        var rowInput=document.getElementById('rowInput'),colInput=document.getElementById('colInput');
                        rowInput.value=rowIndex+1;
                        colInput.value=colIndex+1;
                        while(!(temp instanceof HTMLTableSectionElement))
                            temp=temp.parentNode
                        for(var i=0;i<=rowIndex;i++){
                            for(var j=0;j<=colIndex;j++){
                                    temp.rows[i].cells[j].classList.add('grey');
                            }
                        }
                    }
                    function layoutOut(event){
                        console.log("layoutOut",isClick)
                        if(isClick==true)
                            return;
                        var grey=document.getElementsByClassName('cellBlocks')
                        var rowInput=document.getElementById('rowInput'),colInput=document.getElementById('colInput');
                        rowInput.value="";
                        colInput.value="";
                        for(var i=0;i<grey.length;i++)
                            grey[i].classList.remove('grey')
                    }
                    function increaseFontSize(element,size){
                        element.style.fontSize=size+"px";
                    }
                    function toggleHide(element){
                        var display={
                            'none':'inline-block',
                            'inline-block':'none'
                        };
                        var value=element.style.display;
                        if(!display[value])
                            value='inline-block';
                        
                        element.style.display=display[value]
                    }
                    function changeDimension(element,height,width){
                        element.style.width=width+"px";
                        element.style.height=height+"px";
                    }
                    function changeLayout(tbody,rows,cols,cells){
                                var index=0;
                                tbody.rows[0].cells[0].colSpan=cols;
                                for(var i=0;index<cells.length&&i<rows;i++){
                                            var row=tbody.insertRow()
                                            for(var j=0;index<cells.length&&j<cols;j++,index++){
                                                    row.appendChild(cells[index])
                                            }
                                }
                            }
                    
                    function reconstructTable(rows,cols){
                        console.log("reconstruct")
                        var table=document.getElementById('calc').tBodies[0]
                        var index=0;
                        var cells=[];
                        for(var i=1;i<table.rows.length;i++){
                            for(var j=0;j<table.rows[i].cells.length;j++,index++)
                                {
                                    cells[index]=table.rows[i].cells[j]
                                }
                        }
                        for(var i=1;i<table.rows.length;i++){
                            for(var j=0;j<table.rows[i].cells.length;j++,index++)
                                {
                                    table.rows[i].deleteCell(0)
                                }
                        }
                        console.log(cells)
                        while(table.rows.length>1){
                            table.deleteRow(1)
                        }
                        changeLayout(document.getElementById('calc'),parseFloat(rows),parseFloat(cols),cells)
                    }
                    
                    function layoutClick(event){
                        var colIndex=event.srcElement.cellIndex,rowIndex=event.srcElement.parentNode.rowIndex
                        console.log(isClick)
                        //layoutOut(event);
                        isClick=!isClick;
                        console.log('layoutClick',isClick)
                        layoutHover(event);
                        
                    }
                    function saveChanges(event){
                        var row =document.getElementById('rowInput').value;
                        var col =document.getElementById('colInput').value;
                        var fontSize=document.getElementById('font-size').value;
                        var calcW=document.getElementById('calcW').value
                        var calcH=document.getElementById('calcH').value
                        closeEvent(event)
                        if(row!=""&&col!="")
                            reconstructTable(row,col)
                        if(calcH!=""&&calcW!=""){
                            document.getElementById('calcContainer').style.width=calcW+"px";
                            document.getElementById('calcContainer').style.height=calcH+"px";
                        }
                        if(fontSize!="")
                        {
                           fontSize+="px"
                           var temp=document.getElementsByClassName('events')
                           for(var i=0;i<temp.length;i++)
                            temp[i].style.fontSize=fontSize 
                        }
                        isClick=false;
                    }
                    document.getElementById('calcContainer').addEventListener('contextmenu',menuOn);
                                                             
                    window.onload=function(){
                         
                        createCalc();
                        settings();
                        textEditor();
                        navCreate();
                    };    
                    /*

                    
var validKeys=['+','-','*','=','.','/']
var stack=[],rear=-1
var isFloat=false;
var color_picker=document.getElementById('color-picker')
var click=false;
var op=[]
op['+']=add
op['-']=sub
op['*']=mul
op['/']=div
var contextEvents=[];
contextEvents['keysColor']=keysColor;

function createCalc(){
  var table= document.createElement('table')
  table.id='calc';
  table.createTBody()
  document.getElementById('calcContainer').insertAdjacentElement('afterBegin',table)
  createTextArea(table)
  for(var i=0;i<5;i++)
    createRow(table,4)
  var rows=table.rows
  rows.shift()
  addButtons()
  
}
function createTextArea(table){
  var cell=table.insertRow().insertCell()
  var textArea=document.createElement('textArea')
  textArea.addEventListener('keydown',validate)
  cell.insertAdjacentElement('afterBegin',textArea)
  textArea.id='disp'
}
function createRow(table,cellCount){
  var row=table.insertRow()
  for(var i =0;i<cellCount;i++)
    row.insertCell();
}
function addButtons(rows,className,ButtonText){
  
 	for(var i=0,BT=0;i<rows.length;i++){
    var cells=rows[i].cells
    for(var j=0;j<cells.length;j++,BT++){
      var Button=document.createElement('Button')
      Button.className=className
      Button.appendChild(document.createTextNode(ButtonText[BT]))
      cells[j].insertAdjacentElement('afterBegin',Button)
    }
  }
}

function validate(event){
  if(event.key>='0'&&event.key<='9'||(isOP(event.key))){
    if(event.key=='.'){
      if(isFloat)
       { event.preventDefault();
        return false;
       }
      isFloat=true;
    }
    evaluate(event.key)
    if(event.key!='=')  
    	return true;
  }
  event.preventDefault();
  return false;
}
function evaluate(key){
  var textarea=document.getElementById('disp');
  console.log(key)
  var value=textarea.value;
  if(value=="")
    value=0
  if((!isOP(key)&&!isOP(value)))
    return true;
  if(key=='.'||(isOP(value)&&isOP(key)))
    return false;
  stack[++rear]=value;
  textarea.value="";
  if(rear==2)
    calculate();
  if(key=='=')
  {
    textarea.value=stack[rear--];
    return false;
  }
  return true;
}
 function calculate(){
  console.log(stack,rear)
  var second=parseFloat(stack[rear--]),operator=stack[rear--],first=parseFloat(stack[rear--])                      
  stack[++rear]=op[operator](first,second)
}
function add(first,second){
  return first+second
}
function sub(first,second){
  return add(-first,second)
}
function mul(first,second){
  return first*second
}
function div(first,second){
  return mul(first,1/second)
}
function keysValidate(event){
  var textarea=document.getElementById('disp')
  var buttonText=event.target.textContent;
  if(evaluate(buttonText)){
    textarea.value=textarea.value+buttonText;
  }else{
    console.log(false)
  }
}
/*
 * Context Menu
 
function keyColorPicker(){
    var color_picker=document.getElementById('keysColor').children[1]
    console.log(color_picker)
    color_picker.focus();
    click=false;
    color_picker.click();
    
    
  }
  
  //document.body.insertAdjacentElement('beforeend',context);
  
  color_picker.addEventListener('change',function(event){
    console.log(event)
  });
  
  function keysColor(event){
    console.log(event)
    var keys=document.getElementsByClassName('events')
    for(var i=0;i<keys.length;i++){
      keys[i].style.backgroundColor=event.target.value;
    }
  }
  console.log(a)
  
     */               