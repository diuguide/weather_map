$(document).ready(function () {
    const recentSearches = [];
    let currentEl = $('#current');
    // click event for search bar //
    $('#submit').on('click', runProgram);

    function runProgram() {
        let cityName = $('#citySearch').val();

        // set variables for static html //
        let day1 = $('#day1');
        let day2 = $('#day2');
        let day3 = $('#day3');
        let day4 = $('#day4');
        let day5 = $('#day5');
        let temp = 0;
        let lat = 0;
        let lon = 0;

        // begin local storage //
        localStorage.setItem('recent', cityName);
        recentsearch();

        // clear any exsisting search results from the page //
        $('#carddate').val('');
        $('#cardtemp').val('');
        $('#cardhumid').val('');
        $('#cardcond').val('');

        $('#citySearch').val('');
        currentEl.html('');
        // ajax call //
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=08bea1b85d0458c294c28493bcc4e4fe";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // append data to html //
            $('#city').html(': ' + response.name);
            currentEl.append('<p>' + response.name + '</p>');
            currentEl.append('<p>Tempurature: ' + response.main.temp + ' F</p>');
            currentEl.append('<p>Humidity: ' + response.main.humidity + '%</p>');
            currentEl.append('<p>Wind Speed: ' + response.wind.speed + ' mph</p>');
            let iconurl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            currentEl.prepend('<img src=' + iconurl + '>');
            // set variables for second api search parameters //
            lat = response.coord.lat;
            lon = response.coord.lon;
            let queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=08bea1b85d0458c294c28493bcc4e4fe";
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                // complete data grab from API, appends remaining data and forcast to page //
                currentEl.append($('<p>').html('UV Index: ' + response.current.uvi).attr('id', 'uvIndex'));
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
                // clear results //

                clearScreen();

                // create and print local storage key based on recent searches //
                for (let i = 1; i < 6; i++) {
                    var hourString = i.toString();

                    let day = moment.unix(response.daily[i].dt).format('MM-DD');


                    $('#carddate' + hourString).append($('<div>').addClass('row').html('<p>Date: ' + day + '</p>'));
                    $('#cardtemp' + hourString).append($('<div>').addClass('row').attr("id", "time-block-" + hourString).html('<p>Temp: ' + response.daily[i].temp.day + ' F</p>'));
                    $('#cardhumid' + hourString).append($('<div>').addClass('row').attr("id", "time-block-" + hourString).html('<p>Humidity: ' + response.daily[i].humidity + '%</p>'));
                    $('#cardcond' + hourString).append($('<img>').addClass('row').attr("src", "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png").html('<img src="http://openweathermap.org/img/w/"' + response.daily[i].weather[0].icon + ".png"));
                }

            });

        });
        $('#citySearch').val('');

    };

    // function for local storage components //
    function recentsearch() {

        $("#lowerAside").empty();

        let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        const mostRecentSearch = localStorage.getItem('recent');
        recentSearches.push(mostRecentSearch);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        console.log(recentSearches);
        $('#lowerAside').html('');
        for (let i = 0; i < recentSearches.length; i++) {
            $('')
            let index = i;
            $('#lowerAside').append($('<div>').attr('id', 'mostRecent').addClass('row border p-1 recentSearch').html('<p>' + recentSearches[i] + '</p>'));
        }
        $('.recentSearch').on('click', function () {

            if (recentSearches.length > 0) {
                var cityName = recentSearches[recentSearches.length - 1];
                $("#citySearch").val(cityName);

            }

        });
        function runProgram2() {
            let cityName = $('#citySearch').val();
            let currentEl = $('#current');
            // set variables for static html //
            let day1 = $('#day1');
            let day2 = $('#day2');
            let day3 = $('#day3');
            let day4 = $('#day4');
            let day5 = $('#day5');
            let temp = 0;
            let lat = 0;
            let lon = 0;

            // begin local storage //
            localStorage.setItem('recent', cityName);
            recentsearch();

            // clear any exsisting search results from the page //
            $('#carddate').val('');
            $('#cardtemp').val('');
            $('#cardhumid').val('');
            $('#cardcond').val('');

            $('#citySearch').val('');
            currentEl.html('');
            // ajax call //
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=08bea1b85d0458c294c28493bcc4e4fe";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // append data to html //
                $('#city').html(': ' + response.name);
                currentEl.append('<p>' + response.name + '</p>');
                currentEl.append('<p>Tempurature: ' + response.main.temp + ' F</p>');
                currentEl.append('<p>Humidity: ' + response.main.humidity + '%</p>');
                currentEl.append('<p>Wind Speed: ' + response.wind.speed + ' mph</p>');
                let iconurl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
                currentEl.prepend('<img src=' + iconurl + '>');
                // set variables for second api search parameters //
                lat = response.coord.lat;
                lon = response.coord.lon;
                let queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=08bea1b85d0458c294c28493bcc4e4fe";
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function (response) {
                    // complete data grab from API, appends remaining data and forcast to page //
                    currentEl.append($('<p>').html('UV Index: ' + response.current.uvi).attr('id', 'uvIndex'));
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
                    // clear results //

                    clearScreen();

                    // create and print local storage key based on recent searches //
                    for (let i = 1; i < 6; i++) {
                        var hourString = i.toString();

                        let day = moment.unix(response.daily[i].dt).format('MM-DD');


                        $('#carddate' + hourString).append($('<div>').addClass('row').html('<p>Date: ' + day + '</p>'));
                        $('#cardtemp' + hourString).append($('<div>').addClass('row').attr("id", "time-block-" + hourString).html('<p>Temp: ' + response.daily[i].temp.day + ' F</p>'));
                        $('#cardhumid' + hourString).append($('<div>').addClass('row').attr("id", "time-block-" + hourString).html('<p>Humidity: ' + response.daily[i].humidity + '%</p>'));
                        $('#cardcond' + hourString).append($('<img>').addClass('row').attr("src", "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png").html('<img src="http://openweathermap.org/img/w/"' + response.daily[i].weather[0].icon + ".png"));
                    }

                });

            });
            $('#citySearch').val('');

        };

    }
    function clearScreen() {
        $('#carddate1').html('');
        $('#cardtemp1').html('');
        $('#cardhumid1').html('');
        $('#cardcond1').html('');
        $('#carddate2').html('');
        $('#cardtemp2').html('');
        $('#cardhumid2').html('');
        $('#cardcond2').html('');
        $('#carddate3').html('');
        $('#cardtemp3').html('');
        $('#cardhumid3').html('');
        $('#cardcond3').html('');
        $('#carddate4').html('');
        $('#cardtemp4').html('');
        $('#cardhumid4').html('');
        $('#cardcond4').html('');
        $('#carddate5').html('');
        $('#cardtemp5').html('');
        $('#cardhumid5').html('');
        $('#cardcond5').html('');
    }
    function update() {
        $('#clock').html(moment().format('MMMM D, YYYY H:mm:ss'));
    }

    setInterval(update, 1000);
});
