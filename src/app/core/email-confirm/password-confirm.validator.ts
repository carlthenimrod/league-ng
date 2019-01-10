import { FormGroup } from '@angular/forms';

export const confirmPassword = (group: FormGroup): {notSame: boolean} => {
  const password = group.get('password').value;
  const confirm = group.get('confirm').value;

  return password === confirm ? null : { notSame: true };
};
