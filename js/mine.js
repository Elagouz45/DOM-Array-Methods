const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
var screen = document.getElementById("screen");

let ticketPrice = +movieSelect.value;

populateUI();
//save selected movie index and price

function setMovieDate(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count
function updateSelectedCount() {
  const selectSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectSeats.length;
  console.log(selectedSeatsCount);

  const seatsIndex = [...selectSeats].map((item) => [...seats].indexOf(item));
  console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  screen.innerText = selectedSeatsCount * ticketPrice + "$";
}
//Get data from localstorage

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seats, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seats.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieDate(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  )
    e.target.classList.toggle("selected");

  updateSelectedCount();
});

//update price

updateSelectedCount();
