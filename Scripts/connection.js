const CONNECTION_URL = "https://script.google.com/macros/s/AKfycbxOd6fohRJtyyxsVGusQsPT2Vrg0YO7PAsnrqQtUoFQ4h-tT6L67xdKs7B_4Uk4gisU/exec"
async function getMovieLink() {

    const response = await fetch(CONNECTION_URL);

    const data = await response.json();

    console.log(data.url);

    return data.url;
}

// ==========================================
// HTML ELEMENTS
// ==========================================

const movieInput =
    document.getElementById("movie_input");

const uploadButton =
    document.getElementById("upload_btn");

const currentMovie =
    document.getElementById("current_movie");

const openButton =
    document.getElementById("open_btn");

const hiddenMovieUrl =
    document.getElementById("hidden_movie_url");

const uploadForm =
    document.getElementById("upload_form");


// ==========================================
// GET MOVIE LINK
// ==========================================

async function getMovieLink() {

    const response =
        await fetch(CONNECTION_URL);


    if (!response.ok) {

        throw new Error(
            `HTTP ${response.status}`
        );
    }


    const data =
        await response.json();


    return data.url;
}


// ==========================================
// DISPLAY CURRENT MOVIE
// ==========================================

async function updateMovieLink() {

    try {

        const url =
            await getMovieLink();


        if (url) {

            currentMovie.textContent =
                url;

            openButton.disabled =
                false;

        } else {

            currentMovie.textContent =
                "No movie link";

            openButton.disabled =
                true;
        }

    } catch (error) {

        console.error(
            "GET ERROR:",
            error
        );

        currentMovie.textContent =
            "Failed to load movie link";

        openButton.disabled =
            true;
    }
}


// ==========================================
// UPLOAD MOVIE LINK
// ==========================================

uploadButton.addEventListener(
    "click",
    () => {

        const url =
            movieInput.value.trim();


        if (!url) {

            alert(
                "Please enter a movie link"
            );

            return;
        }


        // Put URL into hidden input

        hiddenMovieUrl.value =
            url;


        // Submit normal HTML form

        uploadForm.submit();


        // Update UI immediately

        currentMovie.textContent =
            url;

        openButton.disabled =
            false;


        // Clear input

        movieInput.value = "";


        console.log(
            "Movie link sent:",
            url
        );
    }
);


// ==========================================
// OPEN MOVIE
// ==========================================

openButton.addEventListener(
    "click",
    async () => {

        try {

            const url =
                await getMovieLink();


            if (!url) {

                alert(
                    "No movie link available"
                );

                return;
            }


            window.open(
                url,
                "_blank"
            );

        } catch (error) {

            console.error(
                "OPEN ERROR:",
                error
            );
        }
    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

updateMovieLink();