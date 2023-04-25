import { defineStore } from 'pinia';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  //Valores que define los datos de usuario y algunos comportamientos de carga en las vistas
  const userData = ref(null);
  const loadingUser = ref(false);
  const loading = ref(false);

  //Función que registra al usuario en la base de datos
  const registerUser = async (email, password) => {
    try {
      loading.value = true;
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      userData.value = { email: user.email, uid: user.uid };
    } catch (error) {
      console.log(error);
      alert('usuario o contraseña incorrecto');
    } finally {
      loading.value = false;
    }
  }
  //Función que inicia sesión con email y contraseña
  const singInUser = async (email, password) => {
    try {
      loadingUser.value = true;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      userData.value = { email: user.email, uid: user.uid }
    } catch (error) {
      console.log(error);
    } finally {
      loadingUser.value = false;
    }
  }
  //Función que cierra sesión
  const singOutUser = async () => {
    try {
      await signOut(auth);
      userData.value = null;
    } catch (error) {
      console.log(error);
    }
  }
  //Función que retora la sesión activa del usuario actual
  const currentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          userData.value = { email: user.email, uid: user.uid };
        }
        resolve(user);
      },
        e => reject(e)
      );
      unsubscribe();
    })
  }
  //Instancia para las autenticaciones con google
  const provider = new GoogleAuthProvider();
  const signInWithRedirectmet = () => {
    signInWithRedirect(auth, provider);
  }

  return {
    userData,
    loadingUser,
    loading,
    registerUser,
    singInUser,
    singOutUser,
    currentUser,
    signInWithRedirectmet,
  }
});
