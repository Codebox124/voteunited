import Politicians from "./components/all";

const Page = () => {
  return (
    <div className=" mx-auto mb-10">
      {" "}
      <div className="md:max-w-7xl max-w-full mx-auto text-center p-10 py-16">
        <h2 className="text-4xl md:text-5xl font-mont font-bold text-primary font-mont dark:text-white mb-4">
          Check Your Politicians
        </h2>
        <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto">
          View your politicians profiles
        </p>
      </div>
      <div className="">
        <Politicians />
      </div>
    </div>
  );
};

export default Page;
