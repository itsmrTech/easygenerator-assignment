export const redirectToLogin = () => {
    if(window.location.pathname !== '/signin')
    window.location.href = '/signin';
}