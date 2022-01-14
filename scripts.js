let keys = document.querySelectorAll('.keys');
let keysInArray = Array.prototype.slice.call(keys);
let keyUp = document.querySelector('.up');
let forms = document.querySelectorAll('input');
let form;
let formsInArray = Array.prototype.slice.call(forms);
let keyBoard = document.querySelector('.keyboard');
let languages = ['.eng', '.rus'];
let keyAdditionally = document.querySelector('.additionally');
let specialSymbol = document.querySelectorAll('.spec');
specialSymbol = Array.prototype.slice.call(specialSymbol);
// Останавливаемся на сфокусированном поле
formsInArray.forEach(function(item,index,array){
    item.addEventListener('focus', function(){
        form = item;
    });
    item.addEventListener('blur', function(){
        form = undefined;
    })
})
// Устанавливаем запрет на перенос фокуса на клавиатуру
document.querySelector('.keyboard').addEventListener('mousedown',function (e){
    if(document.activeElement === form){
       e.preventDefault();
    }
})
// Функция для прописных и строчных букв
let layoutStatus = false;
keyUp.addEventListener('click',function(){
    keysInArray.forEach(function(item){
        if(layoutStatus === false){
            item.innerHTML = item.innerHTML.toUpperCase();
        }
        else{
            item.innerHTML = item.innerHTML.toLowerCase();
        }
    })
    layoutStatus = !layoutStatus;
})
// Функция ввода символа в поле
keysInArray.forEach(function(item,index,array){
    item.addEventListener('click', function(){
        if(form){
            // Ввод пробела
            if(item.getAttribute('class') === "keys wspace"){
                form.value += " ";
                return;
            }
            // Удаление символа
            else if(item.getAttribute('class') === "keys backspace"){
                if(form.value == "") return;
                minuSize = form.value.split('');
                minuSize.pop();
                form.value = minuSize.join('');
                return;
            }
            // Ввод остальных символов
            form.value += item.innerHTML;
        }
    })
})

// Функция и события перемещения клавиатуры
keyBoard.addEventListener('mousedown', mover)
function mover(event){
    document.removeEventListener('mousemove', moveFunction);
    let xPosition = event.clientX - keyBoard.getBoundingClientRect().left;
    let yPosition =  event.clientY - keyBoard.getBoundingClientRect().top;
    moveTo(event.clientX, event.clientY);
    document.addEventListener('mousemove', moveFunction)
    function moveFunction(event){
        moveTo(event.clientX, event.clientY)
    }
    function moveTo(x,y){
        keyBoard.style.top = y - yPosition + 'px';
        keyBoard.style.left = x - xPosition + 'px';
    }
    keyBoard.onmouseup = function(){
        document.removeEventListener('mousemove', moveFunction);
        keyBoard.onmouseup = null;
    }
}
// Событие смены раскладки и перебор массива с языками
let prev = 0;
let next = 1;
let changeLang = document.querySelector('.lang');
changeLang.addEventListener('click', toggleLang);
function toggleLang(){
    if(next < languages.length){
        showHide(prev, next);
        prev += 1
        next += 1;
    }
    else if((next + 1) > languages.length){
        showHide(languages.length - 1, 0);
        prev = 0;
        next = 1;
    }
}
// Функция смены раскладки
function showHide(prev, next){
    specialSymbol.forEach(function(item,index,array){
        if(item.style.display == 'block'){
            item.style.display = 'none';
        }
    })
    let langElements = document.querySelectorAll(languages[prev]);
    let langElementsInArr = Array.prototype.slice.call(langElements);
    langElementsInArr.forEach(function(item,index,array){
        item.style.display = 'none';
    })
    langElements = document.querySelectorAll(languages[next]);
    langElementsInArr = Array.prototype.slice.call(langElements);
    langElementsInArr.forEach(function(item,index,array){
        item.style.display = 'block';
    })
}
// Функция открытия меню специальных символов
let displayStatus = true;
keyAdditionally.addEventListener('click',function(){
    toggleLettersAndAddit(displayStatus)
    displayStatus = !displayStatus;
});
function toggleLettersAndAddit(displayStatus){
    if(displayStatus){
        languages.forEach(function(item,index,array){
            let letters = document.querySelectorAll(item);
            letters = Array.prototype.slice.call(letters);
            letters.forEach(function(item,index,array){
                item.style.display = 'none';
            })
        })
        specialSymbol.forEach(function(item,index,array){
            item.style.display = 'block';
        })
    }
    if(!displayStatus){
        toggleLang();
    }
}