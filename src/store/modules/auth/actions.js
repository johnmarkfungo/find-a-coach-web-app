let timer;

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZtQdQ7-7Z29Sg-_oqfOYJSgdceKkbvN8';

        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZtQdQ7-7Z29Sg-_oqfOYJSgdceKkbvN8';
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (mode === 'login') {
                const error = new Error(response.message || 'Failed to Login. Please check your credentials!');
                throw error;
            }
            else {
                const error = new Error(response.message || 'Failed to Signup. User may be exists!');
                throw error;
            }

        }

        const expiresIn = responseData.expiresIn * 1000;
        const expirationTime = +new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationTime);

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setUser', {
            userId: responseData.localId,
            token: responseData.idToken,
        });
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 1) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                userId: userId,
                token: token,
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        })
    },
    autoLogout(context){
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
}