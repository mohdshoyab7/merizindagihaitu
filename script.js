const content = document.getElementById('content');
const eyebrow = document.getElementById('eyebrow');
const progressWrap = document.getElementById('progressWrap');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const heartsLayer = document.getElementById('heartsLayer');
const pagePhoto = document.getElementById('pagePhoto');
const photoCaption = document.getElementById('photoCaption');

// Reuse your three local JPEGs throughout the experience.
const pagePhotos = [
  { src: './photos/img1.jpeg', caption: 'A little memory, just for us ❤️' },
  { src: './photos/img2.jpeg', caption: 'One of my favourite people, always. 💗' },
  { src: './photos/img3.jpeg', caption: 'If I could, I would pause this moment. ✨' },
  { src: './photos/img8.jpeg', caption: 'Still my favourite smile. 😉' },
  { src: './photos/img5.jpeg', caption: 'More memories, more reasons to smile. ❤️' },
  { src: './photos/img9.jpeg', caption: 'A lifetime of moments to come, InshaAllah. 🕋' },
  { src: './photos/img1.jpeg', caption: 'My favourite beginning is with you. ❤️' }
];

//music

// Music player


// const backgroundMusic = document.getElementById('backgroundMusic');

// function startMusic() {
//   backgroundMusic.volume = 0.7;

//   backgroundMusic.play().catch(error => {
//     console.log('Music playback failed:', error);
//   });
// }


// SoundCloud Music Player

const soundcloudMusic = document.getElementById('soundcloudMusic');
const widget = SC.Widget(soundcloudMusic);

let musicStarted = false;
let widgetReady = false;

widget.bind(SC.Widget.Events.READY, () => {
  widgetReady = true;
});

function startMusic() {
  if (musicStarted || !widgetReady) return;

  musicStarted = true;

  widget.seekTo(36000);
  widget.play();
}

document.getElementById('startButton').addEventListener('click', () => {
  startMusic();
  showQuestion();
});




function setPagePhoto(index) {
  const photo = pagePhotos[index % pagePhotos.length];
  pagePhoto.classList.add('is-changing');
  const nextImage = new Image();
  nextImage.onload = () => {
    pagePhoto.src = photo.src;
    pagePhoto.alt = 'A favourite memory of Huma and Shoaib';
    photoCaption.textContent = photo.caption;
    requestAnimationFrame(() => pagePhoto.classList.remove('is-changing'));
  };
  nextImage.onerror = () => {
    pagePhoto.src = photo.src;
    photoCaption.textContent = 'Add img1.jpeg, img2.jpeg and img3.jpeg to the photos folder';
    pagePhoto.classList.remove('is-changing');
  };
  nextImage.src = photo.src;
}

const questions = [
  {
    title: 'Can I have a fresh start with you?',
    note: 'Not because our story has been perfect, but because you are worth showing up for—every single day.',
    choices: ['Yes, you can ❤️', 'You better behave 😉', 'I’m listening, Shoaib'],
    replies: [
      'I’ll treat this fresh start like something precious. And yes, I’ll bring snacks and forehead kisses.',
      'Deal. I’ll behave… mostly. I reserve the right to flirt with my favourite girl.',
      'That’s all I’m asking for: a chance to listen, understand, and love you better.'
    ]
  },
  {
    title: 'What should never run out in our home?',
    note: 'Choose wisely, future Mrs. Aly. This is a very serious household matter. 😌',
    choices: ['Love & respect', 'Hugs and kisses', 'Food, obviously!'],
    replies: [
      'Always. Love without respect is incomplete, and you deserve both in abundance.',
      'I knew it. Prepare for random hugs, hand-holding, and kisses on the forehead.',
      'Correct answer. I’ll bring the food; you bring that beautiful smile.'
    ]
  },
  {
    title: 'Where should our first trip together as husband and wife be?',
    note: 'A little adventure, a lot of memories—and you sitting next to me. That’s my favourite destination.',
    choices: ['Mecca 🕋', 'A cosy mountain escape', 'Somewhere by the sea', 'Surprise me, husband-to-be'],
    replies: [
      'InshaAllah. May we get to visit together, make dua, and begin this chapter with blessings.',
      'Just imagine the views, warm coffees, and me finding excuses to hold your hand.',
      'A sunset, the waves, and you. I’m already calling it our perfect view.',
      'A surprise it is—but I’m pretty sure my favourite place will always be beside you.'
    ]
  },
  {
    title: 'How much flirting is acceptable after marriage?',
    note: 'Please consider that I have a lifetime supply of cheesy lines ready. 😂',
    choices: ['A little every day', 'As much as you want', 'Only if I get extra kisses'],
    replies: [
      'A little every day? I can do that. Good morning, gorgeous—practice starts now.',
      'Dangerous answer, Huma. I’m about to become your full-time admirer.',
      'You drive a hard bargain. Accepted—with interest, hugs, and unlimited compliments.'
    ]
  },
  {
    title: 'Are you ready to make a lifetime of little memories with me?',
    note: 'The ordinary days, silly jokes, long talks, big dreams, and choosing each other through it all.',
    choices: ['Yes, InshaAllah ❤️', 'I want that with you', 'Ask me the big question!'],
    replies: [
      'Ameen. May we build a life full of patience, laughter, kindness, and barakah.',
      'Then let’s make those little moments our favourite love story.',
      'Oh, you’re eager? I was trying to look cool, but my heart is doing cartwheels.'
    ]
  }
];

