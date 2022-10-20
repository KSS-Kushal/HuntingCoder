import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Blog.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Blog(props) {
  const [blog, setBlog] = useState([])
  const [count,setCount] = useState(0)
  const [allcount,setAllcount] = useState(0)

  useEffect(()=>{
    fetch("http://localhost:3000/api/blogs").then((a)=>{
      return a.json();
    }).then((data)=>{
      setAllcount(data.length)
      setBlog(data.slice(0,2))
    })
  },[])

  const fetchData = async() => {
    setCount(count+2)
    let d = await fetch(`http://localhost:3000/api/blogs?count=${count}`)
    let data = await d. json()
    setBlog(data)
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>


        <InfiniteScroll
          dataLength={blog.length} //This is important field to render the next data
          next={fetchData}
          hasMore={allcount!==blog.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          
        >
          {blog.map((blogitem) => {
            return <div className={styles.blogItem} key={blogitem.slug}>
              <Link href={`/blogpost/${blogitem.slug}`}><h3>{blogitem.title}</h3></Link>
              <p>{blogitem.content.substr(0, 145)}...</p>
            </div>
          })}
        </InfiniteScroll>



       
      </main>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   let data = await fetch("http://localhost:3000/api/blogs");
  
//   let allBlogs = await data.json();
//   return {
//     props: { allBlogs },
//   }
// }
