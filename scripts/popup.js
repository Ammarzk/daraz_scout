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

window.onload = function () {
  document.getElementById("buttonLogout").addEventListener("click", logout);
};
function logout() {
  localStorage.removeItem("token");
  chrome.browserAction.setPopup({
    popup: "popup-signin.html",
  });
  alert("Close the extension!");
}

$(function () {
  $("#btnDash").click(function () {
    chrome.tabs.create({
      //url: chrome.runtime.getURL("newpopup.html"),
      url:"https://www.daraz.pk",
      //type: "normal",
      //height: 710,
      //width: 1012,
      active:true
    });
  });
});

function getNewTab(){
  let tabURL = "";

  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      tabURL = tabs[0].url;
      if (localStorage.getItem("url")) {
        localStorage.removeItem("url");
      }
      localStorage.sharedData = JSON.stringify({ url: tabURL });
      console.log(tabURL);
    }
  );


}


$(function () {
  $("#btnProf").click(function () {

    getNewTab();
    
    chrome.windows.create({
      url: chrome.runtime.getURL("profitpopup.html"),
      type: "popup",
      height: 713,
      width: 475,
      
    });
  });
});

$(function () {
  $("#btnOpen").click(function () {
    let tabURL = "";

    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      function (tabs) {
        tabURL = tabs[0].url;
        if (localStorage.getItem("url")) {
          localStorage.removeItem("url");
        }
        localStorage.sharedData = JSON.stringify({ url: tabURL });
        console.log(tabURL);
      }
    );
    chrome.windows.create({
      url: chrome.runtime.getURL("newpopup.html"),
      type: "popup",
      height: 710,
      width: 1012,
    });
  });
});
