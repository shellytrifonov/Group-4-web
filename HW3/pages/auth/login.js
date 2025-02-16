/**
 * Login - User login page.
 */
import { useAuthLogin } from '../../hooks/auth/useAuthLogin';
import { useForm } from '../../hooks/auth/useForm';
import Form from '../../components/shared/Form';
import FormInput from '../../components/auth/FormInput';
import Link from 'next/link';

export default function Login() {
  const { formData, handleInputChange } = useForm({
    email: "",
    password: "",
  });
  
  const { login, emailError, passwordError } = useAuthLogin();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <main className="flex-grow container mx-auto py-8">
      <section className="form-section py-8 flex justify-center">
        {/* Login Form */}
        <Form title="Login to Your Account" onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={emailError}
            label="Email"
          />
          <FormInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={passwordError}
            label="Password"
          />
          
          {/* Submit button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="btn bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
              Login
            </button>
          </div>

          {/* Register link */}
          <p className="text-sm font-light text-gray-500 mt-4 text-center">
            Don't have an account?{" "}
            <Link 
              href="/auth/register" 
              className="font-medium text-primary-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </Form>
      </section>
    </main>
  );
}