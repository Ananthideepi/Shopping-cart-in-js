const card_icon = document.querySelector("#countcard");
const cardblock = document.querySelector(".displaycard");
const close = document.getElementById("close");

card_icon.addEventListener("click", () => {
  cardblock.classList.add("displaycard-active");
});
close.addEventListener("click", () => {
  cardblock.classList.remove("displaycard-active")
});
document.addEventListener("DOMContentLoaded", foodload);

function foodload() {
  loadcontent();
}
var storeditem = []
function loadcontent() {


  //remove final card item.......................................................................................................
  var deletebutton = document.querySelectorAll(".card_icon");
  deletebutton.forEach((item) => {

    item.addEventListener("click", () => {
      var div = item.parentElement.parentElement;
      var divtitle = div.querySelector(".dispalycard_name").innerText;
      // console.log("divtitle",divtitle)
      // remove from stroed array................................
      storeditem = storeditem.filter((item) => item.title !== divtitle);
      // console.log("storeditem",storeditem)
      // remove from card....................
      item.parentElement.parentElement.remove();
      loadcontent();
    })
  });

  //................................card count. (does not prevent the negative value).................. ............................
  let card_count = document.querySelectorAll(".card_count");
  card_count.forEach((item) => {
    item.addEventListener("change", () => {
      if (isNaN(item.value) || item.value < 1) {
        // console.log(item.value )
        item.value = 1;
      }
      loadcontent();
    })
  });
// ..........................product card add........................................................................................................
  let card_button = document.querySelectorAll(".card");
  card_button.forEach((item) => {

    item.addEventListener("click", () => {
          let food = item.parentElement;
          let title = food.querySelector(".food_name").innerText;
          let price = food.querySelector(".food_price").innerText;
          let img = food.querySelector(".food_img").src;
//......... array pushed item...........................................................................
            let product_new = { title, img, price };
            //  console.log(product_new.title);
            if (storeditem.find((item) => item.title === product_new.title)) {
              // console.log(item)
              //  alert("already added in the card")
              return;
            } else {
              storeditem.push(product_new);
            }
      // console.log(storeditem)

      let newproduct_element = cardcreate(title, img, price);
      let basket = document.querySelector(".dispalycard_content");
      basket.innerHTML += newproduct_element;
      loadcontent()
    })
  });
  total();
  // ......................................create card ................................................................................
}
function cardcreate(title, img, price) {
  return `
  <div class="dispalycard_box">
      <img src="${img}" class="card_img">

      <div class="detailbox">
              <div class="dispalycard_name">${title}</div> 
              <div class="price_box">
                  <div class="displaycard_price">${price}</div>
                  <div class="Totalamount">${price}</div>
              </div>
              <input type="number" value="1" class="card_count"/>   
      </div>
  
      <div><i class="bi bi-trash-fill card_icon"></i></div>

  </div>`
}
function total(){
  const carditem=document.querySelectorAll(".detailbox");
  const displaycard_price=document.querySelector(".total_price");
 
   var total=0; 

  carditem.forEach((item)=>{
        let priceElement=item.querySelector(".displaycard_price");
        let price=parseFloat(priceElement.innerText.replace("RS:",""));
        // console.log("price",price);
        let card_count= item.querySelector(".card_count").value;
        total +=(price*card_count);
        // console.log("total",total);
        item.querySelector(".Totalamount").innerHTML="RS:"+(price*card_count);

        displaycard_price.innerText="RS:"+total;


        // addproduct count.............................................................
  const  cart_count=document.querySelector(".cart_count");  
     var count=storeditem.length;
     cart_count.innerHTML=count;

      if( cart_count.innerHTML==0){
        cart_count.setAttribute("style","display:none")
      }
      else{
        cart_count.style.display="block"
      }

})
  

}