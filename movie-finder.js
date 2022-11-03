const search_url = "http://www.omdbapi.com/?apikey=<apikey>&s=";
const search_movie_details_url = "http://www.omdbapi.com/?apikey=<apikey>&i=";

function search_movie(){
    var movie = document.getElementById("movie");
    quesy = movie.value;
    if(quesy){
        getMovies(search_url+quesy);
    }
};

function getMovies(url){
    httprequest = new XMLHttpRequest();
    httprequest.open("GET",url);
    httprequest.send();
    httprequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            data = JSON.parse(this.responseText);
            form_cards(data);
        }
    }
}

function form_cards(data){
    var cards = document.getElementById("cards_container");
    cards.innerHTML = "";
    if(data.Response == "False"){
        display_message(data.Error);
    }
    data.Search.forEach(function(moive){
        url = search_movie_details_url+moive.imdbID;
        httprequest = new XMLHttpRequest();
        httprequest.open("GET",url);
        httprequest.send();
        httprequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                movie_details = JSON.parse(this.responseText);
                make_card(movie_details);
            }
        }   
    });
}


function make_card(moive_data){
    var cards = document.getElementById("cards_container");
    const card = document.createElement("div");
    var image = "";
    if(moive_data.Poster == "N/A")
        image = '<img src = "notAvailable.png" width = 600px; float = "left">'
    else
        image = `<img src = "${moive_data.Poster}" float = "left">`
    card.innerHTML = `
        <div class = "cards">
            <span>
                ${image}
                <p><b>Title : </b> ${moive_data.Title}</p>
                <p><b>Year : </b> ${moive_data.Year}</p>
                <p><b>Rated : </b> ${moive_data.Rated}</p>
                <p><b>Director : </b> ${moive_data.Director}</p>
                <p><b>Plot : </b> ${moive_data.Plot}</p>
            </span>
        </div>
        <div><p></p></div>
    `;
    cards.appendChild(card);
}

function display_message(message){
    var cards = document.getElementById("cards_container");
    const card = document.createElement("div");
    card.innerHTML = `
        <div>
            <span class = "message">${message}</span>
        </div>
    `;
    cards.appendChild(card);
}
