const auth = {
    login(userInfo) {
        userInfo.password = '';
        localStorage.setItem('auth', JSON.stringify(userInfo));
    },

    getUserProfile() {
        const authData = JSON.parse(localStorage.getItem('auth'));
        return authData.user;
    },

    getAccessToken() {
        return JSON.parse(localStorage.getItem('auth')).access_token;    
    },

    logout() {
        if (localStorage.getItem('auth'))
            localStorage.removeItem('auth');
    },

    isLogin() {
        const authData = localStorage.getItem('auth');
        return authData && JSON.parse(authData).access_token;
    }
}

export { auth };