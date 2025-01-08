import { useState } from "react";
import { Button } from "./ui/button"
import { CommandGroup, CommandList, CommandDialog, CommandInput, CommandItem, CommandEmpty, CommandSeparator } from "./ui/command"
import { Clock, Loader, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";

const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { data: locations, isLoading } = useLocationSearch(query);
    const { history, clearHistory, addToHistory } = useSearchHistory();

    console.log('locations -- ', locations);

    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");

        // add to search history
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country
        })


        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
    }

    return (
        <>
            <Button variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}>
                <Search className="mr-2 h-4 w-4" />
                Search Cities...
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery} />
                <CommandList>
                    {query.length > 2 && !isLoading && (<CommandEmpty>No cities found.</CommandEmpty>)}
                    <CommandGroup heading="Favorites">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>

                    {history.length > 0 && (
                        <>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="flex items-center justify-between px-2 my-2">
                                    <p className="text-xs text-muted-foreground">Recent Searches</p>
                                    <Button variant="ghost" size="sm" onClick={() => clearHistory.mutate()}>
                                        <XCircle className="h-4 w-4" />
                                        Clear
                                    </Button>
                                </div>
                                {history.map((item) => {
                                    return (<CommandItem key={`${item.lat}-${item.lon}`}
                                        value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                                        onSelect={handleSelect}>
                                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>{item.name}</span>
                                        {item.state && (
                                            <span className="text-sm text-muted-foreground" >
                                                , {item.state}
                                            </span>)}
                                        <span className="text-sm text-muted-foreground">
                                            , {item.country}
                                        </span>
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            {format(item.searchedAt, "MMM d, h:mm a")}
                                        </span>
                                    </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </>
                    )}

                    <CommandSeparator />

                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <Loader className="h-4 w-4 animate-spin" />
                                </div>)}
                            {
                                locations.map(location => {
                                    return (
                                        <CommandItem key={`${location.lat}-${location.lon}`}
                                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                            onSelect={handleSelect}>
                                            <Search className="mr-2 h-4 w-4" />
                                            <span>{location.name}</span>
                                            {location.state && (
                                                <span className="text-sm text-muted-foreground" >
                                                    , {location.state}
                                                </span>)}
                                            <span className="text-sm text-muted-foreground">
                                                , {location.country}
                                            </span>
                                        </CommandItem>
                                    )
                                })
                            }
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>

        </>
    )
}

export default CitySearch