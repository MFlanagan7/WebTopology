export const formSignIn = document.getElementById('form-signin');
export const buttonSignOut = document.getElementById('button-signout');
export const buttonInitConfig = document.getElementById('button-init-config');

export const root = document.getElementById('root');

// test user
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
export const testUserLoginLink = document.getElementById('test-account-link');

testUserLoginLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
        await signInWithEmailAndPassword(auth, '1@test.com', '111111');
      } catch (e) {
        alert(`Sign in Error\n${e}`);
      }
})