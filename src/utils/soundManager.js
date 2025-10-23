import { Howl } from 'howler';

// Preload all sound effects
const sounds = {
  click: new Howl({
    src: ['/sounds/msClick.mp3'],
    volume: 0.45,
    preload: true
  }),
  hover: new Howl({
    src: ['/sounds/sfxHover.mp3'],
    volume: 0.3,
    preload: true
  }),
  upvote: new Howl({
    src: ['/sounds/sfxUpvote.mp3'],
    volume: 0.9,
    preload: true
  }),
  downvote: new Howl({
    src: ['/sounds/sfxDownvote.mp3'],
    volume: 0.4,
    preload: true
  }),
  jump: new Howl({
    src: ['/sounds/msJump.mp3'],
    volume: 0.2,
    preload: true
  }),
  message: new Howl({
    src: ['/sounds/sfxMsg.mp3'],
    volume: 0.2,
    preload: true
  })
};

// Sound manager object
const soundManager = {
  playClick: () => {
    sounds.click.play();
  },
  playHover: () => {
    sounds.hover.play();
  },
  playUpvote: () => {
    sounds.upvote.play();
  },
  playDownvote: () => {
    sounds.downvote.play();
  },
  playJump: () => {
    sounds.jump.play();
  },
  playMessage: () => {
    sounds.message.play();
  }
};

export default soundManager;

