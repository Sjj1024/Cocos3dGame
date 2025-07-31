// fetch封装

// 基础配置
const BASE_URL = ``
const TIMEOUT = 5000

// 请求封装
const http = async (url: string, options: RequestInit = {}): Promise<any> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

    // 请求前置处理（请求拦截器）
    const finalOptions: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        signal: controller.signal,
    }

    try {
        const response = await fetch(BASE_URL + url, finalOptions)
        clearTimeout(timeoutId)
        const data = await response.json()
        // 响应拦截器逻辑
        if (data.code === 401) {
            if (window.location.href.indexOf('pad') !== -1) {
                return Promise.resolve({
                    code: 200,
                    data: { msg: '登录无效' },
                })
            } else {
                console.log('登录无效')
                return Promise.reject({
                    code: 401,
                    data: { msg: '登录无效' },
                })
            }
        } else if (data.code >= 400) {
            console.log('请求失败')
        }

        return Promise.resolve(data)
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.log('请求超时')
        } else {
            console.error('请求失败:', error)
            console.log('请求失败')
        }
        return Promise.reject(error)
    }
}

export default http
