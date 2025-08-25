// Spotify Clone - Complete Music Player Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Audio element for playing music
    let audioElement = new Audio('songs/Come_And_Get_Your_Love1.mp3');
    
    // Song files array
    const songFiles = [
        'songs/Come_And_Get_Your_Love1.mp3',
        'songs/Post Malone, Swae Lee - Sunflower (Spider-Man Into the Spider-Verse).mp3',
        'songs/Shape Of You.mp3',
        'songs/blinding-lights.mp3',
        'songs/Luis Fonsi - Despacito ft. Daddy Yankee.mp3'
    ];
    
    // Song names array
    const songNames = [
        'Come and get your love - Redbone',
        'Sunflower - Post Malone, Swae Lee',
        'Shape of you - Ed Sheeran',
        'Blinding lights - The Weeknd',
        'Despacito - Luis Fonsi, Daddy Yankee'
    ];
    
    // Song durations array (in seconds)
    const songDurations = [206, 161, 235, 203, 281]; // 3:26, 2:41, 3:55, 3:23, 4:41
    
    let songIndex = 0;
    let isPlaying = false;
    
    // Get DOM elements
    const masterPlay = document.getElementById('masterPlay');
    const play1 = document.getElementById('play1');
    const play2 = document.getElementById('play2');
    const play3 = document.getElementById('play3');
    const play4 = document.getElementById('play4');
    const play5 = document.getElementById('play5');
    const previous = document.getElementById('previous');
    const next = document.getElementById('next');
    const myProgressBar = document.getElementById('myProgressBar');
    const gif = document.getElementById('gif');
    const masterSongName = document.getElementById('masterSongName');
    
    // Initialize
    masterSongName.innerText = songNames[songIndex];
    
    // Handle individual song play buttons
    function handleSongPlay(index) {
        if (songIndex !== index) {
            songIndex = index;
            audioElement.src = songFiles[songIndex];
            masterSongName.innerText = songNames[songIndex];
            updatePlayButtons();
        }
        
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        } else {
            audioElement.play();
            isPlaying = true;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
    }
    
    // Update play button icons
    function updatePlayButtons() {
        const playButtons = [play1, play2, play3, play4, play5];
        playButtons.forEach((btn, index) => {
            if (index === songIndex && isPlaying) {
                btn.classList.remove('fa-play-circle');
                btn.classList.add('fa-pause-circle');
            } else {
                btn.classList.remove('fa-pause-circle');
                btn.classList.add('fa-play-circle');
            }
        });
    }
    
    // Event listeners for individual song play buttons
    play1.addEventListener('click', () => handleSongPlay(0));
    play2.addEventListener('click', () => handleSongPlay(1));
    play3.addEventListener('click', () => handleSongPlay(2));
    play4.addEventListener('click', () => handleSongPlay(3));
    play5.addEventListener('click', () => handleSongPlay(4));
    
    // Master play button
    masterPlay.addEventListener('click', () => {
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        } else {
            audioElement.play();
            isPlaying = true;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
        updatePlayButtons();
    });
    
    // Previous button
    previous.addEventListener('click', () => {
        if (songIndex <= 0) {
            songIndex = songFiles.length - 1;
        } else {
            songIndex -= 1;
        }
        audioElement.src = songFiles[songIndex];
        masterSongName.innerText = songNames[songIndex];
        if (isPlaying) {
            audioElement.play();
        }
        updatePlayButtons();
    });
    
    // Next button
    next.addEventListener('click', () => {
        if (songIndex >= songFiles.length - 1) {
            songIndex = 0;
        } else {
            songIndex += 1;
        }
        audioElement.src = songFiles[songIndex];
        masterSongName.innerText = songNames[songIndex];
        if (isPlaying) {
            audioElement.play();
        }
        updatePlayButtons();
    });
    
    // Progress bar functionality
    audioElement.addEventListener('timeupdate', () => {
        const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    });
    
    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    });
    
    // Auto play next song when current song ends
    audioElement.addEventListener('ended', () => {
        next.click();
    });
    
    // Initialize play buttons
    updatePlayButtons();
});