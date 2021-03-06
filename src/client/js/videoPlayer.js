import "../scss/styles.scss";

const video = document.querySelector("video");
const playBtn = document.querySelector("#play");
const playBtnIcon = document.querySelector("#playIcon");
const muteBtn = document.querySelector("#mute");
const muteBtnIcon = document.querySelector("#muteIcon");
const volumeRange = document.querySelector("#volume");
const currenTime = document.querySelector("#currenTime");
const totalTime = document.querySelector("#totalTime");
const timeline = document.querySelector("#timeline");
const fullScreenBtn = document.querySelector("#fullScreenBtn");
const fullScreenBtnIcon = document.querySelector("#fullScreenBtnIcon");
const videoContainer = document.querySelector("#videoContainer");
const videoControls = document.querySelector("#videoControls");

// global variables
let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    };
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
    if(video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {
    const {
        target : {
            value
        }
    } = event;
    if(video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
}

const formatTime = (seconds) => 
    new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}

const handleTimeChange = (event) => {
    const {
        target : {
            value
        }
    } = event;
    video.currentTime = value;
    console.log(video.currentTime, value);
}

const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if(fullscreen) {
        document.exitFullscreen();
        fullScreenBtnIcon.classList = "fas fa-expand"; 
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtnIcon.classList = "fas fa-compress";
    }
    
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
}

const handleMouseLeave =  () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};

const handleKeypress = (e) => {
    if(e.keyCode === 32) {
        if(video.paused) {
            video.play();
        } else {
            video.pause();
        };
        playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
    }
}

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {
        method : "POST",
    });
}

video.addEventListener("click", handlePlayClick);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);

videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);

volumeRange.addEventListener("input", handleVolumeChange);

timeline.addEventListener("input", handleTimeChange);

fullScreenBtn.addEventListener("click", handleFullscreen);

document.addEventListener("keypress", handleKeypress);