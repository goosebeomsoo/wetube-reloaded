const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span")
    span.innerText = `${text}`;
    newComment.appendChild(icon);
    newComment.appendChild(span);
    videoComments.prepend(newComment);
}

handleSubmit = async (e) => {
    e.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const {status} = await fetch(`/api/videos/${videoId}/comment`, {
        // fetch가 Backend에 갔다가 다시 돌아와서 작업하기 때문에 await를 해줘야함
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({text}),
    });
    textarea.value = "";
    if (status===201) {
        addComment(text);
    }
    // window.location.reload();
    // 새로고침
};

if(form) {
    form.addEventListener("submit", handleSubmit);
}
// click이 아닌 submit을 감지해야함