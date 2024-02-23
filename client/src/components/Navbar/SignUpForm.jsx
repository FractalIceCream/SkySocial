import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { Form, Button, Alert } from 'react-bootstrap';

const SignUpForm = () => {

  const [addProfile, { error }] = useMutation(ADD_PROFILE);

  // const [validated] = useState(false);
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
    // console.log(event.target);
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    try {
      console.log(profileFormData);
      // const {data} = await addProfile({
      //   variables: {
      //     name: "vince",
      //     email: "food@bart.com",
      //     password: "password123"
      //   }
      // })
      const { data } = await addProfile({
        variables: profileFormData,
      });
      // console.log(data);
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
    {/* <Form> */}
      <form className="space-y-4" onSubmit={handleFormSubmit}>
      {/* <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      > */}
        <div>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Join the Cloud!
              </h3>
              {/* <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button> */}
            </div>

            <div className="p-4 md:p-5">
              {/* action="#"*/}
              {/* <form className="space-y-4" onSubmit={handleFormSubmit}> */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="name"
                    onChange={handleInputChange}
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    onChange={handleInputChange}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button onSubmit={handleFormSubmit}
                  type="submit"
                  // onSubmit={handleFormSubmit}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                 Sign Up
                </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
      </form>
      {/* </Form>  */}
    </>

  );
};

export default SignUpForm;
