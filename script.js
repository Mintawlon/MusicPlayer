const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music=document.querySelector('audio');
const prograssContainer=document.getElementById('progress-container');
const prograss=document.getElementById('progress')
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

//Music
const songs=[
    {
        name: 'selena-4',
        displayName:'Who Say',
        artist: 'Selena Gozmas'
    },
    {
        name: 'fancy-5',
        displayName:'fancy',
        artist: 'Iggy Itsla'
    },
    {
        name: 'metric-1',
        displayName:'Electric Rock',
        artist: 'Jacition'
    },
    {
        name: 'jacinto-3',
        displayName:'Top Hit',
        artist: 'Jacition'
    }
]

//Check if playing  with a boolean logic
let isPlaying =false;

//play
function playSong(){
    isPlaying=true;  // is playing 
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

//pause
function pauseSong(){
    isPlaying=false; // is not  playing
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

//Play or Pause evenListener 
playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong())); // lanuching an opposite function when we hit the button


//Update DOM
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}

//Current Song

let songIndex=0;

//Previous Song
function prevSong(){
    songIndex--;
    if(songIndex <0){
        songIndex=songs.length-1;  //if song index are -1 and llop back to last array index
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
 }

//Next Song
function nextSong(){
   songIndex++;
   if(songIndex > songs.length -1){
       songIndex =0; //if songs index are grater than array length and loop back to first array index
   }
   console.log(songIndex);
   loadSong(songs[songIndex]);
   playSong();
}

//On Load -Select First Song
loadSong(songs[songIndex]);

//Event Listener for previous and next 
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

