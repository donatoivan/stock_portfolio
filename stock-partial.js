const datasets = []
const arrayOfDailyAndTimeArr = []

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

let resetBackgroundTagsHighlightSelected = (hexColour, button) => {
  document.body.style.background = `${hexColour}`;
  
  //reset background colour for anchor tags and highlight selected
  let a = document.querySelectorAll("a");
  for (let i = 0; i < a.length; ++i) {
    a[i].style.backgroundColor = `${hexColour}`;
    a[i].style.color = "white";
  };
  button.style.backgroundColor = 'white';
  button.style.color = `${hexColour}`;
}

const clearChildren = () => {
  var myNode = document.querySelector("ul");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

let createSymbol = (data, hex) => {
  let symbol = data["quote"]["symbol"];
  let newLi = document.createElement("a");
  newLi.setAttribute('href', 'javascript:void(0)')
  newLi.setAttribute('id', 'symbol')
  newLi.textContent = `Symbol`;
  document.querySelector("ul").appendChild(newLi);
  let symbolButton = document.querySelector("#symbol");

  symbolButton.addEventListener("click", function (event) {
    newLi.textContent = `${symbol}`;
    newLi.style.backgroundColor = "white";
    newLi.style.color = `${hex}`; 
  });
}

let createPrimaryExchange = (data, hex) => {
  let primaryExchange = data["quote"]["primaryExchange"];
  let newLi2 = document.createElement("a");
  newLi2.setAttribute('href', 'javascript:void(0)');
  newLi2.setAttribute('id', 'primary-exchange');
  newLi2.textContent = "Primary Exchange";
  document.querySelector("ul").appendChild(newLi2);
  let primaryButton = document.querySelector("#primary-exchange");

  //primary exchange event
  primaryButton.addEventListener("click", function (event) {
    newLi2.textContent = `${primaryExchange}`;
    newLi2.style.backgroundColor = "white";
    newLi2.style.color = `${hex}`; 
  });
}

let createCompanyName = (data, hex) => {
  let companyName = data["quote"]["companyName"];
  let newLi3 = document.createElement("a");
  newLi3.setAttribute('href', 'javascript:void(0)');
  newLi3.setAttribute('id', 'company-name');
  newLi3.textContent = "Company Name";
  document.querySelector("ul").appendChild(newLi3);
  let companyButton = document.querySelector("#company-name");

  //company name event
  companyButton.addEventListener("click", function (event) {
    newLi3.textContent = `${companyName}`;
    newLi3.style.backgroundColor = "white";
    newLi3.style.color = `${hex}`; 
  });
}

let createSector = (data, hex) => {
  let sector = data["quote"]["sector"];
  let newLi4 = document.createElement("a");
  newLi4.setAttribute('href', 'javascript:void(0)');
  newLi4.setAttribute('id', 'sector');
  newLi4.textContent = "Sector";
  document.querySelector("ul").appendChild(newLi4);
  let sectorButton = document.querySelector("#sector");

  //create sector event
  sectorButton.addEventListener("click", function (event) {
    newLi4.textContent = `${sector}`;
    newLi4.style.backgroundColor = "white";
    newLi4.style.color = `${hex}`; 
  });
}

let createMarketCap = (data, hex) => {
  let marketCap = data["quote"]["marketCap"];
  let newLi5 = document.createElement("a");
  newLi5.setAttribute('href', 'javascript:void(0)');
  newLi5.setAttribute('id', 'market-cap');
  newLi5.textContent = "Market Cap";
  document.querySelector("ul").appendChild(newLi5);
  let marketCapButton = document.querySelector("#market-cap");

  //create market-cap event
  marketCapButton.addEventListener("click", function (event) {
    newLi5.textContent = `$${formatNumber(marketCap)}`;
    newLi5.style.backgroundColor = "white";
    newLi5.style.color = `${hex}`; 
  });
}

let createPeRatio = (data, hex) => {
  let peRatio = data["quote"]["peRatio"];
  let newLi6 = document.createElement("a");
  newLi6.setAttribute('href', 'javascript:void(0)');
  newLi6.setAttribute('id', 'pe-ratio');
  newLi6.textContent = "P/E Ratio";
  document.querySelector("ul").appendChild(newLi6);
  let peRatioButton = document.querySelector("#pe-ratio");

  //create pe-ratio event
  peRatioButton.addEventListener("click", function (event) {
    newLi6.textContent = `${peRatio}`;
    newLi6.style.backgroundColor = "white";
    newLi6.style.color = `${hex}`; 
  });  
}


const apple = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

const google = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

const tesla = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

const brka = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BRK.A&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

const fb = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");
Promise.all([apple, google, tesla, brka, fb])
  .then((arrOfRes) => {
    arrOfRes.forEach((response) => {
      pushUserObjects(response.json())
    })
  })

// function that pushes object into array
const pushUserObjects = (json) => {
    json.then((data) => {
    let package = []
    let daily = [];
    let timeSeriesArr = [];
    let test = (data["Time Series (Daily)"]);
    const entries = Object.entries(test)
    for(let i = 0; i < 17; i ++) {
      daily.push(entries[i][1]["4. close"]);
      timeSeriesArr.push(entries[i][0])
    }
    package.push(daily.reverse());
    package.push(timeSeriesArr.reverse());
    arrayOfDailyAndTimeArr.push(package); 
    console.log(arrayOfDailyAndTimeArr)
    drawChart(arrayOfDailyAndTimeArr[0][1], arrayOfDailyAndTimeArr[0][0], 'rgba(196, 117, 246, 0.6)', 
              'rgb(196, 117, 246)', 'rgb(234, 241, 242)', 'Apple')
  })
}

//function to draw chart
const drawChart = (timeArray, dataArray, backgroundColour, xGridlines, yGridlines, label) => {
  document.querySelector("canvas").remove(); 
  let canvas = document.createElement('canvas'); 
  canvas.setAttribute('id','chart'); 
  canvas.setAttribute('width','500'); 
  canvas.setAttribute('height','200'); 
  document.querySelector('#chart-container').appendChild(canvas);
  var ctx = canvas.getContext("2d");


  var config = {
    type: 'line',
    data: {
        labels: timeArray,
        datasets: [{
          label: label,
          borderColor: 'rgb(255,255,255)',
          pointBorderColor: "rgba(255,255,255)",
          pointBackgroundColor: "rgba(255,255,255)",
          data: dataArray,
          backgroundColor: `${backgroundColour}`,
        }]
      },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              color: `${xGridlines}`,
          },
          ticks: {
            fontSize: 18,
            fontColor: "white",
            labelString: "Price",
          },
        }],
        yAxes: [{
          gridLines: {
              color: `${yGridlines}`,
          },
          ticks: {
            fontSize: 18,
            fontColor: "white",
          },
          scaleLabel: {
            display: true,
            labelString: 'Price $USD',
            fontSize: 18,
            fontColor: "white",
            padding: 20,
          }   
        }]
      },
      legend: {
        labels: {
          fontSize: 24,
          fontColor: "white",
        }
      }
    }
  };
  var chart = new Chart(ctx, config);
}


