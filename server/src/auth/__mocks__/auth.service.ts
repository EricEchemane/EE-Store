import { AccessToken } from "../types/access-token.type";

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2U3OTM0Ni1iMTVmLTQ0NGUtODVhZC04NmYyMWMzOWUzY2UiLCJlbWFpbCI6ImVyaWNAZ21haWwuY29tIiwiaWF0IjoxNjY5NzkxMjA3LCJleHAiOjE2Njk3OTIxMDd9.x1QGW3cSdakLY7qYHf_ccl9qtOU-aNX9u_nO6C4oRds";
const getAccessTokenStub = (): AccessToken => ({ access_token });

export const AuthService = jest.fn().mockReturnValue({
    signupSeller: jest.fn().mockResolvedValue(getAccessTokenStub()),
    signinSeller: jest.fn().mockResolvedValue(getAccessTokenStub()),
    signupBuyer: jest.fn().mockResolvedValue(getAccessTokenStub()),
    signinBuyer: jest.fn().mockResolvedValue(getAccessTokenStub()),
    getToken: jest.fn().mockResolvedValue(access_token),
});