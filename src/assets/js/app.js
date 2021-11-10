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
                  arr = []
                  if(counter === value / 2){
                     finish('win',counter)
                     overlay.classList.add('showOverlay')
                     clearInterval(document.i)
                     return
                  }
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
export class GameCore{
   container = document.querySelector('.container')
   startBtn = document.querySelector('.field_1__btn')
   btnsSettings = document.querySelectorAll('.btn__option')
   field1 = document.getElementById('field_1')
   field2 = document.getElementById('field_2')
   timeCounter = document.querySelector('#timer > span')
   score = document.getElementById('score')
   time = 300
   constructor(){
      this.#setup()
   }
   // run game core
   #setup(){
      this.show(100,this.field1)
      this.startBtn.addEventListener('click',this.startbtnHandler)
      this.btnsSettings.forEach(item => item.addEventListener('click',this.settingsHandler))
   }
   // game general
   startGame(){
      const interval = setInterval(decreaseTime.bind(this),1000)
      document.i = interval
      function decreaseTime(){
         let seconds = this.time % 60
         let minutes = this.time / 60 % 60
         if (this.time === 0) {
            clearInterval(interval)
            this.setTime(`00:00`)
            this.finishGame('lose',this.score.textContent)
         } else {
            if(seconds < 10){
               seconds = `0${seconds}`
            }
            let strTimer = `${Math.trunc(minutes)}:${seconds}`
            this.setTime(strTimer)
            --this.time
         }

      }
   }

   finishGame(string,score){
      const overlay = document.querySelector('.overlay')
      const createModal = text =>{
         return new Modal({
            title:text,
            score:score,
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
      overlay.classList.add('showOverlay')
      if(string === 'lose'){
         const modal = createModal('Вы проиграли')
         setTimeout(() => modal.open(),0)
         return
      } else {
         const modal = createModal('Победа!')
         setTimeout(() => modal.open(),0)
         return
      }

   }

   setTime(string){
      this.timeCounter.textContent = string
   }

   show(ms,selector){
      return new Promise(resolve =>{
         setTimeout(() => {
            selector.classList.add('show')
         }, 0);
         resolve()
      }).then(setTimeout(() => {
         selector.classList.add('tr0')
         }, ms))
   }
   // handlers
   settingsHandler = (e) =>{
      const value = e.target.dataset.net
      const field3 = _createCell(value,this.finishGame)
      this.field2.className = 'field_2'
      this.show(700,field3)
      this.container.append(field3)
      setTimeout(() => {
         document.getElementById('timer').style.display = 'flex'
         document.querySelector('.score').style.display = 'flex'
         this.timeCounter.textContent = 'GO'
         this.startGame()
      }, 1500);
      
   }

   startbtnHandler = ()=>{
      this.field1.className = 'field_1'
      this.show(100,this.field2)
      removeEventListener('click',this.startbtnHandler)
   }
}