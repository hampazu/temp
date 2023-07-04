import "../css/game.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "../features/game/gameSlice";
import GameOption from "../Components/GameOption";
import GameQuiz from "../Components/GameQuiz";

function Game() {
  const { library } = useSelector((state) => state.game);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return (
    <div className="gamePosition">
      {library.length === 0 ? <GameOption /> : <GameQuiz />}
    </div>
  );
}

export default Game;
