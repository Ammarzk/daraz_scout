let sharedData;

try {
  sharedData = JSON.parse(localStorage.sharedData);
  getUrl = sharedData.url;
  console.log(sharedData.url);
} catch (e) {
  console.log(e);
}
console.log(getUrl);

window.onload = function () {
  document.getElementById("catsTest").addEventListener("change", getCategories);
  document.getElementById("user_shippingFee").addEventListener("change", calculateVAT_ShippingFee);
  document.getElementById("productCost").addEventListener("change", calculateTotalExpenses);
  document.getElementById("expected_sales").addEventListener("change", expectedProfit);


}
var productPrice;

$(document).ready(function () {
  //document.getElementById('testelement').innerText = sharedData.url;

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

  var url =
    'http://192.168.100.7:8080/scraper/extention/scrapeproduct?productLink=' +
    getUrl; //"https://darazscout-wepp-app.herokuapp.com/api/product/findall";
  var token = localStorage.getItem('token');
  console.log(token);
  var settings = {
    type: 'GET',
    dataType: 'json',
    url: url,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    success: function (result) {
      productPrice = result.price;
      
      console.log(result);
      document.getElementById('test').innerHTML=result.title;
      document.getElementById('image').innerHTML=
        '<img class="imgg" src="' + result.imagesLink + ' "alt="img">';
        // '<p>SKU: ' + result.sku + '<p>' +
        // '<p>Brand: ' + result.brand + '<p>' 
        document.getElementById('productPrice').innerText = "Rs." + result.price;
        document.getElementById('productSKU').innerText = result.sku;
        document.getElementById('productBrand').innerText = result.brand;
    },
    error: function (err) {
      alert('error');
      console.log(err);
    },
  };
  $.ajax(settings);
});



function getCategories(){
  console.log("HUH? WHAT WAS THAT NOISE?");
  var x = document.getElementById("catsTest").value;
  console.log(x);
 document.getElementById("commisionPercentage").innerText=x;

 calculateCommision(x);
 setPaymentPrice();
 calculateVAT();
}

//Function is dependant on value of commision of product that is set by user through selecting from dropdown list.
// Once calculated, then the first VAT can be calculated. Then which 
// Have user enter shipping fee, then calculate 16% on that; add to subtotal.
var calculatedDarazCommision; 
function calculateCommision(commision){ 
  console.log("In calculate daraz commision function");
  commision = commision/100; //commision price is received as is, so it is divided by 100 to make calc easier

  calculatedDarazCommision = commision * productPrice; // Commision is calculated

  document.getElementById("darazCommision").innerText = calculatedDarazCommision; // Commision is set in the field


}
// Function calculates payment fee on product
var paymentPriceFee;
function setPaymentPrice(){
    paymentPriceFee = (productPrice/100)*1.25;
   document.getElementById("paymentFee").innerText = paymentPriceFee;

}
//calculates VAT (16 % of calculated commision value + calculated Payment fees)
var vat_Total;
function calculateVAT(){
  vat_Total = (paymentPriceFee + calculatedDarazCommision)*0.16;

  document.getElementById("VAT_DarazComm_PayFee").innerText = vat_Total;

}

//User enters an amount into the field, VAT is calculated on top of that.
function calculateVAT_ShippingFee(){
  if(document.getElementById("user_shippingFee").value !=null){
var shippingFee = document.getElementById("user_shippingFee").value;

document.getElementById("vatShippingFee").innerText = shippingFee*0.16;
}
else{
  document.getElementById("Enter Proper value");
}
calculateExpenses();

}
var total_Expenses;
function calculateExpenses(){
  //Expenses are daraz commission: darazCommision
  //Payment Fee paymentFee
  // VAT VAT_DarazComm_PayFee
  // vatShippingFee
  
  total_Expenses = 
  parseFloat(document.getElementById("darazCommision").innerText) +
  parseFloat(document.getElementById("paymentFee").innerText )+ 
  parseFloat(document.getElementById("VAT_DarazComm_PayFee").innerText) + 
  parseFloat(document.getElementById("vatShippingFee").innerText);
console.log(total_Expenses);

document.getElementById("darazExpenses").innerText = total_Expenses.toFixed(3);


}

var net_Profit;
var total;
function calculateTotalExpenses(){
 var product_Cost = parseFloat(document.getElementById("productCost").value);

  total = product_Cost + total_Expenses;

 document.getElementById("total_EXP").innerHTML = total;
 console.log(total);

 net_Profit =  productPrice - total;
 document.getElementById("netProfit").innerHTML = net_Profit.toFixed(3);

}

function expectedProfit(){

  var exp_sales = document.getElementById("expected_sales").value;
  document.getElementById("total_Profit").innerHTML = parseFloat(net_Profit * exp_sales).toFixed(3);
}



