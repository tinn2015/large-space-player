import { observable } from 'mobx'

const userStore = observable({
    userInfo: null,
    phoneNumber: '',
    userProfile: {
        nickname: '',
        gender: '',
        height: '',
        weight: '',
        birthday: '',
        preferredPosition: ''
    },

    setUserInfo(userInfo) {
        this.userInfo = userInfo
        // 如果用户信息中有昵称，设置为默认昵称
        if (userInfo && userInfo.nickName) {
            this.userProfile.nickname = userInfo.nickName
        }
    },

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber
    },

    updateUserProfile(profile) {
        this.userProfile = { ...this.userProfile, ...profile }
    },

    clearUserInfo() {
        this.userInfo = null
        this.phoneNumber = ''
    }
})

export default userStore 