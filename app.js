$(document).ready(() => {
    let currentEl = $('#current');
    let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    // click event for search bar //
    $('#submit').on('click', () => {
        runProgram();
        recentsearch();
    });

    function runProgram() {
        let cityName = $('#citySearch').val();

        // set variables for static html //
        let lat = 0;
        let lon = 0;

        localStorage.setItem('recent', cityName);

        // clear any exsisting search results from the page //
        $('#carddate').val('');
        $('#cardtemp').val('');
        $('#cardhumid').val('');
        $('#cardcond').val('');

        $('#citySearch').val('');
        currentEl.html('');
        // ajax call //
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=08bea1b85d0458c294c28493bcc4e4fe`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then((response) => {

            // append data to html //
            $('#city').html(`: ${response.name}`);
            currentEl.append(`<p>${response.name}</p>`);
            currentEl.append(`<p>Tempurature: ${response.main.temp}F</p>`);
            currentEl.append(`<p>Humidity: ${response.main.humidity}%</p>`);
            currentEl.append(`<p>Wind Speed: ${response.wind.speed}mph</p>`);
            let iconurl = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;
            currentEl.prepend(`<img src=${iconurl}>`);
            // set variables for second api search parameters //
            lat = response.coord.lat;
            lon = response.coord.lon;
            let queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=08bea1b85d0458c294c28493bcc4e4fe`;
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then((response) => {
                // complete data grab from API, appends remaining data and forcast to page //
                currentEl.append($('<p>').html(`UV Index: ${response.current.uvi}`).attr('id', 'uvIndex'));
                // color coding for UV index //
                if (response.current.uvi > 11) {
                    $('#uvIndex').css('background-color', 'red');
                }
                if (response.current.uvi < 10) {
                    $('#uvIndex').css('background-color', 'green');
                }
                if (response.current.uvi >= 10 && response.current.uvi <= 11) {
                    $('#uvIndex').css('background-color', 'yellow');
                }
                
                for (let i = 1; i < 6; i++) {
                    var hourString = i.toString();

                    let day = moment.unix(response.daily[i].dt).format('MM-DD');

                    $('#carddate' + hourString).append($('<div>').addClass('row').html(`<p>Date: ${day}</p>`));
                    $('#cardtemp' + hourString).append($('<div>').addClass('row').attr("id", "time-block-" + hourString).html(`<p>Temp: ${response.daily[i].temp.day} F</p>`));
                    $('#cardhumid' + hourString).append($('<div>').addClass('row').attr("id", "time-block-" + hourString).html(`<p>Humidity: ${response.daily[i].humidity}%</p>`));
                    $('#cardcond' + hourString).append($('<img>').addClass('row').attr("src", `http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`).html(`<img src="http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`));
                }

            });

        });
        $('#citySearch').val('');

    };

    // function for local storage components //
    function recentsearch() {
        $('#lowerAside').html('');
        let mostRecentSearch = localStorage.getItem('recent');
        recentSearches.push(mostRecentSearch);
        let filter = recentSearches.filter((item, index) => recentSearches.indexOf(item) === index);

        console.log(filter);
        localStorage.setItem('recentSearches', JSON.stringify(filter));

        for (let i = 0; i < filter.length; i++) {

            $('#lowerAside').append($('<div>').attr('id', 'mostRecent').addClass('row border p-1 recentSearch').html(`<p>${recentSearches[i]}</p>`));
        }
    }
    
    function update() {
        $('#clock').html(moment().format('MMMM D, YYYY H:mm:ss'));
    }

    setInterval(update, 1000);
});
