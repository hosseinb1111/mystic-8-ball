export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="description"
    content="A polished interactive Magic 8-Ball game."
  >

  <meta
    name="theme-color"
    content="#07070c"
  >

  <title>🎱 Magic 8-Ball</title>

  <link
    rel="icon"
    href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🎱%3C/text%3E%3C/svg%3E"
  >

  <style>
    /* =========================================
       THEME VARIABLES
       ========================================= */

    :root {
      --accent: #f0c040;
      --accent-strong: #ffd966;
      --accent-soft: rgba(240, 192, 64, 0.18);
      --accent-shadow: rgba(240, 192, 64, 0.28);

      --bg-1: #06060a;
      --bg-2: #0c1020;
      --bg-3: #171d3d;

      --surface: rgba(16, 19, 39, 0.72);
      --surface-strong: rgba(20, 23, 47, 0.92);

      --text: #ffffff;
      --text-soft: #dfe3f2;
      --muted: #9aa1ba;
      --muted-strong: #777f9a;

      --border: rgba(255, 255, 255, 0.09);
      --border-strong: rgba(255, 255, 255, 0.16);

      --input-bg: rgba(0, 0, 0, 0.22);

      --success: #72f6a6;
      --danger: #ff6b6b;

      --body-shadow: rgba(0, 0, 0, 0.30);

      --ball-dark-1: #4a4a5e;
      --ball-dark-2: #1d1d2b;
      --ball-dark-3: #07070c;

      --window-outer: #242454;
      --window-inner: #0d0d28;

      --selection-bg: #f0c040;
      --selection-text: #12110a;
    }

    html[data-theme="light"] {
      --accent: #c18a09;
      --accent-strong: #e0aa24;
      --accent-soft: rgba(193, 138, 9, 0.16);
      --accent-shadow: rgba(193, 138, 9, 0.24);

      --bg-1: #eef1f8;
      --bg-2: #dce3f1;
      --bg-3: #cfd8ee;

      --surface: rgba(255, 255, 255, 0.68);
      --surface-strong: rgba(255, 255, 255, 0.90);

      --text: #161923;
      --text-soft: #2a2f40;
      --muted: #687087;
      --muted-strong: #7d8499;

      --border: rgba(21, 28, 50, 0.10);
      --border-strong: rgba(21, 28, 50, 0.18);

      --input-bg: rgba(255, 255, 255, 0.65);

      --body-shadow: rgba(45, 58, 95, 0.17);

      --ball-dark-1: #596078;
      --ball-dark-2: #282c3a;
      --ball-dark-3: #0b0c11;

      --window-outer: #252858;
      --window-inner: #0e102a;

      --selection-bg: #c18a09;
      --selection-text: #ffffff;
    }

    /* =========================================
       CUSTOM SELECTION
       ========================================= */

    ::selection {
      background: var(--selection-bg);
      color: var(--selection-text);
      text-shadow: none;
    }

    ::-moz-selection {
      background: var(--selection-bg);
      color: var(--selection-text);
      text-shadow: none;
    }

    /* =========================================
       GLOBAL
       ========================================= */

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      min-height: 100%;
      background: var(--bg-1);
      color-scheme: dark;
      transition: background 0.35s ease;
    }

    html[data-theme="light"] {
      color-scheme: light;
    }

    body {
      min-height: 100vh;

      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

      color: var(--text);

      background:
        radial-gradient(
          circle at 12% 15%,
          rgba(82, 112, 255, 0.11),
          transparent 28%
        ),
        radial-gradient(
          circle at 88% 18%,
          rgba(176, 87, 255, 0.08),
          transparent 26%
        ),
        radial-gradient(
          circle at 50% 90%,
          var(--accent-soft),
          transparent 34%
        ),
        linear-gradient(
          135deg,
          var(--bg-1),
          var(--bg-2) 46%,
          var(--bg-3)
        );

      display: flex;
      justify-content: center;

      padding: 24px;

      overflow-x: hidden;

      transition:
        background 0.35s ease,
        color 0.35s ease;
    }

    body::before {
      content: "";

      position: fixed;
      inset: 0;

      pointer-events: none;

      opacity: 0.75;

      background:
        linear-gradient(
          rgba(255, 255, 255, 0.012) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.012) 1px,
          transparent 1px
        );

      background-size:
        46px 46px;

      mask-image:
        radial-gradient(
          circle at center,
          black 15%,
          transparent 88%
        );

      transition:
        opacity 0.35s ease;
    }

    html[data-theme="light"] body::before {
      opacity: 0.35;
    }

    button,
    input {
      font: inherit;
    }

    button:focus-visible,
    input:focus-visible,
    [role="button"]:focus-visible {
      outline:
        2px solid var(--accent);

      outline-offset:
        3px;
    }

    /* =========================================
       PAGE
       ========================================= */

    .page {
      width: 100%;
      max-width: 820px;

      position: relative;
      z-index: 1;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* =========================================
       TOP BAR
       ========================================= */

    .topbar {
      width: 100%;

      display:
        flex;

      justify-content:
        space-between;

      align-items:
        center;

      margin-bottom:
        14px;
    }

    .brand {
      display:
        flex;

      align-items:
        center;

      gap:
        10px;

      color:
        var(--muted);

      font-size:
        11px;

      font-weight:
        800;

      letter-spacing:
        1.7px;

      text-transform:
        uppercase;
    }

    .brand-dot {
      width:
        8px;

      height:
        8px;

      border-radius:
        50%;

      background:
        var(--accent);

      box-shadow:
        0 0 14px var(--accent);

      animation:
        pulse 2s ease-in-out infinite;
    }

    .top-actions {
      display:
        flex;

      gap:
        8px;
    }

    .icon-button {
      width:
        40px;

      height:
        40px;

      border:
        1px solid
        var(--border);

      border-radius:
        12px;

      background:
        var(--surface);

      color:
        var(--text);

      display:
        grid;

      place-items:
        center;

      font-size:
        15px;

      cursor:
        pointer;

      backdrop-filter:
        blur(15px);

      -webkit-backdrop-filter:
        blur(15px);

      box-shadow:
        0 8px 24px var(--body-shadow);

      transition:
        transform 0.2s ease,
        background 0.25s ease,
        border-color 0.25s ease;
    }

    .icon-button:hover {
      transform:
        translateY(-2px);

      background:
        var(--surface-strong);

      border-color:
        var(--border-strong);
    }

    /* =========================================
       HEADER
       ========================================= */

    .header {
      text-align:
        center;

      margin-bottom:
        18px;
    }

    .header h1 {
      font-size:
        clamp(2.3rem, 5vw, 4rem);

      line-height:
        1.05;

      letter-spacing:
        -1.8px;

      margin-bottom:
        9px;

      text-shadow:
        0
        0
        30px
        var(--accent-soft);
    }

    .header p {
      max-width:
        560px;

      margin:
        0 auto;

      color:
        var(--muted);

      font-size:
        14px;

      line-height:
        1.6;
    }

    /* =========================================
       BALL STAGE
       ========================================= */

    .ball-stage {
      position:
        relative;

      width:
        min(420px, 84vw);

      aspect-ratio:
        1 / 1;

      margin-bottom:
        24px;

      display:
        grid;

      place-items:
        center;

      cursor:
        pointer;

      user-select:
        none;
    }

    .ball-glow {
      position:
        absolute;

      inset:
        1%;

      border-radius:
        50%;

      background:
        radial-gradient(
          circle,
          var(--accent-soft),
          transparent 68%
        );

      filter:
        blur(42px);

      opacity:
        0.40;

      transition:
        opacity 0.35s ease,
        transform 0.35s ease;
    }

    .ball-stage:hover .ball-glow {
      opacity:
        0.70;

      transform:
        scale(1.07);
    }

    /* =========================================
       8-BALL
       ========================================= */

    .ball {
      position:
        relative;

      width:
        100%;

      height:
        100%;

      border-radius:
        50%;

      background:
        radial-gradient(
          circle at 31% 22%,
          rgba(255,255,255,0.18),
          transparent 9%
        ),
        radial-gradient(
          circle at 35% 30%,
          var(--ball-dark-1) 0%,
          var(--ball-dark-2) 18%,
          #11111a 42%,
          var(--ball-dark-3) 72%,
          #020204 100%
        );

      border:
        3px solid
        rgba(255,255,255,0.08);

      box-shadow:
        inset
        26px
        24px
        62px
        rgba(255,255,255,0.025),

        inset
        -36px
        -40px
        75px
        rgba(0,0,0,0.88),

        0
        35px
        90px
        var(--body-shadow);

      display:
        grid;

      place-items:
        center;

      transition:
        transform 0.2s ease,
        box-shadow 0.35s ease;
    }

    .ball-stage:hover .ball {
      transform:
        translateY(-5px)
        scale(1.012);
    }

    .ball-stage:active .ball {
      transform:
        scale(0.97);
    }

    .ball.shaking {
      animation:
        ball-shake
        0.92s
        cubic-bezier(.36,.07,.19,.97);
    }

    .ball.answering {
      box-shadow:
        inset
        26px
        24px
        62px
        rgba(255,255,255,0.025),

        inset
        -36px
        -40px
        75px
        rgba(0,0,0,0.88),

        0
        35px
        90px
        var(--body-shadow),

        0
        0
        90px
        var(--accent-soft);
    }

    /* Ball highlight */
    .ball::before {
      content:
        "";

      position:
        absolute;

      width:
        28%;

      height:
        14%;

      top:
        11%;

      left:
        20%;

      border-radius:
        50%;

      background:
        radial-gradient(
          ellipse,
          rgba(255,255,255,0.26),
          transparent 70%
        );

      transform:
        rotate(-28deg);

      filter:
        blur(3px);

      pointer-events:
        none;
    }

    /* Ball reflection */
    .ball::after {
      content:
        "";

      position:
        absolute;

      left:
        12%;

      right:
        12%;

      bottom:
        2%;

      height:
        18%;

      border-radius:
        50%;

      background:
        radial-gradient(
          ellipse,
          rgba(255,255,255,0.035),
          transparent 70%
        );

      filter:
        blur(9px);

      pointer-events:
        none;
    }

    /* =========================================
       LARGE ANSWER WINDOW
       ========================================= */

    .window {
      position:
        relative;

      width:
        69%;

      height:
        58%;

      display:
        flex;

      justify-content:
        center;

      align-items:
        center;

      clip-path:
        polygon(
          50% 0%,
          100% 100%,
          0% 100%
        );

      background:
        linear-gradient(
          180deg,
          var(--window-outer),
          #0b0b23
        );

      filter:
        drop-shadow(
          0
          12px
          20px
          rgba(0,0,0,0.75)
        );
    }

    .window-inner {
      position:
        absolute;

      inset:
        3%;

      clip-path:
        polygon(
          50% 0%,
          100% 100%,
          0% 100%
        );

      background:
        radial-gradient(
          ellipse at 50% 18%,
          rgba(100,100,190,0.15),
          transparent 45%
        ),
        linear-gradient(
          180deg,
          var(--window-inner),
          #030309
        );
    }

    .window-highlight {
      position:
        absolute;

      inset:
        0;

      pointer-events:
        none;

      background:
        radial-gradient(
          ellipse at 50% 15%,
          rgba(255,255,255,0.05),
          transparent 38%
        );
    }

    /* =========================================
       ANSWER DISPLAY
       ========================================= */

    .answer-area {
      position:
        relative;

      z-index:
        5;

      width:
        74%;

      height:
        62%;

      display:
        flex;

      justify-content:
        center;

      align-items:
        center;

      padding:
        22px 18px 5px;

      overflow:
        hidden;

      text-align:
        center;

      /*
       * This provides a generous region for
       * the text while still keeping it inside
       * the triangle.
       */
    }

    .answer {
      width:
        100%;

      /*
       * The answer uses transform scaling rather
       * than endlessly shrinking font-size.
       * This keeps typography more consistent.
       */
      transform:
        translateY(8px)
        scale(1);

      transform-origin:
        center;

      color:
        #ffffff;

      font-size:
        clamp(
          15px,
          2.1vw,
          21px
        );

      line-height:
        1.18;

      font-weight:
        850;

      letter-spacing:
        -0.35px;

      text-align:
        center;

      overflow-wrap:
        anywhere;

      word-break:
        normal;

      text-shadow:
        0
        0
        14px
        rgba(255,255,255,0.08);

      max-height:
        100%;

      opacity:
        1;

      transition:
        opacity 0.18s ease,
        transform 0.25s ease;
    }

    .answer.hidden {
      opacity:
        0;

      transform:
        translateY(18px)
        scale(0.90);
    }

    .answer.reveal {
      animation:
        answer-reveal
        0.42s
        ease-out;
    }

    /* =========================================
       QUESTION CARD
       ========================================= */

    .question-card {
      width:
        100%;

      padding:
        16px;

      border:
        1px solid
        var(--border);

      border-radius:
        20px;

      background:
        var(--surface);

      backdrop-filter:
        blur(18px);

      -webkit-backdrop-filter:
        blur(18px);

      box-shadow:
        0
        20px
        55px
        var(--body-shadow);
    }

    .question-row {
      display:
        flex;

      gap:
        10px;
    }

    .question-input {
      flex:
        1;

      min-width:
        0;

      padding:
        15px 18px;

      border:
        1px solid
        var(--border);

      border-radius:
        14px;

      background:
        var(--input-bg);

      color:
        var(--text);

      outline:
        none;

      font-size:
        15px;

      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background 0.25s ease;
    }

    .question-input::placeholder {
      color:
        var(--muted-strong);
    }

    .question-input:focus {
      border-color:
        var(--accent);

      box-shadow:
        0
        0
        0
        4px
        var(--accent-soft);
    }

    .question-input:disabled {
      opacity:
        0.55;

      cursor:
        not-allowed;
    }

    .ask-button {
      min-width:
        106px;

      padding:
        0 24px;

      border:
        none;

      border-radius:
        14px;

      background:
        linear-gradient(
          135deg,
          var(--accent-strong),
          var(--accent)
        );

      color:
        #17170d;

      font-size:
        14px;

      font-weight:
        850;

      cursor:
        pointer;

      box-shadow:
        0
        9px
        25px
        var(--accent-soft);

      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        filter 0.2s ease;
    }

    .ask-button:hover {
      transform:
        translateY(-2px);

      box-shadow:
        0
        15px
        32px
        var(--accent-soft);

      filter:
        brightness(1.05);
    }

    .ask-button:active {
      transform:
        scale(0.97);
    }

    .ask-button:disabled {
      opacity:
        0.6;

      cursor:
        not-allowed;

      transform:
        none;
    }

    .hint {
      margin-top:
        10px;

      color:
        var(--muted-strong);

      font-size:
        11px;

      text-align:
        center;
    }

    /* =========================================
       STATUS
       ========================================= */

    .status {
      min-height:
        20px;

      margin-top:
        10px;

      color:
        var(--muted-strong);

      font-size:
        11px;

      text-align:
        center;
    }

    .status.error {
      color:
        var(--danger);
    }

    .status.success {
      color:
        var(--success);
    }

    /* =========================================
       HISTORY
       ========================================= */

    .history-panel {
      width:
        100%;

      margin-top:
        2px;

      border:
        1px solid
        var(--border);

      border-radius:
        20px;

      background:
        var(--surface);

      backdrop-filter:
        blur(18px);

      -webkit-backdrop-filter:
        blur(18px);

      overflow:
        hidden;
    }

    .history-header {
      display:
        flex;

      justify-content:
        space-between;

      align-items:
        center;

      padding:
        14px 16px;

      border-bottom:
        1px solid
        var(--border);
    }

    .history-title {
      color:
        var(--muted);

      font-size:
        12px;

      font-weight:
        800;

      letter-spacing:
        1px;

      text-transform:
        uppercase;
    }

    .clear-button {
      border:
        none;

      background:
        transparent;

      color:
        var(--muted-strong);

      font-size:
        11px;

      cursor:
        pointer;
    }

    .clear-button:hover {
      color:
        var(--danger);
    }

    .history-list {
      max-height:
        220px;

      overflow-y:
        auto;
    }

    .history-list::-webkit-scrollbar {
      width:
        7px;
    }

    .history-list::-webkit-scrollbar-thumb {
      background:
        rgba(127,127,127,0.18);

      border-radius:
        999px;
    }

    .history-empty {
      padding:
        26px 18px;

      color:
        var(--muted-strong);

      font-size:
        13px;

      text-align:
        center;
    }

    .history-item {
      padding:
        13px 16px;

      border-bottom:
        1px solid
        var(--border);

      transition:
        background 0.2s ease;
    }

    .history-item:last-child {
      border-bottom:
        none;
    }

    .history-item:hover {
      background:
        rgba(127,127,127,0.04);
    }

    .history-question {
      margin-bottom:
        5px;

      color:
        var(--muted);

      font-size:
        11px;

      line-height:
        1.45;

      overflow-wrap:
        anywhere;
    }

    .history-answer-row {
      display:
        flex;

      justify-content:
        space-between;

      align-items:
        center;

      gap:
        12px;
    }

    .history-answer {
      color:
        var(--text);

      font-size:
        13px;

      font-weight:
        750;

      overflow-wrap:
        anywhere;
    }

    .copy-history {
      flex-shrink:
        0;

      border:
        none;

      background:
        rgba(127,127,127,0.07);

      color:
        var(--muted-strong);

      border-radius:
        8px;

      padding:
        5px 8px;

      font-size:
        10px;

      cursor:
        pointer;
    }

    .copy-history:hover {
      color:
        var(--accent);

      background:
        var(--accent-soft);
    }

    /* =========================================
       HOW TO PLAY
       ========================================= */

    .how-to-play {
      width:
        100%;

      margin-top:
        14px;

      padding:
        18px;

      border:
        1px solid
        var(--border);

      border-radius:
        20px;

      background:
        var(--surface);

      backdrop-filter:
        blur(18px);

      -webkit-backdrop-filter:
        blur(18px);
    }

    .how-to-header {
      display:
        flex;

      align-items:
        center;

      gap:
        9px;

      margin-bottom:
        15px;
    }

    .how-to-header span {
      font-size:
        18px;
    }

    .how-to-header h2 {
      color:
        var(--text);

      font-size:
        13px;

      font-weight:
        800;

      letter-spacing:
        1px;

      text-transform:
        uppercase;
    }

    .how-to-steps {
      display:
        grid;

      gap:
        9px;
    }

    .how-to-step {
      display:
        flex;

      align-items:
        flex-start;

      gap:
        12px;

      padding:
        11px;

      border-radius:
        12px;

      background:
        rgba(127,127,127,0.035);

      transition:
        background 0.2s ease,
        transform 0.2s ease;
    }

    .how-to-step:hover {
      background:
        rgba(127,127,127,0.06);

      transform:
        translateX(3px);
    }

    .step-number {
      flex-shrink:
        0;

      width:
        28px;

      height:
        28px;

      display:
        grid;

      place-items:
        center;

      border-radius:
        50%;

      background:
        var(--accent-soft);

      color:
        var(--accent);

      font-size:
        11px;

      font-weight:
        800;
    }

    .how-to-step strong {
      display:
        block;

      margin-bottom:
        3px;

      color:
        var(--text);

      font-size:
        12px;
    }

    .how-to-step p {
      color:
        var(--muted);

      font-size:
        11px;

      line-height:
        1.55;
    }

    .how-to-step p strong {
      display:
        inline;

      color:
        var(--accent);

      font-size:
        inherit;
    }

    .how-to-tip {
      margin-top:
        14px;

      padding-top:
        12px;

      border-top:
        1px solid
        var(--border);

      color:
        var(--muted-strong);

      font-size:
        10px;

      line-height:
        1.5;

      text-align:
        center;
    }

    /* =========================================
       FOOTER
       ========================================= */

    .footer {
      margin-top:
        20px;

      margin-bottom:
        8px;

      color:
        var(--muted-strong);

      font-size:
        9px;

      text-align:
        center;

      letter-spacing:
        1px;
    }

    /* =========================================
       ANIMATIONS
       ========================================= */

    @keyframes pulse {
      0%,
      100% {
        opacity:
          0.45;

        transform:
          scale(0.9);
      }

      50% {
        opacity:
          1;

        transform:
          scale(1);
      }
    }

    @keyframes ball-shake {
      0% {
        transform:
          translateX(0)
          rotate(0);
      }

      10% {
        transform:
          translateX(-10px)
          rotate(-2deg);
      }

      20% {
        transform:
          translateX(10px)
          rotate(2deg);
      }

      30% {
        transform:
          translateX(-12px)
          rotate(-3deg);
      }

      40% {
        transform:
          translateX(12px)
          rotate(3deg);
      }

      50% {
        transform:
          translateX(-9px)
          rotate(-2deg);
      }

      60% {
        transform:
          translateX(9px)
          rotate(2deg);
      }

      70% {
        transform:
          translateX(-5px)
          rotate(-1deg);
      }

      80% {
        transform:
          translateX(5px)
          rotate(1deg);
      }

      100% {
        transform:
          translateX(0)
          rotate(0);
      }
    }

    @keyframes answer-reveal {
      0% {
        opacity:
          0;

        transform:
          translateY(16px)
          scale(0.92);
      }

      100% {
        opacity:
          1;

        transform:
          translateY(8px)
          scale(1);
      }
    }

    /* =========================================
       MOBILE
       ========================================= */

    @media (max-width: 600px) {
      body {
        padding:
          15px;

        align-items:
          flex-start;
      }

      .page {
        padding-top:
          5px;
      }

      .header {
        margin-bottom:
          16px;
      }

      .header h1 {
        font-size:
          2.25rem;
      }

      .header p {
        font-size:
          13px;
      }

      .ball-stage {
        width:
          min(320px, 82vw);

        margin-bottom:
          19px;
      }

      .window {
        width:
          72%;

        height:
          59%;
      }

      .answer-area {
        width:
          76%;

        height:
          63%;

        padding:
          22px 14px 5px;
      }

      .answer {
        font-size:
          17px;
      }

      .question-row {
        flex-direction:
          column;
      }

      .question-input {
        min-height:
          52px;
      }

      .ask-button {
        width:
          100%;

        min-height:
          52px;
      }

      .history-list {
        max-height:
          190px;
      }

      .how-to-play {
        padding:
          15px;
      }
    }

    @media (max-width: 380px) {
      .ball-stage {
        width:
          275px;
      }

      .answer {
        font-size:
          15px;
      }
    }

    /* =========================================
       REDUCED MOTION
       ========================================= */

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration:
          0.01ms !important;

        animation-iteration-count:
          1 !important;

        transition-duration:
          0.01ms !important;
      }
    }
  </style>
