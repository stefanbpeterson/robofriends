import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {

  return (
    <div>
    {
      robots.map((user, i) => {
        return (
          <Card className="Tilt-inner" key={robots[i].id} id={robots[i].id} name={robots[i].name} email={robots[i].email} />
        );
      })
    }
    </div>
  );
}

export default CardList;
