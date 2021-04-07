/*$(function () {
  $("#btnLoad").click(function () {
    LoadData();
    return false;
  });
});
*/ //End of DOM Ready function


$(function () {
  $("#btnOpen").click(function () {
    chrome.windows.create({
      url: chrome.runtime.getURL("newpopup.html"),
      type: "popup", height: 710, width: 1012,
    });
  });
});
