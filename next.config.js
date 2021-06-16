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
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(graphql|gql|graphqls)$/,
            use: ['graphql-tag/loader'],
        });

        return config;
    },
};