</head>

<body>

  <main class="page">

    <header class="topbar">

      <div class="brand">
        <span class="brand-dot"></span>
        Mystic Oracle
      </div>

      <div class="top-actions">

        <button
          class="icon-button"
          id="themeButton"
          type="button"
          title="Toggle theme"
          aria-label="Toggle theme"
          aria-pressed="false"
        >
          🌙
        </button>

        <button
          class="icon-button"
          id="soundButton"
          type="button"
          title="Toggle sound"
          aria-label="Toggle sound"
          aria-pressed="true"
        >
          🔊
        </button>

        <button
          class="icon-button"
          id="copyButton"
          type="button"
          title="Copy current answer"
          aria-label="Copy current answer"
        >
          📋
        </button>

      </div>

    </header>

    <section class="header">

      <h1>🎱 Magic 8-Ball</h1>

      <p>
        Ask a yes-or-no question and let the
        universe decide your fate.
      </p>

    </section>

    <!-- =====================================
         MAGIC 8-BALL
         ===================================== -->

    <div
      class="ball-stage"
      id="ballStage"
      role="button"
      tabindex="0"
      aria-label="Shake the Magic 8-Ball"
    >

      <div class="ball-glow"></div>

      <div
        class="ball"
        id="ball"
      >

        <div class="window">

          <div class="window-inner"></div>

          <div class="window-highlight"></div>

          <div class="answer-area">

            <div
              class="answer"
              id="answer"
              aria-live="polite"
            >
              ASK
            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- =====================================
         QUESTION
         ===================================== -->

    <section class="question-card">

      <div class="question-row">

        <input
          id="question"
          class="question-input"
          type="text"
          autocomplete="off"
          maxlength="180"
          placeholder="Ask a yes-or-no question..."
          aria-label="Your question"
        >

        <button
          id="askButton"
          class="ask-button"
          type="button"
        >
          🔮 Ask
        </button>

      </div>

      <div class="hint">
        Press Enter to ask • Click the ball to shake it
      </div>

    </section>

    <div
      class="status"
      id="status"
      aria-live="polite"
    ></div>

    <!-- =====================================
         HISTORY
         ===================================== -->

    <section class="history-panel">

      <div class="history-header">

        <div class="history-title">
          📜 Recent Questions
        </div>

        <button
          id="clearHistory"
          class="clear-button"
          type="button"
        >
          Clear
        </button>

      </div>

      <div
        id="historyList"
        class="history-list"
      ></div>

    </section>

    <!-- =====================================
         HOW TO PLAY
         ===================================== -->

    <section class="how-to-play">

      <div class="how-to-header">

        <span>🎮</span>

        <h2>
          How to Play
        </h2>

      </div>

      <div class="how-to-steps">

        <div class="how-to-step">

          <div class="step-number">
            1
          </div>

          <div>

            <strong>
              Think of a question
            </strong>

            <p>
              Ask something that can be answered
              with <strong>yes</strong>,
              <strong>no</strong>, or uncertainty.
            </p>

          </div>

        </div>

        <div class="how-to-step">

          <div class="step-number">
            2
          </div>

          <div>

            <strong>
              Type your question
            </strong>

            <p>
              Enter your question in the box
              below the Magic 8-Ball.
            </p>

          </div>

        </div>

        <div class="how-to-step">

          <div class="step-number">
            3
          </div>

          <div>

            <strong>
              Shake the ball
            </strong>

            <p>
              Press <strong>Ask</strong>, hit
              <strong>Enter</strong>, or click
              the ball.
            </p>

          </div>

        </div>

        <div class="how-to-step">

          <div class="step-number">
            4
          </div>

          <div>

            <strong>
              Reveal your fate
            </strong>

            <p>
              The Magic 8-Ball will shake and
              reveal its mysterious answer.
            </p>

          </div>

        </div>

      </div>

      <div class="how-to-tip">
        💡 Tip: Yes-or-no questions work best.
      </div>

    </section>

    <footer class="footer">
      MADE WITH ✨ • CLOUD ORACLE • MAGIC 8-BALL
    </footer>

  </main>

  <script>
    (function () {
      "use strict";

      /* =========================================
         ANSWERS
         ========================================= */

      var answers = [
        {
          text: "It is certain",
          emoji: "✨",
          type: "positive"
        },

        {
          text: "It is decidedly so",
          emoji: "🌟",
          type: "positive"
        },

        {
          text: "Without a doubt",
          emoji: "💫",
          type: "positive"
        },

        {
          text: "Yes, definitely",
          emoji: "⭐",
          type: "positive"
        },

        {
          text: "You may rely on it",
          emoji: "🌙",
          type: "positive"
        },

        {
          text: "As I see it, yes",
          emoji: "☀️",
          type: "positive"
        },

        {
          text: "Most likely",
          emoji: "🌈",
          type: "positive"
        },

        {
          text: "Outlook good",
          emoji: "🎯",
          type: "positive"
        },

        {
          text: "Yes",
          emoji: "💎",
          type: "positive"
        },

        {
          text: "Signs point to yes",
          emoji: "🌟",
          type: "positive"
        },

        {
          text: "Reply hazy, try again",
          emoji: "🌀",
          type: "neutral"
        },

        {
          text: "Ask again later",
          emoji: "🌊",
          type: "neutral"
        },

        {
          text: "Better not tell you now",
          emoji: "🌫️",
          type: "neutral"
        },

        {
          text: "Cannot predict now",
          emoji: "🌪️",
          type: "neutral"
        },

        {
          text: "Concentrate and ask again",
          emoji: "💭",
          type: "neutral"
        },

        {
          text: "Don't count on it",
          emoji: "🌧️",
          type: "negative"
        },

        {
          text: "My reply is no",
          emoji: "⚡",
          type: "negative"
        },

        {
          text: "My sources say no",
          emoji: "🌩️",
          type: "negative"
        },

        {
          text: "Outlook not so good",
          emoji: "💀",
          type: "negative"
        },

        {
          text: "Very doubtful",
          emoji: "😱",
          type: "negative"
        }
      ];

      /* =========================================
         DOM
         ========================================= */

      var html =
        document.documentElement;

      var ballStage =
        document.getElementById(
          "ballStage"
        );

      var ball =
        document.getElementById(
          "ball"
        );

      var answer =
        document.getElementById(
          "answer"
        );

      var questionInput =
        document.getElementById(
          "question"
        );

      var askButton =
        document.getElementById(
          "askButton"
        );

      var historyList =
        document.getElementById(
          "historyList"
        );

      var clearHistoryButton =
        document.getElementById(
          "clearHistory"
        );

      var soundButton =
        document.getElementById(
          "soundButton"
        );

      var themeButton =
        document.getElementById(
          "themeButton"
        );

      var copyButton =
        document.getElementById(
          "copyButton"
        );

      var status =
        document.getElementById(
          "status"
        );

      /* =========================================
         STATE
         ========================================= */

      var isShaking =
        false;

      var currentAnswer =
        null;

      var lastAnswerIndex =
        -1;

      var history =
        [];

      var statusTimeout =
        null;

      var soundEnabled =
        true;

      var theme =
        "dark";

      var STORAGE_KEY =
        "magic-8-ball-history";

      var SOUND_KEY =
        "magic-8-ball-sound";

      var THEME_KEY =
        "magic-8-ball-theme";

      /* =========================================
         STORAGE
         ========================================= */

      function loadHistory() {
        try {
          var saved =
            localStorage.getItem(
              STORAGE_KEY
            );

          if (!saved) {
            return [];
          }

          var parsed =
            JSON.parse(saved);

          if (!Array.isArray(parsed)) {
            return [];
          }

          return parsed.slice(0, 20);
        } catch (error) {
          return [];
        }
      }

      function saveHistory() {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(history)
          );
        } catch (error) {}
      }

      function loadSound() {
        try {
          var saved =
            localStorage.getItem(
              SOUND_KEY
            );

          if (saved === null) {
            return true;
          }

          return saved === "true";
        } catch (error) {
          return true;
        }
      }

      function saveSound() {
        try {
          localStorage.setItem(
            SOUND_KEY,
            String(soundEnabled)
          );
        } catch (error) {}
      }

      function loadTheme() {
        try {
          var saved =
            localStorage.getItem(
              THEME_KEY
            );

          return saved === "light"
            ? "light"
            : "dark";
        } catch (error) {
          return "dark";
        }
      }

      function saveTheme() {
        try {
          localStorage.setItem(
            THEME_KEY,
            theme
          );
        } catch (error) {}
      }

      history =
        loadHistory();

      soundEnabled =
        loadSound();

      theme =
        loadTheme();

      /* =========================================
         THEME
         ========================================= */

      function applyTheme() {
        html.setAttribute(
          "data-theme",
          theme
        );

        if (theme === "light") {
          themeButton.textContent =
            "☀️";

          themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
          );

          themeButton.setAttribute(
            "title",
            "Switch to dark mode"
          );

          themeButton.setAttribute(
            "aria-pressed",
            "true"
          );
        } else {
          themeButton.textContent =
            "🌙";

          themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
          );

          themeButton.setAttribute(
            "title",
            "Switch to light mode"
          );

          themeButton.setAttribute(
            "aria-pressed",
            "false"
          );
        }
      }

      themeButton.addEventListener(
        "click",
        function () {
          theme =
            theme === "dark"
              ? "light"
              : "dark";

          applyTheme();
          saveTheme();
        }
      );

      /* =========================================
         AUDIO
         ========================================= */

      var audioContext =
        null;

      function getAudioContext() {
        if (audioContext) {
          return audioContext;
        }

        var AudioContextClass =
          window.AudioContext ||
          window.webkitAudioContext;

        if (!AudioContextClass) {
          return null;
        }

        audioContext =
          new AudioContextClass();

        return audioContext;
      }

      function resumeAudio() {
        var context =
          getAudioContext();

        if (
          context &&
          context.state ===
            "suspended"
        ) {
          return context.resume();
        }

        return Promise.resolve();
      }

      function playTone(
        frequency,
        duration,
        volume,
        waveform
      ) {
        if (!soundEnabled) {
          return;
        }

        var context =
          getAudioContext();

        if (!context) {
          return;
        }

        var oscillator =
          context.createOscillator();

        var gain =
          context.createGain();

        oscillator.type =
          waveform || "sine";

        oscillator.frequency.setValueAtTime(
          frequency,
          context.currentTime
        );

        gain.gain.setValueAtTime(
          volume,
          context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          context.currentTime + duration
        );

        oscillator.connect(
          gain
        );

        gain.connect(
          context.destination
        );

        oscillator.start();

        oscillator.stop(
          context.currentTime +
            duration
        );
      }

      function playShakeSound() {
        playTone(
          110,
          0.08,
          0.045,
          "triangle"
        );

        setTimeout(
          function () {
            playTone(
              145,
              0.08,
              0.04,
              "triangle"
            );
          },
          100
        );

        setTimeout(
          function () {
            playTone(
              90,
              0.12,
              0.035,
              "triangle"
            );
          },
          200
        );
      }

      function playRevealSound(
        type
      ) {
        if (
          type ===
          "positive"
        ) {
          playTone(
            660,
            0.12,
            0.035,
            "sine"
          );

          setTimeout(
            function () {
              playTone(
                880,
                0.18,
                0.03,
                "sine"
              );
            },
            100
          );

          return;
        }

        if (
          type ===
          "negative"
        ) {
          playTone(
            180,
            0.15,
            0.04,
            "sine"
          );

          return;
        }

        playTone(
          360,
          0.14,
          0.025,
          "sine"
        );
      }

      soundButton.textContent =
        soundEnabled
          ? "🔊"
          : "🔇";

      soundButton.setAttribute(
        "aria-pressed",
        String(soundEnabled)
      );

      soundButton.addEventListener(
        "click",
        function () {
          soundEnabled =
            !soundEnabled;

          soundButton.textContent =
            soundEnabled
              ? "🔊"
              : "🔇";

          soundButton.setAttribute(
            "aria-pressed",
            String(soundEnabled)
          );

          saveSound();

          if (
            soundEnabled
          ) {
            resumeAudio()
              .then(
                function () {
                  playTone(
                    700,
                    0.12,
                    0.03,
                    "sine"
                  );
                }
              )
              .catch(
                function () {}
              );

            setStatus(
              "Sound enabled.",
              "success"
            );
          } else {
            setStatus(
              "Sound disabled."
            );
          }
        }
      );

      /* =========================================
         ANSWER RANDOMIZER
         ========================================= */

      function getRandomAnswer() {
        var index;

        do {
          index =
            Math.floor(
              Math.random() *
                answers.length
            );
        } while (
          answers.length > 1 &&
          index ===
            lastAnswerIndex
        );

        lastAnswerIndex =
          index;

        return answers[index];
      }

      /* =========================================
         ANSWER FITTING
         ========================================= */

      /*
       * This does not just shrink the text
       * based on one dimension.
       *
       * It scales the entire answer block
       * based on its actual rendered width
       * and height.
       *
       * That makes every answer fit much more
       * reliably, including long answers.
       */

      function fitAnswer() {
        if (!answer.textContent) {
          return;
        }

        answer.style.transform =
          "translateY(8px) scale(1)";

        var maxWidth =
          answer.parentElement
            .clientWidth;

        var maxHeight =
          answer.parentElement
            .clientHeight;

        var currentWidth =
          answer.scrollWidth;

        var currentHeight =
          answer.scrollHeight;

        if (
          !currentWidth ||
          !currentHeight
        ) {
          return;
        }

        var widthScale =
          maxWidth /
          currentWidth;

        var heightScale =
          maxHeight /
          currentHeight;

        var scale =
          Math.min(
            1,
            widthScale,
            heightScale
          );

        /*
         * Keep a tiny safety margin.
         */
        scale =
          Math.max(
            0.48,
            scale * 0.94
          );

        answer.style.transform =
          "translateY(8px) scale(" +
          scale +
          ")";
      }

      window.addEventListener(
        "resize",
        function () {
          requestAnimationFrame(
            fitAnswer
          );
        }
      );

      if (
        "ResizeObserver" in
        window
      ) {
        var observer =
          new ResizeObserver(
            function () {
              requestAnimationFrame(
                fitAnswer
              );
            }
          );

        observer.observe(
          answer.parentElement
        );
      }

      /* =========================================
         SAFE HTML
         ========================================= */

      function escapeHTML(
        value
      ) {
        return String(value)
          .replace(
            /&/g,
            "&amp;"
          )
          .replace(
            /</g,
            "&lt;"
          )
          .replace(
            />/g,
            "&gt;"
          )
          .replace(
            /"/g,
            "&quot;"
          )
          .replace(
            /'/g,
            "&#039;"
          );
      }

      /* =========================================
         STATUS
         ========================================= */

      function setStatus(
        message,
        type
      ) {
        if (statusTimeout) {
          clearTimeout(
            statusTimeout
          );
        }

        status.textContent =
          message || "";

        status.className =
          "status" +
          (
            type
              ? " " + type
              : ""
          );

        if (message) {
          statusTimeout =
            setTimeout(
              function () {
                status.textContent =
                  "";

                status.className =
                  "status";
              },
              2500
            );
        }
      }

      /* =========================================
         DISPLAY ANSWER
         ========================================= */

      function displayAnswer(
        result
      ) {
        currentAnswer =
          result;

        answer.classList.add(
          "hidden"
        );

        setTimeout(
          function () {
            answer.textContent =
              result.emoji +
              " " +
              result.text;

            answer.style.transform =
              "translateY(8px) scale(1)";

            answer.classList.remove(
              "hidden"
            );

            answer.classList.remove(
              "reveal"
            );

            void answer.offsetWidth;

            answer.classList.add(
              "reveal"
            );

            requestAnimationFrame(
              function () {
                fitAnswer();
              }
            );

            ball.classList.add(
              "answering"
            );

            setTimeout(
              function () {
                ball.classList.remove(
                  "answering"
                );
              },
              500
            );
          },
          180
        );
      }

      /* =========================================
         HISTORY
         ========================================= */

      function addHistory(
        question,
        result
      ) {
        history.unshift({
          id:
            Date.now() +
            Math.random(),

          question:
            question,

          answer:
            result.text,

          emoji:
            result.emoji,

          type:
            result.type
        });

        history =
          history.slice(0, 20);

        saveHistory();

        renderHistory();
      }

      function renderHistory() {
        if (!history.length) {
          historyList.innerHTML =
            '<div class="history-empty">' +
            'Your questions will appear here.' +
            '</div>';

          return;
        }

        var output =
          "";

        for (
          var i = 0;
          i < history.length;
          i++
        ) {
          var item =
            history[i];

          output +=
            '<article class="history-item">' +

              '<div class="history-question">' +
                escapeHTML(
                  item.question
                ) +
              '</div>' +

              '<div class="history-answer-row">' +

                '<div class="history-answer">' +
                  escapeHTML(
                    item.emoji
                  ) +
                  " " +
                  escapeHTML(
                    item.answer
                  ) +
                '</div>' +

                '<button ' +
                  'class="copy-history" ' +
                  'type="button" ' +
                  'data-id="' +
                  escapeHTML(
                    item.id
                  ) +
                '">' +
                  'Copy' +
                '</button>' +

              '</div>' +

            '</article>';
        }

        historyList.innerHTML =
          output;
      }

      /* =========================================
         ASK
         ========================================= */

      function ask() {
        if (isShaking) {
          return;
        }

        var question =
          questionInput.value.trim();

        if (!question) {
          setStatus(
            "Ask a question first.",
            "error"
          );

          questionInput.focus();

          return;
        }

        isShaking =
          true;

        askButton.disabled =
          true;

        questionInput.disabled =
          true;

        answer.classList.remove(
          "hidden"
        );

        answer.classList.remove(
          "reveal"
        );

        answer.textContent =
          "...";

        answer.style.transform =
          "translateY(8px) scale(1)";

        ball.classList.remove(
          "answering"
        );

        ball.classList.add(
          "shaking"
        );

        setStatus(
          "Consulting the universe..."
        );

        resumeAudio()
          .then(
            function () {
              if (
                soundEnabled
              ) {
                playShakeSound();
              }
            }
          )
          .catch(
            function () {}
          );

        setTimeout(
          function () {
            var result =
              getRandomAnswer();

            displayAnswer(
              result
            );

            addHistory(
              question,
              result
            );

            if (
              soundEnabled
            ) {
              playRevealSound(
                result.type
              );
            }

            isShaking =
              false;

            askButton.disabled =
              false;

            questionInput.disabled =
              false;

            questionInput.value =
              "";

            questionInput.focus();

            ball.classList.remove(
              "shaking"
            );

            setStatus(
              "The universe has spoken.",
              "success"
            );
          },
          900
        );
      }

      askButton.addEventListener(
        "click",
        ask
      );

      questionInput.addEventListener(
        "keydown",
        function (event) {
          if (
            event.key ===
            "Enter"
          ) {
            event.preventDefault();
            ask();
          }
        }
      );

      ballStage.addEventListener(
        "click",
        function () {
          if (
            !questionInput.value.trim()
          ) {
            setStatus(
              "Ask your question below first.",
              "error"
            );

            questionInput.focus();

            return;
          }

          ask();
        }
      );

      ballStage.addEventListener(
        "keydown",
        function (event) {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            ballStage.click();
          }
        }
      );

      /* =========================================
         COPY
         ========================================= */

      function copyText(
        text
      ) {
        if (
          !navigator.clipboard ||
          !navigator.clipboard.writeText
        ) {
          setStatus(
            "Clipboard access is unavailable.",
            "error"
          );

          return;
        }

        navigator.clipboard
          .writeText(text)
          .then(
            function () {
              setStatus(
                "Copied to clipboard.",
                "success"
              );
            }
          )
          .catch(
            function () {
              setStatus(
                "Couldn't copy automatically.",
                "error"
              );
            }
          );
      }

      copyButton.addEventListener(
        "click",
        function () {
          if (
            !currentAnswer
          ) {
            setStatus(
              "There is no answer to copy yet.",
              "error"
            );

            return;
          }

          copyText(
            currentAnswer.emoji +
            " " +
            currentAnswer.text
          );
        }
      );

      historyList.addEventListener(
        "click",
        function (event) {
          var button =
            event.target.closest(
              ".copy-history"
            );

          if (!button) {
            return;
          }

          var id =
            Number(
              button.getAttribute(
                "data-id"
              )
            );

          for (
            var i = 0;
            i < history.length;
            i++
          ) {
            if (
              Number(
                history[i].id
              ) === id
            ) {
              copyText(
                history[i].emoji +
                " " +
                history[i].answer
              );

              return;
            }
          }
        }
      );

      /* =========================================
         CLEAR HISTORY
         ========================================= */

      clearHistoryButton.addEventListener(
        "click",
        function () {
          if (!history.length) {
            return;
          }

          history = [];

          saveHistory();
          renderHistory();

          setStatus(
            "History cleared.",
            "success"
          );
        }
      );

      /* =========================================
         KEYBOARD
         ========================================= */

      document.addEventListener(
        "keydown",
        function (event) {
          if (
            event.key ===
            "Escape"
          ) {
            questionInput.blur();
          }
        }
      );

      /* =========================================
         INITIALIZATION
         ========================================= */

      applyTheme();

      renderHistory();

      currentAnswer =
        getRandomAnswer();

      answer.textContent =
        currentAnswer.emoji +
        " " +
        currentAnswer.text;

      requestAnimationFrame(
        function () {
          fitAnswer();
        }
      );

      questionInput.focus();

    })();
  </script>

</body>
</html>`;

    return new Response(html, {
      status: 200,

      headers: {
        "Content-Type":
          "text/html; charset=UTF-8",

        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",

        "Pragma":
          "no-cache",

        "Expires":
          "0",

        "X-Content-Type-Options":
          "nosniff"
      }
    });
  }
};
