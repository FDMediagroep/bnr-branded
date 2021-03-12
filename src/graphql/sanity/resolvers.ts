import { getProgramEnrichment } from '../../utils/sanityHelper';

async function ProgramEnrichmentsResolver(_, req) {
    console.log(_?.Id ?? req?.programId);
    return await getProgramEnrichment(_?.Id ?? req?.programId);
}

export const sanityResolvers = {
    Query: {
        programEnrichments: ProgramEnrichmentsResolver,
    },
    Program: {
        ProgramEnrichments: ProgramEnrichmentsResolver,
    },
};
