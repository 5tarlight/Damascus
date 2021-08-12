import { Language } from './lang'

const en: Language = {
  header: {
    search: 'search',
    notLoggedin: 'Not Logged in',
    signin: 'Login',
    signup: 'Register',
    loggedinAs: 'Singed in as {name}',
    myProfile: 'My Profile',
    myPosts: 'My Posts',
    subscribes: 'Subscribed',
    likedPosts: 'Liked Posts',
    storagedPosts: 'Kept Posts',
    logout: 'Logout',
  },
  footer: {
    privacy: 'Privacy',
    terms: 'Terms',
  },
  auth: {
    signin: 'Login',
    signup: 'Register',
    email: 'Email',
    confirmPassword: 'Confirm Password',
    password: 'Password',
    searchEmail: 'Forgot Email?',
    searchPassword: 'Forgot Password?',
    username: 'Username',
    confirmPasswordFail: 'Password is not equal.',
    emailAlreadyTaken: 'Already taken email',
    loginFailed: 'Email or password is incorrect.',
    notValidEmail: 'Not valid email',
    notValidPassword:
      'Password must be longer than 8 and include special characters.',
    notValidUsername: 'Invalid username',
  },
}

export default en
