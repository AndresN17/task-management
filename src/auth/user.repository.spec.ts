import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';

const mockCredentialsDTO = {
  username: 'Yuri Jahad',
  password: 'abc1234',
};

describe('UserRepository', () => {
  let userRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
      let save;
      beforeEach(()=>{
          save = jest.fn();
          userRepository.create= jest.fn().mockReturnValue( {save});
      });
      it("user successfully singsUp",()=>{
          save.mockResolvedValue(undefined);
          expect(userRepository.signUp(mockCredentialsDTO)).resolves.not.toThrow();

      })
  });
});
