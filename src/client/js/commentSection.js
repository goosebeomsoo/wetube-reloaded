const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const deleteBtn = document.querySelector(".video__comment-delete");

addComment = (text, id) => {
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = `${text}`;
    const deleteSpan = document.createElement("button");
    deleteSpan.innerText = " delete";
    deleteSpan.className = "video__comment-delete";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(deleteSpan);
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
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        // fetch가 Backend에 갔다가 다시 돌아와서 작업하기 때문에 await를 해줘야함
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({text}),
    });
    textarea.value = "";
    if (response.status===201) {
        const {newCommentId} = await response.json();
        addComment(text, newCommentId);
        // fetch의 response status가 201이면 comment 더하기
    }
    console.log(response)
    // window.location.reload();
    // 새로고침
};

if(form) {
    form.addEventListener("submit", handleSubmit);
};

handleDeleteComment = async (e) => {
    if(e.target.className = "video__comment-delete") {
        const response = await fetch(`/api/delete-comment/${e.target.parentElement.dataset.id}`, {
            method :  "DELETE", 
        }
        );
        if(response.status === 201) {
            e.target.parentElement.remove();
        }
    }
};

videoComments.addEventListener("click", handleDeleteComment);
// click이 아닌 submit을 감지해야함