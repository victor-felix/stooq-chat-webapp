// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { MessagesState } from 'app/pages/ChatPage/Features/Messages/slice/types';
import { RoomsState } from 'app/pages/ChatPage/Features/Rooms/slice/types';
import { AuthenticationState } from 'app/pages/LoginPage/Features/LoginForm/slice/types';
import { RegisterState } from 'app/pages/RegisterPage/Features/RegisterForm/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  authentication: AuthenticationState;
  register: RegisterState;
  messages: MessagesState;
  rooms: RoomsState;
}
