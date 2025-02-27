import { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { api } from "@/api";
import { debounce } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";

type TData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
};

type THighlighting = {
  [K in keyof TData]?: string;
};

type TResponsedata = {
  data: TData;
  highlighting: THighlighting;
};

export default function SearchForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<TResponsedata[]>([]);

  const fetchData = async (query: string) => {
    if (!query || query === "") {
      setResults([]);
      return null;
    }
    try {
      const response = await api.get(`/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 1000), []);
  useEffect(() => {
    debouncedFetchData(searchTerm);

    return () => {
      debouncedFetchData("");
    };
  }, [searchTerm, debouncedFetchData]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <SearchIcon />
          <span className="hidden md:inline-flex">Search anything</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen p-0 md:w-96">
        <Command>
          <CommandInput
            placeholder="Search anything"
            value={searchTerm}
            onValueChange={(search) => {
              setSearchTerm(search);
            }}
          />
          <CommandList className="max-h-[400px]">
            {results.length < 1 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <div className="divide-y">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Link to={`/crm/requests/${item.data.id}`} viewTransition>
                    {Object.keys(item.data).map((key) => {
                      const value = item.data[key as keyof TData];
                      const highlightedValue =
                        item.highlighting[key as keyof TData];
                      return (
                        <div
                          key={key}
                          className="grid grid-cols-[7rem_1fr] items-center leading-6"
                        >
                          <span className="capitalize text-muted-foreground">
                            {key.replace("_", " ")}:
                          </span>{" "}
                          {highlightedValue ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: highlightedValue,
                              }}
                              className="text-primary"
                            />
                          ) : (
                            <span>{value}</span>
                          )}
                        </div>
                      );
                    })}
                  </Link>
                </div>
              ))}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
