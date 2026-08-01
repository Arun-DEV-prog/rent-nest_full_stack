import PropertyModal from "../../../_component/property-modal";
import { createPropertyAction } from "./actions";

export default function LandlordPropertyCreatePage() {
  return (
    <div className="w-[500] h-[500] ">
      <PropertyModal action={createPropertyAction} />
    </div>
  );
}
