import styled from 'styled-components'

import { Link, useHistory } from 'react-router-dom'
import { FaRegComment, FaRegHeart, FaHeart, FaRetweet } from 'react-icons/fa'
import { Dot } from '../atoms'
import { Options } from '.'

import { formatDistanceStrict } from 'date-fns'

import { useContext, useEffect, useState } from 'react'
import userContext from '../../context/userContext'

import { deletePost, ToggleInteraction } from '../../services/postServices'

const Container = styled.article`
  position: relative;
  box-sizing: border-box;
  padding: 1rem 0.5rem 0.2rem 0.5rem;
  transition: background 200ms ease;
  cursor: pointer;
  border-bottom: 1px solid var(--xLightGrey);
  width: 100%;

  &:hover {
    background-color: var(--xxLightGrey);
  }

  .post-re-posted {
    color: var(--darkGrey);
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 14px;
    margin-top: -1rem;
    padding: 0.5rem 0;
    padding-left: 3rem;

    svg {
      font-size: 16px;
    }
  }

  .post-container {
    display: grid;
    grid-template-columns: calc(50px + 0.2rem) auto;

    .post-img-container {
      width: calc(50px + 0.3rem);
      height: 50px;
      transition: 200ms ease-in-out;
      box-sizing: border-box;
      padding-left: 0.3rem;

      &:hover {
        filter: brightness(90%);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .post-rest-container {
      box-sizing: border-box;
      padding: 0 1rem;

      .post-top-info {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        a {
          display: inherit;
          gap: inherit;
          align-items: inherit;
          text-decoration: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          --webkit-background-clip: text;
          color: transparent;

          &:active {
            background-color: transparent;
          }
        }

        .post-creator-info {
          display: inherit;
          gap: inherit;
          align-items: inherit;
          cursor: pointer;
          background-color: transparent;
          --webkit-background-clip: text;

          &:hover > h1 {
            text-decoration: underline;
          }

          h1,
          span {
            overflow-x: hidden;
            word-wrap: none;
            text-overflow: ellipsis;
            max-width: 150px;
            white-space: nowrap;
            --webkit-background-clip: text;
          }

          @media (max-width: 550px) {
            h1,
            span {
              max-width: 120px;
            }
          }

          @media (max-width: 460px) {
            h1,
            span {
              max-width: 100px;
            }
          }

          @media (max-width: 460px) {
            h1 {
              max-width: 80px;
            }
            span {
              max-width: 70px;
            }
          }

          @media (max-width: 350px) {
            overflow-x: hidden;
            word-wrap: none;
            text-overflow: ellipsis;
            max-width: 120px;

            h1,
            span {
              overflow-x: initial;
              word-wrap: initial;
              text-overflow: initial;
              max-width: none;
            }
          }
        }

        .date {
          overflow-x: hidden;
          display: inline;
          white-space: nowrap;
          text-overflow: ellipsis;
          @media (max-width: 550px) {
            width: 120px;
          }

          @media (max-width: 460px) {
            width: 70px;
          }
          @media (max-width: 350px) {
            width: 50px;
          }
        }

        h1 {
          font-size: 17px;
          color: var(--black);
        }

        span,
        p {
          font-size: 15px;
          color: var(--darkGrey);
        }

        h1,
        p {
          margin: 0;
        }
      }

      .post-content-container {
        p {
          font-size: 15px;
          text-align: justify;
          margin: 0.5rem 0;
          color: var(--black);
          word-wrap: anywhere;
        }
      }

      .post-interactions-container {
        display: flex;
        gap: 20%;
        align-items: center;

        @media (max-width: 460px) {
          gap: 20px;
          justify-content: space-evenly;
        }

        .interaction-container {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--darkGrey);
          cursor: pointer;

          .icon-container {
            padding: 0.5rem 0.6rem;
            border-radius: 50%;
            box-sizing: border-box;
            transition: 400ms ease;
          }

          p {
            margin: 0;
            font-size: 13.5px;
            transition: 400ms ease;
            min-width: 1rem;
          }

          &.comment {
            &:hover > .icon-container {
              color: var(--primary);
              background-color: var(--xLightGrey);
            }

            &:hover > p {
              color: var(--primary);
            }
          }

          &.re-post {
            &:hover > .icon-container {
              color: var(--success);
              background-color: #c8f7c8;
            }

            &:hover > p {
              color: var(--success);
            }
          }

          &.like {
            .icon-container {
              padding: 0.4rem 0.6rem;
            }
            svg {
              margin-top: 0.2rem;
            }

            &:hover > .icon-container {
              color: var(--error);
              background-color: var(--errorLight);
            }

            &:hover > p {
              color: var(--error);
            }
          }

          &.re-posted {
            color: var(--success);
          }

          &.liked {
            color: var(--error);
          }
        }
      }
    }
  }
`

