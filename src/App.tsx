import React from 'react';
import './App.css';
import Top3Item from './components/Top3Item';
import top3boardListMock from './mocks/top-3-board-list.mock';
import CommentItem from './components/CommentItem';
import { pseudoRandomBytes } from 'crypto';
import commentListMock from './mocks/comment-list.mock';
import favoriteListMock from './mocks/favorite-list.mock';
import FavoriteItem from './components/FavoriteItem';
import InputBox from './components/InputBox';

// return 에 <BoardListItem/> 이렇게 넣어야 내가 만든 div들이 출력된다
function App() {
  return (
    <>
      <InputBox />
    </>
  );
}

export default App;
