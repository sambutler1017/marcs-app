import { Pipe, PipeTransform } from '@angular/core';
import { default as webRolesJson } from 'projects/insite-kit/src/assets/translations/web-roles/en.json';

@Pipe({ name: 'webRoleTranslate' })
export class WebRoleTranslationPipe implements PipeTransform {
  transform(value: string): string {
    const role = Object.values(webRolesJson)[0][value];
    return role ? role : '-';
  }
}
