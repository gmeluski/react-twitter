module.exports = TweetsApp = React.createClass({
  render: function () {
    return (
      <div className='tweets-app'>
        <Tweets tweets={this.state.tweets} />
        <Loader paging={this.state.paging} />
        <NotificationBar count={this.state.count} onShowNewTweets={this.shownewTweets} />
      </div>
    )
  }

  getInitialState: function (props) {
    props = props || this.props;
    
    return {
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };
  },
});
