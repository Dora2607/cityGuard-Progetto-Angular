import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(-15px)' }),
        stagger(
          '70ms',
          animate(
            '570ms ease-out',
            style({ opacity: 1, transform: 'translateY(0px)' }),
          ),
        ),
      ],
      { optional: true },
    ),
    query(':leave', animate('70ms', style({ opacity: 0 })), { optional: true }),
  ]),
]);
