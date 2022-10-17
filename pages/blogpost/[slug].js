import React, { useEffect, useState } from 'react';
import styles from '../../styles/Blog.module.css'
import {useRouter} from 'next/router';

const slug = (props) => {
    // const router = useRouter();
    const [blogdata,setBlogdata] = useState(props.blog)
    // useEffect(()=>{
    //   if (!router.isReady) {
    //     return;
    //   }
    //   const {slug} = router.query;
    //   fetch(`http://localhost:3000/api/blogdata?slug=${slug}`).then((a)=>{
    //     return a.json();
    //   }).then((data)=>{
    //     setBlogdata(data)
    //   })
    // },[router.isReady])
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>{blogdata && blogdata.title}</h1>
      <hr />
      <p>{blogdata && blogdata.content}</p>
      </main>
    </div>
  )
}

export async function getServerSideProps(context){
  const {slug} = context.query;
  let data = await fetch(`http://localhost:3000/api/blogdata?slug=${slug}`);
  let blog = await data.json();
  return {
    props: {blog},
  }
}


export default slug;
