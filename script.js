console.log("Welcome to kotify")
//initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'))
 let songs=[
    {
        songName:"Deva Deva",
        filePath:"songs/1.mp3",
        coverPath:"cover.jpg",
        duration:"4:39"
    },
    {
        songName:"Aida Ni Chalde Pyaar",
        filePath:"songs/2.mp3",
        coverPath:"https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
        duration:"2:50"
    },
    {
        songName:"2 Number",
        filePath:"songs/3.mp3",
        coverPath:"https://images.inc.com/uploaded_files/image/1920x1080/getty_626660256_2000108620009280158_388846.jpg",
        duration:"4:03"
    },
    {
        songName:"Afreen Afreen",
        filePath:"songs/4.mp3",
        coverPath:"https://img.freepik.com/premium-photo/music-mind-music-abstract-art-created-with-generative-ai-technology_545448-15311.jpg",
        duration:"10:02"
    },
    {
        songName:"Calm Down",
        filePath:"songs/5.mp3",
        coverPath:"https://live-production.wcms.abc-cdn.net.au/a362273509f7eccdcf362bb73b3b006d?impolicy=wcms_crop_resize&cropH=788&cropW=1400&xPos=0&yPos=0&width=862&height=485",
        duration:"3:59"
    },
    {
        songName:"Chak Lein De",
        filePath:"songs/6.mp3",
        coverPath:"https://images.inc.com/uploaded_files/image/1920x1080/getty_626660256_2000108620009280158_388846.jpg",
        duration:"4:25"
    },
    {
        songName:"Play Date",
        filePath:"songs/7.mp3",
        coverPath:"https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
        duration:"6:36"
    }
]
songItems.forEach((element,i) => {
    // console.log(element,i)
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
    element.getElementsByClassName('timeStamp')[0].innerText=songs[i].duration;
});
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity=1;
        updateListIcon();
    }
    else{
        makeAllPlays();
       audioElement.pause();
       masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity=0
    }
})
//code to update the range of the bar according to the song plays
//timeupdate works on audio not on playbar
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seekbar
    //this formula gives the """"percentage""""" of the song how much that played
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
// console.log(progress)
myProgressBar.value=progress;
})
//code to move the range of the bar to play song aage ya peeche
myProgressBar.addEventListener('change',()=>{
    //now this is to calculate the duration of the song that how much it is played
audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100
})


//makeAllPlays functions ka use hoga bcz kisi bhi song ko play hone par baaki song paused ho
const makeAllPlays=()=>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    
    element.classList.remove('fa-circle-pause')
    element.classList.add('fa-circle-play')
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    //e -> kya hai ->jis par click hua
    element.addEventListener('click',(e)=>{
        //.target karne se wo "element" milega jiss par click hua h 
        // console.log(e.target);
        makeAllPlays();
         const clickedSongIndex = parseInt(e.target.id);
         if(clickedSongIndex === songIndex){
        if(audioElement.paused || audioElement.currentTime<=0)
        {
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName
            e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause')
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity=1;
        }
        else{
           audioElement.pause();
           e.target.classList.add('fa-circle-play');
        e.target.classList.remove('fa-circle-pause')
           masterPlay.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')
            gif.style.opacity=0
        }
    }
    else{
        songIndex = clickedSongIndex;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        updateListIcon();
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    }
        
        
        // audioElement.play();
        // masterPlay.classList.remove('fa-circle-play')
        // masterPlay.classList.add('fa-circle-pause')
        // gif.style.opacity=1
    //     if(audioElement.paused || audioElement.currentTime<=0)
    // {
    //     audioElement.play();
    //     e.target.classList.remove('fa-circle-play')
    //     e.target.classList.add('fa-circle-pause')
    //     gif.style.opacity=1;
    // }
    // else{
    //    audioElement.pause();
    //    e.target.classList.add('fa-circle-play')
    //     e.target.classList.remove('fa-circle-pause')
    //     gif.style.opacity=0
    // }
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6)
    {
        songIndex=0
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    updateListIcon();
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity=1
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=0
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    updateListIcon();
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity=1
})
function updateListIcon() {
    makeAllPlays();
    const songBtn = document.getElementById(songIndex.toString());
    if (songBtn) {
      songBtn.classList.remove("fa-circle-play");
      songBtn.classList.add("fa-circle-pause");
    }
  }