window.addEventListener("load", (e) => {
  
  full_screen_submit.addEventListener("click",async e=>{
    try{
       const result= await document.querySelector("body").requestFullscreen();
       document.querySelector(".modal__container").classList.remove("active");
       document.querySelector(".loader").classList.add("play");
    }catch(err){
        console.log(err)
    }
});
full_screen_cancel.addEventListener("click",()=>{
    document.querySelector(".modal__container").classList.remove("active");
    document.querySelector(".loader").classList.add("play");
})
});
