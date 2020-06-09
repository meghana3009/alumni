console.log("fffffffffff");

// // // Script to open and close sidebar
// // function nav_open() {
// //     document.getElementById("mySidebar").style.display = "block";
// //     document.getElementById("myOverlay").style.display = "block";
// // }
 
// // function nav_close() {
// //     document.getElementById("mySidebar").style.display = "none";
// //     document.getElementById("myOverlay").style.display = "none";
// // }

// // var nav_pages_id = ['HOME','INBOX','MESSAGES','COMPOSE','EVENTS','SEARCH','GALLERY','PROFILE'];

// // function nav_page(pageid) {
// //   nav_close();
// //   for (var d in nav_pages_id) {
// //     if (nav_pages_id[d] != pageid) {
// //       document.getElementById(nav_pages_id[d]).style.display = 'none';
// //     } 
// //     else {
// //       document.getElementById(pageid).style.display="block";
// //     }
// //   }
// // }



// // function myFunction() {
// // window.onscroll = function() {myFunction()};
// // var header = document.getElementById("portfolio");
// // var sticky = header.offsetTop;
// //   if (window.pageYOffset > sticky) {
// //     header.classList.add("sticky");
// //   } else {
// //     header.classList.remove("sticky");
// //   }
// // }

// // var slideIndex = 1;
// // showSlides(slideIndex);

// // function plusSlides(n) {
// //   showSlides(slideIndex += n);
// // }

// // function currentSlide(n) {
// //   showSlides(slideIndex = n);
// // }

// // function showSlides(n) {
// //   var i;
// //   var slides = document.getElementsByClassName("mySlides");
// //   var dots = document.getElementsByClassName("dot");
// //   if (n > slides.length) {slideIndex = 1}    
// //   if (n < 1) {slideIndex = slides.length}
// //   for (i = 0; i < slides.length; i++) {
// //       slides[i].style.display = "none";  
// //   }
// //   for (i = 0; i < dots.length; i++) {
// //       dots[i].className = dots[i].className.replace(" active", "");
// //   }
// //   slides[slideIndex-1].style.display = "block";  
// //   dots[slideIndex-1].className += " active";
// // }

// // function openPage(pageName,elmnt,color) {
// //   var i, tabcontent, tablinks;
// //   tabcontent = document.getElementsByClassName("tabcontent");
// //   for (i = 0; i < tabcontent.length; i++) {
// //     tabcontent[i].style.display = "none";
// //   }
// //   tablinks = document.getElementsByClassName("tablink");
// //   for (i = 0; i < tablinks.length; i++) {
// //     tablinks[i].style.backgroundColor = "";
// //   }
// //   document.getElementById(pageName).style.display = "block";
// //   elmnt.style.backgroundColor = color;
// // }

// // function like(x){
// //     if(x.style.color=="blue"){
// //       x.style.color="";
// //     }
// //    else{
// //     x.style.color="blue";
// //    }
// // }

// // function open_message(x){
// //   document.getElementById('INBOX').style.display="none";
// //   document.getElementById('MESSAGES').style.display="block";
// // }
// // function send_reply(x){
// //   document.getElementById('MESSAGES').style.display="none";
// //   document.getElementById('COMPOSE').style.display="block";
// // }
// // function send_message(x){
// //   document.getElementById('COMPOSE').style.display="none";
// //   document.getElementById('INBOX').style.display="block";
// // }
// // function message_me(x){
// //   document.getElementById('SEARCH').style.display="none";
// //   document.getElementById('COMPOSE').style.display="block";
// // }

// // // Get the element with id="defaultOpen" and click on

// // Script to open and close sidebar
// function nav_open() {
//     document.getElementById("mySidebar").style.display = "block";
//     document.getElementById("myOverlay").style.display = "block";
// }
 
// function nav_close() {
//     document.getElementById("mySidebar").style.display = "none";
//     document.getElementById("myOverlay").style.display = "none";
// }

// var nav_pages_id = ['HOME','INBOX','MESSAGES','COMPOSE','EVENTS','SEARCH','GALLERY','PROFILE'];

// function nav_page(pageid) {
//   nav_close();
//   for (var d in nav_pages_id) {
//     if (nav_pages_id[d] != pageid) {
//       document.getElementById(nav_pages_id[d]).style.display = 'none';
//     } 
//     else {
//       document.getElementById(pageid).style.display="block";
//     }
//   }
// }

// window.onscroll = function() {myFunction()};
// var header = document.getElementById("portfolio");
// var sticky = header.offsetTop;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }

// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
// }

// function openPage(pageName,elmnt,color) {
//   var i, tabcontent, tablinks;
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("tablink");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].style.backgroundColor = "";
//   }
//   document.getElementById(pageName).style.display = "block";
//   elmnt.style.backgroundColor = color;
// }

// function like(x){
//     if(x.style.color=="blue"){
//       x.style.color="";
//     }
//    else{
//     x.style.color="blue";
//    }
// }

// function open_message(x){
//   document.getElementById('INBOX').style.display="none";
//   document.getElementById('MESSAGES').style.display="block";
// }
// function send_reply(x){
//   document.getElementById('MESSAGES').style.display="none";
//   document.getElementById('COMPOSE').style.display="block";
// }
// function send_message(x){
//   document.getElementById('COMPOSE').style.display="none";
//   document.getElementById('INBOX').style.display="block";
// }
// function message_me(x){
//   document.getElementById('SEARCH').style.display="none";
//   document.getElementById('COMPOSE').style.display="block";
// }

// // Get the element with id="defaultOpen" and click on
