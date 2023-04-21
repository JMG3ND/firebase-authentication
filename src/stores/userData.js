import { defineStore } from 'pinia';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loading: false,
  }),
  actions: {
    async registerUser(email, password) {
      try {
        this.loading = true;
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        //console.log(user); //Para comprobar los datos del objeto user
        this.userData = { email: user.email, uid: user.uid }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async singInUser(email, password) {
      try {
        this.loadingUser = true;
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async singOutUser() {
      try {
        await signOut(auth);
        this.userData = null;
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };
          }
          resolve(user);
        },
          e => reject(e)
        );
        unsubscribe();
      })
    }
  }
})
