import { Footer } from "./components/Footer";
import { MainContent } from "./components/MainContent";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Header />
        <div>
          <div className="h-screen min-w-full flex flex-col items-center justify-center backdrop-blur-2xl px-10">
            <h3 className="text-3xl font-quicksandMedium text-center">
              Welcome to
            </h3>
            <h1 className="text-7xl font-bold my-8 text-center">
              <span className="text-primary font-bold font-quicksandBold">
                GLA
              </span>{" "}
              Codify.
            </h1>
            <p className="font-quicksandLight h-auto text-xl max-w-[550px] text-center">
              A platform where you&apos;ll find the right content to help you
              become a coding master.
            </p>
          </div>
          <MainContent />
        </div>
        <Footer />
      </div>
      <div className="w-[70vw] h-[10vh] rounded-3xl bg-indigo-900 absolute -z-50 top-0 rotate-45"></div>
    </>
  );
}
