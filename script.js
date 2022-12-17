const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prograssContainer = document.getElementById('progress-container');
const prograss = document.getElementById('progress'); // for progress bar
const currentTimeEl = document.getElementById("current-time");// for current time 
const durationEl = document.getElementById("duration"); // for caluclation duration of music
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'selena-4',
        displayName: 'Who Say',
        artist: 'Selena Gozmas'
    },
    {
        name: 'fancy-5',
        displayName: 'fancy',
        artist: 'Iggy Itsla'
    },
    {
        name: 'metric-1',
        displayName: 'Electric Rock',
        artist: 'Jacition'
    },
    {
        name: 'jacinto-3',
        displayName: 'Top Hit',
        artist: 'Jacition'
    },
    {
        name: 'key',
        displayName: 'Nothing',
        artist: 'Key Lashi'
    }, {
        name: 'truelove',
        displayName: 'True Love',
        artist: 'NuNew'
    },
    {
        name: 'suki',
        displayName: 'すきたから',
        artist: 'Unknow'
    }
]

//Check if playing  with a boolean logic
let isPlaying = false;

//play
function playSong() {
    isPlaying = true;  // is playing 
    playBtn.classList.remove('fa-play'); //icon 
    playBtn.classList.add('fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong() {
    isPlaying = false; // is not  playing
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause evenListener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong())); // lanuching an opposite function when we hit the button


//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
//Current Song

let songIndex = 0;

//Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;  //if song index are -1 and loop back to last array index
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0; //if songs index are grater than array length and loop back to first array index
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//On Load -Select First Song
loadSong(songs[songIndex]);

function updatePrograssbar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //console.log(duration, currentTime);
        //Update progressbar width
        const progressPrecent = (currentTime / duration) * 100;
        //console.log(progressPrecent);
        prograss.style.width = `${progressPrecent}%`;
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60); // value of minute
        console.log("minutes:", durationMinutes);
        const durationSecond = Math.floor(duration % 60);
        if (durationSecond < 10) {
            durationSecond = `0${durationSecond}`;
        }
        console.log("seccond:", durationSecond);
        if (durationSecond) {
            durationEl.textContent = `${durationMinutes}:${durationSecond}`;
        }

        //Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60); // value of minute
        console.log("minutes:", currentMinutes);
        const currentSecond = Math.floor(currentTime % 60);
        if (currentSecond < 10) {
            currentSecond = `0${currentSecond}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSecond}`;

    }
}

function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('width:', width);
    const clickX = e.offsetX; // output from click event 
    console.log('clickX', clickX);
    const { duration } = music;
    console.log(clickX / width);
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;


}
//Event Listener for previous and next 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updatePrograssbar);
// skip the music part
prograssContainer.addEventListener('click', setProgressBar);
//if it hit to the end of the duration of music go to next music
music.addEventListener('ended', nextSong);


