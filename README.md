# Jacky's Web Apps

A collection of simple, fun, ad-free interactive web apps for families. The project is built with plain HTML, CSS, and vanilla JavaScript, and can be hosted on Nginx, a NAS, or any static web server.

## Features

### Baby Color Tap

Entry point: [`webapp/baby_tap.html`](webapp/baby_tap.html)

- Tap or click the screen to change the background color.
- Supports multi-touch input.
- Displays colorful ripple effects at touch locations.
- Plays randomized musical tones with the Web Audio API.
- Supports mouse, touch, and stylus Pointer Events.

### Baby Slide

Entry point: [`webapp/baby_slide.html`](webapp/baby_slide.html)

- Drag the outlined circle to interact with it.
- Includes inertia, damping, and central gravity.
- The circle wraps around when it leaves the screen.
- Screen wrapping triggers an arpeggio and particle explosion.
- The circle gradually returns to the center after release.

## Pages

| Page | Description |
| --- | --- |
| [`index.html`](index.html) | Web App launcher |
| [`webapp/baby_tap.html`](webapp/baby_tap.html) | Baby Color Tap |
| [`webapp/baby_slide.html`](webapp/baby_slide.html) | Baby Slide |
| [`author.html`](author.html) | Author profile and personal information |
| [`50x.html`](50x.html) | 500 error page |

## Project Structure

```text
.
├── index.html                 # Web App launcher
├── author.html                # Author profile page
├── 50x.html                   # 500 error page
├── image/
│   └── profile.png            # Author profile photo
└── webapp/
    ├── baby_tap.html          # Baby Color Tap
    ├── baby_slide.html        # Baby Slide
    ├── common.css             # Shared Web App styles
    └── common.js              # Shared audio, particle, and navigation module
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

### Deploy with Nginx

Set the project directory as the Nginx document root and configure `index.html` as the default entry page. Pages under `webapp/` load shared resources using relative paths, so preserve the existing directory structure.

This project does not require Node.js, package installation, or a build step. The launcher and author page load Google Fonts; system fallback fonts are used if Google Fonts is unavailable.

## Technical Details

- **Frontend:** HTML5, CSS3, and vanilla JavaScript
- **Input events:** Touch Events and Pointer Events
- **Audio:** Web Audio API with single tones and arpeggios
- **Animation:** CSS Animation, `requestAnimationFrame`, and Web Animations API
- **Responsive design:** Desktop and full-screen mobile interaction
- **External resource:** Google Fonts, used only by the launcher and author page

`webapp/common.js` provides the following shared functionality:

- `WebAudioEngine`: audio unlocking, single-tone playback, and arpeggios.
- `ParticleEngine`: drag trails and edge-wrap explosions.
- `BabyModel`: colors, musical frequencies, and random selection for Baby Color Tap.
- Automatic injection of the floating button that returns to the app launcher.

## Browser Notes

- The latest versions of Chrome, Edge, Safari, or Firefox are recommended.
- iOS Safari requires a user touch before Web Audio can play sound.
- Interactive pages disable zooming, scrolling, and text selection to prevent accidental input during play.
- Audio playback also depends on browser autoplay policies and device volume settings.

## License

No open-source license is currently included. Contact the author before publishing, modifying, or redistributing this project.

