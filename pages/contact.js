import React, { useState } from 'react'
import styles from '../styles/Contact.module.css'




export default function Contact() {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [phone,setPhone] = useState()
  const [desc,setDesc] = useState()

  const handleSubmit= (e)=>{
    e.preventDefault();
    console.log(name,phone,email,desc)
    const data = {name,phone,email,desc};
    fetch('http://localhost:3000/api/contact',{
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(data)
    }).then(response =>response.text())
    .then(data=>{
      console.log("Success:",data)
      alert("Thanks for contacting us");
      setName("")
      setEmail('')
      setPhone('')
      setDesc('')
    })
    .catch((error)=>{
      console.error("Error:",error);
    });
  }
  const handleChange= (e)=>{
    if (e.target.name == 'name') {
      setName(e.target.value)
    } else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    } else if (e.target.name == 'desc') {
      setDesc(e.target.value)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Contact Us</h1>
        <form  method="post" onSubmit={handleSubmit}>
          <div className={styles.mb3}>
            <label htmlFor="name" className={styles.formlabel}>Name</label>
            <input type="text" id='name' name='name' value={name} onChange={handleChange} />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="email" className={styles.formlabel}>Email</label>
            <input type="email" id='email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="phone" className={styles.formlabel}>Phone</label>
            <input type="number" id='phone' name='phone' value={phone} onChange={handleChange}/>
          </div>
          <div className={styles.mb3}>
            <label htmlFor="desc" className={styles.formlabel}>Elaborate your concern</label>
            <textarea name="desc" id="desc" cols="30" rows="3" value={desc} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className={styles.btn}>Submit</button>
        </form>
      </main>
    </div>
  )
}
