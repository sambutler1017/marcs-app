import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Access } from '../../models/common.model';
import { AuthService } from '../../service/auth-service/auth.service';

@Directive({
  selector: '[featureAccess]',
})
export class FeatureAccessDirective implements OnInit, OnDestroy {
  feature: string;
  type: Access;
  destroy = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService
      .hasAccess(this.feature, this.type)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe((v) => this.updateView(v));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  @Input() set featureAccess(value: any) {
    this.feature = value[0] ? value[0] : '';
    this.type = value[1] ? value[1] : Access.CREATE;
  }

  private updateView(hasPermission: boolean) {
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
