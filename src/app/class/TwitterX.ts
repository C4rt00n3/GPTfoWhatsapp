class TwitterX {
  TwitterID?: string;
  ScreenName?: string;
  Followers?: string;
  Blue?: string
  Connections?: string;

  constructor([TwitterID, ScreenName, Followers, Blue, Connections]: string[]) {
    this.TwitterID = TwitterID;
    this.ScreenName = ScreenName;
    this.Followers = Followers;
    this.Blue = Blue;
    this.Connections = Connections;
  }
}

export default TwitterX;
