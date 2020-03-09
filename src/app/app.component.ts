import {Component, HostListener} from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  deferredPrompt: any;
  showButton = false;
  isLoading = false;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private sanitizer: DomSanitizer,
              private iconRegistry: MatIconRegistry) {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.registerIcons(iconRegistry, sanitizer);
  }

  private registerIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'glucose',
      sanitizer.bypassSecurityTrustResourceUrl('assets/biscuit.svg'));
    iconRegistry.addSvgIcon(
      'temperature',
      sanitizer.bypassSecurityTrustResourceUrl('assets/thermometer.svg'));
    iconRegistry.addSvgIcon(
      'pulse',
      sanitizer.bypassSecurityTrustResourceUrl('assets/heart.svg'));
    iconRegistry.addSvgIcon(
      'pressure',
      sanitizer.bypassSecurityTrustResourceUrl('assets/blood-pressure-meter.svg'));
    iconRegistry.addSvgIcon(
      'weight',
      sanitizer.bypassSecurityTrustResourceUrl('assets/scale.svg'));
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log('Before install:' + e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
}
