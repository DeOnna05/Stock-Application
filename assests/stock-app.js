
// Initial array of stocks
const stocksList = ['AMZN', 'NFLX', 'AAPL', 'NKE', 'MMM', 'P', 'BBY', 'CCL', 'KO', 'DAL', 'ELF', 'FDX', 'GPS', 'JCP', 'VAC', 'K', 'SHAK', 'LUV',];

let validationList = [];



const displayStock = function(event){
  // console.log("Hello")
event.preventDefault();
  const stock = $(this).attr('data');

  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`;

  const logoURL = `https://api.iextrading.com/1.0/stock/${stock}/logo`;

  const newsURL = `https://api.iextrading.com/1.0/stock/${stock}/news`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // console.log(queryURL);

//variables for company name, stock symbol, and price to be displayed
  const companyName = response.quote.companyName;
 
  const stockSymbol = response.quote.symbol;

  const price = response.quote.latestPrice;

  $.ajax({
    url: logoURL,
    Method: 'GET'
  }).then(function(response){

    const logo = response.url;

  $.ajax({
    url: newsURL,
    method: 'GET'
  }).then(function(response){
    // console.log(response);

    const newsHeadline = response[0].headline;

    const newsLink = response[0].url;
    
  $('tbody').append(`<tr><td>${companyName}</td> + <td>${stockSymbol}</td> + <td>${price}</td> + <td><img src=${logo}></td> + <td><a href=${newsLink}>${newsHeadline}</a></td></tr>`);
  });
  });
})
}

validationURL = `https://api.iextrading.com/1.0/ref-data/symbols`;

  $.ajax({
    url: validationURL,
    method: 'GET'
  }).then(function(response) {
    for(let i = 0; i < response.length; i++){
     validationList.push(response[i].symbol)
    }
      console.log(validationList)
  });

//click event button function
const addButton = function (event) {
  event.preventDefault();
  // grab the text the user types into the input field
  let newBtn = $("#stock-input").val().trim();
  // console.log(newBtn)
  //change input to uppercase
  let newBtnUppercase = newBtn.toUpperCase();
  console.log(newBtnUppercase)
  // console.log(newBtnUppercase)
  // console.log(validationList.indexOf(newBtnUppercase))
  let index = validationList.indexOf(newBtnUppercase)
  //  console.log(index)
    if (index > -1) {
      
      // add the new stock into the stocks array
      
       stocksList.push(newBtnUppercase);
      
      // deletes the contents of the stock search input
      render();
    $("#stock-input").val("");
     
    } else {
      $("#stock-input").val("");  
    }
  } 
  
  
  // Calling the render function to display the initial list of stocks
const render = function () {
  $("#view-stocks").empty()  // Deletes contents in div prior to adding new stocks

  for (let i = 0; i < stocksList.length; i++) { // Loop through the array of stocks, then generate buttons for each stock in the array
    const buttons = $('<button>');

//adds class stockBtn to new button
    buttons.addClass('stockBtn');

//adds data-attribute
    buttons.attr('data', stocksList[i]);

//grabbing button text
    buttons.text(stocksList[i])


//adds button to the div
    $("#view-stocks").append(buttons);
  }
}

//event listentes
$('#add-stock').on('click', addButton);
$('#view-stocks').on('click', '.stockBtn', displayStock);

render();


