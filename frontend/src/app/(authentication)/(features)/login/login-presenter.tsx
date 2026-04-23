import DontHaveAnAccount from './partials/dont-have-an-account';
import LoginForm from './partials/login-form';
import LoginHeader from './partials/login-header';

type LoginPresenterProps = {
  handleSubmit: any;
  form: any;
  setForm: any;
  showPass: any;
  setShowPass: any;
};

export default function LoginPresenter({
  handleSubmit,
  form,
  setForm,
  showPass,
  setShowPass,
}: LoginPresenterProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div
        className="bg-white rounded-2xl p-7 w-full"
        style={{ boxShadow: '0px 4px 24px rgba(43,53,47,0.08)' }}
      >
        <LoginHeader />

        <LoginForm />

        <DontHaveAnAccount path="/register" />
      </div>
    </div>
  );
}
