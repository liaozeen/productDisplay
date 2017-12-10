//获取一个元素
function getElem(selector){
    return document.querySelector(selector);
}
//获取所有元素
function getAllElem(selector){
    return document.querySelectorAll(selector);
}
//获取样式
function getClass(element){
    return element.getAttribute('class');
}
//设置样式
function setClass(element,cls){
    return element.setAttribute('class',cls);
}
//为元素添加样式
function addCls(element,cls){
    let baseCls = getClass(element);
    if(baseCls.indexOf(cls) === -1){
        setClass(element,baseCls+' '+cls);
    }
}
//为元素删除样式
function delCls(element,cls){
    let baseCls = getClass(element);
    if(baseCls.indexOf(cls) != -1){
        setClass(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));//这里使用正则将多个空格符替换成一个空格符
    }
}

//初始化样式
let screenAnimationElements = {
    '.screen_one':[
        '.text1',
        '.phone1',
        '.phoneShadow'
    ],
    '.screen_two':[
        '.screen2_title',
        '.screen2_text',
        '.screen2_img',
        '.label1',
        '.label2',
        '.label3'
    ],
    '.screen_three':[
        '.screen3_img',
        '.screen3_title',
        '.screen3_text',
        '.pane'
    ],
    '.screen_four':[
        '.screen4_title',
        '.screen4_text',
        '.item_one',
        '.item_two',
        '.item_three',
        '.item_four'
    ],
    '.screen_five':[
        '.screen5_title',
        '.screen5_text',
        '.screen5_img'
    ]
}
//所有有动画的元素都设置初始样式
function setAnimationInit(screenClass){
    let screen = document.querySelector(screenClass);
    let animationElements = screenAnimationElements[screenClass];

    for(let i=0;i<animationElements.length;i++){
        let element = document.querySelector(animationElements[i]);
        let baseClass = element.getAttribute('class');
        element.setAttribute('class',baseClass +' '+baseClass+'_init');
    }
}
//根据滚动条位置触发对应区域的动画
function switchAnimation(){
    let top = document.documentElement.scrollTop;

    if(top>-1){
        setAnimationDone('.screen_one');
        addActive('.item1');
    };
    if(top>599){
        setAnimationDone('.screen_two');
        addActive('.item2');
    };
    if(top>1199){
        setAnimationDone('.screen_three');
        addActive('.item3');
    };
    if(top>1799){
        setAnimationDone('.screen_four');
        addActive('.item4');
    };
    if(top>2399){
        setAnimationDone('.screen_five');
        addActive('.item5');
    };
}
//导航双向定位
//原方案是想给每个按钮添加点击事件，然后遍历所有按钮删除active属性，为特定的按钮添加active属性
//最终方案是利用window.onscroll方法，在滚动条特定的位置修改指定的按钮的样式
//最终方案比原方案代码更少，逻辑更简单清晰
function addActive(itemClass){
    let nav_item = getAllElem('.nav');
    let side_nav_item = getAllElem('.sidebar');
    let activeItem = getAllElem(itemClass);
    
    // 清除导航上所有按钮的active的class属性
    for( item of nav_item){
        delCls(item,'active');
    }
    for( item of side_nav_item){
        delCls(item,'side_active');
    }

   addCls(activeItem[0],'active');
   addCls(activeItem[1],'side_active');
}

//滚动到哪，哪里的动画就会触发
//设置元素的样式为done样式
function setAnimationDone(screenClass){
    let screen = document.querySelector(screenClass);
    let animationElements = screenAnimationElements[screenClass];
   
    for(let i=0;i<animationElements.length;i++){
        let element = document.querySelector(animationElements[i]);
        let baseClass = element.getAttribute('class');
        element.setAttribute('class',baseClass.replace('_init','_done'));
    }
}

//关闭购物窗口
function closeDialog(){
    getElem('.dialog_background').style.display = 'none';
    getElem('.dialog').style.display = 'none';
}
//显示购物窗口
function openDialog(){
    getElem('.dialog_background').style.display = 'block';
    getElem('.dialog').style.display = 'block';
}

//移除选项的checked样式
function removeChecked(selector){
    let allElem = getAllElem(selector);
    for(elem of allElem){
        delCls(elem,'checked');
    } 
}

// 切换手机图片
function changeImg(url){
    let phoneImg = getElem('.dialog_main_phone');
    phoneImg.style.backgroundImage = 'url(' + url + ')';
}

let value ="";//作为中间变量，用于给phoneMemory和phoneType赋值
let phoneMemory = "";//选择的手机内存空间
let phoneType = '中国红';//选择的手机颜色类型
let total = 0;//总价
let price = 0;//被选中的手机型号的单价
let num = 1;//购买数量

