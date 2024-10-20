import PropTypes from 'prop-types';
import React from 'react';
import './Joke.css';

const Joke = ({ id, text, votes, onVote }) => (
    <div className="Joke">
        <div className="Joke-votearea">
            <button onClick={() => onVote(id, 1)}>
                <i className="fas fa-thumbs-up" />
            </button>

            <button onClick={() => onVote(id, -1)}>
                <i className="fas fa-thumbs-down" />
            </button>

            {votes}
        </div>

        <div className="Joke-text">{text}</div>
    </div>
);

Joke.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    onVote: PropTypes.func.isRequired
};

export default Joke;