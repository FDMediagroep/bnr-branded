import cookie from 'cookie';

async function handler(req, res) {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('userinfo', null, {
            path: '/',
            httpOnly: true,
            maxAge: -1,
        })
    );
    res.end();
}

export default handler;
