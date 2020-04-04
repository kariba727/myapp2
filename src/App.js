import React from 'react';

import './App.css';


const posts = [];
let postid = 0;

function ClapButton(props) {
  if (props.id === props.post.id || props.id === props.post.givenid) {
    return (
      <button onClick={props.onClickClap} value={props.post.postid} disabled>拍手</button>
    );
  } else {
    return (
      <button onClick={props.onClickClap} value={props.post.postid}>拍手</button>
    );
  }
}

function PostItem(props) {
  return (
    <li key={props.post.postid}>
      {props.post.text}
      <p>投稿日時:{props.post.time}</p>
      <p>{props.post.myname}から{props.post.yourname}へのメッセージ</p>
      <ClapButton
        onClickClap={props.onClickClap}
        post={props.post}
        id={props.id}
        givenid={props.givenid}
      />
      <span>{props.post.clap}</span>
    </li>
  );
}



function PostList(props) {
  const posts = props.posts.map(post => {
    return (
      <div key={post.postid}>
        <PostItem
          key={post.postid}
          post={post}
          onClickClap={props.onClickClap}
          id={props.id}
          givenid={props.givenid}
        />
      </div>
    );
  });
  return (
    <ul>{posts}</ul>
  );
}

function PostForm(props) {
  if (props.item.length > 4) {
    return (
      <form onSubmit={props.addPost}>
        <input type="text" value={props.item} onChange={props.updateItem} />
        <input type="submit" value="投稿" />
      </form>
    );
  } else {
    return (
      <form onSubmit={props.addPost}>
        <input type="text" value={props.item} onChange={props.updateItem} />
        <input type="submit" value="投稿" disabled />
      </form>
    );
  }

}

// function getUniqeID() {
//   return new Date().getTime().toString(36) + '-' + Math.random().toString(36);
// }


class App extends React.Component {

  constructor(props) {
    super(props);
    this.now = new Date();
    this.state = {
      id: 0,
      givenid: 0,
      posts: posts,
      item: '',
      users: [
        { userid: 0, name: "鈴木", face: "user0.png", myclap: 100, getclap: 0 },
        { userid: 1, name: "田中", face: "user1.png", myclap: 100, getclap: 0 },
        { userid: 2, name: "佐藤", face: "user2.png", myclap: 100, getclap: 0 },
        { userid: 3, name: "小林", face: "user3.png", myclap: 100, getclap: 0 },
        { userid: 4, name: "東口", face: "user4.png", myclap: 100, getclap: 0 },
      ],
      time: `${this.now.getFullYear()}年${this.now.getMonth() + 1}月${this.now.getDate()}日${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`
    };
    this.onChangeMyselect = this.onChangeMyselect.bind(this);
    this.onChangeOpselect = this.onChangeOpselect.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addPost = this.addPost.bind(this);
    this.onClickClap = this.onClickClap.bind(this);
  }

  onChangeMyselect = e => {
    const i = Number(e.target.value);
    this.setState({ id: i });
  }

  onChangeOpselect = e => {
    const i = Number(e.target.value);
    this.setState({ givenid: i });
  }

  updateItem = e => {
    this.setState({
      item: e.target.value,
    })
  }

  addPost = e => {
    e.preventDefault();
    this.now = new Date();
    const item = {
      postid: postid,
      text: this.state.item,
      clap: 0,
      time: this.state.time,
      id: this.state.id,
      myname: this.state.users[this.state.id].name,
      givenid: this.state.givenid,
      yourname: this.state.users[this.state.givenid].name,
    };
    const posts = this.state.posts.slice();
    posts.push(item);
    this.setState({
      posts: posts,
      item: '',
      time: `${this.now.getFullYear()}年${this.now.getMonth() + 1}月${this.now.getDate()}日${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`
    });
    postid++;
  }

  onClickClap = (e) => {
    const i = Number(e.target.value);
    const newposts = this.state.posts.slice();
    const newpost = newposts.filter(post =>
      post.postid === i
    );
    newpost[0].clap++;

    const users = this.state.users.slice();
    users[this.state.id].myclap = users[this.state.id].myclap - 2;
    users[newpost[0].id].getclap = users[newpost[0].id].getclap + 1;
    users[newpost[0].givenid].getclap = users[newpost[0].givenid].getclap + 1;

    this.setState({
      posts: newposts,
      users: users
    });
  }



  render() {


    const myOptions = this.state.users.map((user) => (
      <option key={user.userid} value={user.userid}>
        {user.name}
      </option>
    )
    );

    const opOptions = this.state.users.map((user) => (
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
            onChange={this.onChangeMyselect}>
            {myOptions}
          </select>

          <img src={this.state.users[this.state.id].face} className="face" alt="自分" />

          <ul>
            <li>
              持ってる拍手：{this.state.users[this.state.id].myclap}
            </li>
            <li>
              もらった拍手：{this.state.users[this.state.id].getclap}
            </li>
          </ul>



          <select
            value={this.state.givenid}
            onChange={this.onChangeOpselect}>
            {opOptions}
          </select>

          <img src={this.state.users[this.state.givenid].face} className="face" alt="相手" />

          <PostForm
            item={this.state.item}
            updateItem={this.updateItem}
            addPost={this.addPost}
          />

          <PostList
            posts={this.state.posts}
            users={this.state.users}
            id={this.state.id}
            givenid={this.state.givenid}
            onClickClap={this.onClickClap}

          />

        </footer>
      </div>
    );
  }

}
export default App;
