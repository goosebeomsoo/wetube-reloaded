const video = document.querySelector("#preview");
const startBtn = document.querySelector("#startBtn");

let stream;
let recorder;
const handleDownload = () => {

}

const handleStop = () => {
    startBtn.innerText = "Download Video";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);
    recorder.stop();
    // Stops recording, at which point a dataavailable event containing the final Blob of saved data is fired. No more recording occurs.
    // BLOB (Binary Large Object) : 이진 데이터 모임.
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream);
    // creates a new MediaRecorder object that will record a specified MediaStream
    recorder.ondataavailable = (e) => {
        const videoFile = URL.createObjectURL(e.data)
        video.srcObject = null;
        video.src = videoFile;
        video.play();
        // The URL.createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
        // 파일을 가리키고 있는 url
        console.log(videoFile)
    };
    // The event, of type BlobEvent, contains the recorded media in its data property. You can then collect and act upon that recorded media data using this event handler.
    recorder.start();
    // recording start   
}

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio : false,
        video : {
            width : 200,
            height : 100,
        },
    })
    video.srcObject = null;
    // srcObject는 MediaStream, MediaSource, Blob, File을 실행할 때 video에 주는 무언가
    video.play();
};

init();

startBtn.addEventListener("click", handleStart);