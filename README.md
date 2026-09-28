# Business Guide Services

A clean, high-performance static website built for a Dubai-based typing centre and corporate services firm. 

**[View the Live Site Here](https://zayedmir.github.io/business-guide-services-website/)** 

## Overview
This project serves as the digital storefront for Business Guide Services, detailing their core offerings across government typing, trademark registration, and business setup. 

As a junior software development student, this website represents the culmination of my learning in my **Web Systems and Technologies** course. Rather than relying on heavy frameworks or templates, I chose to build this entirely with vanilla web technologies to solidify my grasp of core DOM manipulation, semantic structure, and responsive design. 

Additionally, this project served as a practical exercise in **responsible AI collaboration**—using AI as a pair-programming partner to troubleshoot bugs, refactor architecture, and streamline development while maintaining complete understanding and ownership of the final codebase.

## Tech Stack
* **HTML5:** Semantic structure and accessibility.
* **CSS3:** Custom responsive layouts, variables, and animations (bypassing the need for CSS framework compilers).
* **Vanilla JavaScript:** DOM manipulation, scroll observers, and interactive UI components without the overhead of a virtual DOM.

## Project Structure

```text
business-guide-services/
├── img/                                 # Optimized image assets and logos
├── business-guide-services-profile.pdf  # Downloadable corporate brochure
├── group.html                           # Sister ventures and group operations page
├── index.html                           # Main landing page and core services
├── script.js                            # Vanilla JS logic, scroll observers, and data routing
└── style.css                            # Custom styling, typography, and responsive layouts
```
## Key Features
* **Zero Build Steps:** No bundlers, no `node_modules`, and no compiler errors. 
* **Intersection Observers:** Custom vanilla JS scroll-reveal animations that are lightweight and performant.
* **Seamless WhatsApp Integration:** Client-side form handling that instantly builds and routes detailed service inquiries directly to the business's WhatsApp line.
* **Instant Load Times:** By removing framework bloat, the site delivers immediate content rendering, which is critical for the target demographic needing quick government service information.

## Running Locally
Because this is a pure static site, there is no development server required. 
Simply clone the repository and open `index.html` in any web browser.
