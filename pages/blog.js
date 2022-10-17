import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Blog.module.css'

export default function Blog(props) {
  const [blog,setBlog] = useState(props.allBlogs)
  // useEffect(()=>{
  //   fetch("http://localhost:3000/api/blogs").then((a)=>{
  //     return a.json();
  //   }).then((data)=>{
  //     setBlog(data)
  //   })
  // },[])
  return (
    <div className={styles.container}>
      <main className={styles.main}>
     <div className={styles.blogs}>
          {blog.map((blogitem)=>{
            return <div className={styles.blogItem} key={blogitem.slug}>
            <Link href={`/blogpost/${blogitem.slug}`}><h3>{blogitem.title}</h3></Link>
            <p>{blogitem.content.substr(0,145)}...</p>
             </div>
          })}
          
        </div>
</main>
    </div>
  )
}

export async function getServerSideProps(context){
  let data = await fetch("http://localhost:3000/api/blogs");
  let allBlogs = await data.json();
  return {
    props: {allBlogs},
  }
}
