const imageContainer = document.getElementById("image__container");
const loader = document.getElementById("loader");

// Photo Loaded
let imagesLoaded = 0;
let totalImages = 0;
isReady = false;

// Unsplash API
const photoOrientation = `portrait`;
let initialPhotoCount = 5;
const apiKey = `mIhsuu5_3ITm8FQH42d8NJTmxHm4vA4N9qPy-nw6Xp4`;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialPhotoCount}`;

// Check if the images are all loaded
function photoIsLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    isReady = true;
    loader.hidden = true;
  }
}
// Function to set the attritbute of the elements on each image/photo
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Function to display each Photo
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to full photo
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", photoIsLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Make a function that updates the API with the new count number
function updateAPIWithNewCount(photoCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${photoCount}`;
}

// // Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (initialLoad) {
      updateAPIWithNewCount(30);
      initialLoad = false;
    }
    console.log(photoArray);
  } catch (error) {
    // Catch Errors and do something here
  }
}

// Implement the scrolling functionalities
// Add an event listener to the window
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    isReady
  ) {
    isReady = false;
    getPhotos();
  }
});

// On Load
getPhotos();
