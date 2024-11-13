function searchSerie() {
    const serieName = document.getElementById('serieName').value.trim();
     //* API TV Maze.
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(serieName)}`;
    
    //! if no name is entered. request it to search.
    if (!serieName) {
        Swal.fire({
            title: "Error",
            text: "Please enter the name of a TV show.",
            icon: "warning",
            confirmButtonColor: '#262626',
        });
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('TV show not found.');
            }
            return response.json();
        })
        .then(serie => {
           
            const htmlContent = `
                <!-- beggin data card -->
                <div class="card mb-3 card-information">
                    <div class="row g-0">

                        <!-- beggin card information img -->
                        <div class="col-md-3 card-information-img">
                            <img src="${serie.image ? serie.image.original : 'https://via.placeholder.com/250'}" alt="TV Show" class="img-fluid my-3 p-2 mb-3 img-information"/>
                            <div class="d-flex flex-column flex-md-row ps-3 ps-md-5 mt-3 mt-md-3 mb-3 mb-md-4">
                                <p class="me-2 mb-2 mb-md-0 site-information-img"><strong> Official Site </strong></p>
                                <a href="${serie.officialSite}" target="_blank"><i class="fa-solid fa-globe icon-img"></i></a>
                            </div>
                        </div>
                        <!-- end card information img -->
                        
                        <!-- beggin card information -->
                        <div class="col-md-8">
                            <div class="card-body p-4">

                                <h6 class="title-information"> <i class="fa-solid fa-table"></i> Information About: <strong> ${serie.name}. </strong></h6>
                                <hr class="mt-0 mb-4 hr-information">
                                <div class="row pt-1">
                                    <div class="col-6 mb-3">
                                        <h6 class="subtitle-information">Language</h6>
                                        <p class="data-information">${serie.language}.</p>
                                    </div>
                                    <div class="col-6 mb-3">
                                        <h6 class="subtitle-information">Genres</h6>
                                        <p class="data-information">${serie.genres.join(', ')}.</p>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-6 mb-3">
                                        <h6 class="subtitle-information">Status</h6>
                                        <p class="data-information">${serie.status}.</p>
                                    </div>
                                    <div class="col-6 mb-3">
                                        <h6 class="subtitle-information">Rating</h6>
                                        <p class="data-information">${serie.rating.average ? serie.rating.average : 'N/A'}</p>
                                    </div>
                                </div>

                                <div class="row pt-1">
                                    <div class="col-6 mb-3">
                                        <h6 class="subtitle-information">Date Premiered</h6>
                                        <p class="data-information">${serie.premiered}.</p>
                                    </div>
                                    <div class="col-6 mb-3">
                                        <h6 class="subtitle-information">Date Ended</h6>
                                        <p class="data-information">${serie.ended ? serie.ended : 'Ongoing'}.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                         <!-- end card information -->

                    </div>
                </div>
                <!-- end data card -->
            `;
            
            //* Insert the dynamic HTML into the container.
            document.getElementById('information-API').innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error:", error);
            
            //! If the name is not found or the API does not work, the following will be displayed.
            Swal.fire({
                title: "Error",
                text: "The TV show was not found or there was a problem with the search.",
                icon: "error",
                confirmButtonColor: '#262626',
            });
        });
}