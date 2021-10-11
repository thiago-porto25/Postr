import styled from 'styled-components'

import { Link, useHistory } from 'react-router-dom'
import { FaRegComment, FaRegHeart, FaHeart, FaRetweet } from 'react-icons/fa'
import { Dot } from '../atoms'

import { formatDistance } from 'date-fns'

import { useContext, useEffect, useState } from 'react'
import userContext from '../../context/userContext'

import { ToggleInteraction } from '../../services/postServices'
import PostOptions from './PostOptions'

const Container = styled.article`
  position: relative;
  box-sizing: border-box;
  padding: 1rem 0.5rem 0.2rem 0.5rem;
  transition: background 200ms ease;
  cursor: pointer;

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
    grid-template-columns: 50px auto;
    border-bottom: 1px solid var(--xLightGrey);

    .post-img-container {
      width: 50px;
      height: 50px;
      transition: 200ms ease-in-out;

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
        }

        .post-creator-info {
          display: inherit;
          gap: inherit;
          align-items: inherit;
          cursor: pointer;

          &:hover > h1 {
            text-decoration: underline;
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
        }
      }

      .post-interactions-container {
        display: flex;
        gap: 8rem;
        align-items: center;

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

export default function PostCard({ post, isOnProfile }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const [isRePosted, setIsRePosted] = useState(false)
  const [rePostCount, setRePostCount] = useState(0)

  const { user } = useContext(userContext)
  const history = useHistory()

  const handleLikeToggle = async (e) => {
    e.stopPropagation()

    await ToggleInteraction(post.docId, 'likes', isLiked, setIsLiked, user.id)
  }

  const handleRePostToggle = async (e) => {
    e.stopPropagation()

    await ToggleInteraction(
      post.docId,
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
  }, [post.likes, user.id])

  useEffect(() => {
    if (post.rePosts.includes(user.id)) {
      setIsRePosted(true)
    }
  }, [post.rePosts, user.id])

  useEffect(() => {
    setLikeCount((prev) => (isLiked ? prev + 1 : prev !== 0 ? prev - 1 : 0))
  }, [isLiked])

  useEffect(() => {
    setRePostCount((prev) =>
      isRePosted ? prev + 1 : prev !== 0 ? prev - 1 : 0
    )
  }, [isRePosted])

  return (
    <Container onClick={() => history.push(`/post/${post.id}`)}>
      {isOnProfile && user.id === post.creatorId ? (
        <PostOptions post={post} />
      ) : null}

      {isOnProfile && user.id !== post.creatorId ? (
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
                post.creatorAvatar + '.jpg' || 'default-avatar.png'
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

            <p>{formatDistance(post.createdAt.toDate(), new Date())}</p>
          </div>

          <div className="post-content-container">
            <p>{post.content}</p>
          </div>

          <div className="post-interactions-container">
            <div className="interaction-container comment">
              <div className="icon-container">
                <FaRegComment />
              </div>

              <p></p>
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
