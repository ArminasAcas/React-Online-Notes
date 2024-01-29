export const tokenUtils = {
    getToken: () => {
        return localStorage.getItem("userToken");
    },

    removeToken: () => {
        localStorage.removeItem("userToken");
    },
    
    setToken: (token:any, expiresIn:any) => {
        localStorage.setItem("userToken", JSON.stringify({token, expiresIn}));
    }
}

