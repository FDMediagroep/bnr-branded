import { getProgramEnrichment } from '../../utils/sanityHelper';

async function programEnrichmentsResolver(_, req) {
    return await getProgramEnrichment(_?.Id ?? req?.programId);
}

export const sanityResolvers = {
    Query: {
        programEnrichments: programEnrichmentsResolver,
    },
    Program: {
        ProgramEnrichments: programEnrichmentsResolver,
    },
};
