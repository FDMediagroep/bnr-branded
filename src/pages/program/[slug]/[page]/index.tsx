import { GetStaticPaths } from 'next';
import { getPrograms } from '../../../../utils/omnyHelper';
import Page, { getStaticProps } from '../index';

export const getStaticPaths: GetStaticPaths = async () => {
    const programs = await getPrograms(process.env.OMNY_ORGID);
    const paths = programs.Programs.map((program) => {
        return { params: { slug: program.Slug, page: '1' } };
    });
    return {
        paths,
        fallback: true,
    };
};

export { getStaticProps };

export default Page;
