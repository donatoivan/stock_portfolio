function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//home api call

let dailyFiveMinHome = [];
let timeArrHome = []
const nsft = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

nsft
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let test = (data["Time Series (Daily)"]);
    const entries = Object.entries(test)
    for(let i = 0; i < 17; i ++) {
      dailyFiveMinHome.push(entries[i][1]["4. close"]);
      timeArrHome.push(entries[i][0])
    }
    timeArrHome.reverse();
    dailyFiveMinHome.reverse();
    chartHome.update();
  })

//chart js for home/apple
var ctx = canvas.getContext("2d");


var config = {
  type: 'line',
  data: {
      labels: timeArrHome,
      datasets: [{
        label: 'Apple',
        borderColor: 'rgb(255,255,255)',
        pointBorderColor: "rgba(255,255,255)",
        pointBackgroundColor: "rgba(255,255,255)",
        data: dailyFiveMinHome,
        backgroundColor: 'rgba(196, 117, 246, 0.6)',
      }]
    },
  options: {
    scales: {
      xAxes: [{
        gridLines: {
            color: "rgb(196, 117, 246)",
        },
        ticks: {
          fontSize: 18,
          fontColor: "white",
          labelString: "Price",
        },
      }],
      yAxes: [{
        gridLines: {
            color: "rgb(234, 241, 242)",
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

var chartHome = new Chart(ctx, config);

//google api call

let dailyFiveMinGoogle = [];
let timeArrGoogle = []
const nsftGoogle = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");
nsftGoogle
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let test = (data["Time Series (Daily)"]);
    const entries = Object.entries(test);
    for(let i = 0; i < 17; i ++) {
      dailyFiveMinGoogle.push(entries[i][1]["4. close"]);
      timeArrGoogle.push(entries[i][0])
    };
    timeArrGoogle.reverse();
    dailyFiveMinGoogle.reverse();
  })  
  
//tesla api call

let dailyFiveMinTesla = [];
let timeArrTesla = []
const nsftTesla = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

nsftTesla
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let test = (data["Time Series (Daily)"]);
    const entries = Object.entries(test);
    for(let i = 0; i < 17; i ++) {
      dailyFiveMinTesla.push(entries[i][1]["4. close"]);
      timeArrTesla.push(entries[i][0])
    }
    timeArrTesla.reverse();
    dailyFiveMinTesla.reverse();
  })

//brka api call
let dailyFiveMinBrka = [];
let timeArrBrka = []
const nsftBrka = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BRK.A&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

nsftBrka
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let test = (data["Time Series (Daily)"]);
    const entries = Object.entries(test)
    for(let i = 0; i < 17; i ++) {
      dailyFiveMinBrka.push(entries[i][1]["4. close"]);
      timeArrBrka.push(entries[i][0])
    };
    timeArrBrka.reverse();
    dailyFiveMinBrka.reverse();
  })

  //facebook api call

let dailyFiveMinFb = [];
let timeArrFb = []
const nsftFb = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&outputsize=compact&interval=60min&apikey=F41ON15LGCFM4PR7");

nsftFb
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let test = (data["Time Series (Daily)"]);
    const entries = Object.entries(test);
    for(let i = 0; i < 17; i ++) {
      dailyFiveMinFb.push(entries[i][1]["4. close"]);
      timeArrFb.push(entries[i][0])
    }
    timeArrFb.reverse();
    dailyFiveMinFb.reverse();
  })


  // apple button

let myButton = document.querySelector("#apple");

