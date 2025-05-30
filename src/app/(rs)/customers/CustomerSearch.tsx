import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

export default function CustomerSearch() {
  return (
    <Form action="/customers" className="flex gap-2 items-center justify-end mt-4">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Customers"
        className="w-80"
        autoFocus
      />
      <SearchButton />
    </Form>
  );
}
