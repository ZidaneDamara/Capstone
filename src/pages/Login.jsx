import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/reducers/authSlice";
import anime from "animejs";
import { UilUser, UilLock, UilGoogle } from "@iconscout/react-unicons";
import Button from "../components/elements/Button";
import toast from "react-hot-toast";
import Input from "../components/elements/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "johnd",
    password: "m38rmF$",
  });
  const { status, error } = useSelector((state) => state.auth);

  // Refs for animation
  const containerRef = useRef(null);

  useEffect(() => {
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1500,
      easing: "easeOutCubic",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(credentials)).unwrap();
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2 opacity-0"
      >
        <div className="bg-blue-50 p-12 relative hidden md:flex flex-col items-center justify-center">
          <video
            src="/Login.mp4"
            alt="E-commerce store video"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-8 text-center">
            NexusHub.
          </h2>
          <p className="text-gray-600 mt-4 text-center max-w-md">
            Your One-Stop Shop for Premium Fashion and Lifestyle Gear
          </p>
        </div>
        <div className="p-12 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              NexusHub.
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mt-1 relative">
                <Input
                  label="Username or email"
                  icon={UilUser}
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />

                <Input
                  label="Password"
                  icon={UilLock}
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-1 text-right">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-black py-3"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Signing in..." : "Sign in"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full text-black py-3 flex items-center justify-center gap-2"
              disabled={status === "loading"}
            >
              <UilGoogle />
              {status === "loading" ? "Signing in..." : "Sign in with Google"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
