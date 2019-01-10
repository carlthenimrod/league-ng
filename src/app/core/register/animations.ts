import { trigger, transition, style, animate, state } from '@angular/animations';

export const typeSelectTrigger = trigger('typeSelect', [
  state('*', style({
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('type', style({
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('void => type', [
    style({
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
      opacity: 0,
      transform: 'translateX(0%)'
    }),
    animate('150ms 150ms ease-out')
  ])
]);

export const userFormTrigger = trigger('userForm', [
  state('*', style({
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('user', style({
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('type => user', [
    style({
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
      opacity: 1
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const miscFormTrigger = trigger('miscForm', [
  state('*', style({
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('misc', style({
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('user => misc', [
    style({
      opacity: 1,
      transform: 'translateX(300%)'
    }),
    animate('600ms ease-out')
  ]),
  transition('misc => user', [
    animate('600ms ease-out', style({
      transform: 'translateX(300%)'
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
      opacity: 1
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ]),
  transition('terms => misc', [
    style({
      opacity: 1
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const teamFormTrigger = trigger('teamForm', [
  state('*', style({
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('team', style({
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('misc => team', [
    style({
      opacity: 1,
      transform: 'translateX(300%)'
    }),
    animate('600ms ease-out')
  ]),
  transition('team => misc', [
    animate('600ms ease-out', style({
      transform: 'translateX(300%)'
    }))
  ]),
  transition('team => terms', [
    animate('600ms ease-out', style({
      transform: 'translateX(-300%)'
    }))
  ]),
  transition('terms => team', [
    style({
      opacity: 1
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const termsFormTrigger = trigger('termsForm', [
  state('*', style({
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('terms', style({
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('misc => terms', [
    style({
      opacity: 1,
      transform: 'translateX(300%)'
    }),
    animate('600ms ease-out')
  ]),
  transition('team => terms', [
    style({
      opacity: 1,
      transform: 'translateX(300%)'
    }),
    animate('600ms ease-out')
  ]),
  transition('terms => misc', [
    animate('600ms ease-out', style({
      transform: 'translateX(300%)'
    }))
  ]),
  transition('terms => team', [
    animate('600ms ease-out', style({
      transform: 'translateX(300%)'
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
      opacity: 1
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ]),
  transition('terms => team', [
    style({
      opacity: 1
    }),
    animate('600ms ease-out', style({
      transform: 'translateX(0%)'
    }))
  ])
]);

export const completeTrigger = trigger('complete', [
  state('*', style({
    opacity: 0,
    transform: 'translateX(-300%)'
  })),
  state('complete', style({
    opacity: 1,
    transform: 'translateX(0%)'
  })),
  transition('terms => complete', [
    style({
      opacity: 1,
      transform: 'translateX(300%)'
    }),
    animate('600ms ease-out')
  ])
]);
