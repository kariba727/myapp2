import React from 'react';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      users: [
        { userid: 0, name: "鈴木", face: "user0.png", mycrap: 50, getcrap: 0 },
        { userid: 1, name: "田中", face: "user1.png", mycrap: 50, getcrap: 0 },
        { userid: 2, name: "佐藤", face: "user2.png", mycrap: 50, getcrap: 0 },
        { userid: 3, name: "小林", face: "user3.png", mycrap: 50, getcrap: 0 },
        { userid: 4, name: "東口", face: "user4.png", mycrap: 50, getcrap: 0 },
      ],
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    console.log(e.target.value);
    this.setState({ id: e.target.value });
  }

  render() {
 

    const options = this.state.users.map((user) => (
      <option key={user.userid} value={user.userid}>
        {user.name}
      </option>
    )
    );

    return (
      <div>
        <footer>
          <select
            value={this.state.id}
            onChange={this.onChange}>
            {options}
          </select>

          <img src={this.state.users[this.state.id].face} className="face" />

          <ul>
            <li>
              持ってる拍手：{this.state.users[this.state.id].mycrap}
            </li>
            <li>
              もらった拍手：{this.state.users[this.state.id].getcrap}
            </li>
          </ul>



          <form>
            <select>

            </select>
          </form>
          <button type="submit">投稿</button>
        </footer>
      </div>
    );
  }

}
export default App;
