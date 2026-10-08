import axios from "axios"

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    try {
        return await axios(reqConfig)
    } catch (err) {
        // organization was deactivated while the user was logged in
        const isInactive = err.response?.status === 403 && err.response?.data?.code === 'ORG_INACTIVE'
        const isLoginCall = url.includes('/api/login')

        if (isInactive && !isLoginCall) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            sessionStorage.setItem('loginNotice', err.response.data.message)
            window.location.href = '/admin/login'
            // never resolves, so the page's own catch block and toast don't run
            return new Promise(() => {})
        }
        throw err
    }
}

export default commonAPI