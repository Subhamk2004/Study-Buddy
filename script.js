let start_timer = document.querySelector("#start");
let pause_button = document.querySelector("#pause");
let reset_button = document.querySelector('#reset');
let break_button = document.querySelector('#break_button');
let minutes = document.querySelector('#minute_input');
let seconds = document.querySelector('#seconds_input');
let break_minutes = document.querySelector('#minute_break_input');
let break_seconds = document.querySelector('#seconds_break_input');
let breaker = document.querySelector('#break_input');
let warning = document.querySelector('#warning');
let breaker_div = document.querySelector('.break_div');
let break_audio = document.querySelector('#break_audio');
let start_audio = document.querySelector('#start_audio');

break_audio.loop = true;

start_timer.addEventListener('click', function (){
   alert("Enter time in minutes & seconds only!!")
})
//
start_timer.addEventListener("click", function() {
   let device_width = window.innerWidth;
   if(device_width<=500)
      {
         document.querySelector('.container').style.height = "90%";
      }
   start_timer.style.display = "none";
   pause_button.style.display = "flex";
   reset_button.style.display = "flex";
   let minute = Number(minutes.value);
   let second = Number(seconds.value);
   start_timer_function(minute, second);
   if (isNaN(minute))
   {
      warning.innerHTML = 'PLease enter a numerical value only!!'
      clearInterval(counter_function);
   }
   else if (isNaN(second))
   {
      warning.innerHTML = 'PLease enter a numerical value only!!'
      clearInterval(counter_function);
   }
   else{
      warning.innerHTML = '';
   }
   
   breaker_div.style.display = "flex";

});
let counter_function;
start_timer_function = (minute, second) =>{
   // function second_less(){
   //    seconds--;
   //    console.log(`${minute} : ${seconds}`);
   // }
   // setInterval(second_less,1000);
   start_audio.play();
   clearTimeout(pause_warning);
   counter_function = setInterval(function (){
      second--;
      if (minute === 0 && second === -1)
      {
         minutes.value = minute;
         seconds.value = second + 1;
         pause_button.style.display = "none";
         clearInterval(counter_function);
         return 0;
      }
      else if (second === -1)
      {
         second = 59;
         minute--;
         minutes.value = minute;
         seconds.value = second;
      }
      else{
         minutes.value = minute;
         seconds.value = second;
      }
   },1000);
   /*💎😳😳😳😳😳 we can set the function inside the setInterval itself if we don't want to define the
   function outside our local scope 
    */
   //////////////////////////////////////////////////////////////////////////
   /* this approach gives us the access to local variables and rela time update of variables*/
}
let breaker_function;
start_break_function = (break_minute, break_second, minute, second) =>{
   // function second_less(){
   //    seconds--;
   //    console.log(`${minute} : ${seconds}`);
   // }
   // setInterval(second_less,1000);
   clearInterval(counter_function);
   clearTimeout(pause_warning);
   breaker_function = setInterval(function (){
      break_second--;
      if (break_minute === 0 && break_second === -1)
      {
         break_minutes.value = break_minute;
         break_seconds.value = break_second + 1;
         document.querySelector('.timer_div').style.display = "flex";
         start_timer_function(minute,  second);
         let child_h2 = breaker_div.children[0];
         child_h2.innerHTML = 'Take a break?'
         break_button.style.display = "flex";
         break_audio.pause();
         clearInterval(breaker_function);
         return 0;
      }
      else if (break_second === -1)
      {
         break_second = 59;
         break_minute--;
         break_minutes.value = break_minute;
         break_seconds.value = break_second;
      }
      else{
         break_minutes.value = break_minute;
         break_seconds.value = break_second;
      }
   },1000);
   /*💎😳😳😳😳😳 we can set the function inside the setInterval itself if we don't want to define the
   function outside our local scope 
    */
   //////////////////////////////////////////////////////////////////////////
   /* this approach gives us the access to local variables and rela time update of variables*/
}
let pause_warning;
pause_button.addEventListener('click', function () {
   let minute = Number(minutes.value);
   let second = Number(seconds.value);
   clearInterval(counter_function);
   pause_warning = setTimeout(function (){
      warning.innerHTML = 'You have paused for too long, want a break?'
   }, 60000);
   pause_button.style.display = 'none';
   start_timer.style.display = 'flex';
});


reset_button.addEventListener('click', function (){
   clearInterval(counter_function);
   minutes.value = 30;
   reset_button.style.display = "none";
   pause_button.style.display = "none";
   breaker_div.style.display = "none";
   start_timer.style.display = "flex";
   seconds.value = 0;
   let device_width = window.innerWidth;
   if(device_width<=500)
      {
         document.querySelector('.container').style.height = "400px";
      }
})

break_button.addEventListener('click', function(e) {
   document.querySelector('.timer_div').style.display = "none";
   let child_h2 = e.target.parentNode.children[0];
   console.log(child_h2);
   child_h2.innerHTML = '<img src="images/take-a-break.png" class = "break_img">';
   document.querySelector('.break_img').style.width = "70px";
   break_button.style.display = "none";
   let break_minute = Number(break_minutes.value);
   let break_second = Number(break_seconds.value);
   let minute = Number(minutes.value);
   let second = Number(seconds.value);
   start_break_function(break_minute, break_second, minute, second);
   break_audio.play();
   let device_width = window.innerWidth;
   if(device_width<=500)
      {
         document.querySelector('.container').style.height = "400px";
      }
});
