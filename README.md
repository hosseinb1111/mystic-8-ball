# 🎱 Mystic 8-Ball




A polished and interactive **Magic 8-Ball game** built with pure HTML, CSS, and vanilla JavaScript.

Ask a yes-or-no question, shake the ball, and let the mysterious oracle reveal your fate. ✨


---

## ✨ Features

### 🎱 Interactive Magic 8-Ball

A visually detailed 8-Ball with:

* 3D-style shading
* Glass-like highlights
* Depth and shadows
* Glowing answer window
* Shake animation
* Answer reveal animation

### 🔮 Random Answers

The game contains a collection of classic Magic 8-Ball responses divided into three categories:

* ✅ Positive
* 🌀 Neutral
* ❌ Negative

The same answer won't be selected twice in a row, making repeated questions feel less predictable.

### 📝 Question History

Every question and answer can be stored locally in the browser.

Your recent questions remain available after refreshing the page.

Up to 20 previous questions are remembered.

### 💾 Local Storage

The following preferences are saved locally:

* Question history
* Sound preference
* Light/dark theme

No account or backend is required.

### 🌙 Light & Dark Mode

Switch between two visual themes using the theme button.

The selected theme is remembered automatically.

### 🔊 Sound Effects

The game generates subtle sound effects directly in the browser using the **Web Audio API**.

Different answer types can produce different tones.

Sound can be enabled or disabled at any time.

### 📋 Copy Answers

Copy the current answer with one click.

Every answer in the history also has its own copy button.

### 🎨 Custom Text Selection

The project includes a custom selection style:

```css
::selection {
  background: var(--selection-bg);
  color: var(--selection-text);
}
```

This gives highlighted text a gold oracle-inspired appearance.

### 📱 Responsive Design

The game adapts to different screen sizes and works on:

* Desktop
* Laptop
* Tablet
* Mobile

### ♿ Accessibility

The interface includes:

* Keyboard navigation
* Focus states
* Accessible button labels
* `aria-live` answer/status updates
* Reduced-motion support
* Keyboard activation for the 8-Ball

---

## 🎮 How to Play

Playing Mystic 8-Ball is simple.

### 1. Think of a question

Think of something that can reasonably be answered with **yes**, **no**, or uncertainty.

For example:

> Will I have a good day?

> Should I buy this?

> Will I pass my exam?

### 2. Enter your question

Type the question into the input field.

### 3. Ask the 8-Ball

Press **Ask**, press **Enter**, or click the Magic 8-Ball itself.

### 4. Reveal your fate

The ball shakes, the window glows, and a random answer appears.

That's it. The universe has spoken. 🎱

---

## 🛠️ Technologies

The project intentionally uses browser-native technologies.

| Technology         | Purpose                                |
| ------------------ | -------------------------------------- |
| HTML5              | Application structure                  |
| CSS3               | UI, themes, animations, visual effects |
| Vanilla JavaScript | Game logic and interaction             |
| CSS Gradients      | Backgrounds and lighting               |
| CSS `clip-path`    | 8-Ball triangular window               |
| Web Audio API      | Sound effects                          |
| LocalStorage API   | Preferences and history                |
| Clipboard API      | Copy functionality                     |
| GitHub Pages       | Hosting                                |

There are **zero external dependencies**.

No:

* React
* Vue
* Angular
* Node.js
* npm packages
* Backend
* Database
* External API

are required.

---

## 📁 Project Structure

```text
mystic-8-ball/
│
├── index.html
├── example.png
├── README.md
└── LICENSE
```

### `index.html`

The complete application, including:

* HTML
* CSS
* JavaScript
* Magic 8-Ball graphics
* Animation
* Theme system
* Sound
* History
* Game logic

### `example.png`

Screenshot displayed in the README.

### `README.md`

Project documentation.

### `LICENSE`

MIT License for the project.

---

## 🚀 Run Locally

There is nothing to install.

Clone the repository:

```bash
git clone https://github.com/hosseinb1111/mystic-8-ball.git
```

Enter the directory:

```bash
cd mystic-8-ball
```

Then open:

```text
index.html
```

in your browser.

You can also use a local development server such as VS Code Live Server.

---

## 🌐 GitHub Pages Deployment

Mystic 8-Ball is designed to work directly with GitHub Pages.

### 1. Create the repository

Create a GitHub repository named:

```text
mystic-8-ball
```

### 2. Upload the files

Your repository should contain:

