const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
 const  pauseButton = document.getElementById("pause");
 const nextButton = document.getElementById("next");
 const previousButton = document.getElementById("previous");
 const playingSong = document.getElementById("player-song-title");
 const songArtist = document.getElementById("player-song-artist");

 const allSongs = [
    {
        id:0,
        title:"That's so true",
        artist:"Gracie",
        duration:"3:37",
        src:"./audio/Gracie Abrams - Thats So True (Live at Radio City Music Hall).mp3",
    },
    {
        id:1,
        title:"sapphire",
        artist:"Ed Sherran",
        duration:"3:04",
        src:"./audio/Ed Sheeran - Sapphire (Official Music Video) [JgDNFQ2RaLQ].mp3",
    },
    {
        id:2,
        title:"perfect",
        artist:"one-direction",
        duration:"3:49",
        src: "./audio/One Direction - Perfect (Official Video).mp3",
    },
    {
        id:3,
        title:"young and beautiful",
        artist:"lana del rey",
        duration:"3:59",
        src:"./audioLana Del Rey - Young and Beautiful.mp3",
    },
    {
        id:4,
        title:"3d",
        artist:"jungkook",
        duration:"3:51",
        src:"./audio/정국 (Jung Kook) '3D (feat. Jack Harlow)' Official Live Performance Video.mp3",
    },
 ];

 const audio = new Audio();

 const userData = {
    songs:allSongs,
    currentSong:null,
    songCurrentTime:0,
 }

 //playSong

 const playSong = (id, start=true) => {
    const song = userData.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;
    if(userData.currentSong === null || start){
        audio.currentTime = 0;
    }else{
        audio.currentTime = userData.songCurrentTime;
    }
    userData.currentSong = song;
    playButton.classList.add("playing");
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
    audio.play();
 }

 //pauseSong
 const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime //this saves the exact second where the song stopped
    playButton.classList.remove("playing"); // why : now the song is  pause so your ui should look like paused not adctive
    audio.pause();
 }

 //getCurrentSongIndex
const getCurrentSongIndex = () => userData.songs.indexOf(userData.currentSong);

//getNextSong
const getNextSong = () => userData.songs[getCurrentSongIndex() + 1];// if the currentsong inex is on 2 then it will add 2 +1 =3 so move to next song

//getPreviousSong
const getPreviousSong = () => userData.songs[getCurrentSongIndex() - 1]; //same as get next it use -1 to go back

//handling the previous button logic
const playPreviousSong = () => {
    if(userData.currentSong === null)return;
    const previousSong = getPreviousSong();
    if(previousSong){
        playSong(previousSong.id)
    }else{playSong(userData.songs[0].id);

    }
};

//handling the next song button logic
const playNextSong = () => {
    if(userData.currentSong === null){
        playSong(userData.songs[0].id);
        return;
    }
    const nextSong = getNextSong();
    if(nextSong){
        playSong(nextSong.id);
    }else{
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
        pauseSong();
    }
}


//setPlayerDisplay - Update the player ui
const setPlayerDisplay = () => {
    const currentTitle = userData.currentSong?.title;
    const currentArtist= userData.currentSong?.artist;

    playingSong.textContent = currentTitle ? currentTitle : "";
    songArtist.textContent = currentArtist ? currentArtist: "";
}


//highlighting Current song showing which song is active
const highlightCurrentSong = () => {
    const previousCurrentSong = document.querySelector('.playlist-song[aria-current="true"]');
    previousCurrentSong?.removeAttribute("aria-current")

    const songToHighlight = document.getElementById(`song-${userData.currentSong?.id}`);
    songToHighlight?.setAttribute("aria-current","true")
}


//set playButton Accessible TExt 
const setPlayButtonAccessibleText = () => {
    const song = userData.currentSong;
    playButton.setAttribute("aria-label", userData.currentSong ? `play ${song.title}` : "play");
};

//play button 

playButton.addEventListener("click",() => {
    if(userData.currentSong === null){
        playSong(userData.songs[0].id);
    }else{
        playSong(userData.currentSong.id,false)
    }
})

//playlist song 
const songs = document.querySelectorAll(".playlist-song");
songs.forEach((song) => {
    const id = song.getAttribute("id").slice(5);
    const songBtn = song.querySelector("button")
    songBtn.addEventListener("click", () => {
        playSong(Number(id));
    })
})

pauseButton.addEventListener("click",pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click",playPreviousSong);
audio.addEventListener("ended",playNextSong);

