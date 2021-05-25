class FriendList {
  friends = [];

  addFriend(name: string) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name: string) {
    console.log(name);
  }
}

//test
describe('Friendlist', () => {
  it('initialize friendlist', () => {
    const friendList = new FriendList();
    expect(friendList.friends.length).toEqual(0);
  });
  it('adds a friend to the list', () => {
    const friendList = new FriendList();
    friendList.addFriend('Nobara Kugisaki');
    expect(friendList.friends.length).toEqual(1);
  });
  it('announces friendship', () => {
    const friendList = new FriendList();
    friendList.announceFriendship = jest.fn();
    friendList.addFriend('Nobara Kugisaki');
    expect(friendList.announceFriendship).toHaveBeenCalled();
  });
});
