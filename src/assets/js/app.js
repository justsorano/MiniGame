import '../scss/style.scss'
const _createCell = (value) =>{
   let cellWidth = ''
   if(value === '10'){
      cellWidth = 'widthLarge'
   } else if (value === '20'){
      cellWidth = 'widthMedium'
   } else {
      cellWidth = 'widthSoft'
   }
   const wrap = document.createElement('div')
   wrap.classList.add('field_3')
   for(let i = 0;i < value;i++){
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.classList.add(cellWidth)
      wrap.append(cell)
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
         setTimeout(() => {
         selector.classList.add('tr0')
         }, ms)

      })
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
      field1.className = 'field_2'
      show(100,field2)
      this.removeEventListener('click',startbtnHandler)
   }

})()