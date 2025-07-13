var form = document.querySelector("form")
var input = document.querySelector("#weather-search")
var weatherDiv = document.querySelector("#weather")

var API_KEY = "ac07528e9f1764278ac3ec18ad0f3710"
var BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

form.addEventListener("submit", function (e) {
  e.preventDefault()

  var searchTerm = input.value.trim()

  if (!searchTerm) return

  // Clear previous weather data and input
  weatherDiv.innerHTML = ""
  input.value = ""

  var URL =
    BASE_URL + "?units=imperial&appid=" + API_KEY + "&q=" + encodeURIComponent(searchTerm)

  fetch(URL)
    .then(function (res) {
      if (!res.ok) {
        throw new Error("Location Not Found")
      }
      return res.json()
    })
    .then(function (data) {
      renderWeather(data)
    })
    .catch(function () {
      weatherDiv.innerHTML = ""
      var errorEl = document.createElement("h2")
      errorEl.textContent = "Location not found"
      weatherDiv.appendChild(errorEl)
    })
})

function renderWeather(data) {
  // Clear previous content
  weatherDiv.innerHTML = ""

  var city = data.name
  var country = data.sys.country
  var lat = data.coord.lat
  var lon = data.coord.lon
  var description = data.weather[0].description
  var iconCode = data.weather[0].icon
  var temp = data.main.temp.toFixed(2)
  var feelsLike = data.main.feels_like.toFixed(2)
  var updatedTime = new Date(data.dt * 1000)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    })
    .toLowerCase()

  // City and country code
  var cityEl = document.createElement("h2")
  cityEl.textContent = city + ", " + country

  // Google Maps link
  var mapLink = document.createElement("a")
  mapLink.href =
    "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon
  mapLink.target = "_blank"
  mapLink.textContent = "Click to view map"

  // Weather icon
  var iconImg = document.createElement("img")
  iconImg.src = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png"
  iconImg.alt = description

  // Weather description
  var descEl = document.createElement("p")
  descEl.style.textTransform = "capitalize"
  descEl.textContent = description

  // Current temp
  var tempEl = document.createElement("p")
  tempEl.textContent = "Current: " + temp + "° F"

  // Feels like
  var feelsEl = document.createElement("p")
  feelsEl.textContent = "Feels like: " + feelsLike + "° F"

  // Last updated
  var updatedEl = document.createElement("p")
  updatedEl.textContent = "Last updated: " + updatedTime

  // Append everything to the weather results container
  weatherDiv.appendChild(cityEl)
  weatherDiv.appendChild(mapLink)
  weatherDiv.appendChild(iconImg)
  weatherDiv.appendChild(descEl)
  weatherDiv.appendChild(document.createElement("br"))
  weatherDiv.appendChild(tempEl)
  weatherDiv.appendChild(feelsEl)
  weatherDiv.appendChild(document.createElement("br"))
  weatherDiv.appendChild(updatedEl)
}
