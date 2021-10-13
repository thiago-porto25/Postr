import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaRegHeart, FaHeart, FaRetweet } from 'react-icons/fa'

import { ToggleInteraction } from '../../services/postServices'

import { UserInfo } from '.'
import { Dot } from '../atoms'

const Container = styled.article`
  box-sizing: border-box;
  padding: 1rem 1rem 0 1rem;
  border-bottom: 1px solid var(--xLightGrey);

  .header {
    img {
      min-width: 50px !important;
      height: 50px;
      margin-right: -1rem;
    }
  }

  .content {
    p {
      font-size: 23px;
    }
  }

  .time {
    border-bottom: 1px solid var(--xLightGrey);
    color: var(--darkGrey);
    cursor: default;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding-bottom: 1rem;

    div {
      background-color: var(--darkGrey);
    }
  }

  .info {
    display: flex;
    gap: 2rem;
    border-bottom: 1px solid var(--xLightGrey);
    padding: 1rem 0;
    font-size: 15px;
    cursor: default;

    * {
      display: inherit;
      gap: 0.5rem;

      p {
        margin: 0;
        color: var(--darkGrey);
      }

      span {
        font-weight: bold;
      }
    }
  }

  .interactions {
    display: flex;
    justify-content: space-evenly;
    padding: 0.2rem 0;

    .interaction {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.7rem;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      color: var(--darkGrey);

      &.re-post {
        &:hover,
        &.re-posted {
          color: var(--success);
          background-color: #c8f7c8;
        }
      }

      &.like {
        &:hover,
        &.liked {
          color: var(--error);
          background-color: var(--errorLight);
        }
      }
    }
  }
`

export default function BigPostCard({ post, user, commentsNumber }) {
  const [isLiked, setIsLiked] = useState()
  const [likeCount, setLikeCount] = useState(0)

  const [isRePosted, setIsRePosted] = useState()
  const [rePostCount, setRePostCount] = useState(0)

  const handleLikeToggle = async (e) => {
    e.stopPropagation()

    await ToggleInteraction(post.id, 'likes', isLiked, setIsLiked, user.id)
  }

  const handleRePostToggle = async (e) => {
    e.stopPropagation()

    await ToggleInteraction(
      post.id,
      'rePosts',
      isRePosted,
      setIsRePosted,
      user.id
    )
  }

  useEffect(() => {
    if (post.likes.includes(user.id)) {
      setIsLiked(true)
    }
  }, [post.likes, user])

  useEffect(() => {
    if (post.rePosts.includes(user.id)) {
      setIsRePosted(true)
    }
  }, [post.rePosts, user])

  useEffect(() => {
    setLikeCount((prev) => (isLiked ? prev + 1 : prev !== 0 ? prev - 1 : 0))
  }, [isLiked])

  useEffect(() => {
    setRePostCount((prev) =>
      isRePosted ? prev + 1 : prev !== 0 ? prev - 1 : 0
    )
  }, [isRePosted])

  const creationDate = post.createdAt.toDate()

  const parsePostDate = () => {
    const month = creationDate.getMonth() + 1
    const day = creationDate.getDate()
    const year = creationDate.getFullYear()

    return `${month > 9 ? month : `0${month}`}/${
      day > 9 ? day : `0${day}`
    }/${year}`
  }

  const parsePostHours = () => {
    const hours = creationDate.getHours()
    const minutes = creationDate.getMinutes()

    return `${hours > 9 ? hours : `0${hours}`}:${
      minutes > 9 ? minutes : `0${minutes}`
    } `
  }

  const postUser = {
    name: post.creatorName,
    username: post.creatorUsername,
    avatarPhotoUrl: post.creatorAvatar,
  }

  return (
    <Container>
      <div className="header">
        <UserInfo userNeeded={postUser} />
      </div>

      <div className="content">
        <p>{post.content}</p>
      </div>

      <div className="time">
        {parsePostHours()} <Dot /> {parsePostDate()}
      </div>

      <div className="info">
        <div className="info-item">
          <span>{rePostCount}</span>
          <p>RePosts</p>
        </div>

        <div className="info-item">
          <span>0</span>
          <p>Comments</p>
        </div>

        <div className="info-item">
          <span>{likeCount}</span>
          <p>Likes</p>
        </div>
      </div>

      <div className="interactions">
        <div
          onClick={handleRePostToggle}
          className={`interaction re-post ${isRePosted ? 're-posted' : ''}`}
        >
          <FaRetweet />
        </div>

        <div
          onClick={handleLikeToggle}
          className={`interaction like ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>
    </Container>
  )
}
