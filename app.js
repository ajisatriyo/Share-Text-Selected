const selecttableTextArea = document.querySelectorAll(".selectable-text-area");
const twitterShareBtn = document.querySelector("#twitter-share-btn");

selecttableTextArea.forEach(elm => {
    elm.addEventListener("mouseup", selectableTextAreaMouseUp);
});

function selectableTextAreaMouseUp(event) {
    setTimeout(() => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText.length) {
            const x = event.pageX;
            const y = event.pageY;
            const twitterShareBtnWidth = Number(getComputedStyle(twitterShareBtn).width.slice(0, -2));
            const twitterShareBtnHeight = Number(getComputedStyle(twitterShareBtn).height.slice(0, -2));
            twitterShareBtn.style.left = `${x - twitterShareBtnWidth*0.5}px`;
            twitterShareBtn.style.top = `${y - twitterShareBtnHeight*1.25}px`;
            twitterShareBtn.style.display = "block";
            twitterShareBtn.classList.add("btnEntrance");
        }

    }, 0);
}

document.addEventListener("mousedown", doumentMouseDown);

function doumentMouseDown(event) {
    if (getComputedStyle(twitterShareBtn).display === "block" && event.target.id !== "twitter-share-btn") {
        twitterShareBtn.style.display = "none";
        twitterShareBtn.classList.remove("btnEntrance");
        window.getSelection().empty();
    }

}

twitterShareBtn.addEventListener("click", twitterShareBtnClick);

function twitterShareBtnClick(event) {
    // General Twitter Share URL = https://twitter.com/intent/tweet?text={tutle}&url={url}&hashtags={hash_tags}$via={user_id}

    const twitterShareUrl = "https://twitter.com/intent/tweet";
    const text = encodeURIComponent(window.getSelection().toString().trim());
    const url = encodeURIComponent(window.location.href);
    const hashtags = "helloworld,ajisattriyo,testing";
    const via = "AjiSatriyo";

    // window.open(`${twitterShareUrl}?text="${text}" by @${via} ${hashtags.split(",").map(h => "%23" + h).join(" ")} ${url}`);
    const newWindowOptions = "height=400,width=550,left0,resizable=yes,scrollbars=yes";
    window.open(`${twitterShareUrl}?text="${text}"&url=${url}&hashtags=${hashtags}&via=${via}`, "ShareOnTwitter", newWindowOptions);
}