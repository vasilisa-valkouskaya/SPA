// List of components (from components.js)
const components = {
    header: Header,
    content: Content,
    footer: Footer,
};
// List of supported routes (from pages.js)
const routes = {
    main: MainPage,
    entry: Entry,
    memories: Memories,
    stats: Stats,
    default: MainPage,
    login: LogIn,
    signup: SignUp,
    error: ErrorPage,
};

/* ----- spa init module --- */
const mySPA = (function () {

    /* ------- begin view -------- */
    function ModuleView() {
        let myModuleContainer = null;
        let menu = null;
        let contentContainer = null;
        let routesObj = null;

        this.init = function (container, routes) {
            myModuleContainer = container;
            routesObj = routes;
            menu = myModuleContainer.querySelector("#header");
            contentContainer = myModuleContainer.querySelector("#content");
        }

        this.renderContent = function (hashPageName) {
            let routeName = "default";

            if (hashPageName.length > 0) {
                routeName = hashPageName in routes ? hashPageName : "error";
            }

            window.document.title = routesObj[routeName].title;
            contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
            this.updateButtons(routesObj[routeName].id);
        }

        this.updateButtons = function (currentPage) {
            const menuLinks = menu.querySelectorAll(".navigation__item");

            for (let i = 0, menuLinksCount = menuLinks.length; i < menuLinksCount; i++) {
                if (currentPage === menuLinks[i].getAttribute("href").slice(1)) {
                    menuLinks[i].classList.add("active");
                } else {
                    menuLinks[i].classList.remove("active");
                }
            }
        }
        this.showMessage = function (signUpMessage) {
            signUpMessage.innerHTML = 'User signed up! Now you can  <a class="log-in" href="#login">Log in</a>';
        }
        this.loggedIn = function (LogInMessage) {
            LogInMessage.innerHTML = 'User successfully logged in';
        }
        this.showUserInfo = function (userShowedName, userShowedImg) {
            const userBtns = document.querySelector('.nav-btns');
            const userInfo = document.querySelector('.user-container');
            const userPicture = document.querySelector('.user-pic');
            const userNickname = document.querySelector('.user-name');
            userNickname.innerHTML = `Welcome, ${userShowedName}`;
            userPicture.src = userShowedImg;
            userBtns.classList.add('hidden');
            userInfo.classList.remove('hidden');
        }
        this.showDate = function (realDate, cardName) {
            realDate.innerHTML = cardName;
        }
        this.emptyMemoriesInfo = function (memCont) {
            let emptyMessage = document.createElement('p');
            emptyMessage.innerHTML = 'No memories to show';
            memCont.append(emptyMessage);
        }
        this.showMemories = function (data, memCont) {
            let memoryCard = document.createElement('div');
            let moodClass;
            let photoValue;
            if (data.val().mood === 'awesome') {
                moodClass = 'awesome';
            } else if (data.val().mood === 'good') {
                moodClass = 'good';
            } else if (data.val().mood === 'meh') {
                moodClass = 'meh';
            } else if (data.val().mood === 'sad') {
                moodClass = 'sad';
            } else if (data.val().mood === 'awful') {
                moodClass = 'awful';
            }
            memoryCard.classList.add('card');

            !data.val().photo ? photoValue = './img/photo-placeholder.png' : photoValue = data.val().photo;

            memoryCard.innerHTML = `
            <div class="card__header ${moodClass}">
            <p class="card__date">${data.val().date}</p>
            <p class="card__title">${data.val().title}</p>
            </div>
            <div class="card__body">
            <div class="mood-indicator">
            <div class="mood-img ${moodClass}"></div>
            <p class="mood-text">${data.val().mood}</p>
            </div>
                
                <p class="card__user-note">${data.val().note}</p>
                <div class="card__img-container">
                    <img class="card__user-img" src="${photoValue}">
                </div>
            </div>
            `

            memCont.prepend(memoryCard);
        }
        this.hideUser = function () {
            const userBtns = document.querySelector('.nav-btns');
            const userInfo = document.querySelector('.user-container');
            userBtns.classList.remove('hidden');
            userInfo.classList.add('hidden');

        }

        this.buildChart = function (awesomeMood, goodMood, mehMood, sadMood, awfulMood) {

            am4core.useTheme(am4themes_animated);
            // график со  смайлами
            let goodValue = awesomeMood + goodMood;
            let badValue = sadMood + awfulMood;
            let iconPath;
            if (goodValue >= badValue) {
                iconPath = "M0 256c0 137 111 248 248 248s248-111 248-248S385 8 248 8 0 119 0 256zm200-48c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm158.5 16.5c-14.8-13.2-46.2-13.2-61 0L288 233c-8.3 7.4-21.6.4-19.8-10.8 4-25.2 34.2-42.1 59.9-42.1S384 197 388 222.2c1.7 11.1-11.4 18.3-19.8 10.8l-9.7-8.5zM157.8 325.8C180.2 352.7 213 368 248 368s67.8-15.4 90.2-42.2c13.6-16.2 38.1 4.2 24.6 20.5C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.5-16.3 11.2-36.7 24.6-20.4z"
            } else {
                iconPath = "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm170.2 218.2C315.8 367.4 282.9 352 248 352s-67.8 15.4-90.2 42.2c-13.5 16.3-38.1-4.2-24.6-20.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c13.6 16.2-11 36.7-24.5 20.4z"
            }


            let chart = am4core.create("chartdiv", am4charts.SlicedChart);
            chart.hiddenState.properties.opacity = 0;

            let title = chart.titles.create();
            title.text = "Mood Indicator";
            title.fontSize = 25;
            title.marginBottom = 30;


            chart.data = [{
                    "mood": "Awesome",
                    "value": awesomeMood,
                }, {
                    "mood": "Good",
                    "value": goodMood,
                },
                {
                    "mood": "Meh",
                    "value": mehMood,
                },
                {
                    "mood": "Sad",
                    "value": sadMood,
                },
                {
                    "mood": "Awful",
                    "value": awfulMood,
                }

            ];

            var series = chart.series.push(new am4charts.PictorialStackedSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "mood";
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;


            series.maskSprite.path = iconPath;
            series.labelsContainer.width = 100;

            chart.legend = new am4charts.Legend();
            chart.legend.position = "top";
            chart.legend.paddingBottom = 40;
            let marker = chart.legend.markers.template.children.getIndex(0);
            chart.legend.markers.template.width = 30;
            chart.legend.markers.template.height = 30;
            marker.cornerRadius(20, 20, 20, 20);


            // график с колонками
            let columnChart = am4core.create("columnchart", am4charts.XYChart);

            let columnTitle = columnChart.titles.create();
            columnTitle.text = "Mood Chart";
            columnTitle.fontSize = 25;
            columnTitle.marginBottom = 30;

            columnChart.data = [{
                    "mood": "Awesome",
                    "value": awesomeMood,
                }, {
                    "mood": "Good",
                    "value": goodMood,
                },
                {
                    "mood": "Meh",
                    "value": mehMood,
                },
                {
                    "mood": "Sad",
                    "value": sadMood,
                },
                {
                    "mood": "Awful",
                    "value": awfulMood,
                }

            ];

            columnChart.padding(40, 40, 40, 40);

            var categoryAxis = columnChart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.dataFields.category = "mood";
            categoryAxis.renderer.minGridDistance = 60;
            categoryAxis.renderer.grid.template.disabled = true;

            var valueAxis = columnChart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.extraMax = 1;

            var series = columnChart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryX = "mood";
            series.dataFields.valueY = "value";
            series.tooltipText = "{valueY.value}"
            series.columns.template.strokeOpacity = 0;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.cornerRadiusTopLeft = 10;

            var labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.verticalCenter = "bottom";
            labelBullet.label.dy = -10;
            labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";


            //    настройка цвета колонок
            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });


            categoryAxis.sortBySeries = series;

            am4core.options.autoDispose = true;
        }
    };
    /* -------- end view --------- */
    /* ------- begin model ------- */
    function ModuleModel() {
        let myModuleView = null;

        this.init = function (view) {
            myModuleView = view;
        }
        // изменение контента в зависимости от хэша
        this.updateState = function () {

            const hashPageName = window.location.hash.slice(1).toLowerCase();
            myModuleView.renderContent(hashPageName);
            this.showInnerContent(hashPageName);
        }
        // логика для регистрации
        this.signUp = function (userName, userEmail, userPassword) {
            const auth = firebase.auth();
            const database = firebase.database();
            const promise = auth.createUserWithEmailAndPassword(userEmail, userPassword);
            const file = document.querySelector('input[type=file]').files[0];
            promise.then(e => {
                let userId = firebase.auth().currentUser.uid;
                if (!file) {
                    database.ref('/users/' + userId).child('/user_info/').set({
                        user_name: userName,
                        user_email: userEmail,
                    });
                } else {
                    let storageRef = firebase.storage().ref('card-photos/' + file.name);
                    storageRef.put(file).then((uploadTask) => {
                        uploadTask.ref.getDownloadURL().then((downloadURL) => {
                            database.ref('/users/' + userId).child('/user_info/').set({
                                user_name: userName,
                                user_email: userEmail,
                                user_photo: downloadURL
                            });
                        });
                    });
                }
            })
            promise.catch(e => console.log(e.message));
        }
        // показывать контент в зависимости от страницы
        this.showInnerContent = function (hashPageName) {
            firebase.auth().onAuthStateChanged((user) => {

                if (hashPageName === 'entry') {
                    let date = new Date();
                    let formatter = new Intl.DateTimeFormat("en", {
                        month: "long",
                    });
                    let cardName = date.getDate() + ' ' + formatter.format(date) + ' ' + date.getFullYear();
                    let realDate = document.querySelector('#entry-date');

                    myModuleView.showDate(realDate, cardName);
                } else if (hashPageName === 'memories') {
                    let memCont = document.querySelector('.memo-box');

                    if (user) {
                        let userId = firebase.auth().currentUser.uid;
                        // показывать карточки с воспоминаниями пользователя
                        this.showUserMemories(userId, memCont);
                    } else {
                        this.emptyMemories(memCont);
                    }

                } else if (hashPageName === 'stats') {
                    if (user) {
                        let userId = firebase.auth().currentUser.uid;
                        // показывать карточки с воспоминаниями пользователя
                        this.createChart(userId);

                    }

                }
            });
        }

        this.logIn = function (userEmail, userPassword) {
            const auth = firebase.auth;
            const promise = auth().signInWithEmailAndPassword(userEmail, userPassword);
        }
        this.showUser = function (userShowedName, userShowedImg) {
            myModuleView.showUserInfo(userShowedName, userShowedImg);
        }
        this.logOut = function () {
            firebase.auth().signOut();
            myModuleView.hideUser();
        }
        this.showSignUpMessage = function (signUpMessage) {
            myModuleView.showMessage(signUpMessage);
        }
        this.showLogInMessage = function (LogInMessage) {
            myModuleView.loggedIn(LogInMessage);
        }
        // показывать миниатюру фото при загрузке
        this.previewUserPhoto = function () {
            let file = document.querySelector('input[type=file]').files[0];
            let preview = document.querySelector('.preview-user-img');
            let reader = new FileReader();
            reader.onloadend = function () {
                preview.src = reader.result;
            }

            if (file) {
                reader.readAsDataURL(file);
            }

        }

        this.showUserMemories = function (userId, memCont) {
            let memArr = [];
            let memoriesInfo = firebase.database().ref('/users/' + userId + '/cards/');
            memoriesInfo.on('child_added', (data) => {
                memArr.push(data.key);
                myModuleView.showMemories(data, memCont);
            });

        }
        this.createChart = function (userId) {
            let moodArr = [];
            let memoriesInfo = firebase.database().ref('/users/' + userId + '/cards/');
            memoriesInfo.on('child_added', (data) => {
                moodArr.push(data.val().mood);
                let awesomeMood = moodArr.filter(word => word === 'awesome');
                let goodMood = moodArr.filter(word => word === 'good');
                let mehMood = moodArr.filter(word => word === 'meh');
                let sadMood = moodArr.filter(word => word === 'sad');
                let awfulMood = moodArr.filter(word => word === 'awful');
                myModuleView.buildChart(awesomeMood.length, goodMood.length, mehMood.length, sadMood.length, awfulMood.length);
            });
        }

        this.emptyMemories = function (memCont) {
            myModuleView.emptyMemoriesInfo(memCont);
        }

        // сохраняем в базу данные о настроении из формы
        this.saveData = function (userMood, noteTitle, userNote, userFile) {
            let currentDate = document.querySelector('#entry-date').innerHTML;
            let userId = firebase.auth().currentUser.uid;
            let info;
            let cardInfo = firebase.database().ref('/users/' + userId).child('/cards/');

            if (!userFile) {
                info = {
                    date: currentDate,
                    title: noteTitle,
                    mood: userMood,
                    note: userNote,
                }
                cardInfo.push().set(info);
            } else {
                let storageRef = firebase.storage().ref('card_photo/' + userFile.name);
                storageRef.put(userFile).then((uploadTask) => {
                    uploadTask.ref.getDownloadURL().then((downloadURL) => {
                        info = {
                            date: currentDate,
                            title: noteTitle,
                            mood: userMood,
                            note: userNote,
                            photo: downloadURL,
                        }
                        cardInfo.push().set(info);
                    });
                });
            }
        }
    }

    /* -------- end model -------- */
    /* ----- begin controller ---- */
    function ModuleController() {
        let myModuleContainer = null;
        let myModuleModel = null;
        const that = this;

        this.init = function (container, model) {
            myModuleContainer = container;
            myModuleModel = model;

            // вешаем слушателей на событие hashchange и кликам по пунктам меню
            window.addEventListener("hashchange", this.updateState);

            this.updateState(); //первая отрисовка
            // вешаем слушатель на кнопки, по которым будем кликать
            document.addEventListener('click', function (event) {
                let target = event.target;
                switch (target.id) {
                    case 'signup-btn':
                        that.defaultController(event);
                        that.signUp();
                        break;
                    case 'login-btn':
                        that.defaultController(event);
                        that.logIn();
                        break;
                    case 'log-out-btn':
                        that.defaultController(event);
                        that.logOut();
                        break;
                    case 'user-pic-btn':
                        that.previewPhoto();
                        break;
                    case 'add-entry-btn':
                        that.defaultController(event);
                        that.saveData();
                        location.href = '#stats';
                        break;
                    default:
                        return;
                }
            });

            // проверка совершен ли вход  в аккаунт
            firebase.auth().onAuthStateChanged(() => {
                let user = firebase.auth().currentUser;
                if (user) {
                    let userId = firebase.auth().currentUser.uid;
                    // показывать информацию о пользователе
                    firebase.database().ref('/users/' + userId).child('/user_info/').once('value').then((snapshot) => {
                        let userShowedName = (snapshot.val() && snapshot.val().user_name) || 'User';
                        let userShowedImg = (snapshot.val() && snapshot.val().user_photo) || './img/photo-placeholder.png';
                        myModuleModel.showUser(userShowedName, userShowedImg);
                    });
                }
            });

        }

        this.defaultController = function (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // показывать миниатюру фото при его загрузке
        this.previewPhoto = function () {
            let uploadUserImg = document.querySelector('.user-pic-btn');
            uploadUserImg.addEventListener('change', e => {
                myModuleModel.previewUserPhoto();
            });
        }

        this.signUp = function () {
            const userName = document.getElementById('user-name');
            const userEmail = document.getElementById('user-email');
            const userPassword = document.getElementById('user-pass');
            const signUpMessage = document.querySelector('.auth-message');

            if (userEmail && userPassword) {
                myModuleModel.signUp(
                    userName.value,
                    userEmail.value,
                    userPassword.value
                );
                myModuleModel.showSignUpMessage(signUpMessage);

                userName.value = '';
                userEmail.value = '';
                userPassword.value = '';
            }
        }
        this.logIn = function () {
            const userEmail = document.getElementById('user-email');
            const userPassword = document.getElementById('user-pass');
            const LogInMessage = document.querySelector('.logged-in');
            if (userEmail && userPassword) {
                myModuleModel.logIn(
                    userEmail.value,
                    userPassword.value
                );
                myModuleModel.showLogInMessage(LogInMessage);

                userEmail.value = '';
                userPassword.value = '';

            }
        }
        this.logOut = function () {
            myModuleModel.logOut();
        }

        this.saveData = function () {
            const userMood = document.querySelector('input[type="radio"]:checked');
            const noteTitle = document.querySelector('#entry-title');
            const userNote = document.querySelector('#entry-note');
            const userFile = document.querySelector('input[type=file]').files[0];
            myModuleModel.saveData(userMood.value, noteTitle.value, userNote.value, userFile);
        }

        this.updateState = function () {
            myModuleModel.updateState();
        }

    };
    /* ------ end controller ----- */

    return {
        init: function ({
            container,
            routes,
            components
        }) {
            this.renderComponents(container, components);

            const view = new ModuleView();
            const model = new ModuleModel();
            const controller = new ModuleController();

            //связываем части модуля
            view.init(document.getElementById(container), routes);
            model.init(view);
            controller.init(document.getElementById(container), model);
        },

        renderComponents: function (container, components) {
            const root = document.getElementById(container);
            const componentsList = Object.keys(components);
            for (let item of componentsList) {
                root.innerHTML += components[item].render("component");
            }
        },
    };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init({
    container: "spa",
    routes: routes,
    components: components
}));