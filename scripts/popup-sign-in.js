// function login(){
// $.ajax({
//   url: "https://darazscout-scraper.herokuapp.com/scraper/ac/authenticate",
//   type: "GET",
//   dataType: "html",
//   success: function() {
//       $.ajax({
//           url: "https://darazscout-scraper.herokuapp.com/scraper/ac/authenticate",
//           type: "GET",
//           data: {
//                   "username": document.getElementById("username").innerHTML,
//                   "username": document.getElementById("use").innerHTML,
                  
//           },
//           dataType: "html",
//           success: function(data) {
//                  console.log("SUCESS");//now you can parse your report screen
//           }
//       });
//   }
// });

// }

let tabURL="";

chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, function(tabs) {
   tabURL = tabs[0].url;
   localStorage.sharedData = JSON.stringify({url:tabURL});
  console.log(tabURL);
   });
   



window.onload=function(){

  document.getElementById("linkbutton").addEventListener("click",changePopup);




  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.url);
  }
document.getElementById("buttonLogin").addEventListener("click",login);
document.getElementById("linkbutton").addEventListener("click",changePopup);


function login(){
let uname =document.getElementById("username").value;
console.log(uname);
let pword = document.getElementById("password").value;
  var request = new XMLHttpRequest();
let url='https://darazscout-scraper.herokuapp.com/scraper/ac/authenticate';
//let url='http://192.168.100.68:8080/scraper/ac/authenticate';
// let data=JSON.stringify({ "username": "abdullah",
// "password": "12345"});
let data=JSON.stringify({ "username": uname,
"password": pword});

request.open('POST', url, true);
request.setRequestHeader("Content-Type", "application/json");
request.send(data);
request.onreadystatechange=function(){
  if(request.readyState===4){
    console.log(request.response);
    localStorage.setItem("token",request.response);

    chrome.browserAction.setPopup({
      popup:"popup.html"
   })
   location.reload();
    
  //   chrome.windows.create({
  //     url: chrome.runtime.getURL("popup.html"),
  //     type: "panel", height: 710, width: 1012,
       
  // });
    }
  
}
console.log(request.response);
//   console.log("IN FUNCTION")
// var settings = {
//   type: "POST",
//   dataType: "json",
//   url: "https://darazscout-scraper.herokuapp.com/scraper/ac/authenticate",
//   data: {
//     "username" : "abdullah",
//     "password": "12345"
// }, //send url gotten by the localstorage for comparison in the backend here.
//   success: function (result) {
//     console.log(result);
//     console.log("SUCCESS?")
//     chrome.windows.create({
//       url: chrome.runtime.getURL("popup.html"),
//       type: "popup", height: 710, width: 1012,});
    
    
//   },
//   error: function (err) {
//     console.log(err);
//   },
// };
// $.ajax(settings);
}

function changePopup(){
  
}
}