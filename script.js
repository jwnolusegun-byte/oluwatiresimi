
const enterButton = document.querySelector("#enterButton");
const welcomeScreen = document.querySelector("#welcomeScreen");

const startButton = document.querySelector("#startButton");
const continueButton = document.querySelector("#continueButton");

const openingScreen = document.querySelector("#openingScreen");
const photoWall = document.querySelector("#photoWall");
const storyScreen = document.querySelector("#storyScreen");
const endingScreen = document.querySelector("#endingScreen");

const backgroundMusic = document.querySelector("#backgroundMusic");
const backgroundVideo = document.querySelector("#backgroundVideo");

const photoA = document.querySelector("#photoA");
const photoB = document.querySelector("#photoB");
const photoCaption = document.querySelector("#photoCaption");

const photos = [
    "./image/00F2326A-E9CB-45E4-8D1F-93F3797D1AD0.png",
    "./image/8D8BF09A-45FF-4368-A1BE-6DDB4DF7E77A.png",
    "./image/118403DF-70A9-4701-8F31-E7FB2C646C55.png",
    "./image/22a3d643-4e51-449b-b59b-81907a4018db.jpeg",
    "./image/0E9D853B-CF1E-4944-9881-A18BAEF3CC2B.png",
    "./image/5A1D2C71-2699-4E8C-A9C6-14D2E78151DC.jpeg",
    "./image/C4108288-CF58-411D-8CF2-4FA58623771A.png",
    "./image/EB762644-4D12-4F46-ABC3-FB578815C4CD.png"
];

const captions = [
    "A little smile that makes an ordinary day feel beautiful. 🥹❤️",
    "Some moments are small, but the happiness they bring is endless. 🌸💕",
    "A beautiful little soul with a world of possibilities ahead. 👑✨",
    "One day, these little moments will become the sweetest memories. 🧸💗",
    "May that beautiful smile always find a reason to shine. ☀️🥰",
    "There is something magical about watching a little one grow. 💐❤️",
    "Every picture tells a story, and yours is one worth keeping. 🦋🌷",
    "You may be little now, but the happiness you bring is immeasurable. 💞👑"
];

backgroundMusic.volume = 0.65;

backgroundVideo.muted = true;
backgroundVideo.loop = true;
backgroundVideo.playbackRate = 0.36;

let musicStarted = false;
let currentPhoto = 0;
let showingPhotoA = true;
let photoTimer;

backgroundVideo.addEventListener("loadedmetadata", function () {
    backgroundVideo.playbackRate = 0.36;
});

function enterWebsite() {
    if (musicStarted) return;

    musicStarted = true;

    backgroundVideo.playbackRate = 0.36;

    backgroundVideo.play().catch(function (error) {
        console.log("Background video could not play:", error);
    });

    backgroundMusic.play().then(function () {
        welcomeScreen.classList.add("hide");
    }).catch(function (error) {
        console.log("Music could not start:", error);
        welcomeScreen.classList.add("hide");
    });
}

enterButton.addEventListener("click", enterWebsite);

welcomeScreen.addEventListener("click", function (event) {
    if (event.target === welcomeScreen) {
        enterWebsite();
    }
});

function updatePhotoCaption(index) {
    photoCaption.textContent = captions[index];

    photoCaption.classList.remove("caption-change");

    void photoCaption.offsetWidth;

    photoCaption.classList.add("caption-change");
}

function startMemoryMovie() {
    clearInterval(photoTimer);

    openingScreen.style.display = "none";
    photoWall.classList.add("show");

    currentPhoto = 0;
    showingPhotoA = true;

    photoA.src = photos[0];
    photoB.src = "";

    photoA.classList.add("active");
    photoB.classList.remove("active");

    updatePhotoCaption(0);

    photoTimer = setInterval(function () {
        showNextPhoto();
    }, 5500);
}

function showNextPhoto() {
    currentPhoto++;

    if (currentPhoto >= photos.length) {
        clearInterval(photoTimer);

        photoWall.classList.remove("show");
        storyScreen.classList.add("show");

        return;
    }

    const nextPhoto = showingPhotoA ? photoB : photoA;
    const previousPhoto = showingPhotoA ? photoA : photoB;

    nextPhoto.src = photos[currentPhoto];

    nextPhoto.classList.remove("active");

    void nextPhoto.offsetWidth;

    nextPhoto.classList.add("active");
    previousPhoto.classList.remove("active");

    updatePhotoCaption(currentPhoto);

    showingPhotoA = !showingPhotoA;
}

startButton.addEventListener("click", startMemoryMovie);

continueButton.addEventListener("click", function () {
    storyScreen.classList.remove("show");
    endingScreen.classList.add("show");
});

backgroundVideo.addEventListener("error", function () {
    console.log("Check your background video filename, folder location and MP4 format.");
});
