const ProgramSchema = `
type Program {
    """
    Below field is convenient but also causes N+1 problem.
    Because if you query this field it will perform an extra data-fetch using
    data needed from the current fetch, usually the ID.
    """
    ProgramEnrichments: [ProgramEnrichment]
}`;
const ProgramSponsorSchema = `
"""
Description of a sponsor of a program
"""
type ProgramSponsor {
    """URL to sponsor"""
    url: String
    """Name of sponsor"""
    name: String
    """Logo of sponsor"""
    logo: String
}`;

const ProgramEnrichmentSchema = `
"""
Program enrichment from Sanity CMS.
"""
type ProgramEnrichment {
    """Program color"""
    color: String
    """Program sponsors"""
    Sponsors: [ProgramSponsor]
}`;

/**
 * For GraphQL `type Query`
 */
const ProgramEnrichmentsQuery = `
 """
 Get the program enrichment from Sanity
 """
 programEnrichments(programId: String!): [ProgramEnrichment]
 `;

/**
 * typeDefs
 */
export const sanityTypeDefs = `
${ProgramSponsorSchema}
${ProgramEnrichmentSchema}
${ProgramSchema}

type Query {
    ${ProgramEnrichmentsQuery}
}
 `;
