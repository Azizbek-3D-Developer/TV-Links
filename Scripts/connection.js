
const CONNECTION_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQFM0JYpqwwwWyfW20wleg0_aSBkkF-H79ON7Mem1A4OWolwy0l-frc4oWo0JU1yqJccgjSt26UrnGPilf3AAiA24ZAu7dkdnE8wro-UsBor9LUSNwUpGf1mTdNF0c1oNLQqSRTIgu_N-7QR7fiBUuVZ_mMTILRLvPltWPBDpzKnPidkCBOp589q4yRcqUtOR0OkDtRa7fR-AJSknEZKj7cKzVhsp5OuMPOXbCXXaAjG75mC-chn2T0DbrO7ofqmJfLGAjdXQhkQGMB7TwAMs2WgwY-YA&lib=MAFqiwnsTWG4Z4XXVJ3bfjqUZ1UBdVY1k";

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
// GET MOVIE LINK FROM GOOGLE SHEET
// ==========================================

async function getMovieLink() {

    const response = await fetch(CONNECTION_URL);

    if (!response.ok) {
        throw new Error("Failed to get movie link");
    }

    const data = await response.json();

    return data.url;
}


// ==========================================
// DISPLAY CURRENT MOVIE
// ==========================================

async function updateMovieLink() {

    try {

        const url = await getMovieLink();

        if (url) {

            currentMovie.textContent = url;

            openButton.disabled = false;

        } else {

            currentMovie.textContent =
                "No movie link";

            openButton.disabled = true;
        }

    } catch (error) {

        console.error(
            "Error loading movie:",
            error
        );

        currentMovie.textContent =
            "Failed to load movie link";

        openButton.disabled = true;
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


        // Nothing entered

        if (!url) {
            return;
        }


        try {

            const response =
                await fetch(
                    CONNECTION_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded"
                        },

                        body:
                            new URLSearchParams({
                                url: url
                            })
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to upload movie link"
                );
            }


            const data =
                await response.json();


            // Show new URL immediately

            currentMovie.textContent =
                data.url;


            // Clear input

            movieInput.value = "";


            // Enable Open button

            openButton.disabled = false;


            console.log(
                "Movie uploaded:",
                data.url
            );

        } catch (error) {

            console.error(
                "Error uploading movie:",
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


            // Open in a new tab/window

            window.open(
                url,
                "_blank"
            );

        } catch (error) {

            console.error(
                "Error opening movie:",
                error
            );
        }
    }
);


// ==========================================
// LOAD MOVIE WHEN PAGE OPENS
// ==========================================

updateMovieLink();