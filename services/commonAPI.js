import axios from "axios"

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    return await axios(reqConfig)
}

export default commonAPI