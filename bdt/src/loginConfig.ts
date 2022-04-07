import { message } from "antd";
import {
    OridStores,
    requestJson
} from "orid";
import { OperatorEntity } from "orid/lib/login/ICurrentUserInfoType";
import { ILoginValueType } from "orid/lib/login/pc/loginPanel";
import { ILoginConfigType } from "orid/lib/login/pc/ui";
import { Token } from "orid/lib/login/token";

const loginTrigger = async (loginValue: ILoginValueType) => {
    const { userAccount, passWord, CAPTCHA } = loginValue;
    let authIdentity = '';
    const timestamp = new Date().getTime();
    const authResult: any = await requestJson('/api/auth/api/Auth/GetIdentity?timestamp=' + timestamp)
    if (authResult.rtnCode !== 0) {
        message.error(`获取验证字符串失败，${authResult.rtnMsg}`)
        authIdentity = '';
        return;
    }
    authIdentity = authResult.data.useridentity;

    const authBody = {
        UserAccount: userAccount,
        PassWord: passWord,
        CheckCode: CAPTCHA,
        Identity: authIdentity
    }
    const authRes: any = await requestJson("/api/auth/api/Auth/CheckLogin", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(authBody)
    });

    if (authRes.rtnCode !== 0) {
        message.error(`登录错误，${authRes.rtnMsg}`)
        return;
    }
    OridStores.authStore.identity = authIdentity;
    OridStores.authStore.isLogined = true;
    OridStores.authStore.token = authRes.data.Token as Token;
    const data = authRes.data.CpUserDto as OperatorEntity;
    OridStores.authStore.currentOperator = data;
    message.success('登录成功');
}

export const loginConfig: ILoginConfigType = {
    title: 'wothink-水务云平台-工作邦',
    onLoginTrigger: loginTrigger,
    verifyCodeConfig: { verifyCodeImgSrc: '/api/Sys/Login/VerifyCode' }
}