import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className=" h-full flex justify-center items-center">
      <ScaleLoader color="#dec7ff" />
    </div>
  );
}
