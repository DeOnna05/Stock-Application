// Initial array of stocks
const stocksList = ['BTCE', 'OKCoin', 'Coinbase', 'Cexio', 'Coinfloor', 'Gemini', 'BitBay', 'LiveCoin', 'Luno', 'Coinroom', 'BitFlip', 'Coincap', 'BitMart', 'Buda'];

const displayStock = function(){

  
}


// function (event) {
// //   event.preventDefault();
//   const stock = $(this).val();
//   const queryURL = `https://min-api.cryptocompare.com/data/all/exchanges`;

//   console.log(stock);
//   console.log(queryURL);

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (response) {

//     console.log(response)

//   })


// })

// // Calling the renderButtons function to display the initial list of stocks
// render();



// Function for displaying stock data
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
$('#stocks-view').on('click', '.get-stock', displayStock);

render();


