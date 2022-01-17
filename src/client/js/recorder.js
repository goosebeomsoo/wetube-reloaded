const video = document.querySelector("#preview");
const startBtn = document.querySelector("#startBtn");

const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio : false,
        video : {
            width : 200,
            height : 100,
        },
    })
    video.srcObject = stream;
    video.play();
}

startBtn.addEventListener("click", handleStart);