// Initial array of stocks
const stocksList = ['AMZN', 'NFLX', 'AAPL', 'NKE', 'MMM', 'P', 'BBY', 'CCL', 'KO', 'DAL', 'ELF', 'FDX', 'GPS', 'JCP', 'VAC', 'K', 'SHAK', 'LUV',];

const displayStock = function(){

  const stock = $(this).attr('data');

  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`;

  const logoURL = `https://api.iextrading.com/1.0/stock/${stock}/logo`;

  const newsURL = `https://api.iextrading.com/1.0/stock/stock/${stock}/news`;
  // console.log(stock);
  

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(queryURL);

    console.log(response)
    
  // console.log(response)

//variables for company name, stock symbol, and price to be displayed
  const companyName = response.quote.companyName;
 
  const stockSymbol = response.quote.symbol;

  const price = response.quote.latestPrice;

  
  $.ajax({
    url: logoURL,
    Method: 'GET'
  }).then(function(response){

    const logo = response.url;

    console.log(logo);

  $.ajax({
    url: newsURL,
    method: 'GET'
  }).then(function(response){
    console.log(reponse)

    const newsHeadline = response.headline;

    const newsLink = response.url;

    
  $('tbody').append(`<tr><td>${companyName}</td> + <td>${stockSymbol}</td> + <td>${price}</td> + <td><img src="${logo}"></td> + <td>${newsHeadline, newsLink}</td></tr>`);


  });
 
  // $('#stockDisplay').append(stockDisplay);

  });


})

}




// Calling the render function to display the initial list of stocks
const render = function () {
  $("#view-stocks").empty()  // Deletes contents in div prior to adding new stocks

  for (let i = 0; i < stocksList.length; i++) { // Loop through the array of stocks, then generate buttons for each stock in the array
    const newButton = $('<button>');

//adds class stockBtn to new button
    newButton.addClass('stockBtn');

//adds data-attribute
    newButton.attr('data', stocksList[i]);

//grabbing button text
    newButton.text(stocksList[i])


//adds button to the div
    $("#view-stocks").append(newButton);
  }
}

//click event button function
const addButton = function (event) {
  event.preventDefault();
  // grab the text the user types into the input field
  let newStock = $("#stock-input").val().trim();
  for (let i = 0; i < stocksList.length; i++) {
    if (newStock === stocksList[i]) {
      // add the new stock into the stocks array
      stocksList.push(newStock);
      //deletes the contents of the stock search input
      $("#stock-input").val("")
    }
  }
  render();
}

//event listenter for submit button
$('#add-stock').on('click', addButton);

//
$('#view-stocks').on('click', '.stockBtn', displayStock);

render();


