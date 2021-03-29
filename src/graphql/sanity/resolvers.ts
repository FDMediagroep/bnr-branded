import { getProgramEnrichment } from '../../utils/sanityHelper';

async function programEnrichmentsResolver(parent, req) {
    return await getProgramEnrichment(parent?.Id ?? req?.programId);
}

export const sanityResolvers = {
    Query: {
        programEnrichments: programEnrichmentsResolver,
    },
    Program: {
        ProgramEnrichments: programEnrichmentsResolver,
    },
};