myButton.addEventListener("click", function (event) {
  //change background colour on click

  document.body.style.background = '#c475f6';
  
  //reset background colour for anchor tags and highlight selected
  let a = document.querySelectorAll("a");
  for (let i = 0; i < a.length; ++i) {
    a[i].style.backgroundColor = "#c475f6";
    a[i].style.color = "white";
  };
  myButton.style.backgroundColor = 'white';
  myButton.style.color = '#c475f6';

  //remove old and create new canvas element with properties
  document.querySelector("canvas").remove(); 
  let canvas = document.createElement('canvas'); 
  canvas.setAttribute('id','chart'); 
  canvas.setAttribute('width','500'); 
  canvas.setAttribute('height','200'); 
  document.querySelector('#chart-container').appendChild(canvas);

  //fetch api data for anchor buttons
  const iex = fetch("https://api.iextrading.com/1.0/stock/aapl/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var myNode = document.querySelector("ul");
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }
      let symbol = data["quote"]["symbol"];
      let primaryExchange = data["quote"]["primaryExchange"];
      let companyName = data["quote"]["companyName"];
      let sector = data["quote"]["sector"];
      let marketCap = data["quote"]["marketCap"];
      let peRatio = data["quote"]["peRatio"];
      
      //create symbol element
      let newLi = document.createElement("a");
      newLi.setAttribute('href', 'javascript:void(0)')
      newLi.setAttribute('id', 'symbol')
      newLi.textContent = `Symbol`;
      document.querySelector("ul").appendChild(newLi);
      let symbolButton = document.querySelector("#symbol");
      
      //symbol event
      symbolButton.addEventListener("click", function (event) {
        newLi.textContent = `${symbol}`;
        newLi.style.backgroundColor = "white";
        newLi.style.color = "#c475f6"; 
      });

      //create primary exchange element
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
        newLi2.style.color = "#c475f6"; 
      });

      //create company name element
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
        newLi3.style.color = "#c475f6"; 
      });

      //create sector element
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
        newLi4.style.color = "#c475f6"; 
      });
      
      //create market-cap element
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
        newLi5.style.color = "#c475f6"; 
      });

      //create pe-ratio element
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
        newLi6.style.color = "#c475f6"; 
      });       
    })
  
  //chart js for apple
  var ctx = canvas.getContext('2d');

  var config = {
    type: 'line',
    data: {
      labels: timeArrHome,
      datasets: [{
        label: 'Apple',
        borderColor: 'rgb(255,255,255)',
        pointBorderColor: "rgba(255,255,255)",
        pointBackgroundColor: "rgba(255,255,255)",
        data: dailyFiveMinHome,
        backgroundColor: 'rgba(196, 117, 246, 0.6)'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              color: "rgb(196, 117, 246)",
          },
          ticks: {
            fontSize: 16,
            fontColor: "white",
          }
        }],
        yAxes: [{
          gridLines: {
              color: "rgb(234, 241, 242)",
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
          fontSize: 20,
          fontColor: "white",
        }
      }
    }
  };
  var chart = new Chart(ctx, config);
  chart.update();
});


//google button
let myButton2 = document.querySelector("#google");

