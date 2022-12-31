const env = process.env.NODE_ENV; // dev or prod
require("dotenv").config();

const dev = {
    url:process.env.URL_DEV,

};

const prod = {
    url:process.env.URL_PROD,

}

const config = {
    dev,
    prod
}

const defaults = {
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    publicKey: 
    `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoSFmTbcW2b3LLur3ML2+
KNuc5PJ4dsi4s774zteo6fx88ZXq3PIHNdYfhO5+kHlf0C65beACxuUOGv2Q4F7M
UGwP0kkLCzQ1f1vuFta8SvqSdMVvqIYCeRVX6ma9Fvjprmo0i6mlrRfmKlFVZJrV
IaP3GVYKV2MYMI+3PG3Ww/VpUcbwmQhg/NQcSaUqf8PQeya1HhlI3i/RqZvWjH+D
6PLZ8kyb3ZMuE/Xuat0ocFVAkpCfk1dNqBqjL3n8GyAHxHZ9W10MlmTXY7apT8Rx
aU1u2m95KlGevGap6dcKrMyvab4gBF7zejE/lweP6ugbmKOxqbbZLjyFQpoKXEr5
IQIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChIWZNtxbZvcsu
6vcwvb4o25zk8nh2yLizvvjO16jp/Hzxlerc8gc11h+E7n6QeV/QLrlt4ALG5Q4a
/ZDgXsxQbA/SSQsLNDV/W+4W1rxK+pJ0xW+ohgJ5FVfqZr0W+OmuajSLqaWtF+Yq
UVVkmtUho/cZVgpXYxgwj7c8bdbD9WlRxvCZCGD81BxJpSp/w9B7JrUeGUjeL9Gp
m9aMf4Po8tnyTJvdky4T9e5q3ShwVUCSkJ+TV02oGqMvefwbIAfEdn1bXQyWZNdj
tqlPxHFpTW7ab3kqUZ68Zqnp1wqszK9pviAEXvN6MT+XB4/q6BuYo7GpttkuPIVC
mgpcSvkhAgMBAAECggEAANagpqTePJHNPdhBIwLJu4KxBUvxroSK2XyT5NegbF9A
8yzZhP7JZNFRZqqrA+ttwTKNCnJQ8WH9ucw59cDohT6asnho000ZPilnSr0hS66U
FoF0fEb+Ok0PIQwZzcXLyXmJ/nQKhaULMIsty5E2rK8iuQIGmb/NP2twA6N6q5hY
LUHuS9ZnOeHOYtRcKve5QqRS8kSid8olJMVRPScqIqxHqYZ04fewLS+zZuyfQEZA
igMf9b4wqpDUdugIgYUuLUunJgkeWTaZ0oeSAUcTZHV2rcgqXEsLp+re4H8Ue2BZ
u3iHjr9Iowj+WcTvyyfBTsJh2Eb4XDVGjomTJOoUJQKBgQDgFPeNoZZorh/k8cA4
Mam4WPDll7tCn322Frk4XsgVovzpSaGfxUFszhSsAhB2Xswubp2Y8XbjBX0/2tnd
zj2imb5RN1Hs3IHpttyoYRpDHcmP49ZpqJ5H7/WKWma60Saao56ySBJkkescJNDa
uUhu420rHvUCxEjNxrZ5rYtwWwKBgQC4FPDA+2yqxIt5rmtUZ7VTKsfDEZFFvRwC
3Nya0pMt1Qn1Tz3SfH0wecXKktKR3Vtqh0xiUi+v4s4puNmdgmwBtnvHxsCDUxLy
1Rip9hyKO9uadlbjnqye5ZJPVOnybKqBA3x/i57ZvcJ4dQA7gYpOeuN9yfUo3FY9
QTuj1Z51MwKBgFMpNN5JM8rRpGCRH6c7NyOFTpHGh+anzj2/nSnAcz0kafwiKWtk
B23b5WwYsAdeEyTARJi4NEj4ho0mKWjZ26H2sNzvTOY8x7H2/Vk4AEkcSuutwKsh
uuwzr8qS1kFK0areQk0j1j+gr8KYHzKtRKZynNc9++v08Jf9wUbTE0a1AoGAZICi
VWqwEKgQUlYFKWcZ25dey0TbIM037uQw2aKgUoSe1Dz4TuRC4WWKtKfmqVbGo2nN
LV0bxha5YpQW0+UyHNlJyW/dCZYgoU3xElJZkKtPoYx8sfee3X4PnJqKxB3KFXgW
z/gluVHeTC/s+ZAnN+PmMnZCEJYDy5vC+RcXVXsCgYEAzgVUVNQruJs/La6yv8lz
87v512v9h0m7RtS/9rii15IQLNDoMFJB6ANR4erl+g3GvUQokl/skXMZwr/FKBUw
xVxvurudvXnfhIzPNAj1Q0+7WjDqxA5ab/0x/cVeRg9HluwXr24pg3lRZvRPtW6z
gSV3rmFa4eBE3nGlJHwEULw=
-----END PRIVATE KEY-----`
    

}

module.exports = {config, defaults};