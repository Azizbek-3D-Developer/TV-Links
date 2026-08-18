
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


    if (!data.success) {

        throw new Error(
            data.error ||
            "Failed to get movie link"
        );
    }


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
    async () => {

        const url =
            movieInput.value.trim();


        // -------------------------------
        // Check input
        // -------------------------------

        if (!url) {

            alert(
                "Please enter a movie link"
            );

            return;
        }


        // -------------------------------
        // Create URL
        // -------------------------------

        const requestUrl =
            CONNECTION_URL +
            "?action=write&url=" +
            encodeURIComponent(url);


        try {

            const response =
                await fetch(requestUrl);


            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );
            }


            const data =
                await response.json();


            console.log(
                "UPLOAD RESPONSE:",
                data
            );


            if (!data.success) {

                throw new Error(
                    data.error ||
                    "Upload failed"
                );
            }


            // -------------------------------
            // Update displayed link
            // -------------------------------

            currentMovie.textContent =
                data.url;


            // -------------------------------
            // Clear input
            // -------------------------------

            movieInput.value = "";


            // -------------------------------
            // Enable Open button
            // -------------------------------

            openButton.disabled =
                false;


            console.log(
                "Movie successfully uploaded:",
                data.url
            );

        } catch (error) {

            console.error(
                "UPLOAD ERROR:",
                error
            );

            currentMovie.textContent =
                "Failed to upload movie link";
        }
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


            // Open movie in new tab

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
// LOAD MOVIE WHEN PAGE OPENS
// ==========================================

updateMovieLink();