```text
index.html
README.md
LICENSE
example.png
```

### 3. Enable GitHub Pages

Open:

**Settings → Pages**

Under **Build and deployment**, select:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

Then click **Save**.

GitHub will automatically publish the website.

The resulting URL will be:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
```

For this repository:

```text
https://hosseinb1111.github.io/mystic-8-ball/
```

---

## 🧠 How It Works

Mystic 8-Ball is intentionally simple behind the scenes.

The application keeps a predefined collection of answers:

```javascript
var answers = [
  {
    text: "It is certain",
    emoji: "✨",
    type: "positive"
  },
  {
    text: "Reply hazy, try again",
    emoji: "🌀",
    type: "neutral"
  },
  {
    text: "My reply is no",
    emoji: "⚡",
    type: "negative"
  }
];
```

When the player asks a question:

```text
Question
   ↓
Validate input
   ↓
Shake the 8-Ball
   ↓
Choose a random answer
   ↓
Reveal the answer
   ↓
Save question + answer
```

The question itself does **not** determine the answer.

The result is intentionally random, just like a traditional Magic 8-Ball.

---

## 🎨 Visual Design

The 8-Ball is created entirely with CSS.

There is no external image or 3D model.

The ball uses:

* Radial gradients
* Multiple shadows
* Highlights
* Reflections
* CSS clipping
* Glow effects
* Animated transforms

The triangular answer window is created using:

```css
clip-path:
  polygon(
    50% 0%,
    100% 100%,
    0% 100%
  );
```

This keeps the project completely self-contained.

---

## 📏 Smart Answer Scaling

One of the more important parts of the project is the answer display.

Different answers have different lengths, so a fixed font size could cause long answers to overflow the window.

The project measures the rendered answer and calculates an appropriate scale based on the available width and height.

Conceptually:

```text
Available window
       ↓
Measure answer
       ↓
Compare width + height
       ↓
Calculate scale
       ↓
Fit answer inside window
```

This allows both short and long answers to remain visually contained.

---

## 🌙 Theme System

Mystic 8-Ball supports both dark and light modes.

The theme is controlled using:

```html
<html data-theme="dark">
```

and:

```html
<html data-theme="light">
```

CSS variables then change the entire appearance:

```css
:root {
  --bg-1: #06060a;
  --text: #ffffff;
}

html[data-theme="light"] {
  --bg-1: #eef1f8;
  --text: #161923;
}
```

The selected theme is stored in `localStorage`.

---

## 🔊 Sound System

Mystic 8-Ball doesn't require audio files.

Instead, it creates tones with the browser's Web Audio API.

Different moments use different sounds:

```text
Shake
 ↓
Low rhythmic tones

Positive answer
 ↓
Higher bright tones

Negative answer
 ↓
Lower tone

Neutral answer
 ↓
Soft middle tone
```

This keeps the project lightweight while still giving it a more interactive feel.

---

## 💾 Privacy

Mystic 8-Ball does not collect personal information.

There is:

* No account system
* No database
* No analytics
* No tracking
* No cookies
* No external API
* No server-side user data

Question history and preferences stay in the user's browser through `localStorage`.

---

## ⚡ Performance

The project is designed to remain lightweight.

It uses:

* Native browser APIs
* CSS animations
* CSS gradients
* Minimal JavaScript
* No external libraries

The entire application can live inside a single HTML file.

That means it loads quickly and can be hosted almost anywhere that supports static files.

---

## 🤝 Contributing

Contributions are welcome.

You can contribute by:

* Adding new answers
* Improving the 8-Ball design
* Adding new themes
* Improving animations
* Improving accessibility
* Adding new sound effects
* Optimizing mobile support
* Improving performance
* Fixing bugs

Clone the repository:

```bash
git clone https://github.com/hosseinb1111/mystic-8-ball.git
```

Create a branch:

```bash
git checkout -b feature/my-feature
```

Make your changes:

```bash
git add .
git commit -m "Add my feature"
```

Push your branch:

```bash
git push origin feature/my-feature
```

Then open a Pull Request on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to:

* Use it
* Modify it
* Distribute it
* Use it commercially
* Include it in other projects

See the [LICENSE](LICENSE) file for the complete license text.

---

## ⭐ Support

If you enjoy Mystic 8-Ball, consider giving the repository a ⭐ on GitHub.

Found a bug or have an idea for a new feature? Open an issue or submit a pull request.

---

Made with 🎱, ✨, and questionable cosmic advice.
