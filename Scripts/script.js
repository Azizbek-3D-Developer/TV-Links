const sites = {
    "https://www.youtube.com": "YouTube",
    "https://www.netflix.com": "Netflix",
    "https://vk.com/video": "VK Video",
    "https://megogo.net": "MEGOGO",
    "https://www.primevideo.com": "Prime Video",
    "https://www.disneyplus.com": "Disney+",
    "https://www.max.com": "Max",
    "https://www.hulu.com/hub/movies": "Hulu",
    "https://www.paramountplus.com/movies/": "Paramount+",
    "https://tv.apple.com": "Apple TV+",
    "https://tubitv.com/welcome": "Tubi",
    "https://pluto.tv": "Pluto TV",
    "https://watch.plex.tv/on-demand": "Plex"
};

const buttonsContainer = document.getElementById("buttons");

function createButton(link, name) {
    const button = document.createElement("a");

    button.href = link;
    button.textContent = name;

    // Open in a new tab/window
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    button.classList.add("site-button");

    return button;
}

// Create the buttons
for (const [link, name] of Object.entries(sites)) {
    buttonsContainer.appendChild(createButton(link, name));
}

// Duplicate the buttons for infinite animation
for (const [link, name] of Object.entries(sites)) {
    buttonsContainer.appendChild(createButton(link, name));
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

