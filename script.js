//Namespace
const movieApp = {};
movieApp.apiKey = 'dc4483da5e7158fd55c3bc2ecaf212a3';
movieApp.endPoint = 'https://api.themoviedb.org/3/discover/movie';
movieApp.genreEndPoint = 'https://api.themoviedb.org/3/genre/movie/list';
let getGenreValue;
let getDecadeValue;
let startDate;
let endDate;

// API call to get movies data based on search parameters
movieApp.getMovies = (genres, startDate, endDate) => {
    $.ajax({
        url: movieApp.endPoint,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: movieApp.apiKey,
            with_genres: genres,
            'primary_release_date.gte': startDate,
            'primary_release_date.lte': endDate,
            'vote_average.lte': 5
        }
    }).then((res) => {
        movieApp.displayMovie(res);
    })
}

movieApp.newMovie = (movies) => {
    
        
}

// function to display the movie in the recommended movies section
movieApp.displayMovie = (movies) => {
     // get a random number to represent an index number / random movie to display
    const index = Math.floor(Math.random() * movies.results.length);
    
    // setting variables for error handling
    const title = `${movies.results[index].title}`;
    const voteAverage = `${movies.results[index].vote_average}`;
    const releaseDate = `${movies.results[index].release_date}`;
    let imageSource = `"https://image.tmdb.org/t/p/w500/${movies.results[index].poster_path}" alt="${title} poster"`
    let summary = `${movies.results[index].overview}`

    // check whether movie title has poster
    if (movies.results[index].poster_path === null) {
        //if no poster, replace with bottom bin logo image
        imageSource = `"./assets/bottomBinImageNotAvailable.jpg" alt="placeholder for missing ${title} poster"`
    }

    // check whether movie title has written summary
    if (summary === "") {
        // if summary is missing, we'll replace with this copy 
        summary = "No summary available for this film. It's just TOO terrible.";
    };
    
    // displaying the recommended movie in results section
    $('main').html(`
        <section class="results" id="results">
            <div class="wrapper">
                    <div class="recommendedMovie">
                        <img src=${imageSource}>
                        <div class="resultText">
                            <h3>${title}</h3>
                            <span><span class="resultLabel">Vote Average:</span> ${voteAverage} </span>
                            <span><span class="resultLabel">Release Date:</span> ${releaseDate}</span>
                            <span><span class="resultLabel">Summary:</span> ${summary}</span>
                            <button class='.newMovieBtn'>Click dis</button>
                        </div>
                    
                    </div>
            </div>
        </section>
    `)

    $('.newMovieBtn').on('click', function () {
        movieApp.getMovies(getGenreValue, startDate, endDate);
    })

        // APPEND THIS IF WE ARE DOING STRETCH GOAL
        // < button class="listBtn" > +</ >
        //     <span>add to list</span>

    //  STRETCH GOAL 
    // $('button').one('click', function () {
        
    //             //adding movie title to the list
    //             $('.selectedMovies').append(`<li>${title}</li>`)
    //             movieApp.titlesArray.push(`${title}`);
    // });
};

//Functions to be called on init
movieApp.init = () => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        // getting genre id from dropdown menu
        getGenreValue = $('.genre').val();
        // getting decade value from dropdown menu
        getDecadeValue = $('.decade').val();

        //Error handling for empty select values
        if (getGenreValue && getDecadeValue) {

        // setting decade variables
            // let startDate;
            // let endDate;
        
        // grabbing decade value and then setting the start and end dates required for ajax call
        if (getDecadeValue === "1950s") {
            startDate = "1950-01-01";
            endDate = "1959-12-31";
        } else if (getDecadeValue === "1960s") {
            startDate = "1960-01-01";
            endDate = "1969-12-31";
        } else if (getDecadeValue === "1970s") {
            startDate = "1970-01-01";
            endDate = "1979-12-31";
        } else if (getDecadeValue === "1980s") {
            startDate = "1980-01-01";
            endDate = "1989-12-31";
        } else if (getDecadeValue === "1990s") {
            startDate = "1990-01-01";
            endDate = "1999-12-31"
        } else if (getDecadeValue === "2000s") {
            startDate = "2000-01-01";
            endDate = "2009-12-31";
        } else if (getDecadeValue === "2010s") {
            startDate = "2010-01-01";
            endDate = "2019-12-31";
        }
        
        // request the results from API based on genre + decade!
        movieApp.getMovies(getGenreValue, startDate, endDate)
        
        // scrolling down to results section
        $('html, body').animate({
            scrollTop: $("main").offset().top
        }, 1000);
        
    } else {
        alert('Please enter a genre & decade')
    }
    })
    
}

//Document ready
$(function () {
    movieApp.init();
});