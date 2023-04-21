import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    console.log("id_gss")

    const res = await fetch('https://bloblo-blog.onrender.com/md_get_data?idtext='+params.id);

    const postData = await res.json();

    console.log("YEAHYEAHWOWWOW")
    console.log(postData)
    return {
      props: {
        postData,
      },
    };
  }

export async function getStaticPaths() {
  const res = await fetch('https://bloblo-blog.onrender.com/md_get_allids');
  const paths = await res.json();

  //const paths = getAllPostIds();
  //console.log(getAllPostIds());
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }