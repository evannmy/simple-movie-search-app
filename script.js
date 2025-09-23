function searchMovie() {
  let keyword = $("#keyword-input").val();
  const apiKey = "YOUR_API_KEY_HERE"

    if (keyword !== "") {
      $.ajax({
        method: "GET",
        url: "http://www.omdbapi.com/",
        dataType: "json",
        data: {
          apikey: apiKey,
          s: keyword,
        }
      }).done(function(data) {
        $(".list-movie").empty();

        if (data.Response === "True") {
          const movies = data.Search;
          movies.forEach(function(movie) {
            $(".list-movie").append(`
              <div class="card" style="width: 18rem;">
                <img src="${movie.Poster}" class="card-img-top" alt="movie poster">
                <div class="card-body">
                  <h5 class="card-title">${movie.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
                  <a href="" class="card-link movie-detail-button" data-id="${movie.imdbID}" data-bs-toggle="modal" data-bs-target="#movieModal">Movie detail</a>
                </div>
              </div>  
            `);
          });
        } else {
          $(".list-movie").append(`
            <h4>${data.Error}</h4>  
          `);
        }
      });
    }
}

$(function() {
  $(".search-button").on("click", function() {
    searchMovie();
  });

  $("#keyword-input").on("keyup", function(e) {
    if (e.keyCode === 13) {
      searchMovie();
    }
  });

  $(".list-movie").on("click", ".movie-detail-button", function() {
    let keyword = $(this).data("id");

    $(".modal-body").empty();

    $.ajax({
        method: "GET",
        url: "http://www.omdbapi.com/",
        dataType: "json",
        data: {
          apikey: apiKey,
          i: keyword,
        }
      }).done(function(data) {
        if (data.Response === "True") {
          $(".modal-body").append(`
            <div class="card"">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${data.Poster}" class="img-fluid rounded-start" alt="movie poster">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <ul class="list-group">
                      <li class="list-group-item"><h5>${data.Title}</h5></li>
                      <li class="list-group-item">Genre: ${data.Genre}</li>
                      <li class="list-group-item">Director: ${data.Director}</li>
                      <li class="list-group-item">Writer: ${data.Writer}</li>
                      <li class="list-group-item">Actor: ${data.Actors}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>  
          `);
        } else {
          $(".modal-body").append(`
            <h4>${data.Error}</h4>  
          `);
        }
      });
    });
});