myButton2.addEventListener("click", function (event) {
  //change background colour on click

  document.body.style.background = '#9c73f6';

  //reset background colour for anchor tags and highlight selected
  let a = document.querySelectorAll("a");
  for (let i = 0; i < a.length; ++i) {
    a[i].style.backgroundColor = "#9c73f6";
    a[i].style.color = "white";
  };
  myButton2.style.backgroundColor = 'white';
  myButton2.style.color = '#9c73f6';

  //remove old and create new canvas element with properties
  document.querySelector("canvas").remove(); 
  let canvas = document.createElement('canvas'); 
  canvas.setAttribute('id','chart'); 
  canvas.setAttribute('width','500'); 
  canvas.setAttribute('height','200'); 
  document.querySelector('#chart-container').appendChild(canvas);
  
  //fetch api data for anchor buttons
  const iex = fetch("https://api.iextrading.com/1.0/stock/googl/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var myNode = document.querySelector("ul");
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      };
      let symbol = data["quote"]["symbol"];
      let primaryExchange = data["quote"]["primaryExchange"];
      let companyName = data["quote"]["companyName"];
      let sector = data["quote"]["sector"];
      let marketCap = data["quote"]["marketCap"];
      let peRatio = data["quote"]["peRatio"];
      
      //create symbol element
      let newLi = document.createElement("a");
      newLi.setAttribute('href', 'javascript:void(0)')
      newLi.setAttribute('id', 'symbol')
      newLi.textContent = `Symbol`;
      document.querySelector("ul").appendChild(newLi);
      let symbolButton = document.querySelector("#symbol");

      //create symbol event
      symbolButton.addEventListener("click", function (event) {
        newLi.textContent = `${symbol}`;
        newLi.style.backgroundColor = "white";
        newLi.style.color = "#9c73f6"; 
      });

      //create primary-exchange element
      let newLi2 = document.createElement("a");
      newLi2.setAttribute('href', 'javascript:void(0)');
      newLi2.setAttribute('id', 'primary-exchange');
      newLi2.textContent = "Primary Exchange";
      document.querySelector("ul").appendChild(newLi2);
      let primaryButton = document.querySelector("#primary-exchange");

      //create primary-exchange event
      primaryButton.addEventListener("click", function (event) {
        newLi2.textContent = `${primaryExchange}`;
        newLi2.style.backgroundColor = "white";
        newLi2.style.color = "#9c73f6"; 
      });

      //create company-name element
      let newLi3 = document.createElement("a");
      newLi3.setAttribute('href', 'javascript:void(0)');
      newLi3.setAttribute('id', 'company-name');
      newLi3.textContent = "Company Name";
      document.querySelector("ul").appendChild(newLi3);
      let companyButton = document.querySelector("#company-name");

      //create company-name event
      companyButton.addEventListener("click", function (event) {
        newLi3.textContent = `${companyName}`;
        newLi3.style.backgroundColor = "white";
        newLi3.style.color = "#9c73f6"; 
      });

      //create sector element
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
        newLi4.style.color = "#9c73f6"; 
      });
      
      //create market-cap element
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
        newLi5.style.color = "#9c73f6"; 
      });

      //create pe-ratio element
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
        newLi6.style.color = "#9c73f6"; 
      });       
    })
  
  //chart js for google
  var ctx = canvas.getContext('2d');

  var config = {
    type: 'line',
    data: {
      labels: timeArrGoogle,
      datasets: [{
        label: 'Google',
        borderColor: 'rgb(255,255,255)',
        pointBorderColor: "rgba(255,255,255)",
        pointBackgroundColor: "rgba(255,255,255)",
        data: dailyFiveMinGoogle,
        backgroundColor: 'rgba(156, 115, 246, 0.6)'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              color: 'rgba(156, 115, 246',
          },
          ticks: {
            fontSize: 16,
            fontColor: "white",
          }
        }],
        yAxes: [{
          gridLines: {
              color: "rgb(234, 241, 242)",
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
          fontSize: 20,
          fontColor: "white",
        }
      }
    }
  };
  var chartGoogle = new Chart(ctx, config);
  chartGoogle.update();   
});
    
//tesla button
let myButton3 = document.querySelector("#tesla");

