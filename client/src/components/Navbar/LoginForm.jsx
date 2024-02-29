import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_PROFILE } from "../../utils/mutation";
import Auth from "../../utils/auth";

const LoginForm = () => {

  const [login, { error }] = useMutation(LOGIN_PROFILE);
  const [validated] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    email: "",
    password: "",
  });

  //possibly not being use effectively here
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: profileFormData,
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      //needed?
      setShowAlert(true);
    }

    setProfileFormData({
      email: "",
      password: "",
    });

  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div>
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                {" "}
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Join the Cloud!
                </h3>
              </div>

              <div className="p-4 md:p-5">
                {" "}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black dark:text-white"
                  >
                    {" "}
                    Your email
                  </label>
                  <input
                    type="email"
                    value={profileFormData.email}
                    name="email"
                    onChange={handleInputChange}
                    id="login-email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black dark:text-white"
                  >
                    {" "}
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={profileFormData.password}
                    id="login-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                >
                  Login to your account
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
};

export default LoginForm;