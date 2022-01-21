// Video Recording
import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";

const video = document.querySelector("#preview");
const startBtn = document.querySelector("#startBtn");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
    const ffmpeg = createFFmpeg({ 
        corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
        log:true
     });
    await ffmpeg.load();
    // User가 JavaScript가 아닌 설치된 프로그램을 이용하기때문에 await 사용

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    // writeFile은 ffmpeg에 가상의 파일을 생성해줌
    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
    // unsigned integer은 양의 정수를 의미
    // signed 음의 정수
    const mp4File = ffmpeg.FS("readFile", "output.mp4");
     console.log(mp4File);
     console.log(mp4File.buffer);

    const mp4Blob = new Blob([mp4File.buffer], {type : "video/mp4"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    
    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();
    // The HTMLAnchorElement.download property is a DOMString indicating that the linked resource is intended to be downloaded rather than displayed in the browser.
}

const handleStop = () => {
    startBtn.innerText = "Download Video";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
    // Stops recording, at which point a dataavailable event containing the final Blob of saved data is fired. No more recording occurs.
    // BLOB (Binary Large Object) : 이진 데이터 모임.
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
    // creates a new MediaRecorder object that will record a specified MediaStream
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
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
    video.srcObject = stream;
    // srcObject는 MediaStream, MediaSource, Blob, File을 실행할 때 video에 주는 무언가
    video.play();
};

init();

startBtn.addEventListener("click", handleStart);