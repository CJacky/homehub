# Jacky's Home Hub

Home Hub is a growing collection of practical tools, playful experiments, and small helpers for everyday family life. The original web apps are currently organized under the **Baby App** section. The project is built with plain HTML, CSS, and vanilla JavaScript, and is hosted as a static site with GitHub Pages.

## Features

### Baby Color Tap

Entry point: [`baby-app/baby-tap.html`](baby-app/baby-tap.html)

- Tap or click the screen to change the background color.
- Supports multi-touch input.
- Displays colorful ripple effects at touch locations.
- Plays randomized musical tones with the Web Audio API.
- Supports mouse, touch, and stylus Pointer Events.

### Baby Slide

Entry point: [`baby-app/baby-slide.html`](baby-app/baby-slide.html)

- Drag the outlined circle to interact with it.
- Includes inertia, damping, and central gravity.
- The circle wraps around when it leaves the screen.
- Screen wrapping triggers an arpeggio and particle explosion.
- The circle gradually returns to the center after release.

### Baby Piano

Entry point: [`baby-app/baby-piano.html`](baby-app/baby-piano.html)

- Plays the Chinese pentatonic scale: Do, Re, Mi, Sol, and La (C, D, E, G, A).
- Supports multi-touch, mouse, and stylus input.
- Provides colorful, large keys designed for little hands.

## Pages

| Page | Description |
| --- | --- |
| [`index.html`](index.html) | Home Hub landing page and tool directory |
| [`baby-app/baby-tap.html`](baby-app/baby-tap.html) | Baby App · Baby Color Tap |
| [`baby-app/baby-slide.html`](baby-app/baby-slide.html) | Baby App · Baby Slide |
| [`baby-app/baby-piano.html`](baby-app/baby-piano.html) | Baby App · Baby Piano |
| [`author.html`](author.html) | Author profile and personal information |
| [`404.html`](404.html) | Custom 404 error page for GitHub Pages |

## Project Structure

```text
.
├── index.html                 # Home Hub landing page
├── author.html                # Author profile page
├── 404.html                   # Custom GitHub Pages 404 page
├── image/
│   └── profile.png            # Author profile photo
└── baby-app/                  # Baby App tools
    ├── baby-tap.html          # Baby Color Tap
    ├── baby-slide.html        # Baby Slide
    ├── baby-piano.html        # Baby Piano
    ├── common.css             # Shared Baby App styles
    └── modules/               # Small shared modules loaded per activity
        ├── audio.js           # Audio unlock, tones, and arpeggios
        ├── model.js           # Shared colors, frequencies, and helpers
        ├── navigation.js      # Home Hub navigation button
        └── visual.js          # Particle trails and explosions
```

## Usage

### Open directly

Open `index.html` in a browser to launch the app menu. To enable audio, click or touch the page before using the interactive features; some browsers block audio that starts without user interaction.

### Run a local static server

From the project root, start any static file server. For example:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

### Deploy with GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository's **Settings → Pages** section.
3. Select the branch containing the project and the `/ (root)` folder as the publishing source.
4. Save the configuration and open the generated Pages URL.

The publishing source must contain `index.html` at its top level. Pages under `baby-app/` use relative paths for shared resources, so preserve the existing directory structure. The custom `404.html` file is automatically used for missing pages.

This project does not require Node.js, package installation, or a build step. The Home Hub and author page load Google Fonts; system fallback fonts are used if Google Fonts is unavailable.

## Technical Details

- **Frontend:** HTML5, CSS3, and vanilla JavaScript
- **Input events:** Touch Events and Pointer Events
- **Audio:** Web Audio API with single tones and arpeggios
- **Animation:** CSS Animation, `requestAnimationFrame`, and Web Animations API
- **Responsive design:** Desktop and full-screen mobile interaction
- **External resource:** Google Fonts, used only by Home Hub and the author page

The files under `baby-app/modules/` provide the following shared functionality:

- `WebAudioEngine`: audio unlocking, single-tone playback, and arpeggios.
- `ParticleEngine`: drag trails and edge-wrap explosions.
- `BabyModel`: colors, musical frequencies, and random selection for Baby Color Tap.
- Automatic injection of the floating button that returns to Home Hub.

## Browser Notes

- The latest versions of Chrome, Edge, Safari, or Firefox are recommended.
- iOS Safari requires a user touch before Web Audio can play sound.
- Interactive pages disable zooming, scrolling, and text selection to prevent accidental input during play.
- Audio playback also depends on browser autoplay policies and device volume settings.

## License

No open-source license is currently included. Contact the author before publishing, modifying, or redistributing this project.