// apple button
let myButton = document.querySelector("#apple");

myButton.addEventListener("click", function (event) {
  //change background colour on click
  resetBackgroundTagsHighlightSelected("#c475f6", myButton);

  //fetch api data for anchor buttons
  const iex = fetch("https://api.iextrading.com/1.0/stock/aapl/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
    clearChildren()
    createSymbol(data, '#c475f6');
    createPrimaryExchange(data, '#c475f6');
    createCompanyName(data, '#c475f6');
    createSector(data, '#c475f6');
    createMarketCap(data, '#c475f6');
    createPeRatio(data, '#c475f6');   
    })
  drawChart(arrayOfDailyAndTimeArr[0][1], arrayOfDailyAndTimeArr[0][0], 'rgba(196, 117, 246, 0.6)', 
  'rgb(196, 117, 246)', 'rgb(234, 241, 242)', 'Apple')
});


//google button
let myButton2 = document.querySelector("#google");

myButton2.addEventListener("click", function (event) {
  //change background colour on click
  resetBackgroundTagsHighlightSelected('#9c73f6', myButton2)

  //fetch api data for anchor buttons
  const iex = fetch("https://api.iextrading.com/1.0/stock/googl/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      clearChildren()
      createSymbol(data, '#9c73f6');
      createPrimaryExchange(data, '#9c73f6');
      createCompanyName(data, '#9c73f6');
      createSector(data, '#9c73f6');
      createMarketCap(data, '#9c73f6');
      createPeRatio(data, '#9c73f6');
    })
  drawChart(arrayOfDailyAndTimeArr[0][1], arrayOfDailyAndTimeArr[1][0], 'rgba(156, 115, 246, 0.6)', 'rgb(156, 115, 246', 'rgb(234, 241, 242)', 'Google')

});
   

