import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList() {
    const [jokes, setJokes] = useState([]);
    const [numJokes, setNumJokes] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    async function getJokes() {
        try {
            let newJokes = [...jokes];
            let seenJokes = new Set(jokes.map(joke =>
                joke.id));

            while (newJokes.length < numJokes) {
                const response = await axios.get(
                    "https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });
                const { ...jokeObj } = response.data;
                if (!seenJokes.has(jokeObj.id)) {
                    seenJokes.add(jokeObj.id);
                    newJokes.push({ ...jokeObj, votes: 0 });
                } else
                    console.log("duplicate found!");
            }
            setJokes(newJokes);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }
    if (jokes.length === 0)
        getJokes();

    useEffect(() => {
        if (jokes.length < numJokes)
            getJokes();
    }, [numJokes]);

    const getMoreJokes = () => {
        setNumJokes(prevCount => prevCount + 1);
        setIsLoading(true);
    }

    const vote = (id, delta) => {
        setJokes(jokes =>
            jokes.map(joke =>
            (joke.id === id ?
                {
                    ...joke,
                    votes: joke.votes + delta
                } :
                joke))
        );
    }

    if (isLoading)
        return (
            <div className="loading">
                <i className="fas fa-4x fa-spinner fa-spin" />
            </div>
        );

    const sortedJokes = [...jokes]
        .sort((a, b) => b.votes - a.votes);

    return (
        <div className="JokeList">
        <h1>Random Dad Jokes</h1>
            <button className="JokeList-getmore" onClick={getMoreJokes}>
                Get More Jokes
            </button>

            {sortedJokes.map(({ id, joke, votes }) => (
                <Joke
                    text={joke}
                    key={id}
                    id={id}
                    votes={votes}
                    onVote={vote}
                />
            ))}
        </div>
    );
}

export default JokeList;