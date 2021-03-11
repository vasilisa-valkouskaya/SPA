const MainPage = {
  id: "main",
  title: "Mood Diary",
  render: (className = "container", ...rest) => {
    return `
        <section class="${className}">
          <h1>Create your own memories every day</h1>
            <div class="intro-container">
            <div class="intro-block">
            <p class="intro-block__title">Select your mood</p>
            <div class="intro-mood-container">
              <img src="./img/mood.png" alt="">
            </div>
            </div>
            <div class="intro-block">
            <p class="intro-block__title">Add notes and photos</p>
            <div class="intro-note-container">
              <img src="./img/note.png" alt="">
            </div>
            </div>
            <div class="intro-block">
            <p class="intro-block__title">Check your stats</p>
            <div class="intro-stats-container">
              <img src="./img/stats.png" alt="">
            </div>
            </div>
    </div>
    <a class="get-started" href="#entry">Get started</a>
        </section>
      `;
  }
};

const Entry = {
  id: "entry",
  title: "Add a new entry",
  render: (className = "container", ...rest) => {
    return `
        <section class="${className}">
          <h1>How are you today?</h1>
          <p class="entry-date" id="entry-date">hello</p>
          <form class="entry-block">
          <div class="mood-container">
          <label class="mood-label">
            <input type="radio" name="mood" value="awesome" checked>
            <span class="mood-img awesome" title="awesome"><span>
          </label>
          <label class="mood-label">
            <input type="radio" name="mood" value="good">
            <span class="mood-img good" title="good"><span>
          </label>
          <label class="mood-label">
            <input type="radio" name="mood" value="meh">
            <span class="mood-img meh" title="meh"><span>
          </label>
          <label class="mood-label">
            <input type="radio" name="mood" value="sad">
            <span class="mood-img sad" title="sad"><span>
          </label>
          <label class="mood-label">
            <input type="radio" name="mood" value="awful">
            <span class="mood-img awful" title="awful"><span>
            </label>
          </div>
          <div class="note-container">
            <label for="entry-title">Add title</label>
            <input class="input" type="text" id="entry-title" placeholder="Title"/>
            </div>
            <div class="note-container">
            <label for="entry-note">Add your note</label>
            <textarea class="note-input" type="text" id="entry-note" placeholder="Add Note"></textarea>
            </div>
            <div class="photo-container">
            <img class="preview-user-img" src="./img/photo-placeholder.png" alt="">
            </div>
            <input type="file" value="upload" class="user-pic-btn">
            <button class="add-entry-btn" id="add-entry-btn">Save</button>
          </form>
        </section>
      `;
  }
};

const Stats = {
  id: "stats",
  title: "Mood stats",
  render: (className = "container", ...rest) => {
    return `
        <section class="${className}">
          <h1>Your stats</h1>
     <div class="chartdiv"></div>
     <div class="columnchart"></div>
        </section>
      `;
  }
};

const Memories = {
  id: "memories",
  title: "Your memories",
  render: (className = "container", ...rest) => {
    return `
        <section class="${className}">
          <h1>Your memories</h1>
          <div class="memo-box"></div>
        </section>
      `;
  }
};

const LogIn = {
  id: "login",
  title: "Here you can login",
  render: (className = "container", ...rest) => {
    return `
        <section class="${className}">
          <h1>Log In</h1>
          <form id="user-form">
            <label for="your-email">Enter your email</label>
            <input class="input" type="email" name="email" placeholder="enter your email" id="user-email">
            <label for="your-password">Enter your password</label>
            <input class="input" type="password" name="password" placeholder="enter your password" id="user-pass">
            <button type="button" id="login-btn">Submit</button>
         </form>
         <p> Don't have an account? <a href="#signup">Sign Up</a></p>
        <p class="logged-in"></p>
        </section>
      `;
  }
};

const SignUp = {
  id: "signup",
  title: "Here you can Sign up",
  render: (className = "container", ...rest) => {
    return `
        <section class="${className}">
          <h1>Sign Up</h1>
          <form id="sign-up-form" class="registration">
          <div class="wr-user-photo">
            <div class="preview-user-container">
              <img class="preview-user-img" src="./img/photo-placeholder.png" alt="">
            </div>
            <input type="file" value="upload" class="user-pic-btn">
            </div>
            <label for="user-name">Enter your name</label>
            <input class="input" type="text" name="name" placeholder="Your name" id="user-name">
            <label for="user-email">Enter your email</label>
            <input class="input" type="email" name="email" placeholder="Your email" id="user-email">
            <label for="user-pass">Enter your password</label>
            <input class="input" type="password" name="password" placeholder="Your password" id="user-pass">
            <button type="button" id="signup-btn">Sign Up</button>
         </form>
         <p class="auth-message"><p>
        </section>
      `;
  }
};

const ErrorPage = {
  id: "error",
  title: "Achtung, warning, kujdes, attenzione, pozornost...",
  render: (className = "container", ...rest) => {
    return `
        <section class="${className}">
          <h1>Ошибка 404</h1>
          <p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>
        </section>
      `;
  }
};