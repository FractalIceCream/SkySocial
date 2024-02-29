import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutation";
import Auth from "../../utils/auth";

const SignUpForm = () => {

  const [addProfile, { error }] = useMutation(ADD_PROFILE);

  const [profileFormData, setProfileFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {

      const { data } = await addProfile({
        variables: profileFormData,
      });

      Auth.login(data.addProfile.token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setProfileFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <form className="space-y-4 " onSubmit={handleFormSubmit}>
        <div className="">
          <div className="relative  p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Join the Cloud!
                </h3>
              </div>
              <div className="p-4 md:p-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="name"
                    onChange={handleInputChange}
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    onChange={handleInputChange}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>

  );
};

export default SignUpForm;