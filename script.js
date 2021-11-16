let coordLat
let coordLon
let url = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=b271b682992be5163f554d1fc1a3df12"
let form = document.forms[0]
let lat = 30.31
let lon = 50.27
let Searchquery
let cityName
let carrent = document.querySelector('.carrent')
let hourly = document.querySelector('.hourly')
let url1 = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely&appid=b271b682992be5163f554d1fc1a3df12'
let today = document.querySelector('.today')
let daysOffive = document.querySelector('.daysOffive')
let fiveDay = document.querySelector('.fiveday')
let weelsDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'Thursday', 'Friday ', 'Saturday ']




function createEl(el, cl = '', txt = '') {
    let element = document.createElement(el)

    // element.style = ('class = "test"')
    if (cl != '') element.classList.add(cl)
    if (txt != '') element.innerHTML = txt
        // console.log(element);
    return (element)
}

function fiveDayFn() {
    today.classList.add('d-none')
    fiveDay.classList.remove('d-none')
}

function todayFn() {
    fiveDay.classList.add('d-none')
    today.classList.remove('d-none')

}

form.addEventListener('submit', e => {
    e.preventDefault();
    Searchquery = form[0].value
    form[0].value = ''
    console.log(Searchquery)
    searchWeather(Searchquery)
})

geo()
    // определение гео, поиск имени города и запуск общей ф-ции
function geo() {
    navigator.geolocation.getCurrentPosition(
        function(position) {

            coordLat = position.coords.latitude
            coordLon = position.coords.longitude
            console.log(coordLat, coordLon)
            url = `http://api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLon}&units=metric&appid=b271b682992be5163f554d1fc1a3df12`
            fetch(url).then(response => {
                return response.json()
            }).then(data => {
                console.log(data.name)
                cityName = data.name
                    // запуск общей ф-ции
                searchWeather(cityName)
            })


        }
    );

}

// общая ф-ция

function searchWeather(name) {
    // поиск гео по имени
    url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=b271b682992be5163f554d1fc1a3df12`
    fetch(url).then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('by name', data)
            let cityName = data.name
            let coordLat = data.coord.lat
            let coordLon = data.coord.lon
            let url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordLat}&lon=${coordLon}&exclude=minutely&appid=b271b682992be5163f554d1fc1a3df12`
            fetch(url1).then((response) => {
                return response.json();
            }).then((data2) => {
                console.log('data2', data2)
                let d = new Date(data2.current.dt * 1000)
                let timeZ = data2.timezone
                d = d.toLocaleString('en-US', { timeZone: timeZ })
                console.log(d)
                    // current block
                let currIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                let weatherLink = createEl('div', 'weatherLink', '')
                weatherLink.innerHTML = `<img src="${currIcon}" alt=""></img>`
                carrent.append(weatherLink)
                let currWeather = data2.current.weather[0].description
                let currTemp = Math.ceil(data2.current.temp - 273.15)
                let currRealfeel = Math.ceil(data2.current.feels_like - 273.15)
                let currSunrise = data2.current.sunrise
                let currSunset = data2.current.sunset
                let duration = ((currSunset - currSunrise) / 3600) + ' hour'
                console.log((new Date(currSunrise * 1000)))
                let dtSR = (new Date(currSunrise * 1000))
                let dtSs = (new Date(currSunset * 1000))
                console.log(dtSR.getHours(), dtSR.getMinutes())
                console.log(dtSs.getHours(), dtSs.getMinutes())
                    // hourly block

                // console.log(hourlyDt.getHours())
                let hourlyArr = data2.hourly
                for (let i = 0; i < 24; i++) {

                    let hourlyDt = new Date(hourlyArr[i].dt * 1000).getHours() + ':00'
                    let hourlyIcon = `https://openweathermap.org/img/wn/${hourlyArr[i].weather[0].icon}@2x.png`
                    let hourlyDes = hourlyArr[i].weather[0].description
                    let hourlyTemp = Math.ceil(hourlyArr[i].temp - 273.15)
                    let hourlyFeel = Math.ceil(hourlyArr[i].feels_like - 273.15)

                    let hDiv = createEl('div', 'hDiv', '')
                    let hourlyLink = createEl('div', 'hourlyLink', '')
                    hourlyLink.innerHTML = `<img src="${hourlyIcon}" alt=""></img>`
                    let hdt = createEl('span', '', hourlyDt)
                    let hdes = createEl('span', '', hourlyDes)
                    let htemp = createEl('span', '', hourlyTemp + 'C')
                    let hfeel = createEl('span', '', hourlyFeel + 'C')
                    hourly.append(hDiv)
                    hDiv.append(hdt)
                    hDiv.append(hourlyLink)
                    hDiv.append(hdes)
                    hDiv.append(htemp)
                    hDiv.append(hfeel)

                }
                let dailyArr = data2.daily
                for (let i = 0; i < 5; i++) {
                    let dailyDt = weelsDay[new Date(dailyArr[i].dt * 1000).getDay()]
                    let dailyIcon = `https://openweathermap.org/img/wn/${dailyArr[i].weather[0].icon}@2x.png`
                    let dailyDes = dailyArr[i].weather[0].description
                    let dailyTemp = Math.ceil(dailyArr[i].temp.day - 273.15)

                    let dDiv = createEl('div', 'dDiv', '')
                    let dailyLink = createEl('div', 'dailyLink', '')
                    dailyLink.innerHTML = `<img src="${dailyIcon}" alt=""></img>`
                    let ddt = createEl('span', '', dailyDt)
                    let ddes = createEl('span', '', dailyDes)
                    let dtemp = createEl('span', '', dailyTemp + 'C')
                    console.log(daysOffive)
                    daysOffive.append(dDiv)
                    dDiv.append(ddt)
                    dDiv.append(dailyLink)
                    dDiv.append(ddes)
                    dDiv.append(dtemp)
                }

            })
        })
}
// запрос по имени города


// let d = new Date()

// console.log(d.toLocaleString('en-US', { timeZone: 'America/New_York' }))