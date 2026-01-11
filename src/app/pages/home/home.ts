import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit,
  viewChildren, QueryList, ElementRef, Inject, PLATFORM_ID, 
  ViewChildren} from '@angular/core'; 
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs'; 
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header";
import { FooterComponent } from "../footer/footer";
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatRippleModule } from '@angular/material/core';


import { register } from 'swiper/element/bundle';
import { deprecate } from 'node:util';
register();

@Component({
  selector: 'app-home',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, 
    MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatTabsModule,
    RouterModule, CommonModule, HeaderComponent, FooterComponent, MatIconModule,
    MatRippleModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
   animations: [

    // 🔹 Services image: Slide + Fade
    trigger('slideFade', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateY(20px) scale(0.98)'
        }),
        animate(
          '450ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0) scale(1)'
          })
        )
      ])
    ]),

    // 🔹 Testimonials carousel animation
    trigger('testimonialAnim', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateX(40px)'
        }),
        animate(
          '500ms cubic-bezier(0.4,0.0,0.2,1)',
          style({
            opacity: 1,
            transform: 'translateX(0)'
          })
        )
      ])
    ]),

    trigger('ctaAnim', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate(
      '500ms cubic-bezier(0.4,0.0,0.2,1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ])
])

  ]
 

})
export class HomeComponent implements AfterViewInit {

  // 1. Inject ElementRef to access the DOM
  // constructor(private el: ElementRef) {}

  slides = [
    { title: 'We care about your health', sub: 'Committed to success', bg: '/hero/h2_hero.jpeg' },
    { title: 'Advanced Medical Services', sub: 'Modern Technology', bg: '/hero/h4_hero.jpg' },
    { title: 'Expert Medical Specialists', sub: 'Professional Team', bg: '/hero/h1_hero.png' }
  ];

  departments = [
    { name: 'Cardiology', icon: 'favorite', desc: 'Heart care and surgery' },
    { name: 'Neurology', icon: 'psychology', desc: 'Brain and nervous system' },
    { name: 'Pediatrics', icon: 'child_care', desc: 'Specialized care for children' },
    { name: 'Emergency', icon: 'emergency', desc: '24/7 Urgent care' }
  ];

  doctors = [
    { name: 'Dr. Sarah Johnson', role: 'Chief Surgeon', img: 'gallery/team1.png' },
    { name: 'Dr. Michael Chen', role: 'Cardiologist', img: 'gallery/team2.png' },
    { name: 'Dr. Emily Smith', role: 'Pediatrician', img: 'gallery/team3.png' }
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object // Inject Platform ID
  ) {}

  ngAfterViewInit() {
    // Check if we are in the browser before running IntersectionObserver
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations() {
    // This code only runs in the browser now, so it won't crash the server
    const observerOptions = {
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animationTargets = this.el.nativeElement.querySelectorAll(
      '.reveal-left, .reveal-right, .reveal-up'
    );

    animationTargets.forEach((target: HTMLElement) => observer.observe(target));
  }

  onSubmitAppointment() {
    console.log("Appointment Request Sent!");
  }

activeService = 0;
@ViewChildren('serviceBtn', { read: ElementRef })
  serviceButtons!: QueryList<ElementRef>;
  services = [
    {
      title: 'Cardiology',
      icon: 'favorite',
      image: '/services/cardiology.jpg',
      desc: 'Advanced heart care with modern technology',
    },
    {
      title: 'Neurology',
      icon: 'psychology',
      image: '/services/neurology.jpg',
      desc: 'Expert treatment for brain & nerve disorders',
    },
    {
      title: 'Orthopedics',
      icon: 'accessibility_new',
      image: '/services/orthopedics.jpg',
      desc: 'Bone, joint & spine care',
    },
    {
      title: 'Emergency',
      icon: 'local_hospital',
      image: '/services/emergency.avif',
      desc: '24×7 emergency & trauma care',
    },
    {
      title: 'Pediatrics',
      icon: 'child_care',
      image: '/services/pediatrics.jpg',
      desc: 'Specialized child healthcare services',
    },
  ];

  selectService(index: number) {
    this.activeService = index;

    // ✅ Auto-center icon on mobile
    setTimeout(() => {
      const btn = this.serviceButtons.toArray()[index];
      btn?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    });
  }


  testimonials = [
  {
    name: 'Ramesh Kumar',
    city: 'Hyderabad',
    message:
      'Excellent doctors and very caring staff. The treatment and facilities were world-class.',
    rating: 5,
    image: 'testimonials/patient1.jpg'
  },
  {
    name: 'Anita Sharma',
    city: 'Secunderabad',
    message:
      'From admission to discharge, everything was smooth and professional.',
    rating: 5,
    image: 'testimonials/patient2.jpg'
  },
  {
    name: 'Mohammed Ali',
    city: 'Hyderabad',
    message:
      'Clean hospital, modern equipment, and friendly doctors. Highly recommended!',
    rating: 4,
    image: 'testimonials/patient3.webp'
  }
];

activeTestimonial = 0;

  nextTestimonial() {
  this.activeTestimonial =
    (this.activeTestimonial + 1) % this.testimonials.length;
}

prevTestimonial() {
  this.activeTestimonial =
    (this.activeTestimonial - 1 + this.testimonials.length) %
    this.testimonials.length;
}

ngOnInit() {
  setInterval(() => {
    this.nextTestimonial();
  }, 5000); // auto-slide every 5 sec
}


}