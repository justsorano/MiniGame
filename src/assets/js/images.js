export class Images {
   static getArrWithRandomIndex(min,max){
      const store = ['https://i.pinimg.com/236x/db/09/b3/db09b33265eac0ddd8b626e96435f066.jpg','https://i.pinimg.com/originals/94/80/1d/94801d05b1d1f35bae23b8bf9fc05d9c.png','https://i.pinimg.com/originals/81/42/cb/8142cb2c80faa6ce17d1380b6bcb288a.png','https://i.pinimg.com/originals/fd/fd/9c/fdfd9c238a9f0cdcb1dfe3c149226ebc.png','https://i.pinimg.com/originals/83/48/aa/8348aaf8e92c70402bd99b847205d4c7.webp','https://i.pinimg.com/236x/83/7a/d8/837ad84ac18477d8e53b4c1aaf679a6a.jpg','https://i.pinimg.com/236x/13/65/e4/1365e43590f04aceb6ef1e3b7a85f9bb.jpg','https://chpic.su/_data/stickers/b/ByLemonHaze/ByLemonHaze_033.webp','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRIs5tOPeWde1r39n-urJ32LXue1BGmHCfUyguqFOeLiGHSo2KZ0gyu-nsIbYZ97d0_cs&usqp=CAU','https://i.pinimg.com/236x/ce/51/f7/ce51f7cd1021598d668e58673107debf.jpg']
      const arr = []
         for(let i = 0;i < 100;i++){
            let index = Math.floor(Math.random() * (max - min) + min)
            if(arr.length === 10){
               return arr
            }
            if(!arr.includes(store[index])){
               arr.push(store[index])
            }
         }
         return arr
   }
}
