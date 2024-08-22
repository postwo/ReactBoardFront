import React from 'react';
import './App.css';
import BoardItem from './components/BoardItem'; 
import latestBoardListMock from './mocks/latest-board-list.mock';

// return 에 <BoardListItem/> 이렇게 넣어야 내가 만든 div들이 출력된다
function App() {
  return (
    <>
      {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)} 
    </>
  );
}

export default App;
