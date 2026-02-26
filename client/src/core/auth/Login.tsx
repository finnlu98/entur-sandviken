import { IoMdSend } from 'react-icons/io';
import './login.css';
import LoadingButton from '../../feedback/loading/components/loading/loading-button';

interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
}

const Login: React.FC<LoginProps> = ({ email, setEmail, handleSubmit }) => {
  return (
    <>
      <div className="h-column gap">
        <p>Enter your email to login 🚀</p>
        <div className="h-row">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoadingButton onClick={handleSubmit} loadingKey="login">
            <IoMdSend />
          </LoadingButton>
        </div>
      </div>
    </>
  );
};
export default Login;
