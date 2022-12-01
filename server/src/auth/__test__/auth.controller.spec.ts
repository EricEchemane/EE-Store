import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { AccessToken } from '../types/access-token.type';
import {
  signinSellerMockDto,
  signinMockDto,
  signupBuyerMockDto,
} from './mock-dtos';

jest.mock('../auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signupSeller: when called', () => {
    let access_token: AccessToken;
    beforeEach(async () => {
      access_token = await authController.signupSeller(signinSellerMockDto);
    });

    test('then it should call auth.service.signupSeller', () => {
      expect(authService.signupSeller).toBeCalledWith(signinSellerMockDto);
    });

    test('then it should return an access_token', async () => {
      const _access_token = await authController.signupSeller(signinSellerMockDto);
      expect(_access_token).toBe(access_token);
    });
  });

  describe('signinSeller: when called', () => {
    let access_token: AccessToken;
    beforeEach(async () => {
      access_token = await authController.signinSeller(signinMockDto);
    });

    test('then it should call auth.service.signinSeller', () => {
      expect(authService.signinSeller).toBeCalledWith(signinMockDto);
    });

    test('then it should return an access_token', async () => {
      const _access_token = await authController.signinSeller(signinMockDto);
      expect(_access_token).toBe(access_token);
    });
  });

  describe('signupBuyer: when called', () => {
    let access_token: AccessToken;
    beforeEach(async () => {
      access_token = await authController.signupbuyer(signupBuyerMockDto);
    });

    test('then it should call auth.service.signupBuyer', () => {
      expect(authService.signupBuyer).toBeCalledWith(signupBuyerMockDto);
    });

    test('then it should return an access_token', async () => {
      const _access_token = await authController.signupbuyer(signupBuyerMockDto);
      expect(_access_token).toBe(access_token);
    });
  });

  describe('auth.service.getToken', () => {
    it('should return a token given a payload', async () => {
      const payload = {
        sub: '78aysdashd',
        email: signinMockDto.email
      };
      const _access_token = await authService.getToken(payload);
      expect(typeof _access_token).toBe('string');
    });
  });
});
