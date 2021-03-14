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
