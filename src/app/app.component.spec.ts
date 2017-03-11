import 'rxjs/add/operator/toPromise';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule, ActiveToast } from 'ngx-toastr';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({
          timeOut: 800,
          progressBar: true,
          onActivateTick: true,
          enableHtml: true,
        }),
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [AppComponent],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should trigger onShown', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const opened: ActiveToast = app.openToast();
    opened.onShown.toPromise().then(() => {
      done();
    });
  });
  it('should trigger onHidden', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const opened: ActiveToast = app.openToast();
    opened.onHidden.toPromise().then(() => {
      done();
    });
  });
  it('should trigger onTap', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const opened: ActiveToast = app.openToast();
    opened.onTap.toPromise()
      .then(() => {
        // console.info(opened.toastRef)
        // const toast = fixture.debugElement.queryAll(By.css('toast-success'))[0];
        // toast.nativeElement.click();
        done();
      });
      opened.portal._component.tapToast();
  });
  it('should extend life on mouseover and exit', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const opened: ActiveToast = app.openToast();
    opened.portal._component.stickAround();
    opened.portal._component.delayedHideToast();
    expect(opened.portal._component.options.timeOut).toBe(1000);
    done();
  });
  it('should keep on mouse exit with extended timeout 0', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.options.extendedTimeOut = 0;
    const opened: ActiveToast = app.openToast();
    opened.portal._component.stickAround();
    opened.portal._component.delayedHideToast();
    expect(opened.portal._component.options.timeOut).toBe(0);
    done();
  });
});
