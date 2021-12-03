import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'

import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

export const SinglePagePost = ({ match }) => {
  const { postId } = match.params

  const {data: post, isFetching, isSuccess} = useGetPostQuery(postId)
  
  let content

  if(isFetching){
    content = <Spinner text='Loading...' />
  } else if (isSuccess) {
    content =  <article className="post">
    <h2>{post.title}</h2>
    <PostAuthor userId={post.user} />
    <TimeAgo timestamp={post.date}/>
    <p className="post-content">{post.content}</p>
    <ReactionButtons post={post}/>
    <Link to={`/editPost/${post.id}`} className="button">
      Edit Post
    </Link>
  </article>
  }

  if (!post) {
    return (
      <section>
        <h2>Post not Found!</h2>
      </section>
    )
  }

  return (
    <section>{content}</section>
  )
}
