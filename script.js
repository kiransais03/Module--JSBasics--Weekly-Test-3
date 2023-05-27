let tableboxcont = document.getElementById('tablebox')

function addDatatoUi(datalist) {
  console.log(datalist);
  console.log(datalist[0]);
  document.getElementById('tablebox').innerHTML="";
  for(let i=0;i<datalist.length;i++)
  {
    let object=datalist[i];
    let division = document.createElement('div');
    division.className ="dataelem";
    let inHTML = 
    `<div class="block">
    <div class="image">
      <img
        src="${object.image}"
        alt=""
      />
    </div>
    <div class="name">${object.name}</div>
  </div>
  <div class="symbol">${object.symbol}</div>
  <div class="current_price">$${object.current_price}</div>
  <div class="total_volume">$${object.total_volume}</div>
  <div class="price_change_percentage_24h">${object.price_change_percentage_24h}%</div>
  <div class="market_cap">Mkt Cap:$${object.market_cap}</div>`

  division.innerHTML =inHTML;
  tableboxcont.append(division)
  }
}



let response_prom = fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
);

response_prom.then(responseprom_func); //resposneprom then

//response prom then func
function responseprom_func(responseprom_data) {
  let jscallprom = responseprom_data.json();

  jscallprom.then(jscallprom_func); //jsprom then

  //jsprom then func
  function jscallprom_func(jscallprom_data) {
    addDatatoUi(jscallprom_data);
  }

  jscallprom.catch(jscallprom_error); //jsprom catch

  function jscallprom_error(errordata) {
    console.log("Some Error Occured");
  }
}

response_prom.catch(responseprom_error); //responseprom catch

//responseprom catch func
function responseprom_error(errordata) {
  console.log("Some Error Occured");
}


//Search and Button Filters
// https://api.coingecko.com/api/v3/search?query=${}


let textinput = document.getElementById("name_symb").value;

async function getnamedata () {
  console.log("entered");
    try {
      const nameprom = await fetch('https://api.coingecko.com/api/v3/search?query=${textinput}');
      const data= await nameprom.json();
      addDatatoUi(data);
    }
    catch(error) {
      alert("Some Error Ocurred");
    }
  }

let searchbutton = document.getElementById("search");

searchbutton.addEventListener('click',getnamedata);

//Sort Button By Mkt Cap

async function mktcapsortdata () {
  console.log("entered");
    try {
      const nameprom = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=10&page=1&sparkline=false');
      const data= await nameprom.json();
      addDatatoUi(data);
    }
    catch(error) {
      alert("Some Error Ocurred");
    }
  }

  let mkcapsortbtn = document.getElementById("mktcap_sort");

  mkcapsortbtn.addEventListener('click',mktcapsortdata );


  //Search Button By Percentage Change

  async function percentsortdata() {
console.log("entered2");
try {
  const percentprom= await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
  const percentdata=await percentprom.json();
  percentdata.sort((a,b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
  addDatatoUi(percentdata);
}
catch(error) {
  alert("Some Error Ocurred");
}
  }

  let percentsortbtn = document.getElementById("percent_sort");

  percentsortbtn.addEventListener('click', percentsortdata);