class FriendList {
  friends = [];

  addFriend(name: string) {
    this.friends.push(name);
  }
}

//test
describe("Friendlist",()=>{
    it('initialize friendlist',()=>{
        const friendList = new FriendList();
        expect(friendList.friends.length).toEqual(0);
    });
    it('adds a friend to the list',()=>{
        const friendList= new FriendList();
        friendList.friends.push("Nobara Kugisaki");
        expect(friendList.friends.length).toEqual(1);
    });
})