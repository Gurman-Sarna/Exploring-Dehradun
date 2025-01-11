// Select elements
const slider = document.querySelector('.slider');
const items = document.querySelectorAll('.item img');
const infoBox = document.getElementById('imageInfo');
const imageInfoText = document.getElementById('imageInfoText');
const getDirectionsBtn = document.getElementById('getDirectionsBtn');
let isPaused = false;

// Places and their coordinates
const places = [
    { name: "Buddha Temple",lat:30.260854512574316, lng:77.9970308814551},
    { name: "Doon Valley", lat:30.363156044027075, lng:77.99147420580859},
    { name: "Forest Research Institute", lat:30.342870817574603, lng:78.00515056611715},
    { name: "George Everest", lat:30.45877070840063, lng:78.02306249495778},
    { name: "Kalinga War Memorial", lat:30.342870050085033, lng:78.09838959325333},
    { name: "MalDevta", lat:30.337284482483117, lng:78.13856936441778},
    { name: "Mussoorie", lat:30.45911541270435, lng:78.07725906228546},
    { name: "Robbers Cave", lat:30.37549470300491, lng:78.05983276006819},
    { name: "Sahastradhara", lat:30.384498142198115, lng:78.1306698914287},
    { name: "Tapkeshwar Mandir",lat:30.357679515755265, lng:78.01676846441777}
];

const Info = [
    {
        name: "Buddha Temple",
        detail: "The Buddha Temple, also known as Mindrolling Monastery, is a prominent Tibetan Buddhist monastery in Dehradun, known for its serene environment and intricate architecture."
    },
    {
        name: "Doon Valley",
        detail: "Doon Valley is a picturesque valley surrounded by the Shivalik hills and the Lesser Himalayas, offering stunning natural beauty and a tranquil atmosphere."
    },
    {
        name: "FRI",
        detail: "The Forest Research Institute (FRI) is a premier institute in Dehradun, famous for its colonial-style architecture and lush green campus, often featured in movies."
    },
    {
        name: "George Everest",
        detail: "George Everest's House, located in Mussoorie, offers breathtaking views of the Doon Valley and the Himalayas, and is a historical site dedicated to the Surveyor General of India."
    },
    {
        name: "Kalinga War Memorial",
        detail: "The Kalinga War Memorial, built by the British, is a unique war memorial honoring the Gurkhas' bravery during battles, set amidst scenic surroundings."
    },
    {
        name: "MalDevta",
        detail: "Maal Devta is a serene spot in Dehradun, known for its temple and natural surroundings, making it a popular destination for picnics and outings."
    },
    {
        name: "Mussorie",
        detail: "Mussoorie, often called the 'Queen of Hills,' is a charming hill station near Dehradun, famous for its pleasant weather, scenic views, and colonial-era architecture."
    },
    {
        name: "Robbers Cave",
        detail: "Robbers Cave, or Gucchupani, is a natural cave formation with a stream running through it, offering a unique experience of walking through water in a mystical setting."
    },
    {
        name: "Sahastradhara",
        detail: "Sahastradhara, meaning 'Thousandfold Springs,' is a natural spring known for its medicinal properties, surrounded by caves and lush greenery."
    },
    {
        name: "Tapkeshwar Mandir",
        detail: "Tapkeshwar Temple is a famous Shiva temple situated in a cave, known for its tranquil atmosphere and the natural stream that drips water over the Shiva Lingam."
    }
];


let map;
let currentPlace = null;
let directionsService;
let directionsRenderer;

function initMap() {
    // Create a map centered at Dehradun
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 30.3165, lng: 78.0322 }, // Coordinates of Dehradun
        zoom: 10,
    });

    // Initialize Directions Service and Renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}



// Click event for images
items.forEach(item => {
    item.addEventListener('click', (event) => {
        // Stop animation
        slider.style.animationPlayState = 'paused';
        isPaused = true;

        // Get the index of the clicked image
        const position = parseInt(event.target.closest('.item').style.getPropertyValue('--position')) - 1;
        const place = places[position];
        const i = Info[position];

        // Display info
        imageInfoText.innerHTML = `<b>${place.name}</b><br>${i.detail}`;


        infoBox.classList.remove('hidden');
        
        // Set current place for directions
        currentPlace = place;
    });
});



// Get Directions button click handler
getDirectionsBtn.addEventListener('click', () => {
    if (currentPlace) {
        // Get the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Request directions from the user's location to the selected place
                const request = {
                    origin: userLocation,
                    destination: { lat: currentPlace.lat, lng: currentPlace.lng },
                    travelMode: google.maps.TravelMode.DRIVING, // Change to WALKING or BICYCLING if needed
                };

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        // Display the route on the map
                        directionsRenderer.setDirections(result);

                        // Scroll to the map section
                        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });

                        // Center map on the destination
                        map.setCenter({ lat: currentPlace.lat, lng: currentPlace.lng });
                        map.setZoom(15);


                    } else {
                        alert("Directions request failed due to " + status);
                    }
                });
            }, () => {
                alert("Geolocation failed or not supported by this browser.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
});




// Resume animation when clicking outside the images
document.addEventListener('click', (event) => {
    if (isPaused && !event.target.closest('.item img')) {
        // Resume animation
        slider.style.animationPlayState = 'running';
        isPaused = false;

        // Hide info box
        infoBox.classList.add('hidden');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Show the button when the user scrolls down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopButton.classList.add("show");
        } else {
            scrollToTopButton.classList.remove("show");
        }
    });

    // Scroll to the top when the button is clicked
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});