export default function PostCard({
  post,
  isOnProfile,
  setPosts,
  setLikedPosts,
  profileUser,
}) {
  const [isLiked, setIsLiked] = useState()
  const [likeCount, setLikeCount] = useState(0)

  const [isRePosted, setIsRePosted] = useState()
  const [rePostCount, setRePostCount] = useState(0)

  const { user } = useContext(userContext)
  const history = useHistory()

  const handleLikeToggle = async (e) => {
    e.stopPropagation()

    await ToggleInteraction(
      post.docId,
      'likes',
      isLiked,
      setIsLiked,
      user.id,
      setPosts,
      setLikedPosts
    )
  }

  const handleRePostToggle = async (e) => {
    e.stopPropagation()

    await ToggleInteraction(
      post.docId,
      'rePosts',
      isRePosted,
      setIsRePosted,
      user.id,
      setPosts,
      setLikedPosts
    )
  }

  const handleDelete = async () => {
    await deletePost(post.id, setPosts, setLikedPosts)
  }

  useEffect(() => {
    if (post.likes.includes(user?.id)) {
      setIsLiked(true)
    }
    if (post.likes) setLikeCount(post.likes.length)
  }, [post.likes, user])

  useEffect(() => {
    if (post.rePosts.includes(user?.id)) {
      setIsRePosted(true)
    }
    if (post.rePosts) setRePostCount(post.rePosts.length)
  }, [post.rePosts, user])

  return (
    <Container onClick={() => history.push(`/post/${post.id}`)}>
      {isOnProfile && user.id === post.creatorId ? (
        <Options destroy={handleDelete} />
      ) : null}

      {isOnProfile &&
      ((user.id !== post.creatorId && profileUser?.id === user.id) ||
        (user.id === post.creatorId && profileUser?.id !== user.id) ||
        profileUser?.id !== post.creatorId) ? (
        <div className="post-re-posted">
          <FaRetweet />
          reposted
        </div>
      ) : null}

      <div className="post-container">
        <div className="post-img-container">
          <Link
            onClick={(e) => e.stopPropagation()}
            to={`/p/${post.creatorUsername}`}
          >
            <img
              src={`/images/avatars/${
                post && post.creatorAvatar
                  ? post.creatorAvatar + '.jpg'
                  : 'default-avatar.png'
              }`}
              alt={post.creatorName}
            />
          </Link>
        </div>

        <div className="post-rest-container">
          <div className="post-top-info">
            <Link
              onClick={(e) => e.stopPropagation()}
              to={`/p/${post.creatorUsername}`}
            >
              <div className="post-creator-info">
                <h1>{post.creatorName}</h1>

                <span>@{post.creatorUsername}</span>
              </div>
            </Link>

            <Dot />

            <p className="date">
              {post.createdAt.toDate
                ? formatDistanceStrict(post.createdAt.toDate(), new Date())
                : formatDistanceStrict(post.createdAt, new Date())}
            </p>
          </div>

          <div className="post-content-container">
            <p>{post.content}</p>
          </div>

          <div className="post-interactions-container">
            <div className="interaction-container comment">
              <div className="icon-container">
                <FaRegComment />
              </div>

              <p>{post && post.commentsNumber > 0 && post.commentsNumber}</p>
            </div>

            <div
              onClick={handleRePostToggle}
              className={`interaction-container re-post ${
                isRePosted ? 're-posted' : ''
              }`}
            >
              <div className="icon-container">
                <FaRetweet />
              </div>

              <p>{rePostCount > 0 && rePostCount}</p>
            </div>

            <div
              onClick={handleLikeToggle}
              className={`interaction-container like ${isLiked ? 'liked' : ''}`}
            >
              <div className="icon-container">
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </div>
              <p>{likeCount > 0 && likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