//tesla button
let myButton3 = document.querySelector("#tesla");

myButton3.addEventListener("click", function (event) {
  //change background colour on click
  resetBackgroundTagsHighlightSelected('#7681f6', myButton3)

  //fetch api data for anchor buttons
  const iex = fetch("https://api.iextrading.com/1.0/stock/tsla/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
    clearChildren()
    createSymbol(data, '#7681f6');
    createPrimaryExchange(data, '#7681f6');
    createCompanyName(data, '#7681f6');
    createSector(data, '#7681f6');
    createMarketCap(data, '#7681f6');
    createPeRatio(data, '#7681f6');      
    })
  drawChart(arrayOfDailyAndTimeArr[0][1], arrayOfDailyAndTimeArr[2][0], 'rgba(118, 129, 246, 0.6)', 
            'rgb(118, 129, 246)', 'rgb(234, 241, 242)', 'Tesla' )
});


//berkshire button
let myButton4 = document.querySelector("#berkshire");

myButton4.addEventListener("click", function (event) {
  //change backgrounf colour on click
  resetBackgroundTagsHighlightSelected('#3996b2', myButton4);
  //fetch api data for anchor tags
  const iex = fetch("https://api.iextrading.com/1.0/stock/brk.a/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      clearChildren()
      createSymbol(data, '#3996b2');
      createPrimaryExchange(data, '#3996b2');
      createCompanyName(data, '#3996b2');
      createSector(data, '#3996b2');
      createMarketCap(data, '#3996b2');
      createPeRatio(data, '#3996b2');     
    }) 
  drawChart(arrayOfDailyAndTimeArr[0][1], arrayOfDailyAndTimeArr[3][0], 'rgba(57, 150, 178, 0.6)', 
            'rgb(57,150,178)', 'rgb(234, 241, 242)', 'Berkshire Hathaway')
});
      

// //facebook button
let myButton5 = document.querySelector("#facebook");

myButton5.addEventListener("click", function (event) {
  //change background colour on click
  resetBackgroundTagsHighlightSelected('#2a69fc', myButton5)
  document.body.style.background = '#2a69fc';
  
  //fetch api for anchor tags
  const iex = fetch("https://api.iextrading.com/1.0/stock/fb/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      clearChildren()
      createSymbol(data, '#2a69fc');
      createPrimaryExchange(data, '#2a69fc');
      createCompanyName(data, '#2a69fc');
      createSector(data, '#2a69fc');
      createMarketCap(data, '#2a69fc');
      createPeRatio(data, '#2a69fc');     
    })
  drawChart(arrayOfDailyAndTimeArr[0][1], arrayOfDailyAndTimeArr[4][0], 'rgba(42, 105, 252, 0.6)', 
            'rgb(42, 105, 252)', 'rgb(234, 241, 242)', 'Facebook' )
});
