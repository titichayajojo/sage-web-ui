import "@/styles/globals.css";
import { setCookie, eraseCookie } from "../lib/cookie";
import { auth } from "lib/firebase";
import { useEffect,useRef,useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const csrNavTrack = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const setTokenInterval = useRef(null);

  const getLayout = Component.getLayout || ((page) => page);
  const pageview = () => {
    window.fbq("track", "PageView");
  };


  const fetchUserInfomation = async () => {
    try {
      if (auth) {
        // const token = await auth.currentUser.getIdToken();
        // const res = await User.get({
        //   type: User.USER_GET_USER_DETAIL,
        //   token,
        // });

        if (res.ok) {
          // store.dispatch(AuthActions.setUser(res.user));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setNewToken = async (authUser) => {
    await setCookie("token", await authUser.getIdToken());
  };

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        await setNewToken(authUser);
        await fetchUserInfomation();

        setTokenInterval.current = setInterval(() => {
          setNewToken(authUser);
          fetchUserInfomation();
        }, 1000 * 60 * 15);

        setCookie("token", authUser.accessToken);
        setCookie("uid", authUser.uid);
      } else {
        eraseCookie("token");
      }
      setIsLoading(false);
    });

    return () => {
      unlisten();
      clearInterval(setTokenInterval);
    };
  }, []);



  return <Component {...pageProps} />;
}
