import '../scss/style.scss'
import { Util } from './Util'
import {Modal} from './Modal'
const _createCell = (value,finish) =>{
   const wrap = document.createElement('div')
   const overlay = document.querySelector('.overlay')
   const score = document.getElementById('score')
   let counter = 0
   wrap.classList.add('field_3')
   for(let i = 0;i < value;i++){
      const card = document.createElement('div')
      card.classList.add('flip-card')
      card.dataset.flip
      card.insertAdjacentHTML(
         'afterbegin',
      `
      <div class="flip-card-inner" data-flip>
         <div class="flip-card-front">
         </div>
         <div class="flip-card-back">
         <img src="${Util.image[i]}" alt="img">
         </div>
      </div>
      `
      )
      card.addEventListener('click',flipHandler)
      card.classList.add(Util._checkValue(value))
      wrap.append(card)
   }
   function setScore(value){
      score.textContent = value
   }
   function flipHandler(e) {
      try{
         if(e.target.classList.contains('flip-card-front')){
            const element = e.target.parentNode
            if(element.dataset.flip === 'done'){
               element.classList.add('flipshow')
               return
            }
            element.dataset.flip = 'true'
            element.classList.add('flipshow')
            let arr = wrap.querySelectorAll('[data-flip = "true"]')
            if(arr.length === 2){
               overlay.classList.add('showOverlay')
            setTimeout(() =>{
               overlay.classList.remove('showOverlay')
            },1700)
         }
            const [first,second] = arr
                  if(Object.is(arr[0].querySelector('img').src,arr[1].querySelector('img').src)){ 
                  first.dataset.flip = 'done'
                  second.dataset.flip = 'done'
                  ++counter
                  setScore(counter)
                  if(counter === value / 2){
                     return finish('win')
                  }
                  arr = []
                  } else {
                     arr.forEach(i =>{
                           setTimeout(() => {
                              i.dataset.flip = ''
                              i.classList.remove('flipshow')
                              arr = []
                           }, 1000);
                     })
                  }
            }
      } catch{

      }
   }
   return wrap
}

(function gameCore(){
   const container = document.querySelector('.container')
   const startBtn = document.querySelector('.field_1__btn')
   const btnsSettings = document.querySelectorAll('.btn__option')
   const field1 = document.getElementById('field_1')
   const field2 = document.getElementById('field_2')
   const timeCounter = document.querySelector('#timer > span')
   const score = document.getElementById('score')
   let time = 300;

   (function _setup(){
      show(100,field1)
      startBtn.addEventListener('click',startbtnHandler)
      btnsSettings.forEach(item => item.addEventListener('click',settingsHandler))
   })()
   function createModal(text){
      return new Modal({
         title:text,
         score:score.textContent,
         handlers:{
            start(){
               return window.location.reload()
            },
            decline(){
               window.opener = self;
               window.close();
            }
         }
      })
   }
   function startGame(){
      const interval = setInterval(decreaseTime,1000)
      function decreaseTime(){
         let seconds = time % 60
         let minutes = time / 60 % 60
         if (time === 0) {
            clearInterval(interval)
            setTime(`00:00`)
            finishGame('lose')
         } else {
            if(seconds < 10){
               seconds = `0${seconds}`
            }
            let strTimer = `${Math.trunc(minutes)}:${seconds}`
            setTime(strTimer)
            --time
         }

   }
   }
   function finishGame(string){
      if(string === 'lose'){
         const modal = createModal('Вы проиграли')
         setTimeout(() => modal.open(),0)
         return
      } else {
         const modal = createModal('Победа')
         modal.open()
         return
      }

   }
   function setTime(string){
      timeCounter.textContent = string
   }


   function show(ms,selector){
      return new Promise((resolve,reject) =>{
         setTimeout(() => {
            selector.classList.add('show')
         }, 0);
         resolve()
      }).then(setTimeout(() => {
         selector.classList.add('tr0')
         }, ms))
   }

   // handlers
   function settingsHandler(e){
      const value = e.target.dataset.net
      const field3 = _createCell(value,finishGame)
      field2.className = 'field_2'
      show(700,field3)
      container.append(field3)
      setTimeout(() => {
         document.getElementById('timer').style.display = 'flex'
         document.querySelector('.score').style.display = 'flex'
         timeCounter.textContent = 'GO'
         startGame()
      }, 1500);
      
   }

   function startbtnHandler(){
      field1.className = 'field_1'
      show(100,field2)
      this.removeEventListener('click',startbtnHandler)
   }

})()
