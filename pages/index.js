import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';

export async function getStaticProps() {
  console.log("index_gss")
  const res = await fetch('https://bloblo-blog.onrender.com/md_get_sortdata');

  const allPostsData = await res.json();

  //const allPostsData = getSortedPostsData();
  //console.log("あああああ");
  //console.log(allPostsData)
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData, pictureUrl, name }) {
  return (
    <Layout home {...pictureUrl} {...name}>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}