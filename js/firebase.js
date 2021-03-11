   // Initialize Firebase
const config = {
        apiKey: "AIzaSyBWs-Ipsa_xttGUFilvVhLrMSNKeUIxI_U",
        authDomain: "my-spa-ce61d.firebaseapp.com",
        projectId: "my-spa-ce61d",
        databaseURL: "https://my-spa-ce61d-default-rtdb.firebaseio.com",
        storageBucket: "my-spa-ce61d.appspot.com",
        messagingSenderId: "568747384657",
        appId: "1:568747384657:web:0ab6fdebdbc801970b3d70"
    };
firebase.initializeApp(config);




// window.addEventListener("hashchange", function () {
//     // get elements
//     const userEmail = document.querySelector('#your-email');
//     const userPassword = document.querySelector('#your-pass');


//     const hashPageName = window.location.hash.slice(1).toLowerCase();
//     // Add login event
//     if (hashPageName === 'login') {
//         const btnLogin = document.querySelector('#login-btn');
//         btnLogin.addEventListener('click', e => {
//             const email = userEmail.value;
//             const pass = userPassword.value;
//             const auth = firebase.auth;
//             // sign in
//             const promise = auth().signInWithEmailAndPassword(email, pass);
//             promise.catch(e => console.log(e.message));
//         });


//         const btnLogOut = document.querySelector('#logout-btn');
//         btnLogOut.addEventListener('click', e => {
//             firebase.auth().signOut();
//         });
//     }

//     if (hashPageName === 'signup') {
//         const btnSignUp = document.querySelector('#signup-btn');
//         // Add signup event
//         btnSignUp.addEventListener('click', e => {
//             const email = userEmail.value;
//             const pass = userPassword.value;
//             const auth = firebase.auth;
//             // sign in
//             const promise = auth().createUserWithEmailAndPassword(email, pass);
//             promise.catch(e => console.log(e.message));
//         });
//     }

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log(user);
//         } else {
//             console.log('not logged in');
//         }
//     });

//     // var user = firebase.auth().currentUser;
//     // var name, email;

//     // if (user != null) {
//     //     name = user.displayName;
//     //     email = user.email;
//     //     console.log(name, email)
//     // }

// });