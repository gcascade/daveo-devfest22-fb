import { sound } from '@pixi/sound';

export default function loadSounds() {
  const path = process.env.REACT_APP_SOUNDS_PATH;
  sound.add('balloon_jump', `${path}/balloon_jump.wav`);
  sound.add('change_level', `${path}/change_level.wav`);
  sound.add('coin', `${path}/coin.wav`);
  //   sound.add('game_over', `${path}/game_over.wav`);
  sound.add('heart', `${path}/heart.wav`);
  sound.add('hit', `${path}/hit.wav`);
  sound.add('nautilus_jump', `${path}/nautilus_jump.wav`);
  sound.add('start', `${path}/start.wav`);

  console.log('Sounds loaded');
}
