let sharedData;

try {
  sharedData = JSON.parse(localStorage.sharedData);
  getUrl = sharedData.url;
  console.log(sharedData.url);
  

} catch (e) {
  console.log(e);
}
//delete localStorage.sharedData;

let firstUrl;

// let tabURL="";

// chrome.tabs.query({
//   active: true,
//   lastFocusedWindow: true
// }, function(tabs) {
//    tabURL = tabs[0].url;
//    //localStorage.sharedData = JSON.stringify({url:tabURL});
   
//   console.log(tabURL);
//    });


//delete localStorage.sharedData;

var totalRev = 0;
var totalReviewCount = 0;
var totalReviewRating = 0.0;
var totalImageCount = 0;
var totalVariation = 0;
$(document).ready(function () {
  document.getElementById("testelement").innerText = sharedData.url;

  // chrome.tabs.query(
  //   {
  //     active: true,
  //     lastFocusedWindow: true,
  //   },
  //   function (tabs) {
  //     var tabURL = tabs[0].url;
  //     console.log(tabURL);
  //     //alert(tabURL);
  //   }
  // );

  var url ="http://192.168.100.68:8080/scraper/extention/scrapesearchpage?categoryLink="+getUrl //"https://darazscout-wepp-app.herokuapp.com/api/product/findall";
 var token=localStorage.getItem('token');
  var settings = {
    type: "GET",
    dataType: "json",
    url: url,
    headers: {
      'Authorization':'Bearer '+token 
    },
    //data: "", //send url gotten by the localstorage for comparison in the backend here.
    success: function (result) {
      
      $("#example").DataTable({
        searching: false,
        data: result,
      
        columns: [
          {
            data: "imagesLink",
            render: function (data, type, row) {
              return (
                '<img src="' + data + '" style="widht:50px;height:50px;" />'
              );
            },
          },
          { data: "sku" },
          { data: "title" },
          { data: "brand" },
          { data: "price" },
          { data: "reviewCount" },
        ],
      });

      for (var i = 0; i < result.length; i++) {
        //var obj = result[i];
        console.log(typeof result[i].price);
        totalRev = totalRev + parseInt(result[i].price);
        totalReviewCount += parseInt(result[i].reviewCount);
        totalReviewRating += result[i].avgRating;
        totalImageCount += result[i].numberOfImages;
        totalVariation = +result[i].variationCount;
      }
      document.getElementById("totalRevenue").innerText = totalRev;
      document.getElementById("testelement").innertext = sharedData.url;
      document.getElementById("averageRevenue").innerText =
        totalRev / result.length;
      document.getElementById("averageReviewCount").innerText = parseInt(
        totalReviewCount / result.length
      );
      document.getElementById("averageReviewRating").innerText = (
        totalReviewRating / result.length
      ).toFixed(2);
      document.getElementById("averageImageCount").innerText = parseInt(
        totalImageCount / result.length
      );
      document.getElementById("averageVariationCount").innerText = parseInt(
        totalVariation / result.length
      );
     // document.getElementById("testelement").innerText = sharedData.url;

    },
    error: function (err) {
      alert("error");
    },
  };
  $.ajax(settings);
});
