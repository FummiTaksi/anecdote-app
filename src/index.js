import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

  const makeAnecdoteObject = (text) => {
      return ({
          text: text,
          votes: 0
      })
  }

  class Anecdote extends React.Component {
      render() {
        return (
            <div>
                <p>{this.props.anecdote.text}</p>
                <p>Has {this.props.anecdote.votes} votes</p>
            </div>
        )

      }
  }


class App extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        selected: 0,
      }
    }

     changeIndex = () => {
        return () => {
            this.setState({
                selected: getRandomInt(0, this.props.anecdotes.length)
            })
        }
    }

    addVoteToSelected = () => {
        this.props.anecdotes[this.state.selected].votes += 1;
        this.forceUpdate();
    }

    mostVotedAnecdote = () => {
        const copy = this.props.anecdotes.slice();
        return copy.sort(function(a, b) {
            return b.votes - a.votes;
        })[0];

    }
  
    render() {
      return (
        <div>
          <Anecdote anecdote = {this.props.anecdotes[this.state.selected]}/>
          <button onClick = {this.addVoteToSelected}>Vote</button>
          <button onClick = {this.changeIndex()}>Next anecdote</button>
          <br/>
          <b>Anecdote with most votes:</b>
          <Anecdote anecdote = {this.mostVotedAnecdote()}/>
        </div>
      )
    }
  }
  
  const anecdotes = [
    makeAnecdoteObject('If it hurts, do it more often'),
    makeAnecdoteObject('Adding manpower to a late software project makes it later!'),
    makeAnecdoteObject('The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'),
    makeAnecdoteObject('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'),
    makeAnecdoteObject('Premature optimization is the root of all evil.'),
    makeAnecdoteObject('Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.')
  ]
  
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