myButton3.addEventListener("click", function (event) {
  //change background colour on click

  document.body.style.background = '#7681f6';

  //reset background colour for anchor tags and highlight selected
  let a = document.querySelectorAll("a");
  for (let i = 0; i < a.length; ++i) {
    a[i].style.backgroundColor = "#7681f6";
    a[i].style.color = "white";
  };
  myButton3.style.backgroundColor = 'white';
  myButton3.style.color = '#7681f6';

  //remove old and create new canvas element with properties
  document.querySelector("canvas").remove(); 
  let canvas = document.createElement('canvas'); 
  canvas.setAttribute('id','chart'); 
  canvas.setAttribute('width','500'); 
  canvas.setAttribute('height','200'); 
  document.querySelector('#chart-container').appendChild(canvas);

  //fetch api data for anchor buttons
  const iex = fetch("https://api.iextrading.com/1.0/stock/tsla/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var myNode = document.querySelector("ul");
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }
      let symbol = data["quote"]["symbol"];
      let primaryExchange = data["quote"]["primaryExchange"];
      let companyName = data["quote"]["companyName"];
      let sector = data["quote"]["sector"];
      let marketCap = data["quote"]["marketCap"];
      let peRatio = data["quote"]["peRatio"];
      
      //create symbol element
      let newLi = document.createElement("a");
      newLi.setAttribute('href', 'javascript:void(0)')
      newLi.setAttribute('id', 'symbol')
      newLi.textContent = `Symbol`;
      document.querySelector("ul").appendChild(newLi);
      let symbolButton = document.querySelector("#symbol");

      //create symbol event
      symbolButton.addEventListener("click", function (event) {
        newLi.textContent = `${symbol}`;
        newLi.style.backgroundColor = "white";
        newLi.style.color = "#7681f6"; 
      });

      //create primary-exchange element
      let newLi2 = document.createElement("a");
      newLi2.setAttribute('href', 'javascript:void(0)');
      newLi2.setAttribute('id', 'primary-exchange');
      newLi2.textContent = "Primary Exchange";
      document.querySelector("ul").appendChild(newLi2);
      let primaryButton = document.querySelector("#primary-exchange");

      //create primary-exchange event
      primaryButton.addEventListener("click", function (event) {
        newLi2.textContent = `${primaryExchange}`;
        newLi2.style.backgroundColor = "white";
        newLi2.style.color = "#7681f6"; 
      });
      
      //create company element
      let newLi3 = document.createElement("a");
      newLi3.setAttribute('href', 'javascript:void(0)');
      newLi3.setAttribute('id', 'company-name');
      newLi3.textContent = "Company Name";
      document.querySelector("ul").appendChild(newLi3);
      let companyButton = document.querySelector("#company-name");

      //create company event
      companyButton.addEventListener("click", function (event) {
        newLi3.textContent = `${companyName}`;
        newLi3.style.backgroundColor = "white";
        newLi3.style.color = "#7681f6"; 
      });

      //create sector element
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
        newLi4.style.color = "#7681f6"; 
      });
      
      //create market-cap element
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
        newLi5.style.color = "#7681f6"; 
      });

      //create pe-ratio element
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
        newLi6.style.color = "#7681f6"; 
      });       
    })

  //chart js for tesla
  var ctx = canvas.getContext('2d');

  var config = {
    type: 'line',
    data: {
      labels: timeArrTesla,
      datasets: [{
        label: 'Tesla',
        borderColor: 'rgb(255,255,255)',
        pointBorderColor: "rgba(255,255,255)",
        pointBackgroundColor: "rgba(255,255,255)",
        data: dailyFiveMinTesla,
        backgroundColor: 'rgba(118, 129, 246, 0.6)'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              color: 'rgba(118, 129, 246)',
          },
          ticks: {
            fontSize: 16,
            fontColor: "white",
          }
        }],
        yAxes: [{
          gridLines: {
              color: "rgb(234, 241, 242)",
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
          fontSize: 20,
          fontColor: "white",
        }
      }
    }
  };
  var chartTesla = new Chart(ctx, config);
  chartTesla.update();
});


//berkshire button

let myButton4 = document.querySelector("#berkshire");

