import React from 'react';
import './App.css';
import Top3Item from './components/Top3Item';
import top3boardListMock from './mocks/top-3-board-list.mock';

// return 에 <BoardListItem/> 이렇게 넣어야 내가 만든 div들이 출력된다
function App() {
  return (
    <>
      <div style={{display:'flex',justifyContent: 'center', gap:'24px'}}>
        {top3boardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem}/>)}
      </div>
    </>
  );
}

export default App;
