import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Options } from '.'
import { LoggedUserAvatar, Dot } from '../atoms'

import { formatDistanceStrict } from 'date-fns'
import { deleteComment } from '../../services/commentServices'

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 1rem 0.8rem;
  border-bottom: 1px solid var(--xLightGrey);
  position: relative;

  .comment-avatar-container {
    width: 4rem;
  }

  .comment-rest-container {
    width: calc(100% - 4rem);
    display: flex;
    flex-direction: column;

    .commenter-info {
      display: flex;
      align-items: center;
      gap: 0.3rem;

      h1,
      p {
        margin: 0;
      }

      span,
      p {
        font-size: 15px;
        color: var(--darkGrey);
      }

      a {
        display: inherit;
        gap: inherit;
        text-decoration: none;
        align-items: inherit;
        cursor: pointer;
        color: transparent;
        --webkit-background-clip: text;

        &:active {
          background-color: transparent;
        }

        &:hover > h1 {
          text-decoration: underline;
        }

        h1 {
          font-size: 17px;
          color: var(--black);
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
          max-width: 130px;

          h1,
          span {
            overflow-x: initial;
            word-wrap: initial;
            text-overflow: initial;
            max-width: none;
          }
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

    .content {
      p {
        margin-bottom: 0;
        margin-top: 0.7rem;
        word-wrap: break-word;
      }
    }
  }
`

export default function CommentCard({
  post,
  authUser,
  comment,
  setComments,
  setPost,
}) {
  const handleDelete = async () => {
    await deleteComment(post.id, comment.id, setComments, setPost)
  }

  return (
    <Container>
      {comment.creatorId === authUser.id || authUser.id === post.creatorId ? (
        <Options destroy={handleDelete} />
      ) : null}
      <div className="comment-avatar-container">
        <LoggedUserAvatar user={comment.user} size="larger" />
      </div>

      <div className="comment-rest-container">
        <div className="commenter-info">
          <Link to={`/p/${comment.user.username}`}>
            <h1>{comment.user.name}</h1>

            <span>@{comment.user.username}</span>
          </Link>

          <Dot />

          <p className="date">
            {comment.createdAt.toDate
              ? formatDistanceStrict(comment.createdAt.toDate(), new Date())
              : formatDistanceStrict(comment.createdAt, new Date())}
          </p>
        </div>

        <div className="content">
          <p>{comment.content}</p>
        </div>
      </div>
    </Container>
  )
}
