import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeApi(): string {
    return 'working';
  }
  teapot(): string {
    return `I'm a teapot ☕ `;
  }
}
/**
 *  <a href="https://emoji.gg/emoji/7919-finger-suck"><img src="https://emoji.gg/assets/emoji/7919-finger-suck.png" width="64px" height="64px" alt="finger_suck"></a> 
    <pre>Nani ?</pre>`
 */
