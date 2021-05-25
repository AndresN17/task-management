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
  let friendList;
  beforeEach(() => {
    friendList = new FriendList();
  });
  it('initialize friendlist', () => {
    expect(friendList.friends.length).toEqual(0);
  });
  it('adds a friend to the list', () => {
    friendList.addFriend('Nobara Kugisaki');
    expect(friendList.friends.length).toEqual(1);
  });
  it('announces friendship', () => {
    friendList.announceFriendship = jest.fn();
    expect(friendList.announceFriendship).not.toHaveBeenCalled();
    friendList.addFriend('Nobara Kugisaki');
    expect(friendList.announceFriendship).toHaveBeenCalled();
  });
});
