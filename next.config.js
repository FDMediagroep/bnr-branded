module.exports = {
    images: {
        domains: [
            'dev.bnr.nl',
            'acc.bnr.nl',
            'bnr.nl',
            'bnr-external-development.imgix.net',
            'bnr-external-acc.imgix.net',
            'bnr-external-prod.imgix.net',
            'www.omnycontent.com',
            'cdn.sanity.io',
        ],
    },
    env: {
        SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
        SANITY_TOKEN: process.env.SANITY_TOKEN,
        SANITY_DATASET: process.env.SANITY_DATASET,
    },
};
