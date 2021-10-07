import { Pipe, PipeTransform } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/assets/translations/users/en.json';

@Pipe({ name: 'webRoleTranslate' })
export class WebRoleTranslationPipe implements PipeTransform {
  userJson = json;
  transform(value: string): string {
    const role = Object.values(this.userJson)[5][value];
    if (role) {
      return role;
    } else {
      return '-';
    }
  }
}