myButton4.addEventListener("click", function (event) {
  //change backgrounf colour on click

  document.body.style.background = '#3996b2';

  //reset background colour for anchor tags and highlight selected
  let a = document.querySelectorAll("a");
  for (let i = 0; i < a.length; ++i) {
    a[i].style.backgroundColor = "#3996b2";
    a[i].style.color = "white";
  }
  myButton4.style.backgroundColor = 'white';
  myButton4.style.color = '#3996b2';

  //remove old and create new canvas element with properties
  document.querySelector("canvas").remove(); 
  let canvas = document.createElement('canvas'); 
  canvas.setAttribute('id','chart'); 
  canvas.setAttribute('width','500'); 
  canvas.setAttribute('height','200'); 
  document.querySelector('#chart-container').appendChild(canvas);

  //fetch api data for anchor tags
  const iex = fetch("https://api.iextrading.com/1.0/stock/brk.a/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var myNode = document.querySelector("ul");
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }
      let symbol = data["quote"]["symbol"];
      let primaryExchange = data["quote"]["primaryExchange"];
      let companyName = data["quote"]["companyName"];
      let sector = data["quote"]["sector"];
      let marketCap = data["quote"]["marketCap"];
      let peRatio = data["quote"]["peRatio"];
      
      //create symbol element
      let newLi = document.createElement("a");
      newLi.setAttribute('href', 'javascript:void(0)')
      newLi.setAttribute('id', 'symbol')
      newLi.textContent = `Symbol`;
      document.querySelector("ul").appendChild(newLi);
      let symbolButton = document.querySelector("#symbol");

      //create symbol event
      symbolButton.addEventListener("click", function (event) {
        newLi.textContent = `${symbol}`;
        newLi.style.backgroundColor = "white";
        newLi.style.color = "#3996b2"; 
      });

      // create primary-exchange element
      let newLi2 = document.createElement("a");
      newLi2.setAttribute('href', 'javascript:void(0)');
      newLi2.setAttribute('id', 'primary-exchange');
      newLi2.textContent = "Primary Exchange";
      document.querySelector("ul").appendChild(newLi2);
      let primaryButton = document.querySelector("#primary-exchange");

      //create primary-exchange event
      primaryButton.addEventListener("click", function (event) {
        newLi2.textContent = `${primaryExchange}`;
        newLi2.style.backgroundColor = "white";
        newLi2.style.color = "#3996b2"; 
      });
      
      //create company name elemet
      let newLi3 = document.createElement("a");
      newLi3.setAttribute('href', 'javascript:void(0)');
      newLi3.setAttribute('id', 'company-name');
      newLi3.textContent = "Company Name";
      document.querySelector("ul").appendChild(newLi3);
      let companyButton = document.querySelector("#company-name");

      //create company name event
      companyButton.addEventListener("click", function (event) {
        newLi3.textContent = `${companyName}`;
        newLi3.style.backgroundColor = "white";
        newLi3.style.color = "#3996b2"; 
      });

      //create sector element
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
        newLi4.style.color = "#3996b2"; 
      });
      
      //create market-cap element
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
        newLi5.style.color = "#3996b2"; 
      });

      //create pe-ratio element
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
        newLi6.style.color = "#3996b2"; 
      });       
    })
  
  //chart js for berkshire hathaway
  var ctx = canvas.getContext('2d');
  
  var config = {
    type: 'line',
    data: {
      labels: timeArrBrka,
      datasets: [{
        label: 'Berkshire Hathaway',
        borderColor: 'rgb(255,255,255)',
        pointBorderColor: "rgba(255,255,255)",
        pointBackgroundColor: "rgba(255,255,255)",
        data: dailyFiveMinBrka,
        backgroundColor: 'rgba(57, 150, 178, 0.6)'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              color: "rgb(57,150,178)",
          },
          ticks: {
            fontSize: 16,
            fontColor: "white",
          }
        }],
        yAxes: [{
          gridLines: {
              color: "rgb(234, 241, 242)",
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
          fontSize: 20,
          fontColor: "white",
        }
      }
    }
  };
  var chartBrka = new Chart(ctx, config);
  chartBrka.update();
});
      

//facebook button
let myButton5 = document.querySelector("#facebook");

