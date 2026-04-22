import { Input } from "./input";
import { BiSearch } from "react-icons/bi";

export function SearchInput(props: React.ComponentProps<typeof Input>) {
  return (
    <div className="relative w-full">
      <Input {...props} className="pr-10 rounded-md" />
      <BiSearch className="absolute right-3 top-1/2 -translate-y-1/2" />
    </div>
  );
}
