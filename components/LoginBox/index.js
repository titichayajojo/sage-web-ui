const handleSubmit = async (values) => {
  try {
    const res = await Auth.login(values.email, values.password);
    navigation.navigate("HomePage");
  } catch (err) {
    if (err.code == "auth/user-not-found") {
      createAlert("You don't have an account yet.");
    } else if (err.code == "auth/wrong-password") {
      createAlert("Wrong password.");
    }
    console.log(err.code);
  }
};

export default function LoginBox(props) {
  return (
    <div className="flex justify-center">
      <form
        className="w-2/5 bg-header-light/20 items-center justify-center flex flex flex-col rounded-2xl"
        action="/send-data-here"
        method="post"
      >
        <p className="mt-9 mb-16 text-3xl text-header-dark">Login</p>

        <div className="w-4/5">
          <label className="text-header-dark text-xl">Email</label>
          <br></br>
          <input
            className="mb-16 h-14 w-full rounded-2xl pl-3 mt-2"
            type="text"
            id="first"
            name="first"
          />
          <br></br>
        </div>

        <div className="w-4/5">
          <label className="text-header-dark mb-3 text-xl">Password</label>
          <br></br>
          <input
            className="mb-16 h-14 w-full rounded-2xl pl-3 mt-2"
            type="text"
            id="last"
            name="last"
          />
          <br></br>
        </div>

        <button
          className="bg-header-light rounded-2xl py-3 px-20 text-3xl text-white mb-12"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
