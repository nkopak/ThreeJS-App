import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsService {
  private frameId: any = null;

  public constructor(private ngZone: NgZone) {
  }

  public animate(renderCallback: VoidFunction, resizeCallback: VoidFunction): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      this.render(renderCallback);

      window.addEventListener('resize', () => {
        resizeCallback();
      });
    });
  }

  private render(renderCallback: VoidFunction): void {
    this.frameId = requestAnimationFrame(() => {
      this.render(renderCallback);
    });

    renderCallback();
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }
}
