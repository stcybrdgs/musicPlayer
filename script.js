const image = document.querySelector('img')
const title = document.querySelector('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

let isPlaying = false
let songIndex = 0

// Music
const songs = [
  {
    name: 'chin_1',
    displayName: 'HSK 3 Workbook',
    title: 'HSK 3 Workbook',
    artist: 'Part 1',
  },
  {
    name: 'chin_2',
    displayName: 'HSK 3 Workbook',
    title: 'HSK 3 Workbook',
    artist: 'Part 2',
  },
  {
    name: 'chin_3',
    displayName: 'HSK 3 Workbook',
    title: 'HSK 3 Workbook',
    artist: 'Part 3',
  },
  {
    name: 'chin_4',
    displayName: 'HSK 3 Workbook',
    title: 'HSK 3 Workbook',
    artist: 'Part 4',
  },
]

// Play
function playSong() {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  music.play()
}

function pauseSong() {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
  music.pause()
}

function prevSong() {
  songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1
  loadSong(songs[songIndex])
  if (isPlaying) {
    playSong()
  }
}

function nextSong() {
  songIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1
  loadSong(songs[songIndex])
  if (isPlaying) {
    playSong()
  }
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `images/${song.name}.jpeg`
}

// Update progress bar and times
function getTimestamp(time) {
  const minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}

function updateSongProgress(e) {
  if (isPlaying) {
    // update progress bar width
    const { currentTime, duration } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    // update current time
    currentTimeEl.textContent = getTimestamp(currentTime)
  }
}

function updateSongTimes(e) {
  const { currentTime, duration } = e.srcElement
  // update start time
  currentTimeEl.textContent = getTimestamp(currentTime)
  // update end time
  durationEl.textContent = getTimestamp(duration)
}

// Set song progress when user clicks on progress bar
function setSongProgress(e) {
  const selectedProgress = e.offsetX
  const progressRatio = selectedProgress / this.clientWidth
  const progressPercent = progressRatio * 100
  music.currentTime = music.duration * progressRatio
  currentTimeEl.textContent = getTimestamp(music.currentTime)
  progress.style.width = `${progressPercent}%`
}

// handle song end (allows for playlists, loop, and shuffle)
function handleSongEnd() {
  console.log('the song ended')
  nextSong()
}

// Listeners
playBtn.addEventListener('click', isPlaying ? pauseSong : playSong)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateSongProgress)
music.addEventListener('durationchange', updateSongTimes)
music.addEventListener('ended', handleSongEnd)
progressContainer.addEventListener('click', setSongProgress)

// On Load - Select first song
loadSong(songs[songIndex])

