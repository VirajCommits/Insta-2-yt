import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { db } from '../firebase';

import Post from "./Post"

// const post=[{
//     id:'123',
//     username:"Viraj Murab",
//     userImg:"https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png",
//     img:"https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png",
//     caption:"This is Viraj!"
// },
// {
//     id:'122',
//     username:"Viraj Murab",
//     userImg:"https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png",
//     img:"https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png",
//     caption:"This is Viraj!"
// }]


function Posts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot => {
        setPosts(snapshot.docs);
      })
    }, [db])

    console.log(posts)
    
  return ( 
    <>
        {
            posts.map((a) =>(
                <Post key={a.id} id={a.id} username={a.data().username}
                userImg={a.data().profileImg} image={a.data().image} caption={a.data().caption} />
            ))
        }

        <h1>Posts in here! </h1>
        </>
  )
}

export default Posts
