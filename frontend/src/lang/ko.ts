import { Language } from './lang'

const ko: Language = {
  header: {
    search: '검색',
    notLoggedin: '로그인되지 않음',
    signin: '로그인',
    signup: '회원가입',
    loggedinAs: '{name}로 로그인됨',
    myProfile: '내 프로필',
    myPosts: '내 글',
    subscribes: '구독함',
    likedPosts: '좋아요 표시한 글',
    storagedPosts: '저장한 글',
    logout: '로그아웃',
    writePost: '글 쓰기',
  },
  footer: {
    privacy: '개인정보',
    terms: '이용약관',
  },
  auth: {
    confirmPassword: '비밀번호 확인',
    email: '이메일',
    password: '비밀번호',
    searchEmail: '이메일 찾기',
    searchPassword: '비밀번호 찾기',
    signin: '로그인',
    signup: '회원가입',
    username: '이름',
    confirmPasswordFail: '비밀번호가 일치하지 않습니다.',
    emailAlreadyTaken: '이미 사용중인 이메일입니다.',
    loginFailed: '이메일이나 비밀번호가 일치하지 않습니다.',
    notValidEmail: '유효하지 않은 이메일입니다.',
    notValidPassword: '8자리 이상, 특수문자를 포함해야 합니다.',
    notValidUsername: '사용할 수 없는 이름입니다.',
  },
  userProfile: {
    loading: '불러오는 중...',
    failedToLoad: '유저를 불러올 수 없습니다.',
    cancel: '취소',
    submit: '저장',
    usernamePlace: '이름',
    profilePlace: '프로필',
    emailPlace: '이메일',
    bioPlace: '상태 메세지',
  },
}

export default ko
