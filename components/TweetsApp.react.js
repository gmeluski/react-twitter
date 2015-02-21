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

  componentWillReceiveProps: function (newProps, oldProps) {
    this.setState(this.getInitialState(newProps));
  },

  componentDidMount: function () {
    var self = this;
    var socket = io.connect();

    socket.on('tweet', function (data) {
      self.addTweet(data);
    });

    window.addEventListener('scroll', this.checkWindowScroll);
  },

  addTweet: function (tweet) {
    var updated = this.state.tweets;
    var count = this.state.count + 1;
    var skip = this.state.skip + 1;

    updated.unshift(tweet);
    this.setState({ tweets: updated, count: count, skip: skip });
  },
  
  showNewTweets: function () {
    var updated = this.state.tweets;

    updated.forEach(function(tweet){
      tweet.active = true; 
    });

    this.setState({ tweets: updated, count: 0});
  },

  checkWindowScroll: function () {
    var h = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);

    var s = document.body.scrollTop;
    var scrolled = (h + s) > document.body.offsetHeight;

    if (scrolled && !this.state.paging && !this.state.done) {
      
      this.setState({ paging: true, page: this.state.page + 1});
      this.getPage(this.state.page);
    }
  },
});
