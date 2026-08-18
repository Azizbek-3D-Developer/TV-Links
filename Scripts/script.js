const sites = {
    "https://megogo.net/ru" : {
        name: "Megogo",
        image: "./Images/megogo-favicon.ico"
    },
    "https://m.kinogo.online/" : {
        name: "Kinogo",
        image: "./Images/kinogo-favicon-48x48.ico"
    },
    "https://vkvideo.ru/" : {
        name: "VK videos",
        image: "./Images/fav_vk_video_2x.ico"
    },
    "https://ok.ru/video/showcase" : {
        name: "OK ru",
        image: "./Images/logo_ok_32-r23.png"
    }
};

const buttonsContainer = document.getElementById("buttons");

function createButton(link, site) {

    const button = document.createElement("a");

    button.href = link;
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    button.classList.add("site-button");


    // Create image
    const image = document.createElement("img");

    image.src = site.image;
    image.alt = site.name;

    image.classList.add("site-image");


    // Create text
    const text = document.createElement("span");

    text.textContent = site.name;

    text.classList.add("site-name");


    // Put image + text inside button
    button.appendChild(image);
    button.appendChild(text);

    return button;
}


// Create the buttons
for (const [link, site] of Object.entries(sites)) {
    buttonsContainer.appendChild(
        createButton(link, site)
    );
}


// Duplicate the buttons for infinite animation
for (const [link, site] of Object.entries(sites)) {
    buttonsContainer.appendChild(
        createButton(link, site)
    );
}


// Streaming function
const ipInput = document.getElementById("ip_input");
const portInput = document.getElementById("port_input");
const streamButton = document.getElementById("stream_btn");

streamButton.addEventListener("click", () => {
    const id = Number(ipInput.value);
    const port = Number(port_input.value);

    if (!Number.isInteger(id) || id < 1 || id > 254) {
        alert("Enter a number between 1 and 254");
        return;
    }

    if (!Number.isInteger(port) || port < 1000 || port > 65000){
        alert("Enter a number between 1000 and 65000")
        return;
    }

    const ip = `192.168.0.${id}:${port}`;

    window.open(`http://${ip}`, "_blank");
});

