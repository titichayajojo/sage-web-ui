import Auth from "@/lib/api/auth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginBox(props) {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async () => {
    try {
    console.log("here")
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          router.push("/RequestList");
        })
        .catch((err) => {
          if (err.code == "auth/user-not-found") {
            alert("You don't have an account yet.");
          } else if (err.code == "auth/wrong-password") {
            alert("Wrong password.");
          }
        });
      
    } catch (err) {
      console.log(err.code);
    }
  };
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
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
        </div>

        <div className="w-4/5">
          <label className="text-header-dark mb-3 text-xl">Password</label>
          <br></br>
          <input
            className="mb-16 h-14 w-full rounded-2xl pl-3 mt-2"
            type="password"
            id="last"
            name="last"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
        </div>
        

        <div
          className="bg-header-light rounded-2xl py-3 px-20 text-3xl text-white mb-12"
          // type="submit"
          onClick={handleSubmit}
        >
          Login
        </div>
      </form>
    </div>
  );
}
