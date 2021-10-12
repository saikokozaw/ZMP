const playlistContainerTag = document.getElementsByClassName("playlistContainer")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const audioTag = document.getElementsByClassName("audioTag")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];


const tracks = [
    {trackID:"music/track1.mp3", title: "December Nya - Lin Lat"},
    {trackID:"music/track2.mp3", title: "Tsaw Ra Ai Tsaw Hkrup Sai - Ann Naw"},
    {trackID:"music/track3.mp3", title: "Lan Ma Gyi Yae By - WSKT"},
    {trackID:"music/track4.mp3", title: "Yee Zar Sar - SSKH"},

];

for (let i = 0; i < tracks.length; i++){
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click", () => {
        currentPlayingIndex = i;
        playSong();
    });

    trackTag.classList.add("trackItem");

    const title = (i + 1).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playlistContainerTag.append(trackTag);
}

let duration = 0;
let durationText = "00:00"
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);


});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeTextandDurationText = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = currentTimeTextandDurationText;

    updateCurrentProgress(currentTime);

});
const updateCurrentProgress = (currentTime) => {
     const currentProgressWidth = (350/duration) * currentTime;
     currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}

const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;

    return minuteText + ":" + secondText;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if(currentTime === 0 ){
        playSong();
    } else {
        audioTag.play();
        updatePlayAndPauseButton();
    }

});

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click", () => {
    if(currentPlayingIndex === 0){
        return;
    }else {
        currentPlayingIndex -= 1;
        playSong();
    }
});

nextButtonTag.addEventListener("click", () => {
    if(currentPlayingIndex === tracks.length - 1) {
        currentPlayingIndex = 0;
        playSong();
    }else {
        currentPlayingIndex += 1;
        playSong();
    }
});

const updatePlayAndPauseButton = () => {
        if(isPlaying === true) {
            playButtonTag.style.display = "none";
            pauseButtonTag.style.display = "inline";
        } else {
            playButtonTag.style.display = "inline";
            pauseButtonTag.style.display = "none";
        }
}

const playSong = () => {
    const songIdToPlay = tracks[currentPlayingIndex].trackID;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
}