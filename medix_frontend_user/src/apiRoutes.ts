
const host = 'http://localhost:4000/api';

// route to check if the email already exists or not
export const emailValidator =  `${host}/user/verify_email`

//route to register new user
export const customerRegister = `${host}/user/user_register`;

//route to login into user account
export const customerLogin = `${host}/auth/login`;