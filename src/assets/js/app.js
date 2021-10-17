import '../scss/style.scss'
import { Modal } from './Modal'
import { Util } from './Util'

const _createCell = (value) =>{
   const wrap = document.createElement('div')
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

   function flipHandler(e) {
      if(e.target.classList.contains('flip-card-front')){
      const element = e.target.parentNode
      if(element.dataset.flip === 'done'){
         element.classList.add('flipshow')
         return
      }
      element.dataset.flip = 'true'
      element.classList.add('flipshow')
      let arr = wrap.querySelectorAll('[data-flip = "true"]')
      const [first,second] = arr
            if(first.querySelector('img').src === second.querySelector('img').src){
            const [first,second] = arr
            first.dataset.flip = 'done'
            second.dataset.flip = 'done'
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
   let time = 60;

   (function _setup(){
      show(100,field1)
      startBtn.addEventListener('click',startbtnHandler)
      btnsSettings.forEach(item => item.addEventListener('click',settingsHandler))
   })()

   function startGame(){
      setInterval(decreaseTime,1000)
   }
   function finishGame(){
   }
   function setTime(value){
      timeCounter.textContent = `00:${value}`
   }
   function decreaseTime(){
      if(time === 0){
         finishGame()
      } else {
         let current = --time
         if(current < 10){
            current = `0${current}`
         }
         setTime(current)
      }
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
      const field3 = _createCell(value)
      field2.className = 'field_2'
      show(700,field3)
      container.append(field3)
      setTimeout(() => {
         document.getElementById('timer').style.display = 'flex'
         timeCounter.textContent = '01:00'
         startGame()
      }, 1500);
      
   }

   function startbtnHandler(){
      field1.className = 'field_1'
      show(100,field2)
      this.removeEventListener('click',startbtnHandler)
   }

})()