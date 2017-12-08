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
    var baseCls = getClass(element);
    if(baseCls.indexOf(cls) === -1){
        setClass(element,baseCls+' '+cls);
    }
}
//为元素删除样式
function delCls(element,cls){
    var baseCls = getClass(element);
    if(baseCls.indexOf(cls) != -1){
        setClass(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));//这里使用正则将多个空格符替换成一个空格符
    }
}

//初始化样式
var screenAnimationElements = {
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
    var screen = document.querySelector(screenClass);
    var animationElements = screenAnimationElements[screenClass];

    for(var i=0;i<animationElements.length;i++){
        var element = document.querySelector(animationElements[i]);
        var baseClass = element.getAttribute('class');
        element.setAttribute('class',baseClass +' '+baseClass+'_init');
    }
}
//根据滚动条位置触发对应区域的动画
function switchAnimation(){
    var top = document.documentElement.scrollTop;

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
    var nav_item = getAllElem('.nav');
    var side_nav_item = getAllElem('.sidebar');
    var activeItem = getAllElem(itemClass);
    
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

window.onload = function(){
    //初始化为init样式
    for( k in screenAnimationElements){
        setAnimationInit(k);
    }
    
    setTimeout(function(){
        switchAnimation();
    },500)
}

//滚动到哪，哪里的动画就会触发
//设置元素的样式为done样式
function setAnimationDone(screenClass){
    var screen = document.querySelector(screenClass);
    var animationElements = screenAnimationElements[screenClass];
   
    for(var i=0;i<animationElements.length;i++){
        var element = document.querySelector(animationElements[i]);
        var baseClass = element.getAttribute('class');
        element.setAttribute('class',baseClass.replace('_init','_done'));
    }
}

window.onscroll = function(){
    var top = document.documentElement.scrollTop;
    //导航背景
    if(top>60){
        addCls(getElem('.header'),'header_back');
    }else{
        delCls(getElem('.header'),'header_back');
    }
  
    switchAnimation();
}