//计算总价
function totalPrice(target){
    let amount = document.getElementsByName("amount");
    num = amount[0].value;//获取当前购买数量的数值

    if(target){//当颜色和内存的选项被点击时，获取被点击的元素的文本内容
        value = target.innerText;
    }

    switch(value){//设置当前已选择的选项
        case '16G':
            phoneMemory = "16G";
            break;
        case '32G':
            phoneMemory = "32G";
            break;
        case '64G':
            phoneMemory = "64G";
            break;
        case '中国红':
            phoneType = '中国红';
            break;
        case '土豪金':
            phoneType = '土豪金';
            break;
        case '太空灰':
            phoneType = '太空灰';
            break;
        case '绅士黑':
            phoneType = '绅士黑';
            break;
    }

    switch(phoneMemory){//设置当前选择的手机型号的单价
        case '16G':
            price = 999;
            break;
        case '32G':
            price = 1499;
            break;
        case '64G':
            price = 1999;
            break;
    }

    total = price*num;//计算总价
  
    showMessage(phoneMemory,phoneType,num,total);
}

//显示已选择的手机型号
function showMessage(memory,type,num,total){
    let text = getElem('.selected');
    let rate = getElem('.rate');
    let symbol = getElem('.symbol')
    //当颜色、内存和数量都有有效值时才显示
    //因为颜色和数量初始化时已有有效值，所以只需判断代表内存的变量
    if(memory){
        //修改显示文本内容
        text.innerText = `已选择："${type}","${memory}" x${num}`;
        rate.innerText = `${total}`;

        //由半透明变成完全显示
        rate.style.opacity = '1';
        symbol.style.opacity = '1';
    }else{
        text.innerText = '';
        rate.innerText = '0';

        rate.style.opacity = '0.5';
        symbol.style.opacity = '0.5';
    }
}

//增加购买数量
function addNumber(){
    let amount = document.getElementsByName("amount");
    let val = amount[0].value;
    
    let num = Number(val);
    num += 1;

    amount[0].value = num;
}
//减少购买数量
function delNumber(){
    let amount = document.getElementsByName("amount");
    let val = amount[0].value;
    
    let num = Number(val);
    if(num>1){
        num -= 1;
    }
    amount[0].value = num;
}

//结算
function clearance(){
    if(total===0){
        alert("您还没选择手机型号")
    }else{
        alert(`商品购物成功！
        您一共购买了${num} 部${phoneType}，${phoneMemory} 摩亚手机，
        实际付款：${total}元
        `)
        closeDialog();
        resetValue();
    }
}

//重置
function resetValue(){
    let elem = getElem('#label_color1');
    let input = getElem('.pay_amount');

    value ="";
    phoneMemory = "";
    phoneType = '中国红';
    total = 0;
    price = 0;
    num = 1;
    //重置选项的样式
    removeChecked('.radio_color');
    removeChecked('.radio_memory');
    addCls(elem,'checked');
    //重置结算板块的文本
    showMessage();
    //重置输入的值
    input.value = 1;
}

//事件委托
function handleClick(event){
    let ev = event || window.event;
    let target = ev.target || ev.srcElement;//获取当前被点击的元素
    
    switch(target.id){//根据元素的id判断是哪个元素被点击了，然后执行相应的代码
        case 'pay_add':
            addNumber();
            totalPrice();
            break;
        case 'pay_minus' :
            delNumber();
            totalPrice();
            break;
        case 'dialog_close' :
            closeDialog();
            break;
        case 'clearance':
            clearance();
            break;
        case 'label_color1' :
            removeChecked('.radio_color');
            addCls(target,'checked');
            changeImg('img/phone-1.png');
            totalPrice(target);
            break;
        case 'label_color2' :
            removeChecked('.radio_color');
            addCls(target,'checked');
            changeImg('img/phone-2.png');
            totalPrice(target);
            break;
        case 'label_color3' :
            removeChecked('.radio_color');
            addCls(target,'checked');
            changeImg('img/phone-3.png');
            totalPrice(target);
            break;
        case 'label_color4' :
            removeChecked('.radio_color');
            addCls(target,'checked');
            changeImg('img/phone-4.png');
            totalPrice(target);
            break;
        case 'label_memory1' :
            removeChecked('.radio_memory');
            addCls(target,'checked');     
            totalPrice(target);
            break;
        case 'label_memory2' :
            removeChecked('.radio_memory');
            addCls(target,'checked');
            totalPrice(target);
            break;
        case 'label_memory3' :
            removeChecked('.radio_memory');
            addCls(target,'checked');
            totalPrice(target);
            break;
    }
}

//程序入口
window.onload = function(){
    //初始化为init样式
    for( k in screenAnimationElements){
        setAnimationInit(k);
    }

    changeImg('img/phone-1.png');
    
    setTimeout(function(){//保证页面刷新时有动画效果
        switchAnimation();
    },500)

    //给购买按钮添加点击事件
    let clickList = getAllElem('.pay');
    for( k of clickList){
        k.addEventListener('click', openDialog, false);
    }
    
    //给表单添加点击事件委托
    let list = getElem('.dialog');
    list.addEventListener('click', handleClick, false);

    //跟踪输入的数值实时计算总价
    let input = getElem('.pay_amount');
    input.onkeyup = function(e){
        totalPrice(e.target)
    }
}
//页面滚动时触发相应元素的动画
window.onscroll = function(){
    let top = document.documentElement.scrollTop;
    //导航背景
    if(top>60){
        addCls(getElem('.header'),'header_back');
    }else{
        delCls(getElem('.header'),'header_back');
    }
  
    switchAnimation();
}