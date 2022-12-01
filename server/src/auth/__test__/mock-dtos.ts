import { SigninDto, SignUpBuyerDto, SignUpSellerDto } from "../dto";

export const signinSellerMockDto: SignUpSellerDto = {
    email: "eric@gmail.com",
    password: "eric123",
    first_name: "eric",
    last_name: "echemane",
    store_name: "EE Merchandise",
    store_description: "some description for my mercahndise store"
};

export const signinMockDto: SigninDto = {
    email: "eric@gmail.com",
    password: "eric123"
};

export const signupBuyerMockDto: SignUpBuyerDto = {
    email: "eric@gmail.com",
    password: "eric123",
    address: "blk1 lot15, phase camia st. ts cruz subd. almanza dos, las piñas city",
    phone_number: "09695948292"
};