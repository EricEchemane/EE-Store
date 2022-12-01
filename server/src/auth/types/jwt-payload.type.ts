export type JwtPayload = {
    sub: string;
    email: string;
    role: "buyer" | "seller";
};