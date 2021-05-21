import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Access } from '../../models/common.model';
import { FeatureAccessService } from '../../service/feature-service/feature-access.service';

@Directive({
  selector: '[featureAccess]',
})
export class FeatureAccessDirective implements OnInit {
  app: string;
  feature: string;
  type: Access;
  hasPermission: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureService: FeatureAccessService
  ) {}

  ngOnInit() {
    this.featureService
      .hasFeatureAccess(this.app, this.feature, this.type)
      .subscribe((v) => {
        this.hasPermission = v;
        this.updateView();
      });
  }

  @Input() set featureAccess(value: any) {
    this.app = value[0] ? value[0] : '';
    this.feature = value[1] ? value[1] : '';
    this.type = value[2] ? value[2] : Access.CREATE;

    this.updateView();
  }

  private updateView() {
    if (this.hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
