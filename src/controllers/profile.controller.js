import { profile } from '../views/profile.js';
import { user } from '../models/auth.js';
/* const buttonSaveEditProfile = document.querySelector('.btn-save');
const buttonSavePassword = document.querySelector('.btn-save-password');
 */
export default async () => {
  const currentUserUID = user().uid;
  const userName = user().displayName;
  const userPhoto = user().photoURL;
  const email = user().email;
  const divEdit = document.createElement('div');
  const data = { userName, userPhoto, email };
  divEdit.innerHTML = profile(data);
  console.log('div', divEdit);
  return divEdit;
};
