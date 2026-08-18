
const CONNECTION_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQFM0JYpqwwwWyfW20wleg0_aSBkkF-H79ON7Mem1A4OWolwy0l-frc4oWo0JU1yqJccgjSt26UrnGPilf3AAiA24ZAu7dkdnE8wro-UsBor9LUSNwUpGf1mTdNF0c1oNLQqSRTIgu_N-7QR7fiBUuVZ_mMTILRLvPltWPBDpzKnPidkCBOp589q4yRcqUtOR0OkDtRa7fR-AJSknEZKj7cKzVhsp5OuMPOXbCXXaAjG75mC-chn2T0DbrO7ofqmJfLGAjdXQhkQGMB7TwAMs2WgwY-YA&lib=MAFqiwnsTWG4Z4XXVJ3bfjqUZ1UBdVY1k";

async function getMovieLink() {

    const response = await fetch(CONNECTION_URL);

    const data = await response.json();

    console.log(data.url);

    return data.url;
}


getMovieLink()