
export const guard = (to, from, next) => {
 
    if(localStorage.getItem('access_token')) {
        
        next({router:'/admin'})
    }else {
      
        next({name:'Login'})
    }
   
}