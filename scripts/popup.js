// let tabURL="";

// chrome.tabs.query({
//   active: true,
//   lastFocusedWindow: true
// }, function(tabs) {
//    tabURL = tabs[0].url;
//    localStorage.sharedData = JSON.stringify({url:tabURL});
//   console.log(tabURL);
//    });

$(function () {
  $("#btnOpen").click(function () {
    chrome.windows.create({
      url: chrome.runtime.getURL("newpopup.html"),
      type: "popup", height: 710, width: 1012,
       
  });
 
});

});


