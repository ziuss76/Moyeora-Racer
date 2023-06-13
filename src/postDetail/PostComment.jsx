import * as Style from './styledComponents/PostCommentStyle';
import Button from '../components/Button';
import IconMore from '../assets/icons/icon-more.svg';
import formatTime from '../community/utils/formatTime';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
const BASE_URL = process.env.REACT_APP_URL;

const PostComment = ({ postId }) => {
  const [commentOption, setCommentOption] = useState(null);
  const [commentData, setCommentData] = useState('');
  const queryClient = useQueryClient();

  //댓글 조회 api
  const fetchComments = async () => {
    const response = await fetch(
      `${BASE_URL}api/boards/detail/${postId}/comments`,
      {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('userToken')}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('댓글을 불러오는데 실패했습니다.');
    }

    const result = await response.json();
    return result;
  };

  const { data: comments, isLoading, isError, error } = useQuery(
    ['comments'],
    fetchComments
  );

  // 댓글 등록 api
  const postComment = async registerData => {
    const response = await fetch(`${BASE_URL}api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('userToken')}`
      },
      body: JSON.stringify(registerData)
    });

    if (!response.ok) {
      throw new Error('댓글 등록에 실패하였습니다.');
    }

    const result = await response.json();

    // const sortedComments = [result].sort((a, b) => {
    //   return new Date(b.createdAt) - new Date(a.createdAt);
    // });
    return result;
  };

  const { mutate: postCommentMutate } = useMutation(postComment, {
    onSuccess: () => {
      console.log('댓글이 성공적으로 등록되었습니다.');
      queryClient.invalidateQueries(['comments']);
      setCommentData('');
    },
    onError: error => {
      console.error('댓글 등록에 실패하였습니다.', error);
    }
  });

  // 댓글 삭제 api
  const deleteComment = async commentId => {
    console.log(commentId);
    const response = await fetch(`${BASE_URL}api/comments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('userToken')}`
      },
      body: JSON.stringify({ comment_id: commentId })
    });
    if (!response.ok) {
      throw new Error('댓글 삭제에 실패했습니다.');
    }

    return await response.json();
  };

  const { mutate: deleteCommentMutate } = useMutation(deleteComment, {
    onSuccess: () => {
      console.log('댓글 삭제에 성공했습니다.');
      queryClient.invalidateQueries(['comments']);
      setCommentOption(null);
    },
    onError: error => {
      console.error(error);
    }
  });

  const handleChange = e => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleWriteComment = e => {
    setCommentData(e.target.value);
  };

  const handleContentChange = e => {
    handleChange(e);
    handleWriteComment(e);
  };

  // 댓글 등록 핸들러
  const handleRegisterComment = () => {
    if (commentData === '') {
      alert('댓글을 작성해주세요!');
      return;
    }
    const registerData = {
      content: commentData,
      board_id: postId
    };
    postCommentMutate(registerData);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = commentId => {
    const check = window.confirm('댓글을 삭제하시겠습니까?');
    if (!check) return;

    if (!sessionStorage.getItem('userToken')) return;

    try {
      deleteCommentMutate(commentId);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Style.CommentContainer>
      <div className="comment-write">
        <h3>댓글달기</h3>
        <div className="comment-write-area">
          <textarea
            name="comment"
            id="comment"
            placeholder="댓글을 남겨주세요."
            onChange={handleContentChange}
            value={commentData}
          ></textarea>
          <Button
            value="등록"
            color="darkPurple"
            onClick={handleRegisterComment}
          />
        </div>
      </div>
      <div className="comment-content">
        <h3>댓글👀</h3>
        {comments !== undefined && comments.length > 0 ? (
          <ul className="comment-content-list">
            {comments.map((comment, index) => (
              <li key={comment.id}>
                <div className="writer">
                  <div className="writer-img">
                    <img
                      src={comment.user_detail.img_path}
                      alt="사용자 프로필 이미지"
                    />
                  </div>
                  <div className="writer-info">
                    <p className="writer-info-name">{comment.User.name}</p>
                    <div>
                      <p className="writer-info-position">
                        {comment.user_detail.position}
                      </p>
                      <p className="writer-info-time">
                        {formatTime(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="comment-content">{comment.content}</p>
                {sessionStorage.getItem('userToken') && (
                  <div className="comment-option">
                    <button
                      onClick={() =>
                        setCommentOption(
                          index === commentOption ? 'null' : index
                        )
                      }
                    >
                      <img src={IconMore} alt="열기" />
                    </button>
                    <ul
                      className={`comment-option-list ${
                        index === commentOption ? 'show' : ''
                      }`}
                    >
                      <li onClick={() => handleDeleteComment(comment.id)}>
                        ❌ 삭제하기
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-comment">댓글이 없습니다.</div>
        )}
      </div>
    </Style.CommentContainer>
  );
};

export default PostComment;
