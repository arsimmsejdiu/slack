export type SignInFlow = "signIn" | "signUp";
export type SignInUpState = {
    setState: (state: SignInFlow) => void;
}