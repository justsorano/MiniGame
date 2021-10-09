function _getTemplate(options){
   const wrap = document.createElement('div')
   wrap.classList.add('modal')
   wrap.insertAdjacentHTML('afterbegin',
   `
   <div class='modal__body'>
      <h2 class='modal__title'>${options.title}</h2>
      <div class='modal__btn-group'>
      <button class='modal__btn _success' onclick=${options.Handler}>Закрыть</button>
      </div>
   </div>
   `
   )
   return wrap
}
export class Modal {
   constructor(options){
      this.title = options.title
      this.handler = options.Handler
      this.modal = _getTemplate(this.title,this.handler)
   }

   close(){
      this.modal.classList.add('close')
   }
   open(){
      this.modal.classList.add('open')
   }
}