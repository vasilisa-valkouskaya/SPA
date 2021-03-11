const Header = {
    render: (customClass = '') => {
        return `
        <header class="header ${customClass}" id="header">
            <nav class="navigation" id="navigation">
                <ul class="navigation__list">
                    <li><a class="navigation__item" href="#main">
                    <i class="fas fa-home"></i>
                    <span class="nav-text">Main</span>
                    </a></li>
                    <li><a class="navigation__item" href="#entry">
                    <i class="far fa-calendar-plus"></i>
                    <span class="nav-text">Create</span>
                    </a></li>
                    <li><a class="navigation__item" href="#memories">
                    <i class="fas fa-moon"></i>
                    <span class="nav-text">Memories</span>
                    </a></li>
                    <li><a class="navigation__item" href="#stats">
                    <i class="far fa-chart-bar"></i>
                    <span class="nav-text">Stats</span>
                    </a></li>
                </ul>
            </nav>
        <div class="nav-btns">
            <a class="log-in" href="#login">Log in</a>
            <a class="sign-up" href="#signup">Sign up</a>
        </div>
        <div class="user-container hidden">
                <p class="user-name"></p>
                <div class="userimg-container">
                    <img class="user-pic" src="./img/photo-placeholder.png" alt="">
                </div>
                <div class="user-options">
                <a class="log-out" id="log-out-btn" href="#">Log out</a>
                </div>
        </div>
        </header>
        `;
    }
};

const Content = {
    render: (customClass = '') => {
        return `<div class="content ${customClass}" id="content"></div>`
    }
};

const Footer = {
    render: (customClass = '') => {
        return `<footer class="footer ${customClass}">
        <p>2021 Your Dialy Mood App</p>
        </footer>`
    }
}