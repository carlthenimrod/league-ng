import { trigger, transition, style, animate, state } from '@angular/animations';

export const typeSelectTrigger = trigger('typeSelect', [
  state('*', style({
    display: 'none',
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('type', style({
    display: 'block',
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('void => type', [
    style({
      display: 'block',
      transform: 'translateX(0%)'
    }),
    animate('150ms ease-out')
  ]),
  transition('type => user', [
    animate('150ms ease-out', style({
      opacity: 0
    }))
  ]),
  transition('user => type', [
    style({
      display: 'none',
      opacity: 0,
      transform: 'translateX(0%)'
    }),
    animate('150ms 150ms ease-out')
  ])
]);

export const userFormTrigger = trigger('userForm', [
  state('*', style({
    display: 'none',
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('user', style({
    display: 'block',
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('type => user', [
    style({
      display: 'block',
      opacity: 0,
      transform: 'translateX(0%)'
    }),
    animate('150ms 150ms ease-out')
  ]),
  transition('user => type', [
    animate('150ms ease-out', style({
      opacity: 0
    }))
  ]),
  transition('user => misc', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('misc => user', [
    style({
      display: 'block',
      opacity: 1,
      transform: 'translateX(-300%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const miscFormTrigger = trigger('miscForm', [
  state('*', style({
    display: 'none',
    transform: 'translateX(-300%)'
  })),
  state('misc', style({
    display: 'block',
    transform: 'translateX(0%)'
  })),
  transition('user => misc', [
    style({
      display: 'block',
      transform: 'translateX(200%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(-100%)'
    }))
  ]),
  transition('misc => user', [
    style({
      transform: 'translateX(-100%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(200%)'
    }))
  ]),
  transition('misc => team', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('misc => terms', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('team => misc', [
    style({
      display: 'block'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ]),
  transition('terms => misc', [
    style({
      display: 'block'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const teamFormTrigger = trigger('teamForm', [
  state('*', style({
    display: 'none',
    transform: 'translateX(-300%)'
  })),
  state('team', style({
    display: 'block',
    transform: 'translateX(0%)'
  })),
  transition('misc => team', [
    style({
      display: 'block',
      transform: 'translateX(200%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(-100%)'
    }))
  ]),
  transition('team => misc', [
    style({
      transform: 'translateX(-100%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(200%)'
    }))
  ]),
  transition('team => terms', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('terms => team', [
    style({
      display: 'block'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const termsFormTrigger = trigger('termsForm', [
  state('*', style({
    display: 'none',
    transform: 'translateX(-300%)'
  })),
  state('terms', style({
    display: 'block',
    transform: 'translateX(0%)'
  })),
  transition('misc => terms', [
    style({
      display: 'block',
      transform: 'translateX(200%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(-100%)'
    }))
  ]),
  transition('team => terms', [
    style({
      display: 'block',
      transform: 'translateX(200%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(-100%)'
    }))
  ]),
  transition('terms => misc', [
    style({
      transform: 'translateX(-100%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(200%)'
    }))
  ]),
  transition('terms => team', [
    style({
      transform: 'translateX(-100%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(200%)'
    }))
  ]),
  transition('misc => terms', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('team => terms', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('terms => complete', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('terms => misc', [
    style({
      display: 'block'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ]),
  transition('terms => team', [
    style({
      display: 'block'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const completeTrigger = trigger('complete', [
  state('*', style({
    display: 'none',
    transform: 'translateX(-300%)'
  })),
  state('complete', style({
    display: 'block',
    transform: 'translateX(0%)'
  })),
  transition('terms => complete', [
    style({
      display: 'block',
      transform: 'translateX(200%)'
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(-100%)'
    }))
  ])
]);
