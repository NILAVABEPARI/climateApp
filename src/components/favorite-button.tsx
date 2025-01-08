import type { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
    data: WeatherData
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
    console.log('data inside favoriteButton-- ', data);
    const { addToFavorite, isFavorite, removeFavorite } = useFavorite();

    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from favorites`);
        } else {
            addToFavorite.mutate({
                lat: data.coord.lat,
                lon: data.coord.lon,
                name: data.name,
                country: data.sys.country
            })
            toast.success(`Added ${data.name} to favorites`);
        }
    }

    return (
        <Button variant={isCurrentlyFavorite ? "default" : "outline"}
            size="icon"
            className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            onClick={handleToggleFavorite}>
            <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
        </Button>
    )
}

export default FavoriteButton