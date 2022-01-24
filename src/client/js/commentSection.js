const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

handleSubmit = (e) => {
    e.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;

    fetch(`/api/videos/${videoId}/comment`, {
        method : "POST",
        body : {
            text,
        },
    });
};

if(form) {
    form.addEventListener("submit", handleSubmit);
}
// click이 아닌 submit을 감지해야함