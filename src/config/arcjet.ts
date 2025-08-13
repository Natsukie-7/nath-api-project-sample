import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/node';
import ENV from '@config/env';

const { ARCJET_KEY } = ENV;

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ['ip.src'],
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