let step = -1;
let noAttempts = 0;

function updateProgress() {
  progressWrap.hidden = false;
  progressFill.style.width = `${Math.max(0, (step / questions.length) * 100)}%`;
  progressText.textContent = step >= questions.length ? 'The beginning of forever' : `Step ${step + 1} of ${questions.length} · A little closer to forever`;
}

function showQuestion() {
  step += 1;
  if (step >= questions.length) return showProposal();
  const q = questions[step];
  setPagePhoto(step + 1);
  eyebrow.textContent = 'A FEW LITTLE QUESTIONS';
  updateProgress();
  content.innerHTML = `
    <p class="kicker">${step === 0 ? 'One step at a time, beautiful' : 'Okay, one more thing…'}</p>
    <h2>${q.title}</h2>
    <p class="question-note">${q.note}</p>
    <div class="choices">${q.choices.map((choice, i) => `<button class="choice-button" data-choice="${i}">${choice}</button>`).join('')}</div>
    <p class="reply" id="reply" hidden></p>
    <button class="primary-button" id="continueButton" hidden>Next, my love <span>♥</span></button>
  `;
  content.querySelectorAll('[data-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.choice);
      content.querySelectorAll('[data-choice]').forEach(b => b.disabled = true);
      const reply = document.getElementById('reply');
      reply.textContent = q.replies[index];
      reply.hidden = false;
      document.getElementById('continueButton').hidden = false;
    });
  });
  document.getElementById('continueButton').addEventListener('click', showQuestion);
}

function showProposal() {
  step = questions.length;
  setPagePhoto(6);
  updateProgress();
  eyebrow.textContent = 'THE QUESTION I’VE BEEN WAITING TO ASK';
  progressFill.style.width = '100%';
  content.innerHTML = `
    <p class="kicker">Huma Haider, my favourite person…</p>
    <h1>Will you marry me?</h1>
    <p class="message">I can’t promise a life without challenges, but I can promise a partner who keeps choosing you, cheering for you, making you laugh, and stealing just a few of your fries.</p>
    <p class="reply">Let’s make our forever a beautiful one. ❤️</p>
    <div class="proposal-actions">
      <button class="primary-button" id="yesButton">YES, Shoaib! ❤️</button>
      <button class="choice-button no-button" id="noButton">Not yet 🙈</button>
    </div>
  `;
  document.getElementById('yesButton').addEventListener('click', showCelebration);
  const noButton = document.getElementById('noButton');
  noButton.addEventListener('click', () => {
    noAttempts += 1;
    const messages = ['Are you sure, jaan? 🥺', 'My heart is requesting a recount! 💗', 'One more chance? I have lifetime hugs!', 'Okay, I’ll keep asking nicely… ❤️'];
    noButton.textContent = messages[Math.min(noAttempts - 1, messages.length - 1)];
    if (noAttempts >= 4) {
      noButton.textContent = 'Okay, YES! ❤️';
      noButton.classList.remove('no-button');
      noButton.classList.add('primary-button');
      noButton.addEventListener('click', showCelebration, { once: true });
    }
  });
}

function showCelebration() {
  setPagePhoto(2);
  eyebrow.textContent = 'SHE SAID YES!';
  progressWrap.hidden = true;
  content.innerHTML = `
    <p class="kicker">Alhamdulillah. ❤️</p>
    <h1>Here’s to <em>our forever,</em> Huma!</h1>
    <p class="message">I can’t wait for all the ordinary and extraordinary days with you. I promise to keep listening, keep learning, keep making you smile—and keep reminding you how loved you are.</p>
    <p class="reply">You + Me. InshaAllah, always.</p>
    <p class="signature">Forever yours,<br><strong>Shoaib Aly</strong></p>
    <p class="message">P.S. Your future husband is already smiling like an idiot. 😉</p>
  `;
  for (let i = 0; i < 34; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['♥', '♡', '❤'][i % 3];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 2.5}s`;
    heart.style.fontSize = `${14 + Math.random() * 22}px`;
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 7500);
  }
}

document.getElementById('startButton').addEventListener('click', () => {
  startMusic();
  showQuestion();
});
