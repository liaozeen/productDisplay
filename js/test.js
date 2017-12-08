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

function foreachElements(animationElements,isAnimationClass,isAnimationDone){
    for(var i=0;i<animationElements.length;i++){
        var element = document.querySelector(animationElements[i]);
        var baseClass = element.getAttribute('class');
        if(isAnimationClass === false){
            element.setAttribute('class',baseClass +' '+baseClass+'_init');
        }else if(isAnimationDone === false){
            element.setAttribute('class',baseClass.replace('_init','_done'));
        }else if(isAnimationDone===true){
            element.setAttribute('class',baseClass.replace('_done','_init'));
        }
       
    }
}

function setAnimation(screenClass){
    var screen = document.querySelector(screenClass);
    var animationElements = screenAnimationElements[screenClass];
    var isAnimationClass = false;
    var isAnimationDone = false;

    screen.onclick = function(){
        //初始化init
        if(isAnimationClass === false){
            foreachElements(animationElements,isAnimationClass,isAnimationDone);
            isAnimationClass = true;
            return;
        }
        //init >= done
        if(isAnimationDone === false){
            foreachElements(animationElements,isAnimationClass,isAnimationDone);
            isAnimationDone = true;
            return;
        }
        //done => init
        if(isAnimationDone===true){
            foreachElements(animationElements,isAnimationClass,isAnimationDone);
            isAnimationDone === false;
            isAnimationDone = false;
            return;
        }
    }
}

for( k in screenAnimationElements){
    setAnimation(k);
}