function _getTemplate(title,score,handlers){
   const wrap = document.createElement('div')
   wrap.classList.add('modal')
   wrap.insertAdjacentHTML('afterbegin',
   `
   <div class='modal__body'>
      <h2 class='modal__title'>${title}</h2>
      <h3 class='modal__title'>Счет:${score}</h3>
      <div class='modal__btn-group'>
      <button class='btn modal__btn _success''>Попробовать снова?</button>
      <button class='btn modal__btn _primary'>Выйти</button>
      </div>
   </div>
   `
   )
   document.body.appendChild(wrap)
   document.querySelector('._success').addEventListener('click',handlers.start)
   document.querySelector('._primary').addEventListener('click',handlers.decline)
   return wrap
}
export class Modal {
   constructor(options){
      this.title = options.title
      this.handlers = options.handlers
      this.score = options.score
      this.modal = _getTemplate(this.title,this.score,this.handlers)
   }

   close(){
      this.modal.className = 'modal'
   }
   open(){
      this.modal.className = 'modal'
      this.modal.classList.add('open')
   }
}