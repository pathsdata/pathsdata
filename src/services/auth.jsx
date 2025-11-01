export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt_token');
    const authed = localStorage.getItem('pd-authed') === 'true';
    return token && authed;
};

export const setAuth = (token) => {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('pd-authed', 'true');
};

export const clearAuth = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('pd-authed');
    localStorage.removeItem('email');
    localStorage.removeItem('openCloudOption');
    localStorage.removeItem('openUser');
    localStorage.removeItem('family_id');
    localStorage.removeItem('user_org_id');
};