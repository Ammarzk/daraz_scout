//document.getElementById("buttonLogout").addEventListener("click",logout);


// let tabURL="";

// chrome.tabs.query({
//   active: true,
//   lastFocusedWindow: true
// }, function(tabs) {
//    tabURL = tabs[0].url;
//    localStorage.sharedData = JSON.stringify({url:tabURL});
//   console.log(tabURL);
//    });
// $(function () {
//   $("buttonLogout").click(function(){
//     localStorage.removeItem("token");
//     chrome.browserAction.setPopup({
//       popup:"popup-signin.html";
//    })
//     alert("Close the extension!");
//   });
// });


window.onload=function(){
  document.getElementById("buttonLogout").addEventListener("click",logout);



}
function logout(){
 console.log("TES");  
  localStorage.removeItem("token");

    chrome.browserAction.setPopup({
      popup:"popup-signin.html"
   });
    alert("Close the extension!");

}

$(function () {
  $("#btnOpen").click(function () {
    let tabURL="";

chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, function(tabs) {
   tabURL = tabs[0].url;
   if(localStorage.getItem("url")){
     localStorage.removeItem("url")
   }
   localStorage.sharedData = JSON.stringify({url:tabURL});
  console.log(tabURL);
   });
    chrome.windows.create({
      url: chrome.runtime.getURL("newpopup.html"),
      type: "popup", height: 710, width: 1012,
       
  });
 
});

});


