export function getToken() {
    return sessionStorage.getItem("token")
}
export function setToken(token: string) {
    return sessionStorage.setItem("token", token)
}
export function setUserId(userId: string) {
    return sessionStorage.setItem("userId", userId)
}
export function getUserId() {
    return sessionStorage.getItem("userId")
}
export function removeUserId() {
    return sessionStorage.remove("userId");
}
export function clearSession() {
    return sessionStorage.clear()
}