// Initial array of stocks
const stocksList = ['BTCE', 'OKCoin', 'Coinbase', 'Cexio', 'Coinfloor', 'Gemini', 'BitBay', 'LiveCoin', 'Luno', 'Coinroom', 'BitFlip', 'Coincap', 'BitMart', 'Buda'];

// Function for displaying stock data
const render = function () {
  $("#stocks-view").empty()  // Delete the content inside the stocks-view div prior to adding new stocks
  
  for(let i = 0; i < stocksList.length; i++){ // Loop through the array of stocks, then generate buttons for each stock in the array
    $("#add-stock").append(`<button class="get-stock" value=${stocksList[i]}>${stocksList[i]}</button>`)
  }

}

// This function handles events where the add stock button is clicked
const addButton = function(event) {
  event.preventDefault();
  // grab the text the user types into the input field
  let newStock = $("#stock-input").val().trim()
  // add the new stock into the stocks array
  stocksList.push(newStock);
  // Write code to delete the contents of the former input
  $("#stock-input").val("")

  render();
}
//event listenter for submit button
$('#add-stock').on('click', addButton);
$('#stocks-view').on('click', '.get-stock', function(event){
event.preventDefault();
const stock = $(this).val();
const queryURL = `https://min-api.cryptocompare.com/data/all/exchanges`;

console.log(stock);
console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response){

  console.log(response)

})


})

// Calling the renderButtons function to display the initial list of stocks
render();