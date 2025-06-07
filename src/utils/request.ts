import Taro from '@tarojs/taro'

interface RequestOptions {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: any
    header?: any
}

const BASE_URL = 'https://1qkvn8653670.vicp.fun/admin'

export const request = async (options: RequestOptions) => {
    const { url, method = 'GET', data, header = {} } = options

    try {
        const token = Taro.getStorageSync('token')
        const defaultHeader = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }

        const response = await Taro.request({
            url: `${BASE_URL}${url}`,
            method,
            data,
            header: {
                ...defaultHeader,
                ...header
            }
        })

        if (response.statusCode >= 200 && response.statusCode < 300) {
            return response.data
        } else {
            throw new Error(response.data.message || '请求失败')
        }
    } catch (error) {
        console.error('请求错误:', error)
        throw error
    }
}

// 登录接口
export const login = async (code: string) => {
    return request({
        url: '/token/getToken',
        method: 'POST',
        data: {
            jsCode: code,
            clientId: 'wccc841275405911f099bf00163e04e71b',
            clientSecret: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
            grantType: 'wechat'
        }
    })
}

// 获取用户信息接口
export const getUserInfo = async () => {
    return request({
        url: '/api/user/info',
        method: 'GET'
    })
}
