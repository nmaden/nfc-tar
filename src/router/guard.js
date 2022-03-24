
export const guard = (to, from, next) => {
 
    if(localStorage.getItem('access_token')) {
        next({name:'Admin'})
    }else {
      
        next({name:'Login'})
    }
   
}