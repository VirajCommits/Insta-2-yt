import React,{useState,useEffect} from 'react'


import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    DotsCircleHorizontalIcon,
    ChatIcon,
    BookmarkIcon,
    EmojiHappyIcon,
} from "@heroicons/react/outline"

import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid";

import {useSession} from "next-auth/react"
import { async } from '@firebase/util';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from "react-moment"

function Post({id,username,userImg,image,caption}) {
    const {data:session} = useSession()

    const sendComment = async (e) =>{
        e.preventDefault();
        const commentToSend = comment;
        setComment('');
        await addDoc(collection(db,'posts',id,'comments'),{
            comment:commentToSend,
            username:session.user.username,
            userImg:session.user.image,
            timestamp:serverTimestamp(),
        })
    }

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);


    useEffect(() => onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),snapshot => setComments(snapshot.docs)) , [db])


    useEffect(() => onSnapshot(collection(db,'posts',id,'likes'),(snapshot) => setLikes(snapshot.docs)),[db,id])


    useEffect(() =>setHasLiked( likes.findIndex(like => like.id === session?.user?.uid) !==-1),[likes])

    const likePost =async() => {

        if(hasLiked){
            await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))
        }else{
            await setDoc(doc(db,'posts',id,'likes',session.user.uid),{
                username:session.user.username,
            })
        }
        
    }

    console.log("This: ",  comments)
    
  return (
    <>
    <div className='bg-white my-7 border rounded-sm'>
        
        <div className="">
            <div className="flex items-center p-5">
            <img src={userImg} className='rounded-full h-12 w-13 object-contain
            border p-1 mr-3' alt="This is Image" /> 

            
            
            <p className='flex-1 font-bold'>{username}</p>
            <DotsCircleHorizontalIcon className='h-5'/>
            </div>
        </div>

        <img src={image} className="object-cover w-full" alt="" />

        
        
        
        <div className="">
            <p className='p-5 truncate'>

            
                
                {session && (
            <div className='flex justify-between px-4 pt-4 pb-3'>
            <div className="flex space-x-4">
                {
                    hasLiked?(
                        <HeartIconFilled onClick={likePost} className='btn text-red-500  '/>
                    ):(
                <HeartIcon onClick={likePost} className='btn'/>

                    )
                }
                <ChatIcon className='btn'/>
                <PaperAirplaneIcon className='btn'/>
            </div>
            <BookmarkIcon className='btn'/>
            
        </div>
        
        )}
        {likes.length > 0 && (
            <p className='font-bold mb-1'>{likes.length} likes</p>
        )}   
            <span className='font-bold mr-1'>{username}:</span>{caption}

            
            </p>

           
        </div>
        


        
        

{comments.length>0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map(comment1 => (
                        <div key={comment1.id} className="flex items-center space-x-2 mb-3">
                            <img className='h-7 rounded-full' src={comment1.data().userImg} alt="" />

                            <p className='text-sm flex-1'> <span className='font-bold'>{comment1.data().username}</span> {comment1.data().comment }</p>
                            <Moment fromNow className='pr-5 text-xs'>
                {comment1.data().timestamp?.toDate()}
            </Moment>
                        </div>
                    ))}
                </div>
            )} 
        {session && (

<form className='flex items-center p-4'>
<EmojiHappyIcon className='h-7'/>
<input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment..' type="text" className='border-none flex-1 first-letter:focus:ring' />
<button type='submit' onClick={sendComment} disabled={!comment.trim()} className='font-semibold text-blue -400'>Post!</button>
</form>

        )}
        
    </div>
    </>
  )
}

export default Post
