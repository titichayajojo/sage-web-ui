import classes from "./index.module.css";

export default function SafeWithUsHeader(props) {
  return (
    <div className="px-10 py-7 font-sans text-3xl font-normal">
      <div className="inline-block mr-3 text-header-dark">Safe</div>
      <div className="inline-block mr-3 text-header-light">With</div>
      <div className="inline-block mr-3 text-header-dark">Us</div>
    </div>
  );
}
