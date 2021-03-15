const baseUrl =
    'https://z1s06059b7.execute-api.eu-west-1.amazonaws.com/Implementation';

export function storeProfile(accessToken: string, profileData) {
    const postRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            access_token: accessToken,
            profile: profileData,
        }),
    };
    fetch(baseUrl + '/update_profile', postRequest)
        .then((res) => res.json())
        .then((data) => {
            console.log('STORING PROFILE DATA', data);
        });
}

export async function getToken(refreshToken: string) {
    const formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', process.env.COGNITO_CLIENT_ID);
    formData.append('refresh_token', refreshToken);
    await fetch(`https://${process.env.COGNITO_DOMAIN}`, {
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    }).then((res) => res.json());
}
