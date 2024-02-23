import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_PROFILE } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { Form } from "react-bootstrap";







const LoginForm = () => {


  const [login, { error }] = useMutation(LOGIN_PROFILE);
  const [validated] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
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

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await login({
        variables: profileFormData,
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setProfileFormData({
      email: "",
      password: "",
    });
    
  };














return (
  <>
  {/* <Form> */}
  {/* action="#"  */}
  <Form className="space-y-4" noValidate validated={validated} onSubmit={handleFormSubmit}>
  <div>
{/* <div id="authentication-modal" tabindex="-1"aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      > */}
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              {" "}
              {/* This is the beginning of the component */}
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
                <span className="sr-only">Close modal</span>{" "}
                This is the x that closes the modal
              </button> */}
            </div>

            <div className="p-4 md:p-5">
              {/* <form className="space-y-4" action="#" onSubmit={handleFormSubmit}> */}
                {" "}
                {/*This Triggers the HandleformSubmit Function when the form is submitted and takes the data and plugs it in */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    {/* This is the email input field */}
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    {/* This is the password input Field */}
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={profileFormData.password}
                    id="login-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
      {/* </Form> */}
      </Form>
      </>
)
};

export default LoginForm;