myButton5.addEventListener("click", function (event) {
  //change background colour on click

  document.body.style.background = '#2a69fc';
  
  //reset background colour for anchor tags and highlight selected
  let a = document.querySelectorAll("a");
  for (let i = 0; i < a.length; ++i) {
    a[i].style.backgroundColor = "#2a69fc";
    a[i].style.color = "white";
  }
  myButton5.style.backgroundColor = 'white';
  myButton5.style.color = '#2a69fc';

  //remove old and create new canvas element with properties
  document.querySelector("canvas").remove(); 
  let canvas = document.createElement('canvas'); 
  canvas.setAttribute('id','chart'); 
  canvas.setAttribute('width','500'); 
  canvas.setAttribute('height','200'); 
  document.querySelector('#chart-container').appendChild(canvas);
  
  const iex = fetch("https://api.iextrading.com/1.0/stock/fb/book");
  iex
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var myNode = document.querySelector("ul");
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }
      let symbol = data["quote"]["symbol"];
      let primaryExchange = data["quote"]["primaryExchange"];
      let companyName = data["quote"]["companyName"];
      let sector = data["quote"]["sector"];
      let marketCap = data["quote"]["marketCap"];
      let peRatio = data["quote"]["peRatio"];
      
      //create symbol element
      let newLi = document.createElement("a");
      newLi.setAttribute('href', 'javascript:void(0)')
      newLi.setAttribute('id', 'symbol')
      newLi.textContent = `Symbol`;
      document.querySelector("ul").appendChild(newLi);
      let symbolButton = document.querySelector("#symbol");

      //create symbol event
      symbolButton.addEventListener("click", function (event) {
        newLi.textContent = `${symbol}`;
        newLi.style.backgroundColor = "white";
        newLi.style.color = "#2a69fc"; 
      });

      //create primary-exchange element
      let newLi2 = document.createElement("a");
      newLi2.setAttribute('href', 'javascript:void(0)');
      newLi2.setAttribute('id', 'primary-exchange');
      newLi2.textContent = "Primary Exchange";
      document.querySelector("ul").appendChild(newLi2);
      let primaryButton = document.querySelector("#primary-exchange");

      //create primary-exchange event
      primaryButton.addEventListener("click", function (event) {
        newLi2.textContent = `${primaryExchange}`;
        newLi2.style.backgroundColor = "white";
        newLi2.style.color = "#2a69fc"; 
      });

      //create company name element
      let newLi3 = document.createElement("a");
      newLi3.setAttribute('href', 'javascript:void(0)');
      newLi3.setAttribute('id', 'company-name');
      newLi3.textContent = "Company Name";
      document.querySelector("ul").appendChild(newLi3);
      let companyButton = document.querySelector("#company-name");

      //create company name event
      companyButton.addEventListener("click", function (event) {
        newLi3.textContent = `${companyName}`;
        newLi3.style.backgroundColor = "white";
        newLi3.style.color = "#2a69fc"; 
      });

      //create sector element
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
        newLi4.style.color = "#2a69fc"; 
      });
      
      //create market-cap element
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
        newLi5.style.color = "#2a69fc"; 
      });

      //create pe-ratio element
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
        newLi6.style.color = "#2a69fc"; 
      });       
    })


  var ctx = canvas.getContext('2d');

  var config = {
    type: 'line',
    data: {
      labels: timeArrFb,
      datasets: [{
        label: 'Facebook',
        borderColor: 'rgb(255,255,255)',
        pointBorderColor: "rgba(255,255,255)",
        pointBackgroundColor: "rgba(255,255,255)",
        data: dailyFiveMinFb,
        backgroundColor: 'rgba(42, 105, 252, 0.6)'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              color: 'rgb(42, 105, 252)',
          },
          ticks: {
            fontSize: 16,
            fontColor: "white",
          }
        }],
        yAxes: [{
          gridLines: {
              color: "rgb(234, 241, 242)",
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
          fontSize: 20,
          fontColor: "white",
        }
      },
    }
  };
  var chartFb = new Chart(ctx, config);
  chartFb.update();
});
