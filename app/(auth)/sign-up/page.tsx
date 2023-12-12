import { Metadata } from "next";
import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";

export const metadata: Metadata = {
    title: 'Abibas | Sign Up'
};
const SignUpPage = () => {
    return (
        <SignUpForm />
    );
};
export default SignUpPage;
