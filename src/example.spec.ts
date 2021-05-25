import { iif } from 'rxjs';

class FriendList {
  friends = [];

  addFriend(name: string) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name: string) {
    console.log(name);
  }

  removeFriend(name: string) {
    const index = this.friends.indexOf(name);
    if (index === -1) {
      throw new Error('Friend not found');
    }

    this.friends.splice(index, 1);
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

  describe('remove friend', () => {
    it('removes a friend from the list', () => {
      const name: string = 'Nobara Kugisaki';
      friendList.addFriend(name);
      expect(friendList.friends[0]).toEqual(name);
      friendList.removeFriend(name);
      expect(friendList.friends[0]).toBeUndefined();
    });
    it("throw an error if friend doesn't exist", () => {
      const name: string = 'Nobara Kugisaki';
      expect(() => friendList.removeFriend(name)).toThrow(new Error('Friend not found'));
    });
  });
});
