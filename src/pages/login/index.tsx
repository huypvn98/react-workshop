import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import Button from "../../components/button";
import CheckBox from "../../components/check-box";
import Input from "../../components/input";

import { useLoginMutation } from "../../hooks/use-login-mutation";
import { useAuthContext } from "../../contexts";
import { usernameValidation, passwordValidation } from "../../utils/validation";
import { ADMIN_URL } from "../../constant/url";

type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

const OFFICER_USERNAMES = ["admin", "oliviaw", "liamg"];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<LoginForm>();

  const { mutateAsync: loginApi, isPending, error, reset } = useLoginMutation();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginApi({
        username: data.username,
        password: data.password,
      });

      const userData = response.data;
      login(userData);

      const isOfficer = OFFICER_USERNAMES.includes(
        data.username.toLowerCase()
      );
      
      if (isOfficer) {
        navigate(ADMIN_URL.SUBMISSIONS);
      } else {
        navigate(ADMIN_URL.PROFILE);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  watch(() => {
    if (error?.message) reset();
  });

  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <Input
            label="Username"
            required
            placeholder="Enter your username (8-10 characters)"
            error={errors.username?.message}
            {...register("username", usernameValidation)}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password (12-16 characters)"
            error={errors.password?.message}
            {...register("password", passwordValidation)}
          />
        </div>
        <div className="my-4">
          <CheckBox label="Remember me" {...register("remember")} />
        </div>
        {error?.message && (
          <small className="text-red-600 my-4 block">{error.message}</small>
        )}
        <Button isLoading={isPending} disabled={isPending}>
          Login
        </Button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?
        <a href="#" className="ml-2 text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
      <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs text-gray-500">
        <p className="font-medium mb-1">Test Accounts (DummyJSON):</p>
        <p>User: emilys / emilyspass</p>
        <p>Officer: oliviaw / oliviawpass</p>
      </div>
    </>
  );
};

export default Login;
