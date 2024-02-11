// Убедитесь, что Firebase был инициализирован до этого момента
// Импортируем необходимые функции из SDK
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

// Функция для проверки аутентификации пользователя и анонимного входа
export function checkAuthAndSignInAnonymously() {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Пользователь уже авторизован, можно использовать объект user
      console.log('Пользователь авторизован, UID:', user.uid);
    } else {
      // Пользователь не авторизован, выполняем анонимный вход
      signInAnonymously(auth)
        .then((result) => {
          // Анонимный вход выполнен успешно
          console.log('Анонимный вход выполнен, UID:', result.user.uid);
        })
        .catch((error) => {
          // Обработка ошибок анонимного входа
          console.error('Ошибка анонимного входа:', error);
        });
    }
  });
}
