let tableboxcont = document.getElementById('tablebox')
let datalistcopy;
function addDatatoUi(datalist) {
  console.log(datalist);

  datalistcopy=datalist;


  document.getElementById('tablebox').innerHTML="";
  for(let i=0;i<datalist.length;i++)
  {
    let object=datalist[i];
    let division = document.createElement('div');
    division.className ="dataelem";
    let ratecolor="red"
    function pricecolor () {
      if(object[i].price_change_percentage_24h > 0)
      {
        ratecolor="green"
      }
    }
    pricecolor();
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
  <div class="price_change_percentage_24h ${ratecolor}">${object.price_change_percentage_24h}%</div>
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


//Search
// https://api.coingecko.com/api/v3/search?query=${}

const inputbox = document.getElementById('name_symb');

var textval;

inputbox.addEventListener('input', () => {
  textval = inputbox.value;
  console.log(textval);
    }
);

function getnamedata () {
  console.log("entered");
  console.log(textval);
   for(let i=0;i<datalistcopy.length;i++)
   {
    console.log("pr")
    // console.log(datalistcopy[i].name);
    // console.log(datalistcopy[i].symbol);
    if(datalistcopy[i].name==textval || datalistcopy[i].symbol==textval)
    {
      let ansobj=datalistcopy[i];
      let reply=[];
      reply.push(ansobj);
      addDatatoUi(reply);
      console.log("if true");
      break;
    }
   }

   if(textval.length===0) {
    console.log("okk");
  async function calldefault () {
    try{
      const resp=await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data=await resp.json();
      addDatatoUi(data);
    }
    catch(error) {
      alert("Error pls refresh the webpage");
    }
  }

  calldefault();
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